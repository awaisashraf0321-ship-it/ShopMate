// Spacing, corner radius and elevation scales.
// Use these instead of one-off numbers so gaps and shapes line up.
import { Platform } from 'react-native';

// 4-point grid.
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16, // default screen side padding
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16, // cards, buttons
  xl: 24, // hero cards
  pill: 999, // chips, round icon buttons
};

// Shadow presets. Each sets the iOS shadow and the Android elevation together.
const shadow = (elevation, opacity, blur, offsetY) =>
  Platform.select({
    ios: {
      shadowColor: '#17142B',
      shadowOpacity: opacity,
      shadowRadius: blur,
      shadowOffset: { width: 0, height: offsetY },
    },
    default: { elevation },
  });

export const shadows = {
  none: {},
  sm: shadow(2, 0.06, 4, 1),
  md: shadow(4, 0.08, 10, 3),
  lg: shadow(8, 0.12, 18, 6),
};

export const sizes = {
  buttonHeight: { sm: 40, md: 52, lg: 60 },
  icon: { sm: 16, md: 20, lg: 24, xl: 32 },
  touchTarget: 44, // minimum tappable size
};
