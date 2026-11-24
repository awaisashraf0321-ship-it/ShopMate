import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

/**
 * A row of circles that fill in as a PIN is typed. Shakes and turns red
 * whenever `errorKey` changes to a new truthy value (e.g. a wrong PIN).
 *
 *   <PinDots length={4} filled={pin.length} errorKey={wrongCount} />
 */
export default function PinDots({ length = 4, filled = 0, errorKey, style }) {
  const { colors, spacing } = useTheme();
  const shake = useRef(new Animated.Value(0)).current;
  const hasError = Boolean(errorKey) && filled === 0;

  useEffect(() => {
    if (!errorKey) return;
    shake.setValue(0);
    Animated.sequence(
      [10, -10, 8, -8, 4, 0].map(toValue =>
        Animated.timing(shake, {
          toValue,
          duration: 50,
          useNativeDriver: true,
        }),
      ),
    ).start();
  }, [errorKey, shake]);

  return (
    <Animated.View
      style={[
        styles.row,
        { gap: spacing.lg, transform: [{ translateX: shake }] },
        style,
      ]}
      accessibilityRole="text"
      accessibilityLabel={`${filled} of ${length} digits entered`}
    >
      {Array.from({ length }, (_, i) => {
        const isFilled = i < filled;
        const ring = hasError ? colors.danger : colors.primary;
        return (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                borderColor: isFilled
                  ? ring
                  : hasError
                  ? ring
                  : colors.borderStrong,
                backgroundColor: isFilled ? colors.primary : colors.transparent,
              },
            ]}
          />
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
  },
});
