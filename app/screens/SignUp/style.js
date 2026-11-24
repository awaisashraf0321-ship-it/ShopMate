import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const { spacing, radius, shadows } = theme;

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  progress: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  progressSegment: {
    flex: 1,
    height: 6,
  },

  content: { flexGrow: 1 },
  heading: { alignItems: 'center' },
  stepIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  phoneChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    marginTop: spacing.xs,
  },
  body: {},

  purposeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
  },
  purposeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBox: {
    borderRadius: radius.lg,
  },
});

export default styles;
