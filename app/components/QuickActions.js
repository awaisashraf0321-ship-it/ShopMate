import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useModule } from './ModuleContext';
import { theme } from '../theme';
import { AppText } from '../ui';

const { colors, spacing, radius, sizes, shadows } = theme;

const ACTIONS = {
  self: {
    label: 'Add Self Expenses',
    icon: 'account-balance-wallet',
    screen: 'SelfExpense',
  },
  business: {
    label: 'Business Expense',
    icon: 'business-center',
    screen: 'BusinessExpense',
  },
  loan: { label: 'Outgoing Payments', icon: 'payments', screen: 'Loan' },
  incoming: {
    label: 'Incoming Payments',
    icon: 'call-received',
    screen: 'InComing',
  },
  monthly: {
    label: 'Monthly Budget',
    icon: 'calendar-month',
    screen: 'Monthly',
  },
  customer: { label: 'Add Customer', icon: 'person', screen: 'AddCustomer' },
};

// Which four shortcuts each module shows, in order.
const BY_MODULE = {
  'Self Expense': ['self', 'loan', 'incoming', 'monthly'],
  'Business Expense': ['business', 'loan', 'incoming', 'customer'],
};

/** Four shortcut tiles under the balance card; set depends on the module. */
const QuickActions = ({ navigation }) => {
  const { selectedModule } = useModule();
  const keys = BY_MODULE[selectedModule] ?? BY_MODULE['Business Expense'];

  return (
    <View style={styles.container}>
      <AppText variant="title" style={styles.title}>
        Quick Actions
      </AppText>
      <View style={styles.row}>
        {keys.map(key => {
          const action = ACTIONS[key];
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
                  color={colors.primary}
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
