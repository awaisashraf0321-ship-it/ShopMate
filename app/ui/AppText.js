import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../theme';
import { isUrduScript } from '../i18n';

/**
 * Text that always uses the app's type scale and colour tokens.
 *
 *   <AppText variant="h1">Monthly Budget</AppText>
 *   <AppText variant="caption" color="textSecondary">Today</AppText>
 *
 * variant: display | h1 | h2 | title | subtitle | body | bodyStrong | label | caption | overline
 * color:   any key of theme.colors (default textPrimary)
 */
export default function AppText({
  variant = 'body',
  color = 'textPrimary',
  align,
  style,
  children,
  ...rest
}) {
  const { typography, colors } = useTheme();
  const base = typography[variant] ?? typography.body;
  // Urdu script reads right-to-left and needs taller lines than Latin text.
  const urdu = isUrduScript()
    ? {
        writingDirection: 'rtl',
        lineHeight: base.lineHeight
          ? Math.round(base.lineHeight * 1.4)
          : undefined,
      }
    : null;
  return (
    <Text
      style={[
        base,
        urdu,
        { color: colors[color] ?? color },
        align && { textAlign: align },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
