import { t } from '../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../api/AuthApi';
import { loginFields } from './phoneAccount';

const REMEMBERED_PHONE = 'rememberedPhone';
const LOGIN_METHOD = 'loginMethod'; // 'pin' | 'password'

/** How the person last logged in, so Profile offers Change PIN or password. */
export const getLoginMethod = async () => {
  try {
    return (await AsyncStorage.getItem(LOGIN_METHOD)) || 'password';
  } catch {
    return 'password';
  }
};

export const setLoginMethod = method =>
  AsyncStorage.setItem(LOGIN_METHOD, method).catch(() => {});

export const getRememberedPhone = async () => {
  try {
    return (await AsyncStorage.getItem(REMEMBERED_PHONE)) || '';
  } catch {
    return '';
  }
};

export const forgetRememberedPhone = () =>
  AsyncStorage.removeItem(REMEMBERED_PHONE).catch(() => {});

/** Plain-language message for a failed request. */
export const friendlyError = (error, fallback = t('common.somethingWrong')) =>
  error?.message === 'NO_INTERNET' ? t('common.noInternet') : fallback;

/** Reads a server message from the API's different response shapes. */
export const serverMessage = data =>
  data?.Message || data?.message || data?.title || '';

/**
 * Logs in with a username + password and stores the tokens.
 * Resolves to { ok: true } or { ok: false, message }.
 */
export const logIn = async fields => {
  const response = await login(fields);
  const data = await response.json().catch(() => ({}));
  if (response.ok && data.Status === 200 && data.obj?.Accesstoken) {
    await AsyncStorage.setItem('accessToken', data.obj.Accesstoken);
    await AsyncStorage.setItem('refreshToken', data.obj.Refreshtoken);
    return { ok: true };
  }
  return { ok: false, message: serverMessage(data) };
};

/** Logs in with phone + PIN and remembers the number for next time. */
export const logInWithPhone = async ({ phone, pin }) => {
  const result = await logIn(loginFields({ phone, pin }));
  if (result.ok) {
    await AsyncStorage.setItem(REMEMBERED_PHONE, phone);
    await setLoginMethod('pin');
  }
  return result;
};

/** Leaves the login/sign-up screens for the app, with no way "back". */
export const goToApp = navigation => {
  const root = navigation.getParent?.() ?? navigation;
  root.reset({ index: 0, routes: [{ name: 'Main' }] });
};
