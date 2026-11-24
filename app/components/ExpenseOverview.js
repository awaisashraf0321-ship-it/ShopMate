import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';
import { AppText, Card, SegmentedControl } from '../ui';
import { t } from '../i18n';

const { colors, spacing, radius } = theme;
const CHART_HEIGHT = 120;

/** Dashboard t('overview.total') card with a period switch and bar chart. */
const ExpenseOverview = ({
  selectedTab,
  setSelectedTab,
  filterData,
  totalSpending,
  formatAmount,
  setPeriod,
  Period,
  Graph,
}) => {
  const buckets = Graph?.Buckets || [];
  // Label at most ~6 bars so text stays readable (e.g. 24 hourly buckets).
  const labelEvery = Math.max(1, Math.ceil(buckets.length / 6));
  const max = Math.max(...buckets.map(b => Number(b.Amount) || 0), 1);
  const hasSpending = buckets.some(b => Number(b.Amount) > 0);
  const noSpendingKey = {
    Today: 'overview.noToday',
    'This Week': 'overview.noWeek',
    'This Month': 'overview.noMonth',
  };
  const total = formatAmount
    ? formatAmount(totalSpending ?? 0)
    : totalSpending ?? 0;

  return (
    <Card padding="lg" style={styles.card}>
      <AppText variant="title">{t('overview.total')}</AppText>
      <AppText variant="h1" style={styles.total}>
        Rs {total}
      </AppText>

      <SegmentedControl
        options={filterData.map(o => ({ value: o.id, label: o.label }))}
        value={selectedTab}
        onChange={(id, option) => {
          setSelectedTab(id);
          setPeriod(option.label);
        }}
      />

      {!hasSpending ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Icon
              name="insights"
              size={theme.sizes.icon.lg}
              color={colors.primary}
            />
          </View>
          <AppText variant="bodyStrong" align="center">
            {t(noSpendingKey[Period] ?? 'overview.noPeriod')}
          </AppText>
          <AppText variant="caption" color="textSecondary" align="center">
            {t('overview.empty')}
          </AppText>
        </View>
      ) : buckets.length > 0 ? (
        <View
          style={styles.chart}
          accessibilityLabel={`Spending chart, ${buckets.length} periods`}
        >
          {buckets.map((bucket, index) => {
            const value = Number(bucket.Amount) || 0;
            return (
              <View key={bucket.BucketNo} style={styles.column}>
                <View style={styles.barArea}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: Math.max((value / max) * CHART_HEIGHT, 3),
                        backgroundColor: bucket.IsCurrent
                          ? colors.primary
                          : colors.accent,
                      },
                    ]}
                  />
                </View>
                <AppText
                  variant="caption"
                  color="textSecondary"
                  numberOfLines={1}
                  style={[
                    styles.bucketLabel,
                    labelEvery > 1 && styles.bucketLabelWide,
                  ]}
                >
                  {index % labelEvery === 0 ? bucket.BucketLabel : ' '}
                </AppText>
              </View>
            );
          })}
        </View>
      ) : null}
    </Card>
  );
};

export default ExpenseOverview;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  total: {
    marginTop: spacing.xxs,
    marginBottom: spacing.md,
  },
  empty: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  chart: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  barArea: {
    height: CHART_HEIGHT,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '70%',
    maxWidth: 24,
    borderTopLeftRadius: radius.sm,
    borderTopRightRadius: radius.sm,
  },
  bucketLabel: {
    marginTop: spacing.xs,
    fontSize: 11,
    lineHeight: 14,
  },
  // When only every Nth bar is labelled, let the label overflow its column.
  bucketLabelWide: {
    width: 48,
    textAlign: 'center',
  },
});
