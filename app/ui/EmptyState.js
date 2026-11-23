import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme';
import AppText from './AppText';
import Button from './Button';

/**
 * Shown when a list has nothing in it. Replaces the copy-pasted empty
 * blocks in each list screen.
 *
 *   <EmptyState
 *     icon="receipt-long"
 *     title="No Self Expense Available"
 *     message="Tap the plus icon above to create one."
 *   />
 */
export default function EmptyState({
  icon = 'receipt-long',
  title,
  message,
  actionLabel,
  onAction,
}) {
  const { colors, spacing } = useTheme();
  return (
    <View style={[styles.container, { paddingVertical: spacing.xxl }]}>
      <View style={[styles.circle, { backgroundColor: colors.primarySoft }]}>
        <Icon name={icon} size={48} color={colors.accent} />
      </View>
      <AppText variant="title" align="center" style={{ marginTop: spacing.lg }}>
        {title}
      </AppText>
      {message ? (
        <AppText
          variant="caption"
          color="textSecondary"
          align="center"
          style={{ marginTop: spacing.xs, maxWidth: 300 }}
        >
          {message}
        </AppText>
      ) : null}
      {actionLabel && onAction ? (
        <Button
          title={actionLabel}
          onPress={onAction}
          fullWidth={false}
          size="sm"
          style={{ marginTop: spacing.lg, alignSelf: 'center' }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  circle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
