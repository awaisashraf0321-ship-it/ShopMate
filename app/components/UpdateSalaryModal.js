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
import colors1 from '../theme/myColors';
import sizeHelper from '../helpers/sizeHelper';

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
                        color={colors1.primary}
                      />
                    </View>

                    <View style={styles.headerText}>
                      <Text style={styles.title}>Update Salary</Text>
                      <Text style={styles.subtitle}>
                        Set your monthly salary budget.
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity onPress={onClose}>
                    <Icon
                      name="close"
                      size={sizeHelper.calHp(60)}
                      color={colors1.textSecondary}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                {/* Salary Amount */}
                <Text style={styles.label}>Monthly Salary</Text>

                <View style={styles.inputWrapper}>
                  <Text style={styles.currency}>Rs.</Text>

                  <TextInput
                    style={styles.input}
                    value={String(salary ?? '')}
                    onChangeText={setSalary}
                    placeholder="Enter monthly salary"
                    placeholderTextColor={colors1.textMuted}
                    keyboardType="numeric"
                  />
                </View>

                {/* Info */}
                <View style={styles.infoBox}>
                  <Icon
                    name="info-outline"
                    size={sizeHelper.calHp(50)}
                    color={colors1.primary}
                  />

                  <Text style={styles.infoText}>
                    Your salary will be used to manage your monthly budget.
                  </Text>
                </View>

                {/* Buttons */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onClose}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={onClose}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.saveText}>Save Changes</Text>
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
    backgroundColor: 'rgba(26, 24, 24, 0.5)',
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  safeArea: {
    backgroundColor: colors1.white,
    borderTopLeftRadius: sizeHelper.calHp(60),
    borderTopRightRadius: sizeHelper.calHp(60),
    overflow: 'hidden',
  },

  modalContainer: {
    backgroundColor: colors1.white,
    paddingHorizontal: sizeHelper.calWp(52),
    paddingTop: sizeHelper.calHp(26),
    paddingBottom: sizeHelper.calHp(30),
  },

  handle: {
    width: sizeHelper.calWp(120),
    height: sizeHelper.calHp(15),
    borderRadius: sizeHelper.calHp(30),
    backgroundColor: colors1.border,
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
    backgroundColor: colors1.primaryLight,
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
    color: colors1.text,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },

  subtitle: {
    fontSize: sizeHelper.calHp(30),
    color: colors1.textSecondary,
    marginTop: sizeHelper.calHp(10),
    fontFamily: 'PlusJakartaSans-Regular',
  },

  divider: {
    height: sizeHelper.calHp(1),
    backgroundColor: colors1.border,
    marginBottom: sizeHelper.calHp(50),
  },

  label: {
    fontSize: sizeHelper.calHp(36),
    fontWeight: '700',
    color: colors1.text,
    marginBottom: sizeHelper.calHp(26),
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },

  inputWrapper: {
    height: sizeHelper.calHp(135),
    borderWidth: 1,
    borderColor: colors1.border,
    borderRadius: sizeHelper.calHp(33),
    backgroundColor: colors1.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(40),
  },

  currency: {
    fontSize: sizeHelper.calHp(40),
    fontWeight: '700',
    color: colors1.textSecondary,
    marginRight: sizeHelper.calWp(27),
  },

  input: {
    flex: 1,
    fontSize: sizeHelper.calHp(37),
    fontWeight: '700',
    color: colors1.text,
    fontFamily: 'PlusJakartaSans-Regular',
    paddingVertical: sizeHelper.calHp(0),
  },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors1.primaryLight,
    padding: sizeHelper.calHp(30),
    borderRadius: sizeHelper.calHp(39),
    marginTop: sizeHelper.calHp(40),
    gap: sizeHelper.calWp(20),
  },

  infoText: {
    flex: 1,
    fontSize: sizeHelper.calHp(29),
    lineHeight: sizeHelper.calHp(44),
    color: colors1.textSecondary,
    fontFamily: 'PlusJakartaSans-Regular',
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
    borderColor: colors1.border,
    borderRadius: sizeHelper.calHp(38),
    backgroundColor: colors1.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    fontSize: sizeHelper.calHp(35),
    fontWeight: '700',
    color: colors1.text,
  },

  saveButton: {
    flex: 1.3,
    height: sizeHelper.calHp(133),
    borderRadius: sizeHelper.calHp(38),
    backgroundColor: colors1.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveText: {
    fontSize: sizeHelper.calHp(35),
    fontWeight: '700',
    color: colors1.text,
  },
});
