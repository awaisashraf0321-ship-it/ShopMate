import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '../theme';
import { AppText, Button, TextField } from '../ui';
import { formatPhone } from '../helpers/phoneAccount';
import {
  askContactsPermission,
  loadCustomerRows,
  matchesSearch,
} from '../helpers/contacts';
import { t } from '../i18n';

const initials = name =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase() || '#';

const Separator = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.separator, { backgroundColor: colors.divider }]} />
  );
};

const ContactRow = React.memo(({ row, onPress }) => {
  const { colors, spacing, typography } = useTheme();
  return (
    <Pressable
      onPress={() => onPress(row)}
      accessibilityRole="button"
      accessibilityLabel={`${row.name}, ${formatPhone(row.phone)}`}
      style={({ pressed }) => [
        styles.row,
        {
          paddingHorizontal: spacing.lg,
          gap: spacing.md,
          backgroundColor: pressed ? colors.primarySoft : colors.surface,
        },
      ]}
    >
      <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
        <AppText style={typography.bodyStrong} color="primary">
          {initials(row.name)}
        </AppText>
      </View>
      <View style={styles.flex}>
        <AppText variant="bodyStrong" numberOfLines={1}>
          {row.name}
        </AppText>
        <AppText variant="body" color="textSecondary">
          {formatPhone(row.phone)}
        </AppText>
      </View>
      <Icon name="add-circle-outline" size={26} color={colors.primary} />
    </Pressable>
  );
});

/**
 * Full-screen list of the phone's contacts (mobile numbers only), with
 * search. Asks for permission when opened. onSelect({ name, phone }).
 */
export default function ContactPicker({ visible, onClose, onSelect }) {
  const { colors, spacing, sizes } = useTheme();
  // 'loading' | 'ready' | 'denied' | 'blocked' | 'error'
  const [status, setStatus] = useState('loading');
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const permission = await askContactsPermission();
      if (permission !== 'granted') {
        setStatus(permission);
        return;
      }
      setRows(await loadCustomerRows());
      setStatus('ready');
    } catch (e) {
      console.log('Contacts error:', e);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    if (visible) {
      setQuery('');
      load();
    }
  }, [visible, load]);

  const shown = useMemo(
    () => rows.filter(row => matchesSearch(row, query)),
    [rows, query],
  );

  const pick = useCallback(row => onSelect(row), [onSelect]);

  const message = {
    denied: {
      icon: 'contacts',
      title: t('contacts.allowTitle'),
      text: t('contacts.allowText'),
      action: { title: t('contacts.allow'), onPress: load },
    },
    blocked: {
      icon: 'contacts',
      title: t('contacts.blockedTitle'),
      text: t('contacts.blockedText'),
      action: {
        title: t('contacts.openSettings'),
        onPress: () => Linking.openSettings(),
      },
    },
    error: {
      icon: 'error-outline',
      title: t('contacts.errorTitle'),
      text: t('common.tryAgain'),
      action: { title: t('common.tryAgain'), onPress: load },
    },
  }[status];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <SafeAreaView
        style={[styles.flex, { backgroundColor: colors.background }]}
        edges={['top', 'bottom']}
      >
        <View
          style={[
            styles.header,
            { paddingHorizontal: spacing.lg, gap: spacing.md },
          ]}
        >
          <Pressable
            onPress={onClose}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Close contacts"
            style={[styles.close, { backgroundColor: colors.surface }]}
          >
            <Icon
              name="close"
              size={sizes.icon.lg}
              color={colors.textPrimary}
            />
          </Pressable>
          <View style={styles.flex}>
            <AppText variant="h2">{t('contacts.title')}</AppText>
            <AppText variant="caption" color="textSecondary">
              {t('contacts.subtitle')}
            </AppText>
          </View>
        </View>

        {status === 'ready' ? (
          <>
            <TextField
              icon="search"
              placeholder={t('contacts.search')}
              value={query}
              onChangeText={setQuery}
              autoCapitalize="words"
              style={{ marginTop: spacing.md }}
            />
            <FlatList
              data={shown}
              keyExtractor={row => row.key}
              renderItem={({ item }) => (
                <ContactRow row={item} onPress={pick} />
              )}
              ItemSeparatorComponent={Separator}
              keyboardShouldPersistTaps="handled"
              initialNumToRender={20}
              windowSize={7}
              ListEmptyComponent={
                <AppText
                  variant="body"
                  color="textSecondary"
                  align="center"
                  style={{ padding: spacing.xl }}
                >
                  {rows.length ? t('contacts.noMatch') : t('contacts.none')}
                </AppText>
              }
            />
          </>
        ) : status === 'loading' ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={colors.primary} />
            <AppText
              variant="body"
              color="textSecondary"
              style={{ marginTop: spacing.md }}
            >
              {t('contacts.opening')}
            </AppText>
          </View>
        ) : (
          <View
            style={[styles.center, { padding: spacing.xl, gap: spacing.md }]}
          >
            <View
              style={[styles.bigIcon, { backgroundColor: colors.primarySoft }]}
            >
              <Icon
                name={message.icon}
                size={sizes.icon.xl}
                color={colors.primary}
              />
            </View>
            <AppText variant="h2" align="center">
              {message.title}
            </AppText>
            <AppText variant="body" color="textSecondary" align="center">
              {message.text}
            </AppText>
            <Button
              title={message.action.title}
              size="lg"
              onPress={message.action.onPress}
              style={{ marginTop: spacing.md }}
            />
            <Button
              title={t('contacts.typeMyself')}
              variant="ghost"
              onPress={onClose}
            />
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
  },
  close: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: { height: StyleSheet.hairlineWidth, marginLeft: 72 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bigIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
