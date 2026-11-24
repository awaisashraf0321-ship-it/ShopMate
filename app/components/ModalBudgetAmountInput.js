import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import sizeHelper from '../helpers/sizeHelper';
import { theme } from '../theme';
import { t } from '../i18n';

const ModalBudgetAmountInput = ({
  expenseAmount,
  Changed,
  onFocus,
  onBlur,
}) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{t('expense.editAmount')}</Text> */}

      <View style={styles.inputWrapper}>
        <Text style={styles.currency}>Rs</Text>

        <TextInput
          style={styles.input}
          value={String(expenseAmount ?? '')}
          onChangeText={Changed}
          placeholder={t('field.enterAmount')}
          placeholderTextColor={theme.colors.textMuted}
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
    color: theme.colors.textPrimary,
    marginBottom: sizeHelper.calHp(9),
  },

  inputWrapper: {
    width: '100%',
    minHeight: sizeHelper.calHp(130),
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: sizeHelper.calHp(30),
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(16),
  },

  currency: {
    fontSize: sizeHelper.calHp(35),
    fontWeight: '600',
    color: theme.colors.textMuted,
    marginRight: sizeHelper.calWp(15),
  },

  input: {
    flex: 1,
    fontSize: sizeHelper.calHp(30),
    fontWeight: '700',
    color: theme.colors.textPrimary,
    paddingVertical: sizeHelper.calHp(8),
  },
});
