import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';
import { AppText, Card } from '../ui';
import { t } from '../i18n';

const { colors, spacing, radius, sizes } = theme;

const Stat = ({ icon, label, value, tone, highlight }) => (
  <View
    style={[
      styles.stat,
      highlight && { backgroundColor: colors[`${tone}Soft`] },
    ]}
  >
    <View style={[styles.statIcon, { backgroundColor: colors[`${tone}Soft`] }]}>
      <Icon name={icon} size={sizes.icon.md} color={colors[tone]} />
    </View>
    <View style={styles.statText}>
      <AppText variant="caption" color="textSecondary" numberOfLines={1}>
        {label}
      </AppText>
      <AppText
        variant="bodyStrong"
        color={highlight ? tone : 'textPrimary'}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
      >
        {value}
      </AppText>
    </View>
  </View>
);

/**
 * Monthly Budget summary: budget, spent, remaining, over-budget and a
 * "budget used" progress bar. Turns red when spending passes the budget.
 */
const BudgetOverviewCard = ({ summary, formatAmount }) => {
  const rs = value => `Rs ${formatAmount(Math.floor(value ?? 0))}`;
  const percentage = Number(summary?.BudgetUsedPercentage ?? 0);
  const progress = Math.min(Math.max(percentage, 0), 100);
  const over = percentage > 100;
  const barTone = over ? 'danger' : 'success';

  return (
    <Card padding="lg" style={styles.card}>
      <AppText variant="title">{t('budget.overview')}</AppText>

      <View style={styles.grid}>
        <Stat
          icon="account-balance-wallet"
          label={t('budget.title')}
          value={rs(summary?.MonthlySalary)}
          tone="info"
        />
        <Stat
          icon="shopping-cart"
          label={t('budget.totalExpenses')}
          value={rs(summary?.TotalAllocatedBudget)}
          tone="warning"
        />
        <Stat
          icon="check-circle"
          label={t('budget.remaining')}
          value={rs(summary?.RemainingBudget)}
          tone="success"
        />
        <Stat
          icon="warning"
          label={t('budget.over')}
          value={rs(summary?.OverBudget)}
          tone="danger"
          highlight={over}
        />
      </View>

      <View style={styles.usedHeader}>
        <AppText variant="label">{t('budget.used')}</AppText>
        <AppText variant="label" color={barTone}>
          {Number.isFinite(percentage) ? percentage : 0}%
        </AppText>
      </View>
      <View
        style={styles.track}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: progress }}
      >
        <View
          style={[
            styles.fill,
            { width: `${progress}%`, backgroundColor: colors[barTone] },
          ]}
        />
      </View>
    </Card>
  );
};

export default BudgetOverviewCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.sm,
    marginTop: spacing.md,
  },
  stat: {
    width: '48.5%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  statText: {
    flex: 1,
    minWidth: 0,
  },
  usedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  track: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
  },
});
