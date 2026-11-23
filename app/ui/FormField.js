import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../theme';
import AppText from './AppText';

/**
 * A labelled form section: label, the field itself, optional hint/error.
 *
 *   <FormField label="Note"><TextInput … /></FormField>
 *   <FormField label="Amount" error="Enter an amount">…</FormField>
 */
export default function FormField({ label, hint, error, style, children }) {
  const { spacing } = useTheme();
  return (
    <View style={[styles.container, { marginHorizontal: spacing.lg }, style]}>
      {label ? (
        <AppText variant="label" style={{ marginBottom: spacing.sm }}>
          {label}
        </AppText>
      ) : null}
      {children}
      {error || hint ? (
        <AppText
          variant="caption"
          color={error ? 'danger' : 'textSecondary'}
          style={{ marginTop: spacing.xs }}
        >
          {error || hint}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
