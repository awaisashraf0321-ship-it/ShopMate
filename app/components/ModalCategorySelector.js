import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import sizeHelper from '../helpers/sizeHelper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme';

const ModalCategorySelector = ({
  categories = [],
  category,
  setCategory,
  selectedIcon,
  visible,
  setVisible,
  title = 'Expense Category',
  placeholder = 'Select a Category',
  myOverlay = false,
}) => {
  const insets = useSafeAreaInsets();

  const selectedCategory = categories.find(item => item.Id === category);

  const matching =
    selectedCategory && typeof selectedIcon === 'function'
      ? selectedIcon(selectedCategory.Name)
      : {
          icon: 'category',
          iconColor: theme.colors.textSecondary,
        };

  const handleSelect = id => {
    setCategory(id);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>{title}</Text> */}

      <TouchableOpacity
        style={styles.inputWrapper}
        activeOpacity={0.7}
        onPress={() => setVisible(true)}
      >
        <Icon
          name={matching.icon}
          size={sizeHelper.calHp(45)}
          color={theme.colors.warning}
          style={styles.categoryIcon}
        />

        <Text
          style={[styles.inputText, !selectedCategory && styles.placeholder]}
          numberOfLines={1}
        >
          {selectedCategory?.Name || placeholder}
        </Text>

        <Icon
          name="keyboard-arrow-down"
          size={sizeHelper.calHp(26)}
          color={theme.colors.textSecondary}
        />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setVisible(false)}
      >
        <View style={[styles.modalOverlay, myOverlay && styles.myOverlayStyle]}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setVisible(false)}
          />

          <View style={[styles.bottomSheet, { marginBottom: insets.bottom }]}>
            <View style={styles.handle} />

            <View style={styles.modalHeader}>
              <View style={styles.headerIcon}>
                <Icon
                  name="category"
                  size={sizeHelper.calHp(45)}
                  color={theme.colors.primary}
                />
              </View>

              <View style={styles.headerText}>
                <Text style={styles.modalTitle}>Select Category</Text>

                <Text style={styles.subtitle}>
                  Choose a category for your expense
                </Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setVisible(false)}
              >
                <Icon
                  name="close"
                  size={sizeHelper.calHp(40)}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={categories}
              keyExtractor={item => item.Id.toString()}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.list}
              renderItem={({ item }) => {
                const isSelected = category === item.Id;

                const itemStyle =
                  typeof selectedIcon === 'function'
                    ? selectedIcon(item.Name)
                    : {
                        icon: 'category',
                        color: theme.colors.primarySoft,
                        iconColor: theme.colors.primary,
                      };

                return (
                  <TouchableOpacity
                    style={[
                      styles.categoryRow,
                      isSelected && styles.selectedRow,
                    ]}
                    activeOpacity={0.7}
                    onPress={() => handleSelect(item.Id)}
                  >
                    <View
                      style={[
                        styles.categoryIconBox,
                        {
                          backgroundColor:
                            itemStyle.color || theme.colors.primarySoft,
                        },
                      ]}
                    >
                      <Icon
                        name={itemStyle.icon}
                        size={sizeHelper.calHp(45)}
                        color={itemStyle.iconColor}
                      />
                    </View>

                    <Text style={styles.categoryName}>{item.Name}</Text>

                    <View
                      style={[
                        styles.checkContainer,
                        isSelected && styles.selectedCheck,
                      ]}
                    >
                      <Icon
                        name={isSelected ? 'check' : 'chevron-right'}
                        size={sizeHelper.calHp()}
                        color={
                          isSelected
                            ? theme.colors.onPrimary
                            : theme.colors.textMuted
                        }
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalCategorySelector;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  label: {
    fontSize: sizeHelper.calHp(33),
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: sizeHelper.calHp(38),
    fontFamily: theme.fontFamily.extraBold,
  },

  inputWrapper: {
    width: '100%',
    minHeight: sizeHelper.calHp(130),
    borderRadius: sizeHelper.calHp(35),
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    paddingHorizontal: sizeHelper.calWp(33),
    flexDirection: 'row',
    alignItems: 'center',
  },

  categoryIcon: {
    marginRight: sizeHelper.calWp(27),
  },

  inputText: {
    flex: 1,
    fontSize: sizeHelper.calHp(30),
    fontWeight: '600',
    color: theme.colors.textPrimary,
    fontFamily: theme.fontFamily.semiBold,
  },

  placeholder: {
    color: theme.colors.textSecondary,
    fontWeight: '400',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  myOverlayStyle: {
    backgroundColor: theme.colors.overlay,
  },

  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  bottomSheet: {
    height: '70%',
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: sizeHelper.calHp(50),
    borderTopRightRadius: sizeHelper.calHp(50),
    paddingHorizontal: sizeHelper.calWp(38),
    paddingTop: sizeHelper.calHp(30),
  },

  handle: {
    width: sizeHelper.calWp(110),
    height: sizeHelper.calHp(12),
    borderRadius: sizeHelper.calHp(20),
    backgroundColor: theme.colors.border,
    alignSelf: 'center',
    marginBottom: sizeHelper.calHp(50),
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(45),
  },

  headerIcon: {
    width: sizeHelper.calWp(130),
    height: sizeHelper.calHp(100),
    borderRadius: sizeHelper.calHp(100),
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    flex: 1,
    marginLeft: sizeHelper.calWp(28),
  },

  modalTitle: {
    fontSize: sizeHelper.calHp(40),
    fontWeight: '800',
    color: theme.colors.textPrimary,
    fontFamily: theme.fontFamily.extraBold,
  },

  subtitle: {
    fontSize: sizeHelper.calHp(27),
    color: theme.colors.textSecondary,
    marginTop: sizeHelper.calHp(8),
    fontFamily: theme.fontFamily.regular,
  },

  closeButton: {
    width: sizeHelper.calHp(96),
    height: sizeHelper.calHp(96),
    borderRadius: sizeHelper.calHp(50),
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  list: {
    paddingBottom: sizeHelper.calHp(25),
  },

  categoryRow: {
    minHeight: sizeHelper.calHp(130),
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: sizeHelper.calHp(35),
    paddingHorizontal: sizeHelper.calWp(30),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(25),
    backgroundColor: theme.colors.surface,
  },

  selectedRow: {
    backgroundColor: theme.colors.primarySoft,
    borderColor: theme.colors.primary,
  },

  categoryIconBox: {
    width: sizeHelper.calWp(100),
    height: sizeHelper.calHp(80),
    borderRadius: sizeHelper.calHp(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: sizeHelper.calWp(35),
  },

  categoryName: {
    flex: 1,
    fontSize: sizeHelper.calHp(32),
    color: theme.colors.textPrimary,
    fontFamily: theme.fontFamily.regular,
  },
  checkContainer: {
    height: sizeHelper.calWp(63),
    width: sizeHelper.calWp(63),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizeHelper.calHp(50),
  },
  selectedCheck: {
    backgroundColor: theme.colors.primary,
  },
});
