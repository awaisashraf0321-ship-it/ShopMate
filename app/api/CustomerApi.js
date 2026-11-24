import { API_END_POINTS } from './apiEndPoints';
import { apiFetch } from './ApiClient';
export const customerPost = async data => {
  const response = await apiFetch(API_END_POINTS.CUSTOMER_POST, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response;
};

export const CustomerDelete = async id => {
  const response = await apiFetch(
    API_END_POINTS.CUSTOMER_DELETE.replace('{id}', id),
    {
      method: 'POST',
    },
  );
  const data = await response.json();
  console.log('delete Customer resposne', data);
  return data;
};
