import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../theme';

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
  return (
    <Text
      style={[
        typography[variant] ?? typography.body,
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
