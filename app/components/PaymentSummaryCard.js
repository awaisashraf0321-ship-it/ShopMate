import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';
import { AppText, Card } from '../ui';
import { periodLabel, t } from '../i18n';

const { colors, spacing, radius, sizes } = theme;
const methodColor = id => colors.paymentMethod[id] ?? colors.onPrimaryMuted;

/**
 * Purple summary card at the top of the list tabs: period total, payment
 * count, period picker, a split bar and per-method totals.
 *
 * paymentType / paymentPercentage pick which API fields hold the amounts:
 * 'Outgoing' | 'Ingoing' | 'Self' | 'Business'.
 */
const PaymentSummaryCard = ({
  totalAmount,
  totalTransactions,
  formatAmount,
  methods,
  setVisible,
  selectedPeriod,
  paymentType,
  paymentPercentage,
  paymentText,
}) => {
  const percentageOf = item =>
    Number(
      (paymentPercentage === 'Outgoing'
        ? item?.OutgoingPercentage
        : paymentPercentage === 'Ingoing'
        ? item?.IncomingPercentage
        : item?.Percentage) ?? 0,
    );

  const amountOf = item =>
    paymentType === 'Outgoing'
      ? item?.OutgoingAmount
      : paymentType === 'Self' || paymentType === 'Business'
      ? item?.Amount
      : item?.IncomingAmount;

  const sorted = [...(methods ?? [])].sort(
    (a, b) => a.PaymentMethodId - b.PaymentMethodId,
  );

  return (
    <Card tone="primary" padding="xl" style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <AppText variant="label" color="onPrimaryMuted" numberOfLines={1}>
            {paymentText}
          </AppText>
          <AppText
            variant="display"
            color="onPrimary"
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.65}
            style={styles.total}
          >
            Rs {formatAmount(totalAmount)}
          </AppText>
          <AppText variant="caption" color="onPrimaryMuted">
            {t('summary.payments', { n: totalTransactions })}
          </AppText>
        </View>

        <Pressable
          onPress={() => setVisible(true)}
          style={({ pressed }) => [
            styles.periodButton,
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={`Period: ${selectedPeriod}. Change period`}
        >
          <AppText variant="label" color="onPrimary" numberOfLines={1}>
            {periodLabel(selectedPeriod)}
          </AppText>
          <Icon
            name="keyboard-arrow-down"
            size={sizes.icon.md}
            color={colors.onPrimary}
          />
        </Pressable>
      </View>

      {/* Split bar */}
      <View style={styles.bar}>
        {sorted.map(item => (
          <View
            key={item.PaymentMethodId}
            style={[
              styles.segment,
              {
                flex: percentageOf(item),
                backgroundColor: methodColor(item.PaymentMethodId),
              },
            ]}
          />
        ))}
      </View>

      {/* Per-method totals */}
      <View style={styles.methods}>
        {sorted.map(item => (
          <View style={styles.method} key={item.PaymentMethodId}>
            <View style={styles.methodLabel}>
              <View
                style={[
                  styles.dot,
                  { backgroundColor: methodColor(item.PaymentMethodId) },
                ]}
              />
              <AppText
                variant="caption"
                color="onPrimaryMuted"
                numberOfLines={1}
              >
                {item.PaymentMethodName}
              </AppText>
            </View>
            <AppText variant="bodyStrong" color="onPrimary" numberOfLines={1}>
              Rs {formatAmount(amountOf(item) ?? 0)}
            </AppText>
          </View>
        ))}
      </View>
    </Card>
  );
};

export default PaymentSummaryCard;

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
    minWidth: 0,
    paddingRight: spacing.sm,
  },
  total: {
    marginVertical: spacing.xxs,
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    minHeight: 34,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.onPrimarySurface,
  },
  pressed: { opacity: 0.75 },
  bar: {
    flexDirection: 'row',
    height: 6,
    gap: spacing.xs,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    borderRadius: radius.pill,
    overflow: 'hidden',
    backgroundColor: colors.onPrimarySurface,
  },
  segment: {
    height: '100%',
    borderRadius: radius.pill,
  },
  methods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  method: {
    flex: 1,
    minWidth: 0,
  },
  methodLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    marginBottom: spacing.xxs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
  },
});
