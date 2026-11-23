import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const { colors, spacing } = theme;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  intro: { marginBottom: spacing.lg },
  submit: { marginTop: spacing.xl },
});

export default styles;
