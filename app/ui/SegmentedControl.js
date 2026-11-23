import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fontFamily, useTheme } from '../theme';
import AppText from './AppText';

/**
 * A row of mutually exclusive segments (Today / This Week / This Month,
 * Log in / Sign up).
 *
 *   <SegmentedControl
 *     options={[{ value: 1, label: 'Log in' }, { value: 2, label: 'Sign up' }]}
 *     value={tab} onChange={setTab} />
 *
 * Options may carry an `icon` (MaterialIcons name) shown before the label.
 * size="sm": a small pill that hugs its labels (no icons), for tight rows
 * such as the Dashboard header.
 */
export default function SegmentedControl({
  options,
  value,
  onChange,
  size = 'md',
  style,
}) {
  const { colors, spacing, radius, shadows, sizes } = useTheme();
  const compact = size === 'sm';
  return (
    <View
      style={[
        styles.row,
        {
          padding: compact ? 3 : spacing.xs,
          borderRadius: compact ? radius.pill : radius.md,
          backgroundColor: colors.surfaceMuted,
        },
        style,
      ]}
      accessibilityRole="tablist"
    >
      {options.map(option => {
        const selected = option.value === value;
        return (
          <Pressable
            key={String(option.value)}
            onPress={() => onChange(option.value, option)}
            style={[
              styles.segment,
              compact
                ? {
                    flex: 0,
                    paddingVertical: 6,
                    paddingHorizontal: spacing.md,
                    borderRadius: radius.pill,
                  }
                : { paddingVertical: spacing.sm, borderRadius: radius.sm },
              selected && [{ backgroundColor: colors.surface }, shadows.sm],
            ]}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
          >
            {option.icon && !compact ? (
              <Icon
                name={option.icon}
                size={sizes.icon.sm + 2}
                color={selected ? colors.primary : colors.textMuted}
              />
            ) : null}
            <AppText
              variant={compact ? 'caption' : 'label'}
              color={
                selected
                  ? compact
                    ? 'primary'
                    : 'textPrimary'
                  : 'textSecondary'
              }
              style={compact && selected ? styles.bold : null}
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  bold: { fontFamily: fontFamily.bold },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
});
