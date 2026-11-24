import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import sizeHelper from '../helpers/sizeHelper';
import colors from '../theme/colors';
import colors1 from '../theme/myColors';

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
          Rs.
        </Text>

        <TextInput
          style={[styles.input, compact && styles.compactInput]}
          value={expenseAmount}
          onChangeText={Changed}
          placeholder={compact ? 'Amount' : 'Enter Your Expense Amount'}
          placeholderTextColor={compact ? '#000000c5' : '#999999'}
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
    color: colors.textColor,
    marginBottom: sizeHelper.calHp(12),
  },

  inputWrapper: {
    minHeight: sizeHelper.calHp(120),
    borderWidth: 1,
    width: '95%',
    borderColor: colors.borderColor,
    borderRadius: sizeHelper.calHp(35),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(25),
  },

  currency: {
    fontSize: sizeHelper.calHp(30),
    color: colors.textPrimary,
    marginRight: sizeHelper.calWp(10),
  },

  input: {
    flex: 1,
    fontSize: sizeHelper.calHp(30),
    color: colors.textPrimary,
    paddingVertical: sizeHelper.calHp(20),
  },

  // Compact styles
  compactContainer: {
    flex: 1,
    marginBottom: 0,
  },

  compactInputWrapper: {
    width: '100%',
    minHeight: sizeHelper.calHp(85),
    borderWidth: 1,
    borderColor: colors1.border,
    borderRadius: sizeHelper.calHp(14),
    backgroundColor: colors1.white,
    paddingHorizontal: sizeHelper.calWp(10),
  },

  compactCurrency: {
    fontSize: sizeHelper.calHp(27),
    color: colors1.text,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    marginRight: sizeHelper.calWp(5),
  },

  compactInput: {
    fontSize: sizeHelper.calHp(27),
    color: colors1.black,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Regular',
    paddingVertical: sizeHelper.calHp(8),
  },
});
