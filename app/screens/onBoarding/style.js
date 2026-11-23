import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const { colors, spacing, radius, sizes } = theme;
const NAV_SIZE = sizes.touchTarget + 4;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sliderContainer: {
    flex: 1,
  },
  slideContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl * 2,
  },
  img: {
    height: '62%',
    width: '100%',
    borderRadius: radius.xl,
  },
  titleText: {
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  context: {
    textAlign: 'center',
  },
  dotStyle: {
    backgroundColor: colors.borderStrong,
    width: 8,
    height: 8,
    borderRadius: radius.pill,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 24,
    height: 8,
    borderRadius: radius.pill,
  },
  navButton: {
    width: NAV_SIZE,
    height: NAV_SIZE,
    borderRadius: NAV_SIZE / 2,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    paddingHorizontal: spacing.sm,
    lineHeight: NAV_SIZE,
  },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: NAV_SIZE,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    gap: spacing.xs,
  },
});

export default styles;
