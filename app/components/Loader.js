import { ActivityIndicator, StyleSheet, View, Modal } from 'react-native';
import React from 'react';
import colors from '../theme/colors';
import sizeHelper from '../helpers/sizeHelper';

const Loader = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.cardCon}>
          <ActivityIndicator size="large" color={colors.primaryGradientStart} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 24, 24, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCon: {
    borderRadius: sizeHelper.calHp(30),
    width: sizeHelper.calHp(160),
    height: sizeHelper.calHp(160),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
