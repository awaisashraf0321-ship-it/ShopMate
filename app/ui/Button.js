import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme';
import AppText from './AppText';

/**
 * The one button for the whole app.
 *
 *   <Button title="Save Payment" icon="check-circle-outline" onPress={save} loading={saving} />
 *   <Button title="Cancel" variant="secondary" onPress={close} />
 *
 * variant: primary (solid brand) | gradient (brand gradient) | secondary (outlined)
 *          | ghost (text only) | danger | dangerOutline (e.g. Logout)
 * size:    sm | md | lg
 */
export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
  accessibilityLabel,
}) {
  const { colors, radius, spacing, sizes, shadows } = useTheme();
  const isDisabled = disabled || loading;

  const palette = {
    primary: { bg: colors.primary, fg: colors.onPrimary, border: null },
    gradient: { bg: null, fg: colors.onPrimary, border: null },
    secondary: {
      bg: colors.surface,
      fg: colors.primary,
      border: colors.primary,
    },
    ghost: { bg: 'transparent', fg: colors.primary, border: null },
    danger: { bg: colors.danger, fg: colors.onPrimary, border: null },
    dangerOutline: {
      bg: colors.surface,
      fg: colors.danger,
      border: colors.danger,
    },
  }[variant];

  const height = sizes.buttonHeight[size] ?? sizes.buttonHeight.md;
  const textVariant = size === 'sm' ? 'label' : 'bodyStrong';

  const content = (
    <View style={[styles.row, { gap: spacing.sm }]}>
      {loading ? (
        <ActivityIndicator color={palette.fg} />
      ) : (
        <>
          {icon ? (
            <Icon name={icon} size={sizes.icon.md} color={palette.fg} />
          ) : null}
          <AppText variant={textVariant} color={palette.fg}>
            {title}
          </AppText>
        </>
      )}
    </View>
  );

  const shape = {
    height,
    borderRadius: radius.lg,
    alignSelf: fullWidth ? 'stretch' : 'flex-start',
  };
  // Padding lives on the coloured fill, so the background reaches the edges.
  const fillShape = {
    borderRadius: radius.lg,
    paddingHorizontal: size === 'sm' ? spacing.lg : spacing.xl,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        shape,
        variant !== 'ghost' && shadows.sm,
        { opacity: isDisabled ? 0.55 : pressed ? 0.85 : 1 },
        style,
      ]}
    >
      {variant === 'gradient' ? (
        <View style={[styles.fill, fillShape]}>
          {/* Gradient as a background layer, so it always covers the padding. */}
          <LinearGradient
            colors={colors.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, { borderRadius: radius.lg }]}
          />
          {content}
        </View>
      ) : (
        <View
          style={[
            styles.fill,
            fillShape,
            {
              backgroundColor: palette.bg,
              borderWidth: palette.border ? 1.5 : 0,
              borderColor: palette.border ?? undefined,
            },
          ]}
        >
          {content}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
});
