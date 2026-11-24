import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import { Button } from '../ui';

/**
 * The "save" action at the bottom of every add/edit form.
 * Thin wrapper over the shared Button so every save looks the same.
 *
 * compact: tighter spacing for use inside a card (Monthly Budget form).
 */
const SavePayment = ({
  onPress,
  loading = false,
  disabled = false,
  compact = false,
  title = 'Save',
}) => {
  return (
    <View style={compact ? styles.compact : styles.container}>
      <Button
        title={title}
        icon={compact ? 'save' : 'check-circle-outline'}
        onPress={onPress}
        loading={loading}
        disabled={disabled}
        size="lg"
      />
    </View>
  );
};

export default SavePayment;

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
  },
  compact: {
    marginTop: theme.spacing.lg,
  },
});
