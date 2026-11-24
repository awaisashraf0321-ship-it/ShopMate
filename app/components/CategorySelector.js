import React, { useState } from 'react';
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
import colors from '../theme/colors';

const CategorySelector = ({
  categories = [],
  category,
  selectedIcon,
  setCategory,
  title,
  placeholder = 'Select a Category',
  amount,
  visible,
  setVisible,
  compact = false,
  myOverlay = false,
}) => {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState(null);

  const handleSelect = id => {
    setActiveCategory(id);
    setCategory(id);
    setVisible(false);
  };

  const selectedCategory = categories.find(cat => cat.Id === category);

  const matching =
    selectedCategory && typeof selectedIcon === 'function'
      ? selectedIcon(selectedCategory.Name)
      : {
          icon: 'category',
          iconColor: colors1.textSecondary,
          color: colors1.primaryLight,
        };

  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      {!compact && (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}

      <View style={[styles.CateCon, compact && styles.compactCateCon]}>
        <TouchableOpacity
          style={[styles.inputWrapper, compact && styles.compactInputWrapper]}
          activeOpacity={0.7}
          onPress={() => setVisible(true)}
        >
          <Icon
            name={matching.icon}
            size={sizeHelper.calHp(compact ? 30 : 38)}
            color={colors1.black}
            style={styles.categoryIcon}
          />

          <Text
            style={[
              styles.inputText,
              !selectedCategory && styles.placeholder,
              compact && styles.compactInputText,
            ]}
            numberOfLines={1}
          >
            {selectedCategory?.Name || placeholder}
          </Text>

          <Icon
            name="keyboard-arrow-down"
            size={sizeHelper.calHp(compact ? 25 : 42)}
            color={colors1.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setVisible(false)}
      >
        <View
          style={[
            styles.modalOverlay,
            {
              paddingBottom: insets.bottom,
              backgroundColor: myOverlay
                ? 'rgba(23,21,47,0.45)'
                : 'rgba(26, 24, 24, 0.25)',
            },
          ]}
        >
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setVisible(false)}
          />

          <View style={styles.bottomSheet}>
            <View style={styles.dragHandle} />

            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderIcon}>
                <Icon
                  name="category"
                  size={sizeHelper.calHp(45)}
                  color={colors1.primary}
                />
              </View>

              <View style={styles.modalHeaderText}>
                <Text style={styles.modalTitle}>Select Category</Text>
                <Text style={styles.modalSubtitle}>
                  Choose the category for your expense
                </Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setVisible(false)}
                activeOpacity={0.7}
              >
                <Icon
                  name="close"
                  size={sizeHelper.calHp(44)}
                  color={colors1.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={categories}
              keyExtractor={item => item.Id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalList}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No Category found</Text>
              }
              initialNumToRender={30}
              keyboardShouldPersistTaps="handled"
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
                    activeOpacity={0.7}
                    style={[
                      styles.modalCategoryRow,
                      isSelected && styles.modalSelectedRow,
                    ]}
                    onPress={() => handleSelect(item.Id)}
                  >
                    <View
                      style={[
                        styles.modalCategoryIcon,
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

                    <Text style={styles.modalCategoryName} numberOfLines={1}>
                      {item.Name}
                    </Text>

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

export default CategorySelector;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: sizeHelper.calHp(25),
    paddingHorizontal: sizeHelper.calWp(35),
  },

  compactContainer: {
    flex: 1,
    width: '100%',
    marginTop: 0,
    paddingHorizontal: 0,
  },

  title: {
    fontSize: sizeHelper.calHp(30),
    fontWeight: '700',
    color: colors1.text,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },

  CateCon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(30),
  },

  compactCateCon: {
    marginBottom: 0,
    alignItems: 'stretch',
  },

  inputWrapper: {
    marginTop: sizeHelper.calHp(22),
    minHeight: sizeHelper.calHp(145),
    borderRadius: sizeHelper.calHp(35),
    backgroundColor: colors1.white,
    width: '102%',
    borderWidth: 1,
    borderColor: colors1.border,
    paddingHorizontal: sizeHelper.calWp(22),
    flexDirection: 'row',
    alignItems: 'center',
  },

  compactInputWrapper: {
    marginTop: 0,
    minHeight: sizeHelper.calHp(85),
    width: '100%',
    borderRadius: sizeHelper.calHp(18),
    paddingHorizontal: sizeHelper.calWp(9),
    borderColor: colors1.border,
  },

  categoryIcon: {
    marginRight: sizeHelper.calWp(10),
  },

  inputText: {
    flex: 1,
    fontSize: sizeHelper.calHp(30),
    fontWeight: '400',
    fontFamily: 'PlusJakartaSans-Regular',
    color: colors1.text,
  },

  compactInputText: {
    fontSize: sizeHelper.calHp(26),
    fontWeight: 'bold',
  },

  placeholder: {
    color: '#000000c5',
    fontWeight: '400',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  bottomSheet: {
    maxHeight: '75%',
    width: '100%',
    backgroundColor: colors1.white,
    borderTopLeftRadius: sizeHelper.calHp(50),
    borderTopRightRadius: sizeHelper.calHp(50),
    paddingHorizontal: sizeHelper.calWp(38),
    paddingTop: sizeHelper.calHp(30),
  },

  dragHandle: {
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

  modalHeaderIcon: {
    width: sizeHelper.calWp(130),
    height: sizeHelper.calHp(100),
    borderRadius: sizeHelper.calHp(100),
    backgroundColor: colors1.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalHeaderText: {
    flex: 1,
    marginLeft: sizeHelper.calWp(28),
  },

  emptyText: {
    textAlign: 'center',
    paddingVertical: sizeHelper.calHp(50),
    color: colors.textSecondary,
    fontFamily: 'PlusJakartaSans-Regular',
  },

  modalTitle: {
    fontSize: sizeHelper.calHp(40),
    fontWeight: '800',
    color: colors1.text,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },

  modalSubtitle: {
    fontSize: sizeHelper.calHp(27),
    color: colors1.textSecondary,
    marginTop: sizeHelper.calHp(8),
    fontFamily: 'PlusJakartaSans-Regular',
  },

  closeButton: {
    width: sizeHelper.calWp(110),
    height: sizeHelper.calHp(90),
    borderRadius: sizeHelper.calHp(50),
    backgroundColor: colors1.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalList: {
    paddingBottom: sizeHelper.calHp(25),
  },

  modalCategoryRow: {
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

  modalSelectedRow: {
    backgroundColor: colors1.primaryLight,
    borderColor: colors1.primary,
  },

  modalCategoryIcon: {
    width: sizeHelper.calWp(100),
    height: sizeHelper.calHp(80),
    borderRadius: sizeHelper.calHp(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: sizeHelper.calWp(35),
  },

  modalCategoryName: {
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
