import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const { colors, spacing, radius, shadows } = theme;
const LOGO_RING = 112;
const LOGO_CIRCLE = 92;

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
  center: { textAlign: 'center' },

  // Brand header
  header: {
    overflow: 'hidden',
    paddingBottom: spacing.xxxl + spacing.xl,
    paddingTop: spacing.lg,
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  blobLarge: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.onPrimarySurface,
  },
  blobSmall: {
    position: 'absolute',
    bottom: 20,
    left: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
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
    marginBottom: spacing.lg,
  },
  logoCircle: {
    width: LOGO_CIRCLE,
    height: LOGO_CIRCLE,
    borderRadius: LOGO_CIRCLE / 2,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: 56, height: 56 },

  // Form sheet, pulled up over the header
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  sheet: {
    marginTop: -spacing.xxxl,
    marginHorizontal: spacing.lg,
    borderRadius: radius.xl,
    padding: spacing.xl,
    ...shadows.md,
  },

  phoneChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  forgot: { alignSelf: 'center' },
  statusLine: {
    minHeight: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },

  remember: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});

export default styles;
