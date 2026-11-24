import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';
import { AppText } from '../ui';
import { t } from '../i18n';

const { colors, spacing, radius, shadows, sizes, typography } = theme;

/**
 * Large amount entry card at the top of the add/edit forms.
 * `update` shows an t('common.update') pill that opens the salary modal.
 */
const AmountInput = ({
  amount,
  handleAmountChange,
  amountTitle,
  setSalaryModalVisible,
  placeholder,
  currency = 'Rs',
  update = false,
  autoFocus = false,
  onFocus,
  onBlur,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconTile}>
        <Icon name="savings" size={sizes.icon.xl - 2} color={colors.primary} />
      </View>

      <View style={styles.info}>
        <AppText variant="label">{amountTitle}</AppText>
        <View style={styles.amountRow}>
          <AppText variant="title" style={styles.currency}>
            {currency}
          </AppText>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={handleAmountChange}
            placeholder={placeholder}
            placeholderTextColor={colors.textMuted}
            keyboardType="numeric"
            autoFocus={autoFocus}
            onFocus={onFocus}
            onBlur={onBlur}
            accessibilityLabel={amountTitle || 'Amount'}
          />
        </View>
      </View>

      {update && (
        <Pressable
          style={({ pressed }) => [styles.update, pressed && styles.pressed]}
          onPress={() => setSalaryModalVisible(true)}
          accessibilityRole="button"
        >
          <Icon name="edit" size={sizes.icon.sm} color={colors.primary} />
          <AppText variant="label" color="primary">
            {t('common.update')}
          </AppText>
        </Pressable>
      )}
    </View>
  );
};

export default AmountInput;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    minHeight: 88,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    ...shadows.sm,
  },
  iconTile: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xxs,
  },
  currency: {
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    padding: 0,
    ...typography.title,
    lineHeight: undefined, // let iOS size single-line inputs naturally
    color: colors.textPrimary,
  },
  update: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    height: 36,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  pressed: { opacity: 0.75 },
});
