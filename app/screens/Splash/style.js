import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const { colors, spacing } = theme;
const LOGO_RING = 132;
const LOGO_CIRCLE = 108;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  // (StyleSheet.absoluteFillObject no longer exists in this RN version)
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  blobLarge: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.onPrimarySurface,
  },
  blobSmall: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.onPrimarySurface,
  },
  logoRing: {
    width: LOGO_RING,
    height: LOGO_RING,
    borderRadius: LOGO_RING / 2,
    borderWidth: 2,
    borderColor: colors.onPrimaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  logoCircle: {
    width: LOGO_CIRCLE,
    height: LOGO_CIRCLE,
    borderRadius: LOGO_CIRCLE / 2,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: 64, height: 64 },
});

export default styles;
