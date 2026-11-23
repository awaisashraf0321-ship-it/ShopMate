import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../theme';
import AppText from './AppText';

/** A single selectable pill. */
export function Chip({ label, selected = false, onPress }) {
  const { colors, radius, spacing } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.chip,
        {
          borderRadius: radius.pill,
          paddingHorizontal: spacing.lg,
          backgroundColor: selected ? colors.textPrimary : colors.surface,
          borderColor: selected ? colors.textPrimary : colors.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <AppText variant="label" color={selected ? 'textInverse' : 'textPrimary'}>
        {label}
      </AppText>
    </Pressable>
  );
}

/**
 * A row of chips where exactly one is selected.
 *
 *   <ChipGroup
 *     options={[{ value: 0, label: 'All' }, { value: 1, label: 'Cash' }]}
 *     value={paymentMethodId}
 *     onChange={setPaymentMethodId}
 *   />
 */
export default function ChipGroup({ options, value, onChange, style }) {
  const { spacing } = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[{ gap: spacing.sm }, style]}
    >
      {options.map(option => (
        <Chip
          key={String(option.value)}
          label={option.label}
          selected={option.value === value}
          onPress={() => onChange(option.value, option)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 38,
    minWidth: 64,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
