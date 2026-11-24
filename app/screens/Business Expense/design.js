import React from 'react';
import ExpenseForm from '../SelfExpense/design';
import { t } from '../../i18n';

/** Add Business Expense: the shared Add Expense form with business wording. */
const Design = props => (
  <ExpenseForm
    {...props}
    title={t('expense.add')}
    subTitle={t('expense.businessShort')}
  />
);

export default Design;
