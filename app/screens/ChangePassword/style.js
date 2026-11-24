import { StyleSheet, Text, View } from 'react-native';
import sizeHelper from '../../helpers/sizeHelper';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  errors: {
    fontSize: sizeHelper.calHp(23),
    color: 'red',
    marginHorizontal: sizeHelper.calWp(60),
  },

  button: {
    height: sizeHelper.calHp(112),
    width: '90%',
    borderRadius: sizeHelper.calHp(50),
    backgroundColor: colors.primaryGradientStart,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sizeHelper.calHp(30),
  },

  buttonText: {
    color: '#fff',
    fontSize: sizeHelper.calHp(32),
    fontWeight: '600',
  },

  btnCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: sizeHelper.calHp(50),
  },

  passwordIcon: {
    position: 'absolute',
    right: sizeHelper.calWp(90),
    top: sizeHelper.calHp(112),
    zIndex: 10,
  },

  passwordIcon1: {
    position: 'absolute',
    right: sizeHelper.calWp(90),
    top: sizeHelper.calHp(120),
    zIndex: 10,
  },

  passwordIcon2: {
    position: 'absolute',
    right: sizeHelper.calWp(90),
    top: sizeHelper.calHp(120),
    zIndex: 10,
  },

  passwordWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
});

export default styles;
