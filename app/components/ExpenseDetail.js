import React from 'react';
import TransactionDetail from './TransactionDetail';
import { t } from '../i18n';

/** Detail view for a Self / Business expense. */
const ExpenseDetail = ({
  Date,
  formatAmount,
  paymentMethod,
  amount,
  formatDate,
  description,
  onPress,
  Expensetype,
  expenseCategory,
  selectedIcon,
}) => {
  const category =
    typeof selectedIcon === 'function' ? selectedIcon(expenseCategory) : null;

  return (
    <TransactionDetail
      icon="account-balance-wallet"
      title={Expensetype || expenseCategory || 'Expense'}
      amount={formatAmount ? formatAmount(amount) : String(amount ?? '0')}
      direction="out"
      date={formatDate ? formatDate(Date) : Date}
      method={paymentMethod}
      rows={[
        { label: t('expense.type'), value: Expensetype, icon: 'category' },
        {
          label: t('expense.category'),
          value: expenseCategory,
          icon: category?.icon || 'label',
        },
      ]}
      description={description}
      onDelete={onPress}
    />
  );
};

export default ExpenseDetail;
