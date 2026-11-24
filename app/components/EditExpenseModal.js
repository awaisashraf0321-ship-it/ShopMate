import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ModalCategorySelector from '../components/ModalCategorySelector';
import ModalDatePicker from '../components/ModalDatePicker';
import ModalBudgetAmountInput from '../components/ModalBudgetAmountInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import sizeHelper from '../helpers/sizeHelper';
import { theme, categoryStyle } from '../theme';
import { t } from '../i18n';

const EditExpenseModal = ({
  visible,
  onClose,

  // Category
  categories,
  category,
  setCategory,
  selectedIcon,
  categoryVisible,
  setCategoryVisible,

  // Amount
  expenseAmount,
  Changed,

  // Date
  date,
  showDate,
  setShowDate,
  setDate,

  // Update
  onUpdate,
  loading,
}) => {
  const getCategoryStyle = categoryStyle;

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
                      name="edit"
                      size={sizeHelper.calHp(50)}
                      color={theme.colors.primary}
                    />
                  </View>

                  <View style={styles.headerText}>
                    <Text style={styles.title}>{t('expense.edit')}</Text>

                    <Text style={styles.subtitle}>
                      {t('expense.editSubtitle')}
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

              {/* Scrollable Fields */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent}
              >
                {/* Category */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>{t('expense.editCategory')}</Text>

                  <ModalCategorySelector
                    categories={categories || []}
                    category={category}
                    setCategory={setCategory}
                    selectedIcon={getCategoryStyle}
                    myOverlay={true}
                    visible={categoryVisible}
                    setVisible={setCategoryVisible}
                    title={t('category.select')}
                  />
                </View>

                {/* Amount */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>{t('expense.editAmount')}</Text>

                  <ModalBudgetAmountInput
                    expenseAmount={expenseAmount}
                    Changed={Changed}
                  />
                </View>

                {/* Date */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>{t('expense.editDate')}</Text>

                  <ModalDatePicker
                    date={date}
                    setDate={setDate}
                    showDate={showDate}
                    setShowDate={setShowDate}
                  />
                </View>

                {/* Buttons */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onClose}
                    disabled={loading}
                  >
                    <Text style={styles.cancelText}>{t('common.cancel')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={onUpdate}
                    disabled={loading}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.updateText}>
                      {loading ? 'Updating...' : 'Update Expense'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditExpenseModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: theme.colors.overlay,
  },

  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  backdrop: {
    backgroundColor: theme.colors.overlay,
  },

  modalContainer: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: sizeHelper.calHp(60),
    borderTopRightRadius: sizeHelper.calHp(60),
    paddingHorizontal: sizeHelper.calWp(45),
    paddingTop: sizeHelper.calHp(26),
    paddingBottom: sizeHelper.calHp(60),
    maxHeight: '85%',
  },

  handle: {
    width: sizeHelper.calWp(130),
    height: sizeHelper.calHp(12),
    borderRadius: sizeHelper.calHp(30),
    backgroundColor: theme.colors.border,
    alignSelf: 'center',
    marginBottom: sizeHelper.calHp(40),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(30),
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  iconContainer: {
    width: sizeHelper.calHp(110),
    height: sizeHelper.calHp(110),
    borderRadius: sizeHelper.calHp(50),
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: sizeHelper.calWp(28),
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
    fontSize: sizeHelper.calHp(28),
    color: theme.colors.textSecondary,
    marginTop: sizeHelper.calHp(15),
    fontFamily: theme.fontFamily.regular,
  },

  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: sizeHelper.calHp(44),
  },

  scrollContent: {
    paddingBottom: sizeHelper.calHp(15),
  },

  fieldGroup: {
    width: '100%',
    marginBottom: sizeHelper.calHp(50),
  },

  label: {
    fontSize: sizeHelper.calHp(31),
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: sizeHelper.calHp(35),
    fontFamily: theme.fontFamily.extraBold,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: sizeHelper.calWp(30),
    marginTop: sizeHelper.calHp(15),
    marginBottom: sizeHelper.calHp(15),
  },

  cancelButton: {
    flex: 1,
    height: sizeHelper.calHp(130),
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: sizeHelper.calHp(37),
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    color: theme.colors.textPrimary,
    fontSize: sizeHelper.calHp(33),
    fontWeight: '700',
  },

  updateButton: {
    flex: 1.3,
    height: sizeHelper.calHp(130),
    borderRadius: sizeHelper.calHp(30),
    backgroundColor: theme.colors.warning,
    alignItems: 'center',
    justifyContent: 'center',
  },

  updateText: {
    color: theme.colors.textPrimary,
    fontSize: sizeHelper.calHp(33),
    fontWeight: '700',
  },
});
