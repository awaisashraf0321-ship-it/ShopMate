import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

import style from '../SignUp/style';
import { useTheme } from '../../theme';
import { AppText, NumberPad, PinDots } from '../../ui';
import { ChangePassword } from '../../api/AuthApi';
import {
  PIN_LENGTH,
  changePinFields,
  formatPhone,
  isValidPhone,
  normalizePhone,
} from '../../helpers/phoneAccount';
import {
  friendlyError,
  getRememberedPhone,
  serverMessage,
} from '../../helpers/session';
import { t } from '../../i18n';

// current PIN -> new PIN -> new PIN again
const getSteps = () => ({
  current: {
    title: t('changePin.current'),
    text: t('changePin.currentText'),
  },
  next: {
    title: t('changePin.new'),
    text: t('changePin.newText'),
  },
  confirm: {
    title: t('changePin.again'),
    text: t('pin.againText'),
  },
});

const ChangePinScreen = ({ navigation, route }) => {
  const { colors, spacing, sizes } = useTheme();
  const [phone, setPhone] = useState(normalizePhone(route?.params?.phone));
  const [step, setStep] = useState('current');
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // The login number is the one this account signs in with.
  useEffect(() => {
    getRememberedPhone().then(saved => {
      const known = normalizePhone(saved);
      if (isValidPhone(known)) setPhone(known);
    });
  }, []);

  const fail = (message, backTo) => {
    setError(message);
    setErrorCount(c => c + 1);
    setCurrentPin(p => (backTo === 'current' ? '' : p));
    setNewPin('');
    setConfirmPin('');
    setStep(backTo);
  };

  const save = async pinAgain => {
    if (pinAgain !== newPin) {
      fail(t('changePin.different'), 'next');
      return;
    }
    if (newPin === currentPin) {
      fail(t('changePin.same'), 'next');
      return;
    }
    setSaving(true);
    try {
      const response = await ChangePassword(
        changePinFields({ phone, currentPin, newPin }),
      );
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        Toast.show({ type: 'success', text1: t('changePin.done') });
        navigation.goBack();
        return;
      }
      const message = serverMessage(data);
      if (/incorrect|wrong|invalid|mismatch/i.test(message)) {
        fail(t('changePin.wrong'), 'current');
      } else {
        fail(message || t('changePin.failed'), 'current');
      }
    } catch (e) {
      fail(friendlyError(e), 'current');
    } finally {
      setSaving(false);
    }
  };

  const value = { current: currentPin, next: newPin, confirm: confirmPin }[
    step
  ];
  const setValue = {
    current: setCurrentPin,
    next: setNewPin,
    confirm: setConfirmPin,
  }[step];

  const onDigit = digit => {
    if (saving || value.length >= PIN_LENGTH) return;
    const next = value + digit;
    setValue(next);
    setError('');
    if (next.length < PIN_LENGTH) return;
    timer.current = setTimeout(() => {
      if (step === 'current') setStep('next');
      else if (step === 'next') setStep('confirm');
      else save(next);
    }, 200);
  };

  const onBackspace = clearAll =>
    setValue(v => (clearAll ? '' : v.slice(0, -1)));

  const onBack = () => {
    if (step === 'current' || saving) {
      navigation.goBack();
      return;
    }
    setError('');
    setNewPin('');
    setConfirmPin('');
    setStep(step === 'confirm' ? 'next' : 'current');
  };

  const copy = getSteps()[step];
  const stepNumber = { current: 1, next: 2, confirm: 2 }[step];

  return (
    <SafeAreaView
      style={[style.root, { backgroundColor: colors.background }]}
      edges={['top', 'bottom']}
    >
      <StatusBar barStyle="dark-content" />
      <View
        style={[
          style.topBar,
          { paddingHorizontal: spacing.lg, gap: spacing.md },
        ]}
      >
        <Pressable
          onPress={onBack}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={t('common.goBack')}
          style={[style.backButton, { backgroundColor: colors.surface }]}
        >
          <Icon
            name="arrow-back"
            size={sizes.icon.lg}
            color={colors.textPrimary}
          />
        </Pressable>
        <View style={style.flex}>
          <AppText variant="label" color="textSecondary">
            {t('changePin.title')} ·{' '}
            {t('common.stepOf', { n: stepNumber, total: 2 })}
          </AppText>
          <View style={[style.progress, { gap: spacing.xs }]}>
            {[1, 2].map(i => (
              <View
                key={i}
                style={[
                  style.progressSegment,
                  {
                    borderRadius: 999,
                    backgroundColor:
                      i <= stepNumber ? colors.primary : colors.border,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </View>

      <ScrollView
        style={style.flex}
        contentContainerStyle={[style.content, { padding: spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[style.heading, { gap: spacing.sm }]}>
          <View
            style={[style.stepIcon, { backgroundColor: colors.primarySoft }]}
          >
            <Icon
              name="lock-reset"
              size={sizes.icon.xl}
              color={colors.primary}
            />
          </View>
          <AppText variant="h1" align="center">
            {copy.title}
          </AppText>
          <AppText variant="body" color="textSecondary" align="center">
            {copy.text}
          </AppText>
          {isValidPhone(phone) ? (
            <View
              style={[
                style.phoneChip,
                { backgroundColor: colors.surface, gap: spacing.xs },
              ]}
            >
              <Icon
                name="phone-iphone"
                size={sizes.icon.sm}
                color={colors.textSecondary}
              />
              <AppText variant="label" color="textSecondary">
                {formatPhone(phone)}
              </AppText>
            </View>
          ) : null}
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <PinDots
            length={PIN_LENGTH}
            filled={value.length}
            errorKey={errorCount}
          />
          <View
            style={{
              minHeight: 48,
              justifyContent: 'center',
              marginTop: spacing.md,
            }}
          >
            {saving ? (
              <AppText
                variant="bodyStrong"
                color="textSecondary"
                align="center"
              >
                {t('changePin.saving')}
              </AppText>
            ) : error ? (
              <AppText variant="bodyStrong" color="danger" align="center">
                {error}
              </AppText>
            ) : null}
          </View>
        </View>

        <View style={style.flex} />

        <NumberPad
          onDigit={onDigit}
          onBackspace={onBackspace}
          disabled={saving}
        />

        {step === 'current' ? (
          <Pressable
            onPress={() => navigation.navigate('ForgotPin', { phone })}
            accessibilityRole="button"
            hitSlop={8}
            style={{ alignSelf: 'center', marginTop: spacing.lg }}
          >
            <AppText variant="bodyStrong" color="primary">
              {t('changePin.forgot')}
            </AppText>
          </Pressable>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePinScreen;
