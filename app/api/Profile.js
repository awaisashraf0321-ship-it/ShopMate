import { API_END_POINTS } from './apiEndPoints';
import { apiFetch } from './ApiClient';
export const profileImage = async (UserId, data) => {
  const response = await apiFetch(
    `${API_END_POINTS.GET_ADMIN_UPDATE.replace('{userId}', UserId)}`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
  return response;
};

export const profileData = async () => {
  const response = await apiFetch(API_END_POINTS.GET_ADMIN, {
    method: 'GET',
  });
  return response;
};

export const handleDataUpdate = async UserId => {
  const response = await apiFetch(
    API_END_POINTS.GET_ADMIN_ID.replace('{userId}', UserId),
    {
      method: 'GET',
    },
  );

  return response;
};
