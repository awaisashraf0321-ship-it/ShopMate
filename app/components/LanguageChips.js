import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme';
import { AppText } from '../ui';
import { LANGUAGES, useLanguage } from '../i18n';

/**
 * English | اردو | Roman Urdu, each written in its own script so people can
 * find their language without reading English. `onDark` for the green header.
 */
export default function LanguageChips({ onDark = false, style }) {
  const { colors, spacing, radius } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <View
      style={[styles.row, { gap: spacing.sm }, style]}
      accessibilityRole="radiogroup"
    >
      {LANGUAGES.map(option => {
        const selected = option.code === language;
        const bg = selected
          ? onDark
            ? colors.surface
            : colors.primary
          : onDark
          ? colors.onPrimarySurface
          : colors.surfaceMuted;
        const fg = selected
          ? onDark
            ? 'primary'
            : 'onPrimary'
          : onDark
          ? 'onPrimary'
          : 'textPrimary';
        return (
          <Pressable
            key={option.code}
            onPress={() => setLanguage(option.code)}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            accessibilityLabel={option.label}
            hitSlop={6}
            style={[
              styles.chip,
              {
                backgroundColor: bg,
                borderRadius: radius.pill,
                paddingHorizontal: spacing.md,
              },
            ]}
          >
            <AppText variant="bodyStrong" color={fg}>
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  chip: { minHeight: 40, alignItems: 'center', justifyContent: 'center' },
});
