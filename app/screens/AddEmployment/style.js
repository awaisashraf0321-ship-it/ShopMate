import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

// Matches ui/TextField and ui/Button so this form looks like every other
// form in the app.
const { colors, spacing, radius, typography, sizes } = theme;
const FIELD_HEIGHT = 52;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg },
  dropdownWrapper: { marginBottom: spacing.sm },

  fieldContainer: { width: '100%', marginBottom: spacing.md },
  fieldLabel: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  requiredText: { color: colors.danger },
  optionalText: { ...typography.caption, color: colors.textSecondary },

  input: {
    width: '100%',
    minHeight: FIELD_HEIGHT,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    ...typography.body,
    lineHeight: undefined,
    color: colors.textPrimary,
  },
  inputError: { borderColor: colors.danger },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.xs,
  },

  phoneWrapper: {
    width: '100%',
    height: FIELD_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
  countryCode: {
    height: '100%',
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  countryCodeText: { ...typography.label, color: colors.textSecondary },
  phoneInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: spacing.md,
    ...typography.body,
    lineHeight: undefined,
    color: colors.textPrimary,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    minHeight: sizes.touchTarget,
    marginBottom: spacing.md,
  },
  checkbox: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: { ...typography.body, color: colors.textPrimary },

  addressCard: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addressHeader: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  addressIconBox: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  addressHeadingText: { flex: 1 },
  addressTitle: { ...typography.subtitle, color: colors.textPrimary },
  addressBody: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    padding: spacing.lg,
  },
  addressTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  // Same look as ui/Chip
  addressTypeButton: {
    height: 36,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  addressTypeSelected: {
    backgroundColor: colors.textPrimary,
    borderColor: colors.textPrimary,
  },
  addressTypeText: { ...typography.label, color: colors.textPrimary },
  addressTypeTextSelected: { color: colors.textInverse },
  addressField: { marginBottom: spacing.md },

  bottomBar: { paddingVertical: spacing.lg },
  // Same look as ui/Button (primary, md)
  saveButton: {
    width: '100%',
    height: sizes.buttonHeight.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
  },
  saveButtonDisabled: { opacity: 0.6 },
  saveButtonText: { ...typography.bodyStrong, color: colors.onPrimary },
});

export default styles;
