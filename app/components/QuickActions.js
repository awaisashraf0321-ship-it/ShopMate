import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useModule } from './ModuleContext';
import { theme } from '../theme';
import { GAVE, GOT } from '../helpers/moneyWords';
import { AppText } from '../ui';
import { t } from '../i18n';

const { colors, spacing, radius, sizes, shadows } = theme;

const getActions = () => ({
  self: {
    label: t('home.addSelf'),
    icon: 'account-balance-wallet',
    screen: 'SelfExpense',
  },
  business: {
    label: t('home.business'),
    icon: 'business-center',
    screen: 'BusinessExpense',
  },
  loan: {
    label: GAVE.label,
    icon: GAVE.icon,
    screen: 'Loan',
    color: GAVE.color,
  },
  incoming: {
    label: GOT.label,
    icon: GOT.icon,
    screen: 'InComing',
    color: GOT.color,
  },
  monthly: {
    label: t('home.monthly'),
    icon: 'calendar-month',
    screen: 'Monthly',
  },
  customer: { label: t('customer.new'), icon: 'person', screen: 'AddCustomer' },
  customers: {
    label: t('home.customers'),
    icon: 'groups',
    screen: 'Customers',
  },
});

// Which four shortcuts each module shows, in order.
const BY_MODULE = {
  'Self Expense': ['self', 'loan', 'incoming', 'monthly'],
  'Business Expense': ['business', 'loan', 'incoming', 'customers'],
};

/** Four shortcut tiles under the balance card; set depends on the module. */
const QuickActions = ({ navigation }) => {
  const { selectedModule } = useModule();
  const keys = BY_MODULE[selectedModule] ?? BY_MODULE['Business Expense'];

  return (
    <View style={styles.container}>
      <AppText variant="title" style={styles.title}>
        {t('home.quickActions')}
      </AppText>
      <Pressable
        onPress={() =>
          navigation.navigate(
            selectedModule === 'Self Expense'
              ? 'SelfExpense'
              : 'BusinessExpense',
            { startVoice: true },
          )
        }
        style={({ pressed }) => [styles.voice, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={t('home.voice')}
      >
        <View style={styles.voiceIcon}>
          <Icon name="mic" size={sizes.icon.lg} color={colors.onPrimary} />
        </View>
        <View style={styles.voiceText}>
          <AppText variant="bodyStrong" color="onPrimary">
            {t('home.voice')}
          </AppText>
          <AppText variant="caption" color="onPrimaryMuted" numberOfLines={1}>
            {t('home.voiceExample')}
          </AppText>
        </View>
        <Icon
          name="chevron-right"
          size={sizes.icon.lg}
          color={colors.onPrimary}
        />
      </Pressable>
      <View style={styles.row}>
        {keys.map(key => {
          const action = getActions()[key];
          return (
            <Pressable
              key={key}
              onPress={() => navigation.navigate(action.screen)}
              style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel={action.label}
            >
              <View style={styles.icon}>
                <Icon
                  name={action.icon}
                  size={sizes.icon.lg}
                  color={colors[action.color] ?? colors.primary}
                />
              </View>
              <AppText
                variant="caption"
                align="center"
                numberOfLines={2}
                style={styles.label}
              >
                {action.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default QuickActions;

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xl,
    marginHorizontal: spacing.lg,
  },
  title: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  tile: {
    flex: 1,
    minHeight: 112,
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadows.sm,
  },
  pressed: { opacity: 0.8 },
  voice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  voiceIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.onPrimarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceText: { flex: 1, gap: 2 },
  icon: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontFamily: theme.fontFamily.semiBold,
  },
});
