import { API_END_POINTS } from './apiEndPoints';
import { apiFetch } from './ApiClient';

const API_BASE_URL = 'https://api.app.shopmate.squarecod.com';

export const login = async data => {
  const response = await apiFetch(API_END_POINTS.LOGIN, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return response;
};

export const Logout = async () => {
  const response = await apiFetch(API_END_POINTS.LOGOUT, {
    method: 'POST',
  });

  return response;
};

export const ChangePassword = async value => {
  const response = await apiFetch(API_END_POINTS.NEWPASSWORD, {
    method: 'POST',
    body: JSON.stringify(value),
  });

  return response;
};
export const refreshToken = async data => {
  const response = await fetch(
    `${API_BASE_URL}${API_END_POINTS.REFRESH_TOKEN}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  return response;
};
export const postSignUp = async data => {
  const response = await apiFetch(API_END_POINTS.SIGNUP, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response;
};
