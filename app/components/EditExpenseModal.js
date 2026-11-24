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

import colors1 from '../theme/myColors';
import ModalCategorySelector from '../components/ModalCategorySelector';
import ModalDatePicker from '../components/ModalDatePicker';
import ModalBudgetAmountInput from '../components/ModalBudgetAmountInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import sizeHelper from '../helpers/sizeHelper';
import colors from '../theme/colors';

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
  const getCategoryStyle = Category => {
    if (Category === 'Bill Expense') {
      return {
        icon: 'receipt-long',
        color: '#FCE8E8',
        iconColor: colors.dot,
      };
    }

    if (Category === 'Education & Learning') {
      return {
        icon: 'school',
        color: '#EDE7F6',
        iconColor: '#7E57C2',
      };
    }

    if (Category === 'Entertainment & Leisure') {
      return {
        icon: 'movie',
        color: '#FCE4EC',
        iconColor: '#D81B60',
      };
    }

    if (Category === 'Family & Personal Care') {
      return {
        icon: 'people',
        color: '#E0F2F1',
        iconColor: '#00897B',
      };
    }

    if (Category === 'Food & Groceries') {
      return {
        icon: 'restaurant',
        color: '#FFF3E0',
        iconColor: '#EF6C00',
      };
    }

    if (Category === 'Health & Medical') {
      return {
        icon: 'medical-services',
        color: '#FCE8E8',
        iconColor: '#E53935',
      };
    }

    if (Category === 'Home Expense') {
      return {
        icon: 'home',
        color: '#ECF5D9',
        iconColor: colors.categoryTravel,
      };
    }

    if (Category === 'Mobile & Internet') {
      return {
        icon: 'phone-iphone',
        color: '#E3F2FD',
        iconColor: '#1976D2',
      };
    }

    if (Category === 'Other') {
      return {
        icon: 'category',
        color: '#ECEFF1',
        iconColor: '#546E7A',
      };
    }

    if (Category === 'Saving & Investments') {
      return {
        icon: 'savings',
        color: '#E8F5E9',
        iconColor: '#388E3C',
      };
    }

    if (Category === 'Shopping & Clothing') {
      return {
        icon: 'shopping-bag',
        color: '#F3E5F5',
        iconColor: '#8E24AA',
      };
    }

    if (Category === 'Transportation') {
      return {
        icon: 'directions-car',
        color: '#E8F0FE',
        iconColor: '#3F51B5',
      };
    }

    return {
      icon: 'apps',
      color: '#E8F0FE',
      iconColor: colors.categoryClothing,
    };
  };

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
                      color={colors1.primary}
                    />
                  </View>

                  <View style={styles.headerText}>
                    <Text style={styles.title}>Edit Expense</Text>

                    <Text style={styles.subtitle}>
                      Update your monthly budget.
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

              {/* Scrollable Fields */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent}
              >
                {/* Category */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Expense Category</Text>

                  <ModalCategorySelector
                    categories={categories || []}
                    category={category}
                    setCategory={setCategory}
                    selectedIcon={getCategoryStyle}
                    myOverlay={true}
                    visible={categoryVisible}
                    setVisible={setCategoryVisible}
                    title="Select Category"
                  />
                </View>

                {/* Amount */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Expense Amount</Text>

                  <ModalBudgetAmountInput
                    expenseAmount={expenseAmount}
                    Changed={Changed}
                  />
                </View>

                {/* Date */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Expense Date</Text>

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
                    <Text style={styles.cancelText}>Cancel</Text>
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
    backgroundColor: 'rgba(26, 24, 24, 0.25)',
  },

  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  backdrop: {
    backgroundColor: 'rgba(23,21,47,0.45)',
  },

  modalContainer: {
    backgroundColor: colors1.white,
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
    backgroundColor: colors1.border,
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
    backgroundColor: colors1.primaryLight,
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
    color: colors1.text,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },

  subtitle: {
    fontSize: sizeHelper.calHp(28),
    color: colors1.textSecondary,
    marginTop: sizeHelper.calHp(15),
    fontFamily: 'PlusJakartaSans-Regular',
  },

  divider: {
    height: 1,
    backgroundColor: colors1.border,
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
    color: colors1.text,
    marginBottom: sizeHelper.calHp(35),
    fontFamily: 'PlusJakartaSans-ExtraBold',
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
    borderColor: colors1.border,
    borderRadius: sizeHelper.calHp(37),
    backgroundColor: colors1.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    color: colors1.text,
    fontSize: sizeHelper.calHp(33),
    fontWeight: '700',
  },

  updateButton: {
    flex: 1.3,
    height: sizeHelper.calHp(130),
    borderRadius: sizeHelper.calHp(30),
    backgroundColor: colors1.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },

  updateText: {
    color: colors1.text,
    fontSize: sizeHelper.calHp(33),
    fontWeight: '700',
  },
});
