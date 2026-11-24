// Language support: English, Urdu (اردو) and Roman Urdu.
//
//   import { t } from '../i18n';
//   t('gave.label')                       -> "You gave" / "آپ نے دیے" / "Aap ne diye"
//   t('khata.willGet', { amount: '500' }) -> fills {amount}
//
// The chosen language is saved on the phone. Changing it re-mounts the app
// (LanguageProvider re-keys its children), so every screen, and constants
// built with getters like GAVE.label, read the new language.
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STRINGS } from './strings';

const STORAGE_KEY = 'appLanguage';
const COLUMN = { en: 0, ur: 1, roman: 2 };

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ur', label: 'اردو' },
  { code: 'roman', label: 'Roman Urdu' },
];

let current = 'en';

export const getLanguage = () => current;

/** True while Urdu script is on: text then reads right-to-left. */
export const isUrduScript = () => current === 'ur';

/** Translated string for `key`, with {placeholders} filled from `vars`. */
export const t = (key, vars) => {
  const row = STRINGS[key];
  let text = row ? row[COLUMN[current]] || row[0] : key;
  if (vars) {
    text = text.replace(/\{(\w+)\}/g, (match, name) =>
      vars[name] != null ? String(vars[name]) : match,
    );
  }
  return text;
};

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(saved => {
        current = COLUMN[saved] != null ? saved : 'en';
      })
      .catch(() => {})
      .finally(() => setLanguageState(current));
  }, []);

  const setLanguage = code => {
    if (COLUMN[code] == null || code === current) return;
    current = code;
    AsyncStorage.setItem(STORAGE_KEY, code).catch(() => {});
    setLanguageState(code);
  };

  // Wait for the saved choice so screens never flash in the wrong language.
  if (!language) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <React.Fragment key={language}>{children}</React.Fragment>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

// Period names are also used as values (and mapped to API ids), so they
// stay English in state and are translated only where they are shown.
const PERIOD_KEYS = {
  Today: 'period.today',
  'This Week': 'period.thisWeek',
  'This Month': 'period.thisMonth',
  All: 'period.all',
  Week: 'period.week',
  Month: 'period.month',
  Yesterday: 'period.yesterday',
};

/** "This Week" -> "اس ہفتے" for display; unknown values pass through. */
export const periodLabel = value =>
  PERIOD_KEYS[value] ? t(PERIOD_KEYS[value]) : value;
