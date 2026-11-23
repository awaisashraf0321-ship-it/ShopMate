import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import sizeHelper from '../helpers/sizeHelper';
import { theme } from '../theme';

const BudgetAmountInput = ({
  expenseAmount,
  onFocus,
  compact = false,
  Changed,
}) => {
  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      {!compact && <Text style={styles.title}>Enter Amount</Text>}

      <View
        style={[styles.inputWrapper, compact && styles.compactInputWrapper]}
      >
        <Text style={[styles.currency, compact && styles.compactCurrency]}>
          Rs
        </Text>

        <TextInput
          style={[styles.input, compact && styles.compactInput]}
          value={expenseAmount}
          onChangeText={Changed}
          placeholder={compact ? 'Amount' : 'Enter Your Expense Amount'}
          placeholderTextColor={theme.colors.textMuted}
          keyboardType="numeric"
          onFocus={onFocus}
        />
      </View>
    </View>
  );
};

export default BudgetAmountInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: sizeHelper.calHp(25),
  },

  title: {
    fontSize: sizeHelper.calHp(28),
    fontWeight: '600',
    marginTop: sizeHelper.calHp(20),
    color: theme.colors.textSecondary,
    marginBottom: sizeHelper.calHp(12),
  },

  inputWrapper: {
    minHeight: sizeHelper.calHp(120),
    borderWidth: 1,
    width: '95%',
    borderColor: theme.colors.border,
    borderRadius: sizeHelper.calHp(35),
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(25),
  },

  currency: {
    fontSize: sizeHelper.calHp(30),
    color: theme.colors.textPrimary,
    marginRight: sizeHelper.calWp(10),
  },

  input: {
    flex: 1,
    fontSize: sizeHelper.calHp(30),
    color: theme.colors.textPrimary,
    paddingVertical: sizeHelper.calHp(20),
  },

  // Compact styles
  compactContainer: {
    flex: 1,
    marginBottom: 0,
  },

  compactInputWrapper: {
    width: '100%',
    minHeight: 52,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
  },

  compactCurrency: {
    ...theme.typography.bodyStrong,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.xs,
  },

  compactInput: {
    flex: 1,
    ...theme.typography.body,
    lineHeight: undefined,
    color: theme.colors.textPrimary,
    paddingVertical: theme.spacing.sm,
  },
});
