// Design-system guard rails.
// Every colour and font in the app comes from app/theme, so these are
// errors: a raw '#hex' colour or fontFamily string fails lint.
const RAW_FONT_FAMILY = {
  selector: "Property[key.name='fontFamily'] > Literal",
  message:
    'Use theme typography (AppText variant or theme.fontFamily) instead of a raw fontFamily string.',
};

module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // Colours must come from theme tokens, not literals like '#4A24B8'.
    'react-native/no-color-literals': 'error',
    // Font families must come from theme typography (AppText / fontFamily).
    'no-restricted-syntax': ['error', RAW_FONT_FAMILY],
  },
  overrides: [
    {
      // The theme is where raw values are allowed to live.
      files: ['app/theme/**'],
      rules: {
        'react-native/no-color-literals': 'off',
        'no-restricted-syntax': 'off',
      },
    },
    {
      // The UI kit and style guide compose styles from tokens inline.
      files: ['app/ui/**', 'app/screens/StyleGuide/**'],
      rules: {
        'react-native/no-inline-styles': 'off',
      },
    },
  ],
};
