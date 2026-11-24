import { API_END_POINTS } from './apiEndPoints';
import { apiFetch } from './ApiClient';

export const OutgoingPayment = async data => {
  const response = await apiFetch(API_END_POINTS.OUTGOING_PAYMENT, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response;
};

export const GetOutgoingPayments = async (PaymentMode, Page, PageSize) => {
  const response = await apiFetch(
    `${API_END_POINTS.GET_OUTGOING_PAYMENTS}?PaymentMode=${PaymentMode}&Page=${Page}&PageSize=${PageSize}`,
    {
      method: 'GET',
    },
  );
  return response;
};

export const deleteOutgoingPayments = async id => {
  const response = await apiFetch(
    API_END_POINTS.DELETE_OUTGOING_PAYMENTS.replace('{id}', id),
    {
      method: 'POST',
    },
  );
  return response;
};
export const GetByIdOutgoingPayments = async id => {
  const response = await apiFetch(
    API_END_POINTS.OUTGOING_PAYMENTS_GET_BY_ID.replace('{id}', id, {
      method: 'GET',
    }),
  );
  return response;
};

export const getOutInDashboard = async (ModuleId, Period) => {
  const response = await apiFetch(
    `${API_END_POINTS.OUTGOING_INGOING_}?ModuleId=${ModuleId}&Period=${Period}`,
    {
      method: 'GET',
    },
  );
  return response;
};
