import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme';
import AppText from './AppText';

const ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  [null, '0', 'back'],
];

/**
 * Big on-screen number keys, for phone numbers and PINs. Easier than the
 * system keyboard: same place every time, big targets, nothing else to press.
 *
 *   <NumberPad onDigit={d => add(d)} onBackspace={remove} />
 */
export default function NumberPad({ onDigit, onBackspace, disabled, style }) {
  const { colors, spacing, radius, typography, sizes } = useTheme();

  return (
    <View style={[{ gap: spacing.sm }, style]}>
      {ROWS.map((row, r) => (
        <View key={r} style={[styles.row, { gap: spacing.sm }]}>
          {row.map((key, k) => {
            if (key === null) {
              return <View key={k} style={styles.key} />;
            }
            const isBack = key === 'back';
            return (
              <Pressable
                key={k}
                disabled={disabled}
                onPress={() => (isBack ? onBackspace?.() : onDigit?.(key))}
                onLongPress={isBack ? () => onBackspace?.(true) : undefined}
                accessibilityRole="button"
                accessibilityLabel={isBack ? 'Delete' : key}
                style={({ pressed }) => [
                  styles.key,
                  {
                    borderRadius: radius.lg,
                    backgroundColor: pressed
                      ? colors.primarySoft
                      : isBack
                      ? colors.transparent
                      : colors.surfaceMuted,
                    opacity: disabled ? 0.5 : 1,
                  },
                ]}
              >
                {isBack ? (
                  <Icon
                    name="backspace"
                    size={sizes.icon.xl}
                    color={colors.textSecondary}
                  />
                ) : (
                  <AppText
                    style={[typography.h1, { fontSize: 28, lineHeight: 34 }]}
                  >
                    {key}
                  </AppText>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  key: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
