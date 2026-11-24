import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../theme/colors';
import sizeHelper from '../helpers/sizeHelper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ImagePhotoOpen = ({ visible, onClose, imageUri, accessToken }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <TouchableOpacity onPress={onClose} style={styles.crossBorder}>
          <Icon name="close" size={sizeHelper.calHp(44)} color="black" />
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <Image
            style={styles.img}
            source={{
              uri: imageUri,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    </Modal>
  );
};

export default ImagePhotoOpen;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.dark,
  },

  crossBorder: {
    position: 'absolute',
    right: sizeHelper.calWp(50),
    justifyContent: 'center',
    alignItems: 'center',
    top: sizeHelper.calHp(130),
    height: sizeHelper.calWp(100),
    width: sizeHelper.calWp(100),
    backgroundColor: colors.white,
    borderRadius: sizeHelper.calHp(100),
    zIndex: 1,
  },

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    height: '100%',
    width: '100%',
  },
});
