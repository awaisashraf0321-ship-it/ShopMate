import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';
import { AppText, Button, Card } from '../ui';
import { t } from '../i18n';

const { colors, spacing, radius, sizes } = theme;

const show = value =>
  value === null || value === undefined || value === '' ? '-' : String(value);

const Row = ({ label, value, icon }) => (
  <View style={styles.row}>
    <AppText variant="caption" color="textSecondary">
      {label}
    </AppText>
    <View style={styles.rowValue}>
      {icon ? (
        <Icon name={icon} size={sizes.icon.sm} color={colors.textMuted} />
      ) : null}
      <AppText variant="bodyStrong" numberOfLines={1} style={styles.flexShrink}>
        {show(value)}
      </AppText>
    </View>
  </View>
);

/**
 * Shared layout for a single payment / expense:
 * summary card (title, signed amount, status, date · method), detail rows,
 * description, and a Delete button.
 *
 * direction: 'out' (red "-") | 'in' (green "+")
 * rows: [{ label, value, icon? }]
 */
const TransactionDetail = ({
  icon,
  title,
  amount,
  direction = 'out',
  date,
  method,
  rows = [],
  description,
  onDelete,
}) => {
  const incoming = direction === 'in';
  return (
    <View style={styles.root}>
      <Card tone="primary" padding="xl" style={styles.hero}>
        <View style={styles.heroIcon}>
          <Icon name={icon} size={sizes.icon.lg} color={colors.onPrimary} />
        </View>
        <AppText
          variant="label"
          color="onPrimaryMuted"
          align="center"
          numberOfLines={2}
        >
          {title}
        </AppText>
        <AppText
          variant="display"
          color="onPrimary"
          align="center"
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.65}
          style={styles.amount}
        >
          {incoming ? '+' : '-'} Rs {amount}
        </AppText>
        <View style={styles.badge}>
          <Icon name="check" size={sizes.icon.sm} color={colors.success} />
          <AppText variant="label" color="success">
            {t('field.completed')}
          </AppText>
        </View>
        <AppText variant="caption" color="onPrimaryMuted" align="center">
          {show(date)} · {show(method)}
        </AppText>
      </Card>

      <Card padding="lg" style={styles.details}>
        {rows.map((row, index) => (
          <View key={row.label}>
            {index > 0 && <View style={styles.divider} />}
            <Row {...row} />
          </View>
        ))}
        <View style={styles.divider} />
        <AppText variant="caption" color="textSecondary">
          {t('field.description')}
        </AppText>
        <AppText
          variant="body"
          color={description?.trim() ? 'textPrimary' : 'textMuted'}
          numberOfLines={3}
          style={styles.description}
        >
          {description?.trim() || 'No description added'}
        </AppText>
      </Card>

      <Button
        title={t('delete.button')}
        icon="delete-outline"
        variant="dangerOutline"
        onPress={onDelete}
        style={styles.delete}
      />
    </View>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  flexShrink: { flexShrink: 1 },
  hero: {
    alignItems: 'center',
  },
  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.onPrimarySurface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  amount: {
    marginVertical: spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.successSoft,
    marginBottom: spacing.md,
  },
  details: {
    marginTop: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  rowValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flexShrink: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
    marginVertical: spacing.sm,
  },
  description: {
    marginTop: spacing.xxs,
  },
  delete: {
    marginTop: spacing.xl,
  },
});
