// Single entry point for the design system.
//
//   import { useTheme } from '../theme';            // inside components
//   const { colors, spacing, typography } = useTheme();
//
//   import { theme } from '../theme';               // in StyleSheet files
//   backgroundColor: theme.colors.surface
//
// Prefer useTheme() in new code: it is what will switch to dark mode later.
import React, { createContext, useContext, useMemo } from 'react';

import { lightColors } from './semantic';
import { typography, fontFamily } from './typography';
import { StyleSheet } from 'react-native';
import { spacing, radius, shadows, sizes } from './layout';

const buildTheme = (colors, mode) => ({
  mode,
  colors,
  typography,
  fontFamily,
  spacing,
  radius,
  shadows,
  sizes,
});

/** Static light theme, for StyleSheet.create() at module level. */
export const theme = buildTheme(lightColors, 'light');

const ThemeContext = createContext(theme);

/**
 * Provides the theme to the app. Light only for now; to add dark mode,
 * create `darkColors` in semantic.js and choose it here from
 * useColorScheme() or a user setting.
 */
export function ThemeProvider({ children }) {
  const value = useMemo(() => theme, []);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

export { lightColors, typography, fontFamily, spacing, radius, shadows, sizes };
export { categoryStyle } from './categories';

/** Full-height wrapper for screen roots. */
export const screenFill = StyleSheet.create({ root: { flex: 1 } }).root;
