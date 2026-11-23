import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const { colors, spacing } = theme;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  section: {
    marginTop: spacing.lg,
  },
  // Pinned "Save Expense" bar
  footer: {
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});

export default styles;
