import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import sizeHelper from '../helpers/sizeHelper';
import { theme } from '../theme';
import { t } from '../i18n';

const UpdateSalaryModal = ({ visible, onClose, salary, setSalary }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.overlay}>
            <Pressable style={styles.backdrop} onPress={onClose} />

            <SafeAreaView edges={['bottom']} style={styles.safeArea}>
              <View style={styles.modalContainer}>
                {/* Handle */}
                <View style={styles.handle} />

                {/* Header */}
                <View style={styles.header}>
                  <View style={styles.headerLeft}>
                    <View style={styles.iconContainer}>
                      <Icon
                        name="account-balance-wallet"
                        size={sizeHelper.calHp(65)}
                        color={theme.colors.primary}
                      />
                    </View>

                    <View style={styles.headerText}>
                      <Text style={styles.title}>{t('salary.update')}</Text>
                      <Text style={styles.subtitle}>
                        {t('salary.subtitle')}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity onPress={onClose}>
                    <Icon
                      name="close"
                      size={sizeHelper.calHp(60)}
                      color={theme.colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                {/* Salary Amount */}
                <Text style={styles.label}>{t('salary.monthly')}</Text>

                <View style={styles.inputWrapper}>
                  <Text style={styles.currency}>Rs</Text>

                  <TextInput
                    style={styles.input}
                    value={String(salary ?? '')}
                    onChangeText={setSalary}
                    placeholder={t('salary.enter')}
                    placeholderTextColor={theme.colors.textMuted}
                    keyboardType="numeric"
                  />
                </View>

                {/* Info */}
                <View style={styles.infoBox}>
                  <Icon
                    name="info-outline"
                    size={sizeHelper.calHp(50)}
                    color={theme.colors.primary}
                  />

                  <Text style={styles.infoText}>{t('salary.note')}</Text>
                </View>

                {/* Buttons */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onClose}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.cancelText}>{t('common.cancel')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={onClose}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.saveText}>
                      {t('common.saveChanges')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default UpdateSalaryModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: theme.colors.overlay,
  },

  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  safeArea: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: sizeHelper.calHp(60),
    borderTopRightRadius: sizeHelper.calHp(60),
    overflow: 'hidden',
  },

  modalContainer: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: sizeHelper.calWp(52),
    paddingTop: sizeHelper.calHp(26),
    paddingBottom: sizeHelper.calHp(30),
  },

  handle: {
    width: sizeHelper.calWp(120),
    height: sizeHelper.calHp(15),
    borderRadius: sizeHelper.calHp(30),
    backgroundColor: theme.colors.border,
    alignSelf: 'center',
    marginBottom: sizeHelper.calHp(47),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(46),
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  iconContainer: {
    width: sizeHelper.calWp(130),
    height: sizeHelper.calHp(110),
    borderRadius: sizeHelper.calHp(50),
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: sizeHelper.calWp(30),
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: sizeHelper.calHp(45),
    fontWeight: '800',
    color: theme.colors.textPrimary,
    fontFamily: theme.fontFamily.extraBold,
  },

  subtitle: {
    fontSize: sizeHelper.calHp(30),
    color: theme.colors.textSecondary,
    marginTop: sizeHelper.calHp(10),
    fontFamily: theme.fontFamily.regular,
  },

  divider: {
    height: sizeHelper.calHp(1),
    backgroundColor: theme.colors.border,
    marginBottom: sizeHelper.calHp(50),
  },

  label: {
    fontSize: sizeHelper.calHp(36),
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: sizeHelper.calHp(26),
    fontFamily: theme.fontFamily.extraBold,
  },

  inputWrapper: {
    height: sizeHelper.calHp(135),
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: sizeHelper.calHp(33),
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(40),
  },

  currency: {
    fontSize: sizeHelper.calHp(40),
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginRight: sizeHelper.calWp(27),
  },

  input: {
    flex: 1,
    fontSize: sizeHelper.calHp(37),
    fontWeight: '700',
    color: theme.colors.textPrimary,
    fontFamily: theme.fontFamily.regular,
    paddingVertical: sizeHelper.calHp(0),
  },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primarySoft,
    padding: sizeHelper.calHp(30),
    borderRadius: sizeHelper.calHp(39),
    marginTop: sizeHelper.calHp(40),
    gap: sizeHelper.calWp(20),
  },

  infoText: {
    flex: 1,
    fontSize: sizeHelper.calHp(29),
    lineHeight: sizeHelper.calHp(44),
    color: theme.colors.textSecondary,
    fontFamily: theme.fontFamily.regular,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: sizeHelper.calWp(30),
    marginTop: sizeHelper.calHp(55),
  },

  cancelButton: {
    flex: 1,
    height: sizeHelper.calHp(135),
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: sizeHelper.calHp(38),
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    fontSize: sizeHelper.calHp(35),
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },

  saveButton: {
    flex: 1.3,
    height: sizeHelper.calHp(133),
    borderRadius: sizeHelper.calHp(38),
    backgroundColor: theme.colors.warning,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveText: {
    fontSize: sizeHelper.calHp(35),
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
});
