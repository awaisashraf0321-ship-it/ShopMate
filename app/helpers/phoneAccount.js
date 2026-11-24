// Phone number + PIN accounts.
//
// The backend still expects the classic sign-up fields (username, email,
// password). Until it supports phone + PIN natively, the app maps them here:
//   username -> the phone number (03XXXXXXXXX)
//   email    -> a placeholder that can never receive mail
//   password -> built from the PIN, so it passes the server's password rules
// Keep this mapping in ONE place: sign-up and log-in must build the exact same
// password, and when the backend accepts a raw PIN only this file changes.

import { t } from '../i18n';
export const PIN_LENGTH = 4;
export const PHONE_LENGTH = 11;

const PLACEHOLDER_EMAIL_DOMAIN = 'no-email.shopmate.invalid';

export const digitsOnly = value => String(value ?? '').replace(/\D/g, '');

/** Turns "+92 300-1234567", "923001234567" or "3001234567" into "03001234567". */
export const normalizePhone = value => {
  let digits = digitsOnly(value);
  if (digits.startsWith('92')) {
    digits = `0${digits.slice(2)}`;
  } else if (digits.startsWith('3')) {
    digits = `0${digits}`;
  }
  return digits.slice(0, PHONE_LENGTH);
};

export const isValidPhone = phone => /^03\d{9}$/.test(phone);

/**
 * A short, plain-language problem with a partly typed number, or null.
 * Only complains about things the person can already see are wrong.
 */
export const phoneProblem = phone => {
  if (!phone) return null;
  if (phone[0] !== '0' || (phone.length > 1 && phone[1] !== '3')) {
    return t('phone.startsWith03');
  }
  return null;
};

/** "03001234567" -> "0300 1234567" (the way people write it). */
export const formatPhone = phone =>
  phone.length > 4 ? `${phone.slice(0, 4)} ${phone.slice(4)}` : phone;

export const pinPassword = (phone, pin) => `Sm#${pin}-${phone}`;

export const placeholderEmail = phone => `${phone}@${PLACEHOLDER_EMAIL_DOMAIN}`;

export const isPlaceholderEmail = email =>
  typeof email === 'string' &&
  email.toLowerCase().endsWith(`@${PLACEHOLDER_EMAIL_DOMAIN}`);

/** Body for POST /api/AdminUser/signup. moduleId: 1 = personal, 2 = business. */
export const signUpFields = ({ phone, pin, moduleId }) => {
  const password = pinPassword(phone, pin);
  return {
    userName: phone,
    email: placeholderEmail(phone),
    phoneNumber: phone,
    moduleId,
    password,
    confirmPassword: password,
  };
};

/** Body for POST /api/Account/Login. */
export const loginFields = ({ phone, pin }) => ({
  username: phone,
  password: pinPassword(phone, pin),
});

/** True when a sign-up error means the number is already registered. */
export const isAlreadyRegistered = message =>
  /already|taken|exist|duplicate/i.test(String(message ?? ''));

/** Body for POST /api/Account/ChangePassword when changing a PIN. */
export const changePinFields = ({ phone, currentPin, newPin }) => {
  const newPassword = pinPassword(phone, newPin);
  return {
    currentPassword: pinPassword(phone, currentPin),
    newPassword,
    confirmNewPassword: newPassword,
  };
};
