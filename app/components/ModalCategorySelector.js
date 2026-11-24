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
import colors1 from '../theme/myColors';

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
          iconColor: colors1.textSecondary,
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
          color={colors1.warning}
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
          color={colors1.textSecondary}
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
                  color={colors1.primary}
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
                  color={colors1.textSecondary}
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
                        color: colors1.primaryLight,
                        iconColor: colors1.primary,
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
                            itemStyle.color || colors1.primaryLight,
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
                        color={isSelected ? colors1.white : colors1.textMuted}
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
    color: colors1.text,
    marginBottom: sizeHelper.calHp(38),
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },

  inputWrapper: {
    width: '100%',
    minHeight: sizeHelper.calHp(130),
    borderRadius: sizeHelper.calHp(35),
    borderWidth: 0,
    backgroundColor: colors1.accentLight || '#FFF3D6',
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
    color: colors1.text,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },

  placeholder: {
    color: colors1.textSecondary,
    fontWeight: '400',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  myOverlayStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  bottomSheet: {
    height: '70%',
    backgroundColor: colors1.white,
    borderTopLeftRadius: sizeHelper.calHp(50),
    borderTopRightRadius: sizeHelper.calHp(50),
    paddingHorizontal: sizeHelper.calWp(38),
    paddingTop: sizeHelper.calHp(30),
  },

  handle: {
    width: sizeHelper.calWp(110),
    height: sizeHelper.calHp(12),
    borderRadius: sizeHelper.calHp(20),
    backgroundColor: colors1.border,
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
    backgroundColor: colors1.primaryLight,
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
    color: colors1.text,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },

  subtitle: {
    fontSize: sizeHelper.calHp(27),
    color: colors1.textSecondary,
    marginTop: sizeHelper.calHp(8),
    fontFamily: 'PlusJakartaSans-Regular',
  },

  closeButton: {
    width: sizeHelper.calHp(96),
    height: sizeHelper.calHp(96),
    borderRadius: sizeHelper.calHp(50),
    backgroundColor: colors1.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  list: {
    paddingBottom: sizeHelper.calHp(25),
  },

  categoryRow: {
    minHeight: sizeHelper.calHp(130),
    borderWidth: 1,
    borderColor: colors1.border,
    borderRadius: sizeHelper.calHp(35),
    paddingHorizontal: sizeHelper.calWp(30),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(25),
    backgroundColor: colors1.white,
  },

  selectedRow: {
    backgroundColor: colors1.primaryLight,
    borderColor: colors1.primary,
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
    color: colors1.text,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  checkContainer: {
    height: sizeHelper.calWp(63),
    width: sizeHelper.calWp(63),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizeHelper.calHp(50),
  },
  selectedCheck: {
    backgroundColor: colors1.primary,
  },
});
