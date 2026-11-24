import { apiFetch } from '../api/ApiClient';
import { API_END_POINTS } from '../api/apiEndPoints';

export const GetCategories = async moduleId => {
  const response = await apiFetch(
    API_END_POINTS.LOOKUP_EXPENSE_CATEGORIES.replace('{moduleId}', moduleId),
    {
      method: 'GET',
    },
  );
  const data = await response.json();
  console.log('Categories Api response', data);
  return data.obj;
};

export const ExpensesPost = async value => {
  const response = await apiFetch(API_END_POINTS.POST_EXPENSES, {
    method: 'POST',
    body: JSON.stringify(value),
  });
  const data = await response.json();
  console.log('Expense response', data);
  return data;
};

export const GetExpenses = async (
  ExpenseType,
  PaymentMethodId,
  Page,
  PageSize,
) => {
  const response = await apiFetch(
    `${
      API_END_POINTS.GET_EXPENSES_ALL
    }?ExpenseType=${ExpenseType}&PaymentMethodId=${
      PaymentMethodId ?? ''
    }&Page=${Page}&PageSize=${PageSize}`,
    {
      method: 'GET',
    },
  );

  return response;
};

export const Delete = async id => {
  const response = await apiFetch(
    API_END_POINTS.DELETE_EXPENSES.replace('{id}', id),
    {
      method: 'POST',
    },
  );
  const data = await response.json();
  console.log('delete Api Response', data);
  return data;
};

export const SelfGetById = async id => {
  const response = await apiFetch(
    API_END_POINTS.EXPENSES_GET_BY_ID.replace('{id}', id),
    {
      method: 'GET',
    },
  );
  return response;
};

export const expensesDashboard = async (ModuleId, Period) => {
  const response = await apiFetch(
    `${API_END_POINTS.EXPENSES_DASHBOARD}?ModuleId=${ModuleId}&Period=${Period}`,
    {
      method: 'GET',
    },
  );
  return response;
};
