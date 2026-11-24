import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import sizeHelper from '../helpers/sizeHelper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { t } from '../i18n';

const PhotoModal = ({ visible, onClose, onCamera, onGallery, onDelete }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <Pressable style={styles.overlay}>
        <SafeAreaView edges={['bottom']} style={styles.safeArea}>
          <View style={styles.modalBox}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.title}>{t('photo.update')}</Text>
              <TouchableOpacity
                onPress={onDelete}
                accessibilityRole="button"
                accessibilityLabel="Remove photo"
                hitSlop={10}
              >
                <Icon
                  name="delete-outline"
                  size={theme.sizes.icon.lg}
                  color={theme.colors.danger}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.option} onPress={onCamera}>
              <View style={styles.optionIcon}>
                <Icon
                  name="camera-alt"
                  size={theme.sizes.icon.md}
                  color={theme.colors.primary}
                />
              </View>

              <Text style={styles.optionText}>{t('photo.camera')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={onGallery}>
              <View style={styles.optionIcon}>
                <Icon
                  name="photo-library"
                  size={theme.sizes.icon.md}
                  color={theme.colors.primary}
                />
              </View>

              <Text style={styles.optionText}>{t('photo.gallery')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancel} onPress={onClose}>
              <Text style={styles.cancelText}>{t('common.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Pressable>
    </Modal>
  );
};

export default PhotoModal;

const styles = StyleSheet.create({
  // Soft emerald tile, same as the other sheets' option icons
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'flex-end',
  },

  // White behind the home-indicator inset so the sheet reaches the bottom edge
  safeArea: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: sizeHelper.calHp(70),
    borderTopRightRadius: sizeHelper.calHp(70),
    overflow: 'hidden',
  },

  modalBox: {
    backgroundColor: theme.colors.surface,

    borderTopLeftRadius: sizeHelper.calHp(70),
    borderTopRightRadius: sizeHelper.calHp(70),

    paddingHorizontal: sizeHelper.calHp(55),
    paddingTop: sizeHelper.calHp(55),

    paddingBottom: sizeHelper.calHp(20),
  },

  title: {
    fontSize: sizeHelper.calHp(37),
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: sizeHelper.calHp(43),
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: sizeHelper.calHp(34),

    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },

  optionText: {
    marginLeft: sizeHelper.calHp(35),
    fontSize: sizeHelper.calHp(35),
    color: theme.colors.textPrimary,
  },

  cancel: {
    alignItems: 'center',
    paddingTop: sizeHelper.calHp(44),
  },

  cancelText: {
    fontSize: sizeHelper.calHp(35),
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
});
