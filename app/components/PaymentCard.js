import React, { useRef } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Swipeable } from 'react-native-gesture-handler';
import { theme } from '../theme';
import { AppText } from '../ui';
import { t } from '../i18n';

const { colors, spacing, radius, sizes } = theme;

/** Avatar tint + icon for a payment mode name ("Cash", "Bank Transfer", …). */
const modeStyle = paymentMode => {
  const mode = String(paymentMode || '').toLowerCase();
  if (mode.includes('cash')) {
    return { bg: colors.warningSoft, fg: colors.warning, icon: 'payments' };
  }
  if (/bank|transfer|online/.test(mode)) {
    return { bg: colors.infoSoft, fg: colors.info, icon: 'account-balance' };
  }
  if (/card|credit|debit/.test(mode)) {
    return { bg: colors.successSoft, fg: colors.success, icon: 'credit-card' };
  }
  return { bg: colors.primarySoft, fg: colors.primary, icon: 'payment' };
};

const initialsOf = name =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase() || 'U';

const SwipeAction = ({ icon, label, color, onPress, disabled }) => (
  <Pressable
    style={({ pressed }) => [
      styles.action,
      { backgroundColor: color, opacity: pressed ? 0.85 : 1 },
    ]}
    onPress={onPress}
    disabled={disabled}
    accessibilityRole="button"
    accessibilityLabel={label}
  >
    <Icon name={icon} size={sizes.icon.lg} color={colors.onPrimary} />
    <AppText variant="label" color="onPrimary">
      {label}
    </AppText>
  </Pressable>
);

/**
 * One row in a payments / expenses list. Swipe left for Delete (and Edit
 * when `editBtn`). Shows the payee, the date or payment mode, and the amount.
 */
const PaymentCard = ({
  sentTo,
  paymentMode,
  amount,
  onDelete,
  onPress,
  formatDate,
  handleBudgetUpdate,
  editDisabled,
  formatAmount,
  selectedIcon,
  editBtn = false,
  setEditModalVisible,
  date,
}) => {
  const swipeRef = useRef(null);
  const name = String(sentTo || 'Unknown');
  const category =
    typeof selectedIcon === 'function' ? selectedIcon(sentTo) : null;
  const tone = modeStyle(paymentMode);

  const renderRightActions = () => (
    <View style={styles.actions}>
      {editBtn && (
        <SwipeAction
          icon="edit"
          label={t('common.edit')}
          color={colors.warning}
          disabled={editDisabled}
          onPress={() => {
            swipeRef.current?.close();
            handleBudgetUpdate?.();
            setEditModalVisible(true);
          }}
        />
      )}
      <SwipeAction
        icon="delete-outline"
        label={t('delete.button')}
        color={colors.danger}
        onPress={onDelete}
      />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <Swipeable
        ref={swipeRef}
        renderRightActions={renderRightActions}
        overshootRight={false}
        rightThreshold={18}
      >
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [styles.row, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel={`${name}, Rs ${formatAmount?.(amount)}`}
        >
          <View
            style={[
              styles.avatar,
              { backgroundColor: category?.color || tone.bg },
            ]}
          >
            {category?.icon ? (
              <Icon
                name={category.icon}
                size={sizes.icon.md}
                color={category.iconColor}
              />
            ) : (
              <AppText variant="bodyStrong" color={tone.fg}>
                {initialsOf(name)}
              </AppText>
            )}
          </View>

          <View style={styles.details}>
            <AppText variant="bodyStrong" numberOfLines={1}>
              {name}
            </AppText>
            <View style={styles.meta}>
              <Icon
                name={date ? 'calendar-today' : tone.icon}
                size={sizes.icon.sm - 2}
                color={colors.textMuted}
              />
              <AppText
                variant="caption"
                color="textSecondary"
                numberOfLines={1}
              >
                {date ? formatDate(date) : paymentMode || 'Payment'}
              </AppText>
            </View>
          </View>

          <AppText
            variant="bodyStrong"
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
            style={styles.amount}
          >
            Rs {formatAmount?.(amount)}
          </AppText>
        </Pressable>
      </Swipeable>
      <View style={styles.divider} />
    </View>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surface,
  },
  row: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  pressed: { opacity: 0.8 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  details: {
    flex: 1,
    minWidth: 0,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xxs,
  },
  amount: {
    maxWidth: '40%',
    marginLeft: spacing.sm,
    textAlign: 'right',
  },
  actions: {
    flexDirection: 'row',
  },
  action: {
    width: 72,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
  },
});
