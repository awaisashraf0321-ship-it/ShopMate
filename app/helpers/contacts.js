import { PermissionsAndroid, Platform } from 'react-native';
import Contacts from 'react-native-contacts';
import { isValidPhone, normalizePhone } from './phoneAccount';
import { t } from '../i18n';

/**
 * Asks to read the phone's contacts (only once; later calls just check).
 * Resolves to 'granted' | 'denied' | 'blocked' (denied for good: only the
 * phone's Settings can change it).
 */
export const askContactsPermission = async () => {
  if (Platform.OS === 'android') {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: t('contacts.permissionTitle'),
        message: t('contacts.permissionText'),
        buttonPositive: t('contacts.allowButton'),
        buttonNegative: t('contacts.notNow'),
      },
    );
    if (result === PermissionsAndroid.RESULTS.GRANTED) return 'granted';
    if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) return 'blocked';
    return 'denied';
  }

  let status = await Contacts.checkPermission();
  if (status === 'undefined') {
    status = await Contacts.requestPermission();
  }
  if (status === 'authorized' || status === 'limited') return 'granted';
  // iOS only asks once; after a "Don't Allow" only Settings can change it.
  return 'blocked';
};

const contactName = c =>
  (
    c.displayName ||
    [c.givenName, c.middleName, c.familyName].filter(Boolean).join(' ') ||
    c.company ||
    ''
  ).trim();

/**
 * Turns raw phone contacts into one row per Pakistani mobile number,
 * sorted by name: [{ key, name, phone: '03001234567' }].
 * Landlines and foreign numbers are left out (customers need a 03 number),
 * and the same number saved twice shows once.
 */
export const toCustomerRows = contacts => {
  const seen = new Set();
  const rows = [];
  for (const c of contacts ?? []) {
    const name = contactName(c);
    for (const p of c.phoneNumbers ?? []) {
      const phone = normalizePhone(p.number);
      if (!isValidPhone(phone) || seen.has(phone)) continue;
      seen.add(phone);
      rows.push({ key: phone, name: name || phone, phone });
    }
  }
  return rows.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
  );
};

/** Name or number contains the search text (digits match "0300 12" too). */
export const matchesSearch = (row, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const digits = q.replace(/\D/g, '');
  return (
    row.name.toLowerCase().includes(q) ||
    (digits.length > 0 && row.phone.includes(digits))
  );
};

export const loadCustomerRows = async () =>
  toCustomerRows(await Contacts.getAllWithoutPhotos());
