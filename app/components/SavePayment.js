import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../theme/colors';
import colors1 from '../theme/myColors';
import sizeHelper from '../helpers/sizeHelper';

const SavePayment = ({
  onPress,
  loading = false,
  compact = false,
  title = 'Save Payment',
}) => {
  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      <TouchableOpacity
        // disabled={!amount}
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.touchable}
      >
        {compact ? (
          <LinearGradient
            colors={['#FFD34F', '#FFB21F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.compactButton}
          >
            <Icon
              name="save"
              size={sizeHelper.calHp(46)}
              style={styles.saveIcon}
              color="#17152F"
            />

            <Text style={styles.compactButtonText}>
              {loading ? 'Saving...' : title}
            </Text>
          </LinearGradient>
        ) : (
          <View style={styles.button}>
            <Icon
              name="check-circle-outline"
              size={sizeHelper.calHp(38)}
              color={colors.white}
            />

            <Text style={styles.buttonText}>
              {loading ? 'Saving...' : title}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SavePayment;

const styles = StyleSheet.create({
  container: {
    marginTop: sizeHelper.calHp(30),
    marginHorizontal: sizeHelper.calWp(40),
    marginBottom: sizeHelper.calHp(30),
  },

  touchable: {
    width: '100%',
  },

  button: {
    width: '100%',
    height: sizeHelper.calHp(140),
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizeHelper.calHp(15),
    backgroundColor: colors.primary,
    borderRadius: sizeHelper.calHp(35),
    flexDirection: 'row',
    elevation: 3,
    shadowColor: colors.primaryGradientStart,
    shadowOffset: {
      width: 0,
      height: sizeHelper.calHp(4),
    },
    shadowOpacity: 0.2,
    shadowRadius: sizeHelper.calHp(6),
  },

  buttonText: {
    fontSize: sizeHelper.calHp(32),
    fontWeight: '700',
    color: colors.white,
  },

  disabledBtn: {
    backgroundColor: colors.lightPrimary,
    borderRadius: sizeHelper.calHp(35),
    elevation: 0,
  },

  compactContainer: {
    marginTop: sizeHelper.calHp(30),
    marginHorizontal: sizeHelper.calWp(0),
    marginBottom: sizeHelper.calHp(0),
  },

  compactButton: {
    width: '100%',
    height: sizeHelper.calHp(116),
    borderRadius: sizeHelper.calHp(54),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizeHelper.calWp(24),
    elevation: 2,
    shadowColor: '#E99B20',
    shadowOffset: {
      width: 0,
      height: sizeHelper.calHp(3),
    },
    shadowOpacity: 0.2,
    shadowRadius: sizeHelper.calHp(4),
  },

  compactButtonText: {
    color: '#17152F',
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: sizeHelper.calHp(33),
  },

  saveIcon: {
    marginTop: sizeHelper.calHp(10),
  },
});
