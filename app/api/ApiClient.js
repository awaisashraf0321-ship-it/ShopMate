import { refreshToken } from './AuthApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://api.app.shopmate.squarecod.com';

export const apiFetch = async (endpoint, options = {}) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const storedrefreshToken = await AsyncStorage.getItem('refreshToken');

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
        ...options.headers,
      },
    });

    let data = null;
    try {
      data = await response.clone().json();
    } catch (e) {}

    if (data && data['Token-Expired'] === 'true') {
      try {
        const refreshresponse = await refreshToken({
          accesstoken: token,
          refreshtoken: storedrefreshToken,
        });

        if (refreshresponse && refreshresponse.ok) {
          const refreshData = await refreshresponse.clone().json();
          const newAccessToken =
            refreshData?.obj?.Accesstoken || refreshData?.Accesstoken;
          const newRefreshToken =
            refreshData?.obj?.Refreshtoken || refreshData?.Refreshtoken;

          if (newAccessToken) {
            await AsyncStorage.setItem('accessToken', newAccessToken);
          }
          if (newRefreshToken) {
            await AsyncStorage.setItem('refreshToken', newRefreshToken);
          }

          if (newAccessToken) {
            return fetch(`${API_BASE_URL}${endpoint}`, {
              ...options,
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${newAccessToken}`,
                ...options.headers,
              },
            });
          }
        }
      } catch (error) {
        console.error('Error during token refresh:', error);
      }

      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
    }

    return response;
  } catch (error) {
    if (
      error.message?.includes('Network Request Failed') ||
      error.message?.includes('Failed to fetch')
    ) {
      throw new Error('NO_INTERNET');
    }
    throw error;
  }
};
