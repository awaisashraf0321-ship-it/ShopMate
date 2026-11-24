import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import sizeHelper from '../helpers/sizeHelper';
import colors from '../theme/colors';

const ModalBudgetAmountInput = ({
  expenseAmount,
  Changed,
  onFocus,
  onBlur,
}) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Expense Amount</Text> */}

      <View style={styles.inputWrapper}>
        <Text style={styles.currency}>Rs.</Text>

        <TextInput
          style={styles.input}
          value={String(expenseAmount ?? '')}
          onChangeText={Changed}
          placeholder="Enter Amount"
          placeholderTextColor="#999999"
          keyboardType="decimal-pad"
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>
    </View>
  );
};

export default ModalBudgetAmountInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: sizeHelper.calHp(15),
  },

  title: {
    fontSize: sizeHelper.calHp(19),
    fontWeight: '700',
    color: '#171717',
    marginBottom: sizeHelper.calHp(9),
  },

  inputWrapper: {
    width: '100%',
    minHeight: sizeHelper.calHp(130),
    borderWidth: 1.5,
    borderColor: '#D1CDD0',
    borderRadius: sizeHelper.calHp(30),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(16),
  },

  currency: {
    fontSize: sizeHelper.calHp(35),
    fontWeight: '600',
    color: '#777780',
    marginRight: sizeHelper.calWp(15),
  },

  input: {
    flex: 1,
    fontSize: sizeHelper.calHp(30),
    fontWeight: '700',
    color: '#171717',
    paddingVertical: sizeHelper.calHp(8),
  },
});
