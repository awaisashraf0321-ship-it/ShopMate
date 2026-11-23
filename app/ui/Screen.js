import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';

/**
 * Page wrapper: safe area, app background and standard side padding.
 *
 *   <Screen scroll refreshControl={<RefreshControl … />}>…</Screen>
 *
 * Pass `padded={false}` for edge-to-edge content.
 */
export default function Screen({
  scroll = false,
  padded = true,
  edges = ['top'],
  refreshControl,
  contentContainerStyle,
  style,
  children,
}) {
  const { colors, spacing } = useTheme();
  const padding = padded ? { paddingHorizontal: spacing.lg } : null;

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.flex, { backgroundColor: colors.background }, style]}
    >
      {scroll ? (
        <ScrollView
          refreshControl={refreshControl}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            padding,
            { paddingBottom: spacing.xxxl },
            contentContainerStyle,
          ]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, padding]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ flex: { flex: 1 } });
