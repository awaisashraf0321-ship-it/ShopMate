import { apiFetch } from '../api/ApiClient';
import { API_END_POINTS } from '../api/apiEndPoints';

export const budget = async value => {
  const response = await apiFetch(API_END_POINTS.MONTHLY_BUDGET_POST, {
    method: 'POST',
    body: JSON.stringify(value),
  });
  return response;
};

export const budgetDelete = async id => {
  const response = await apiFetch(
    API_END_POINTS.MONTHLY_BUDGET_DELETE.replace('{id}', id),
    {
      method: 'POST',
    },
  );
  return response;
};

export const GetBudget = async () => {
  const response = await apiFetch(API_END_POINTS.MONTHLY_BUDGET_GET, {
    method: 'GET',
  });
  const data = await response.json();
  console.log('Monthly Budget Get response', data);
  return data.obj.data;
};

export const updateBudget = async (id, payload) => {
  const response = await apiFetch(
    API_END_POINTS.MONTHLY_BUDGET_UPDATE.replace('{id}', id),
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
  return response;
};
export const monthlybudgetDashboard = async (month, year) => {
  const response = await apiFetch(
    `${API_END_POINTS.MONTHLY_BUDGET_DASHBOARD}?month=${month}&year=${year}`,
    {
      method: 'GET',
    },
  );
  return response;
};
export const monthlyGetById = async id => {
  const response = await apiFetch(
    `${API_END_POINTS.MONTHLY_BUDGET_GET_BY_ID.replace('{id}', id)}`,
    {
      method: 'GET',
    },
  );
  return response;
};
