import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';
import { AppText, Button } from '../ui';

const { colors, spacing, radius, shadows } = theme;

/**
 * Error dialog: red icon, title (`text`), message, and an OK button.
 * Tapping outside the card also closes it.
 */
const ErrorModal = ({ visible, text, onClose, errorMessage }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable onPress={() => {}} style={styles.card}>
          <View style={styles.iconCircle}>
            <Icon name="error-outline" size={28} color={colors.danger} />
          </View>

          <AppText variant="h2" align="center">
            {text}
          </AppText>
          {errorMessage ? (
            <AppText
              variant="body"
              color="textSecondary"
              align="center"
              style={styles.message}
            >
              {errorMessage}
            </AppText>
          ) : null}
          <AppText variant="caption" color="textMuted" style={styles.hint}>
            Please try again.
          </AppText>

          <Button title="OK" onPress={onClose} style={styles.button} />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.lg,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: radius.pill,
    backgroundColor: colors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  message: {
    marginTop: spacing.xs,
  },
  hint: {
    marginTop: spacing.xs,
  },
  button: {
    marginTop: spacing.xl,
  },
});
