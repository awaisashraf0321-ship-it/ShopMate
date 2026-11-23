import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../theme';
import { AppText, Card, formatMoney } from '../ui';

const { colors, spacing, radius, sizes } = theme;

// Today -> Week -> Month, stepped with the arrows.
const PERIODS = ['Today', 'Week', 'Month'];

const StepButton = ({ icon, disabled, onPress, label }) => (
  <Pressable
    style={({ pressed }) => [
      styles.step,
      disabled && styles.stepDisabled,
      pressed && styles.pressed,
    ]}
    disabled={disabled}
    onPress={onPress}
    hitSlop={6}
    accessibilityRole="button"
    accessibilityLabel={label}
    accessibilityState={{ disabled }}
  >
    <Icon name={icon} size={sizes.icon.md} color={colors.onPrimary} />
  </Pressable>
);

const Summary = ({ icon, label, value }) => (
  <View style={styles.summary}>
    <View style={styles.summaryLabel}>
      <Icon name={icon} size={sizes.icon.md} color={colors.onPrimaryMuted} />
      <AppText variant="caption" color="onPrimaryMuted" numberOfLines={1}>
        {label}
      </AppText>
    </View>
    <AppText variant="bodyStrong" color="onPrimary" numberOfLines={1}>
      {value}
    </AppText>
  </View>
);

/**
 * Home balance card: period stepper, net balance, money in / money out.
 * Net balance = opening balance (carried over from before the period)
 * + money in - money out, so the opening balance is shown when non-zero;
 * otherwise the three numbers don't appear to add up.
 */
const DashboardCard = ({
  formatAmount,
  netBalance,
  openingBalance,
  MoneyIn,
  MoneyOut,
  getDateRange,
  selectedPeriod,
  setSelectedPeriod,
  formatDate,
}) => {
  const { fromDate, toDate } = getDateRange(selectedPeriod);
  const index = PERIODS.indexOf(selectedPeriod);
  const isFirst = index <= 0;
  const isLast = index === PERIODS.length - 1;
  const range =
    fromDate === toDate
      ? formatDate(fromDate)
      : `${formatDate(fromDate)} - ${formatDate(toDate)}`;

  return (
    <Card tone="primary" padding="lg" style={styles.card}>
      <View style={styles.dateRow}>
        <StepButton
          icon="chevron-back"
          label="Previous period"
          disabled={isFirst}
          onPress={() => setSelectedPeriod(PERIODS[index - 1])}
        />
        <AppText
          variant="bodyStrong"
          color="onPrimary"
          align="center"
          style={styles.range}
        >
          {range}
        </AppText>
        <StepButton
          icon="chevron-forward"
          label="Next period"
          disabled={isLast}
          onPress={() => setSelectedPeriod(PERIODS[index + 1])}
        />
      </View>

      <AppText variant="label" color="onPrimaryMuted">
        Net Balance
      </AppText>
      <AppText
        variant="display"
        color="onPrimary"
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
        style={styles.balance}
      >
        {formatMoney(netBalance)}
      </AppText>
      {Number(openingBalance) ? (
        <AppText
          variant="caption"
          color="onPrimaryMuted"
          style={styles.opening}
        >
          Includes {formatMoney(openingBalance)} carried over from before
        </AppText>
      ) : null}

      <View style={styles.summaryRow}>
        <Summary
          icon="arrow-down-outline"
          label="Money in"
          value={`Rs ${formatAmount(MoneyIn)}`}
        />
        <Summary
          icon="arrow-up-outline"
          label="Money out"
          value={`Rs ${formatAmount(MoneyOut)}`}
        />
      </View>
    </Card>
  );
};

export default DashboardCard;

const styles = StyleSheet.create({
  opening: {
    marginTop: -spacing.xs,
    marginBottom: spacing.sm,
  },
  card: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xs,
  },
  pressed: { opacity: 0.75 },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  range: {
    flex: 1,
  },
  step: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.onPrimaryMuted,
    backgroundColor: colors.onPrimarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDisabled: {
    opacity: 0.4,
  },
  balance: {
    marginTop: spacing.xxs,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  summary: {
    flex: 1,
    minWidth: 0,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.onPrimarySurface,
  },
  summaryLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xxs,
  },
});
