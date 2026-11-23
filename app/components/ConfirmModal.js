import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';
import { AppText, Button } from '../ui';

const { colors, spacing, radius, shadows } = theme;

/**
 * "Are you sure?" dialog.
 *
 *   <ConfirmModal tone="danger" icon="delete" title="Are You Sure?"
 *     subTitle1="…" deleteText="Delete" onOk={…} onClose={…} loader={busy} />
 *
 * tone: danger (red, for deletes) | primary (brand, e.g. logout)
 */
const ConfirmModal = ({
  visible,
  onClose,
  onOk,
  title,
  subTitle1,
  subTitle2,
  icon,
  deleteText,
  loader,
  tone = 'primary',
}) => {
  const danger = tone === 'danger';
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable onPress={() => {}} style={styles.card}>
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor: danger
                  ? colors.dangerSoft
                  : colors.primarySoft,
              },
            ]}
          >
            <Icon
              name={icon}
              size={28}
              color={danger ? colors.danger : colors.primary}
            />
          </View>

          <AppText variant="h2" align="center" style={styles.title}>
            {title}
          </AppText>

          {subTitle1 ? (
            <AppText variant="body" color="textSecondary" align="center">
              {subTitle1}
            </AppText>
          ) : null}
          {subTitle2 ? (
            <AppText variant="body" color="textSecondary" align="center">
              {subTitle2}
            </AppText>
          ) : null}

          <View style={styles.row}>
            <Button
              title="Cancel"
              variant="secondary"
              onPress={onClose}
              style={styles.flex}
            />
            <Button
              title={deleteText}
              variant={danger ? 'danger' : 'primary'}
              onPress={onOk}
              loading={loader}
              style={styles.flex}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 420,
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
    alignSelf: 'stretch',
  },
  flex: { flex: 1 },
});
