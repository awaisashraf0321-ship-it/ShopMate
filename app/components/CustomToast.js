import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import sizeHelper from '../helpers/sizeHelper';
import colors from '../theme/colors';

const CustomToast = ({ text1 }) => {
  return (
    <View style={styles.con}>
      <View style={styles.toast}>
        <Text style={styles.title}>{text1}</Text>
      </View>
    </View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({
  con: {
    position: 'absolute',
    top: sizeHelper.calHp(600),
  },
  toast: {
    padding: sizeHelper.calHp(20),
    borderRadius: sizeHelper.calHp(50),
    borderRadius: sizeHelper.calHp(50),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryGradientStart,
  },

  title: {
    color: colors.white,
    fontSize: sizeHelper.calHp(25),
    fontWeight: '600',
  },
});
