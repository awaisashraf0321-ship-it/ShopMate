import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import React from 'react';
import sizeHelper from '../helpers/sizeHelper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../theme/colors';
import colors1 from '../theme/myColors';

const ErrorModal = ({
  visible,
  text,
  onClose,
  errorMessage,
  setErrorMessage,
}) => {
  return (
    <View style={styles.container}>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={8}
          onPress={() => onClose()}
        >
          <View style={styles.card}>
            <View style={styles.border}>
              <Icon
                name="error-outline"
                size={sizeHelper.calHp(55)}
                color={colors.redColor}
              />
            </View>

            <Text style={styles.loginText}>{text}</Text>
            <Text style={styles.text}>{errorMessage}</Text>
            <Text style={styles.try}>Please try again.</Text>

            <TouchableOpacity onPress={() => onClose()} style={styles.btn}>
              <Text style={styles.okText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  container: {},

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 24, 24, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: sizeHelper.calHp(35),
    paddingVertical: sizeHelper.calHp(20),
    paddingHorizontal: sizeHelper.calWp(20),
    shadowColor: '#000',
    shadowOffset: {
      width: sizeHelper.calWp(0),
      height: sizeHelper.calHp(8),
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },

  border: {
    backgroundColor: colors.lightDot,
    height: sizeHelper.calHp(100),
    marginTop: sizeHelper.calHp(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: sizeHelper.calWp(100),
    borderRadius: sizeHelper.calHp(70),
  },

  loginText: {
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    fontSize: sizeHelper.calHp(35),
    marginTop: sizeHelper.calHp(20),
  },

  text: {
    marginTop: sizeHelper.calHp(10),
    fontSize: sizeHelper.calHp(30),
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Regular',
  },

  try: {
    fontSize: sizeHelper.calHp(30),
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: sizeHelper.calHp(10),
  },

  btn: {
    width: '65%',
    height: sizeHelper.calHp(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: sizeHelper.calHp(30),
    marginBottom: sizeHelper.calHp(50),
    borderRadius: sizeHelper.calHp(60),
    backgroundColor: colors1.accent,
  },

  okText: {
    color: colors.white,
    fontFamily: 'Poppins-Regular',
  },
});
