import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';

import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../theme/colors';
import sizeHelper from '../helpers/sizeHelper';

const ConfirmModal = ({
  visible,
  onClose,
  onOk,
  title,
  subTitle1,
  subTitle2,
  icon,
  style,
  deleteText,
  iconColor,
  loader,
  btnStyle,
}) => {
  return (
    <View>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <Pressable style={styles.overlay}>
          <Pressable onPress={() => {}} style={styles.card}>
            <View style={styles.blob1} />
            <View style={styles.blob2} />
            <View style={styles.blob3} />

            <View style={[styles.iconCircle, style]}>
              <Icon
                name={icon}
                size={sizeHelper.calHp(52)}
                color={iconColor || colors.primaryGradientStart}
              />
            </View>

            <Text style={styles.title}>{title}</Text>

            {subTitle1 ? (
              <Text style={styles.subtitle}>{subTitle1}</Text>
            ) : null}

            {subTitle2 ? (
              <Text style={styles.subtitle}>{subTitle2}</Text>
            ) : null}

            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => onClose()}
                style={styles.cancelBtn}
                activeOpacity={0.85}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onOk()}
                style={[styles.okBtn, btnStyle]}
                activeOpacity={0.85}
              >
                {loader ? (
                  <View>
                    <ActivityIndicator color={colors.white} size="small" />
                  </View>
                ) : (
                  <Text style={styles.okText}>{deleteText}</Text>
                )}
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  /* ================= OVERLAY ================= */
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '90%',
    backgroundColor: colors.cardBackground,
    borderRadius: sizeHelper.calHp(30),
    paddingHorizontal: sizeHelper.calWp(24),
    paddingVertical: sizeHelper.calHp(30),
    alignItems: 'center',

    borderWidth: 1,
    borderColor: colors.borderColor,

    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: sizeHelper.calHp(10),
    },
    shadowOpacity: 0.12,
    shadowRadius: sizeHelper.calHp(20),
    elevation: 8,

    overflow: 'hidden',
  },

  blob1: {
    position: 'absolute',
    top: -sizeHelper.calHp(70),
    right: -sizeHelper.calWp(70),
    width: sizeHelper.calWp(220),
    height: sizeHelper.calHp(220),
    borderRadius: sizeHelper.calHp(110),
    backgroundColor: colors.lightPrimaryGradientStart,
    opacity: 0.9,
  },

  blob2: {
    position: 'absolute',
    bottom: -sizeHelper.calHp(80),
    left: -sizeHelper.calWp(80),
    width: sizeHelper.calWp(240),
    height: sizeHelper.calHp(240),
    borderRadius: sizeHelper.calHp(120),
    backgroundColor: colors.lightPrimaryGradientStart,
    opacity: 0.7,
  },

  blob3: {
    position: 'absolute',
    top: sizeHelper.calHp(30),
    left: -sizeHelper.calWp(60),
    width: sizeHelper.calWp(140),
    height: sizeHelper.calHp(140),
    borderRadius: sizeHelper.calHp(70),
    backgroundColor: colors.lightPrimaryGradientStart,
    opacity: 0.5,
  },

  iconCircle: {
    width: sizeHelper.calHp(110),
    height: sizeHelper.calHp(110),
    borderRadius: sizeHelper.calHp(55),
    backgroundColor: colors.lightPrimaryGradientStart,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(22),
  },

  title: {
    fontSize: sizeHelper.calHp(38),
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    letterSpacing: sizeHelper.calWp(0.4),
    marginBottom: sizeHelper.calHp(10),
  },

  subtitle: {
    fontSize: sizeHelper.calHp(30),
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: sizeHelper.calHp(2),
    lineHeight: sizeHelper.calHp(42),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: sizeHelper.calHp(32),
  },

  /* ================= CANCEL BUTTON ================= */
  cancelBtn: {
    flex: 1,
    height: sizeHelper.calHp(96),
    backgroundColor: colors.lightPrimaryGradientStart,
    borderRadius: sizeHelper.calHp(22),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: sizeHelper.calWp(10),
    borderWidth: 1,
    borderColor: colors.primaryGradientStart,
  },

  cancelText: {
    color: colors.primaryGradientStart,
    fontSize: sizeHelper.calHp(32),
    fontWeight: '700',
    letterSpacing: sizeHelper.calWp(0.2),
  },

  /* ================= OK BUTTON ================= */
  okBtn: {
    flex: 1,
    height: sizeHelper.calHp(96),
    backgroundColor: colors.primaryGradientStart,
    borderRadius: sizeHelper.calHp(22),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: sizeHelper.calWp(10),

    shadowColor: colors.primaryGradientStart,
    shadowOffset: {
      width: 0,
      height: sizeHelper.calHp(6),
    },
    shadowOpacity: 0.3,
    shadowRadius: sizeHelper.calHp(12),
    elevation: 5,
  },

  okText: {
    color: colors.white,
    fontSize: sizeHelper.calHp(32),
    fontWeight: '700',
    letterSpacing: sizeHelper.calWp(0.2),
  },
});
