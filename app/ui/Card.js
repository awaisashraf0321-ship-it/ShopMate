import React from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../theme';

/**
 * Standard surface for grouped content.
 *
 *   <Card>…</Card>
 *   <Card tone="primary" padding="xl">…</Card>   // purple summary card
 *   <Card onPress={open}>…</Card>                 // tappable
 *
 * tone: surface (white) | primary (brand) | muted
 */
export default function Card({
  tone = 'surface',
  padding = 'lg',
  elevation = 'sm',
  onPress,
  style,
  children,
}) {
  const { colors, spacing, radius, shadows } = useTheme();
  const backgroundColor = {
    surface: colors.surface,
    primary: colors.primary,
    muted: colors.surfaceMuted,
  }[tone];

  const cardStyle = [
    {
      backgroundColor,
      borderRadius: radius.xl,
      padding: spacing[padding] ?? spacing.lg,
    },
    shadows[elevation],
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        style={({ pressed }) => [cardStyle, pressed && { opacity: 0.9 }]}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={cardStyle}>{children}</View>;
}
