import { API_END_POINTS } from './apiEndPoints';
import { apiFetch } from './ApiClient';
export const IngoingPayments = async data => {
  const response = await apiFetch(API_END_POINTS.INCOMING_PAYMENTS, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response;
};

export const GetIngoingPayments = async (PaymentMode, Page, PageSize) => {
  const response = await apiFetch(
    `${API_END_POINTS.GET_INGOING_PAYMENTS}?PaymentMode=${PaymentMode}&Page=${Page}&Pagesize=${PageSize}`,
    {
      method: 'GET',
    },
  );
  return response;
};

export const deleteIngoingPayments = async id => {
  const response = await apiFetch(
    API_END_POINTS.DELETE_INGOING_PAYMENTS.replace('{id}', id),
    {
      method: 'POST',
    },
  );
  return response;
};
export const GetByIdIngoingPayments = async id => {
  const response = await apiFetch(
    API_END_POINTS.INGOING_PAYMENTS_GET_BY_ID.replace('{id}', id, {
      method: 'GET',
    }),
  );
  return response;
};

export const GetLookups = async () => {
  const response = await apiFetch(API_END_POINTS.CUSTOMER_LOOKUPS, {
    method: 'GET',
  });
  const data = await response.json();
  console.log('Lookups response', data);

  return data.obj;
};
