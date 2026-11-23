import React from 'react';
import ExpenseForm from '../SelfExpense/design';

/** Add Business Expense: the shared Add Expense form with business wording. */
const Design = props => (
  <ExpenseForm {...props} title="Add Expense" subTitle="Business expense" />
);

export default Design;
