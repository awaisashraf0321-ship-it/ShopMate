import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '../theme';
import { AppText, Button, formatMoney } from '../ui';
import { parseExpense } from './parseExpense';
import { useSpeech } from './useSpeech';
import { t } from '../i18n';

const { colors, spacing, radius, sizes, shadows, typography } = theme;

const PAYMENT_KEYS = { 1: 'money.cash', 2: 'money.bank' };
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const dayLabel = date => {
  const today = new Date();
  const start = d =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diff = Math.round((start(today) - start(date)) / 86400000);
  if (diff === 0) return t('period.today');
  if (diff === 1) return t('period.yesterday');
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

/**
 * t('home.voice') panel. Listens as soon as it opens, shows what it
 * heard (editable, so mistakes can be fixed by typing) and what it
 * understood. t('voice.fill') hands the parsed draft to `onApply`; nothing
 * is saved from here.
 *
 * A plain overlay rather than a native Modal: closing a Modal mid-animation
 * is what froze the app before (see components/Loader.js).
 */
const VoiceSheet = ({ visible, ...props }) =>
  visible ? <VoiceSheetBody {...props} /> : null;

const VoiceSheetBody = ({ onClose, onApply, categories = [] }) => {
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState('');
  const speech = useSpeech({ onFinal: text => setDraft(text) });
  const { start, stop, cancel, listening, text, level, error } = speech;

  // Start listening when the panel opens.
  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shown = listening ? text : draft;
  const parsed = useMemo(
    () => (shown.trim() ? parseExpense(shown, { categories }) : null),
    [shown, categories],
  );

  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(pulse, {
      toValue: listening ? level : 0,
      duration: 120,
      useNativeDriver: true,
    }).start();
  }, [level, listening, pulse]);
  const ringScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.6],
  });

  const close = () => {
    cancel();
    onClose?.();
  };

  const onMicPress = () => {
    if (listening) {
      stop();
    } else {
      setDraft('');
      start();
    }
  };

  const status = listening
    ? t('voice.listening')
    : shown
    ? t('voice.check')
    : error
    ? error
    : t('voice.tap');

  const rows = parsed
    ? [
        {
          key: 'amount',
          icon: 'payments',
          label: t('expense.amount'),
          value: parsed.amount != null ? formatMoney(parsed.amount) : null,
        },
        {
          key: 'category',
          icon: 'category',
          label: t('expense.category'),
          value: parsed.categoryName
            ? parsed.categoryGuessed
              ? `${parsed.categoryName} (guess)`
              : parsed.categoryName
            : null,
        },
        {
          key: 'payment',
          icon: 'account-balance-wallet',
          label: t('voice.paidBy'),
          value: PAYMENT_KEYS[parsed.paymentMode]
            ? t(PAYMENT_KEYS[parsed.paymentMode])
            : null,
        },
        {
          key: 'date',
          icon: 'event',
          label: t('field.date'),
          value: dayLabel(parsed.date),
        },
        {
          key: 'note',
          icon: 'notes',
          label: t('field.note'),
          value: parsed.note || null,
          optional: true,
        },
      ]
    : [];

  return (
    <View style={styles.root}>
      <Pressable
        style={styles.backdrop}
        onPress={close}
        accessibilityRole="button"
        accessibilityLabel="Close voice input"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        pointerEvents="box-none"
      >
        <View
          style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}
        >
          <View style={styles.header}>
            <View style={styles.headerText}>
              <AppText variant="title">{t('home.voice')}</AppText>
              <AppText variant="caption" color="textSecondary">
                {t('voice.try')}
              </AppText>
            </View>
            <Pressable
              onPress={close}
              hitSlop={10}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Icon
                name="close"
                size={sizes.icon.md}
                color={colors.textPrimary}
              />
            </Pressable>
          </View>

          <View style={styles.micArea}>
            <Animated.View
              style={[
                styles.ring,
                listening && styles.ringOn,
                { transform: [{ scale: ringScale }] },
              ]}
            />
            <Pressable
              onPress={onMicPress}
              style={({ pressed }) => [
                styles.mic,
                listening && styles.micOn,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={
                listening ? 'Stop listening' : 'Start listening'
              }
            >
              <Icon
                name={listening ? 'stop' : 'mic'}
                size={34}
                color={listening ? colors.onPrimary : colors.primary}
              />
            </Pressable>
          </View>
          <AppText
            variant="caption"
            align="center"
            color={error && !listening && !shown ? 'danger' : 'textSecondary'}
            style={styles.status}
          >
            {status}
          </AppText>

          <TextInput
            value={shown}
            onChangeText={setDraft}
            onFocus={() => {
              // Typing takes over from the mic: keep what was heard so far.
              if (listening) {
                setDraft(text);
                cancel();
              }
            }}
            placeholder={t('voice.typeHere')}
            placeholderTextColor={colors.textSecondary}
            multiline
            style={styles.input}
            accessibilityLabel="What you said"
          />

          {rows.length ? (
            <View style={styles.preview}>
              {rows.map(row => (
                <View key={row.key} style={styles.row}>
                  <Icon
                    name={row.icon}
                    size={sizes.icon.sm}
                    color={
                      row.value || row.optional
                        ? colors.primary
                        : colors.warning
                    }
                  />
                  <AppText
                    variant="caption"
                    color="textSecondary"
                    style={styles.rowLabel}
                  >
                    {row.label}
                  </AppText>
                  <AppText
                    variant={row.value ? 'label' : 'caption'}
                    color={row.value ? 'textPrimary' : 'warning'}
                    numberOfLines={1}
                    style={styles.rowValue}
                  >
                    {row.value ??
                      (row.optional ? '—' : 'Not heard, pick it on the form')}
                  </AppText>
                </View>
              ))}
            </View>
          ) : null}

          <Button
            title={t('voice.fill')}
            icon="edit-note"
            disabled={!parsed || listening}
            onPress={() => {
              cancel();
              onApply?.(parsed);
            }}
            style={styles.apply}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default VoiceSheet;

const MIC = 76;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'flex-end',
    zIndex: 100,
    elevation: 100,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.overlay,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    ...shadows.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  headerText: { flex: 1, gap: 2 },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micArea: {
    alignItems: 'center',
    justifyContent: 'center',
    height: MIC * 1.7,
    marginTop: spacing.md,
  },
  ring: {
    position: 'absolute',
    width: MIC,
    height: MIC,
    borderRadius: MIC / 2,
    backgroundColor: colors.primarySoft,
  },
  ringOn: { opacity: 0.9 },
  mic: {
    width: MIC,
    height: MIC,
    borderRadius: MIC / 2,
    backgroundColor: colors.primarySoft,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micOn: { backgroundColor: colors.primary },
  status: { marginBottom: spacing.md },
  input: {
    ...typography.body,
    color: colors.textPrimary,
    minHeight: 56,
    maxHeight: 110,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.surfaceMuted,
    textAlignVertical: 'top',
  },
  preview: {
    marginTop: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs + 2,
  },
  rowLabel: { width: 70 },
  rowValue: { flex: 1, textAlign: 'right' },
  apply: { marginTop: spacing.lg },
  pressed: { opacity: 0.7 },
});
