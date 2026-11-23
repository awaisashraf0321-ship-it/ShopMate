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
              <Text style={styles.title}>Update Photo</Text>
              <TouchableOpacity onPress={onDelete}>
                <Icon
                  name="delete-outline"
                  size={sizeHelper.calHp(65)}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.option} onPress={onCamera}>
              <Icon
                name="camera-alt"
                size={sizeHelper.calHp(65)}
                color={theme.colors.textPrimary}
              />

              <Text style={styles.optionText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={onGallery}>
              <Icon
                name="photo-library"
                size={sizeHelper.calHp(65)}
                color={theme.colors.textPrimary}
              />

              <Text style={styles.optionText}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancel} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Pressable>
    </Modal>
  );
};

export default PhotoModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'flex-end',
  },

  safeArea: {
    width: '100%',
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
