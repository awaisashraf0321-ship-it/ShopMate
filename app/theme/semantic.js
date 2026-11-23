// Semantic colour tokens: name a colour by its JOB, not its hue.
// Add a `darkColors` object with the same keys to support dark mode;
// ThemeProvider picks between them.
import palette from './palette';

export const lightColors = {
  // Brand
  primary: palette.brand700,
  primaryPressed: palette.brand800,
  primaryDisabled: palette.brandMuted,
  primarySoft: palette.brand100, // tinted backgrounds, selected states
  onPrimary: palette.white, // text/icons on primary
  onPrimaryMuted: 'rgba(255, 255, 255, 0.72)', // secondary text on primary
  onPrimarySurface: 'rgba(255, 255, 255, 0.16)', // chips/tiles on primary
  accent: palette.brand500,
  highlight: palette.brand500, // camera badge, small emphasis
  // Brand surfaces (Login/Splash header, gradient buttons). Same deep emerald
  // as `primary` so logged-out and logged-in screens read as one app.
  gradient: [palette.brand700, palette.brand600],

  // Surfaces
  background: palette.gray50,
  surface: palette.white,
  surfaceMuted: palette.gray100,
  border: palette.gray200,
  borderStrong: palette.gray400, // inactive dots, stronger dividers
  divider: palette.gray150,
  overlay: 'rgba(15, 23, 42, 0.45)',
  transparent: 'transparent',
  shadow: palette.black,

  // Text
  textPrimary: palette.gray900,
  textSecondary: palette.gray600,
  textMuted: palette.gray500,
  textInverse: palette.white,

  // Icons
  iconActive: palette.brand700,
  iconInactive: palette.gray500,

  // Status
  success: palette.green500,
  successSoft: palette.green100,
  danger: palette.red500,
  dangerSoft: palette.red100,
  warning: palette.amber500,
  warningSoft: palette.amber100,
  info: palette.blue500,
  infoSoft: palette.blue100,

  // Money direction
  moneyIn: palette.green500,
  moneyOut: palette.red500,

  // Payment methods (keyed by API PaymentMethodId), drawn on primary cards
  paymentMethod: {
    1: palette.brand200, // Cash
    2: palette.white, // Bank transfer
    3: palette.brand300, // Credit card
  },

  // Charts
  chart: [
    palette.chartBlue,
    palette.chartGreen,
    palette.chartRed,
    palette.brand500,
    palette.amber500,
  ],
};

export default lightColors;
