// Raw colour values. ONLY files inside app/theme should import this.
// Screens and components use the semantic names in `semantic.js`
// (via `useTheme()` or `theme.colors`), never these directly.
//
// Brand: deep emerald. Neutrals are slightly green-tinted so the
// greys sit comfortably next to the brand colour.

const palette = {
  // Brand emerald
  brand50: '#F0FDFA',
  brand100: '#CCFBF1', // soft tints, selected states
  brand200: '#99F6E4',
  brand300: '#5EEAD4',
  brand400: '#2DD4BF',
  brand500: '#14B8A6', // accent: icons, chart bars
  brand600: '#0D9488', // gradient end
  brand700: '#0F766E', // brand
  brand800: '#115E59', // pressed
  brandMuted: '#8DBDB7', // disabled

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F5F7F6', // app background
  gray100: '#EEF2F1',
  gray150: '#E8EDEB', // divider
  gray200: '#E2E8E6', // border
  gray400: '#C3CCC9',
  gray500: '#87928F', // muted text / inactive icons
  gray600: '#5B6663', // secondary text
  gray700: '#3E4946',
  gray900: '#0F172A', // primary text

  // Status
  green500: '#16A34A',
  green100: '#DCFCE7',
  red500: '#DC2626',
  red100: '#FEE2E2',
  amber400: '#FFD34F',
  amber500: '#FFB21F',
  amber100: '#FFF2D9',
  blue500: '#4385E8',
  blue100: '#E8F0FE',

  // Chart / category accents
  chartBlue: '#4A90E2',
  chartGreen: '#2ECC71',
  chartRed: '#E74C3C',
  categoryFood: '#FDB851',
  categoryShopping: '#A77BFF',
  categoryTravel: '#2ED573',
  categoryHome: '#FF9F43',
  categoryEntertainment: '#FF6B6B',
};

export default palette;
