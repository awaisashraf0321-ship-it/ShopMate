import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../theme/colors';
import sizeHelper from '../helpers/sizeHelper';

const AuthTextField = ({
  placeholder,
  icon,
  iconStyle,
  label,
  secureTextEntry,
  value,
  onChangeText,
  usernameStyle,
  keyboardType,
  inputStyle,
  iconDesign,
  inputFont,
  onBlur,
  rightIcon,
  onRightIconPress,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputContainer}>
      {label ? (
        <Text style={[styles.username, usernameStyle]}>{label}</Text>
      ) : null}

      <View
        style={[
          styles.fieldWrapper,
          inputStyle,
          isFocused && styles.fieldWrapperFocused,
        ]}
      >
        {icon ? (
          <View style={[styles.iconCircle, iconDesign]}>
            <Icon
              name={icon}
              size={sizeHelper.calHp(32)}
              color={colors.primaryGradientStart}
              style={iconStyle}
            />
          </View>
        ) : null}

        <TextInput
          style={[styles.input, inputFont]}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={e => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {rightIcon ? (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIconBtn}
            activeOpacity={0.7}
          >
            <Icon
              name={rightIcon}
              size={sizeHelper.calHp(38)}
              color="#6B7280"
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default AuthTextField;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: sizeHelper.calHp(16),
  },

  username: {
    fontSize: sizeHelper.calHp(27),
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: sizeHelper.calWp(8),
    marginBottom: sizeHelper.calHp(11),
  },

  fieldWrapper: {
    height: sizeHelper.calHp(120),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: colors.white,

    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    borderRightColor: colors.border,
    borderColor: colors.border,

    borderRadius: sizeHelper.calHp(100),
    paddingHorizontal: sizeHelper.calWp(14),

    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: sizeHelper.calHp(4),
    },
    shadowOpacity: 0.06,
    shadowRadius: sizeHelper.calHp(10),
    elevation: 1,
  },

  fieldWrapperFocused: {
    borderTopWidth: 1,
    borderTopColor: colors.primaryGradientStart,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryGradientStart,
    borderLeftWidth: 1,
    borderLeftColor: colors.primaryGradientStart,
    borderRightWidth: 1,
    borderRightColor: colors.primaryGradientStart,
    shadowOpacity: 0.12,
    shadowRadius: sizeHelper.calHp(14),
    elevation: 5,
  },

  iconCircle: {
    width: sizeHelper.calHp(68),
    height: sizeHelper.calHp(68),
    borderRadius: sizeHelper.calHp(34),
    backgroundColor: colors.lightPrimaryGradientStart,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: sizeHelper.calWp(14),
  },

  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 0,
    paddingVertical: 0,
    fontSize: sizeHelper.calHp(30),
    fontFamily: 'Poppins-Regular',
    color: colors.textPrimary,
    ...(Platform.OS === 'android' && {
      includeFontPadding: false,
    }),
  },

  rightIconBtn: {
    width: sizeHelper.calWp(60),
    height: sizeHelper.calHp(60),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: sizeHelper.calWp(4),
  },
});
