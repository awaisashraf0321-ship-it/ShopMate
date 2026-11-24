import React from 'react';
import { StyleSheet, View, Pressable, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { AppText, FormField } from '../ui';
import { t } from '../i18n';

const { colors, spacing, radius, sizes, shadows } = theme;

const DEFAULT_STYLE = {
  icon: 'category',
  color: colors.primarySoft,
  iconColor: colors.primary,
};

/**
 * Category field + bottom-sheet picker.
 *
 * selectedIcon(name) -> { icon, color, iconColor } styles each category.
 * compact: the small inline version used inside the Monthly Budget form.
 */
const CategorySelector = ({
  categories = [],
  category,
  selectedIcon,
  setCategory,
  title,
  placeholder,
  visible,
  setVisible,
  compact = false,
}) => {
  const insets = useSafeAreaInsets();
  // The compact field sits under its own "Category" label, so keep it short.
  const placeholderText =
    placeholder ?? (compact ? 'Select' : 'Select a Category');
  const styleFor = name =>
    (typeof selectedIcon === 'function' && selectedIcon(name)) || DEFAULT_STYLE;

  const selected = categories.find(cat => cat.Id === category);
  const current = selected ? styleFor(selected.Name) : DEFAULT_STYLE;

  const handleSelect = id => {
    setCategory(id);
    setVisible(false);
  };

  const field = (
    <Pressable
      style={({ pressed }) => [
        styles.field,
        compact && styles.fieldCompact,
        pressed && styles.pressed,
      ]}
      onPress={() => setVisible(true)}
      accessibilityRole="button"
      accessibilityLabel={`${title || 'Category'}: ${
        selected?.Name || 'none selected'
      }. Choose category`}
    >
      <Icon
        name={current.icon}
        size={compact ? sizes.icon.sm : sizes.icon.md}
        color={selected ? current.iconColor : colors.textMuted}
      />
      <AppText
        variant={compact ? 'caption' : 'body'}
        color={selected ? 'textPrimary' : 'textMuted'}
        numberOfLines={1}
        style={styles.fieldText}
      >
        {selected?.Name || placeholderText}
      </AppText>
      <Icon
        name="keyboard-arrow-down"
        size={compact ? sizes.icon.sm : sizes.icon.lg}
        color={colors.textMuted}
      />
    </Pressable>
  );

  const sheet = (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.overlay}>
        <Pressable
          style={styles.backdrop}
          onPress={() => setVisible(false)}
          accessibilityLabel="Close"
        />
        <View
          style={[styles.sheet, { paddingBottom: insets.bottom + spacing.md }]}
        >
          <View style={styles.handle} />

          <View style={styles.sheetHeader}>
            <View style={styles.sheetIcon}>
              <Icon
                name="category"
                size={sizes.icon.md}
                color={colors.primary}
              />
            </View>
            <View style={styles.flex}>
              <AppText variant="title">{t('category.select')}</AppText>
              <AppText variant="caption" color="textSecondary">
                {t('category.choose')}
              </AppText>
            </View>
            <Pressable
              onPress={() => setVisible(false)}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Icon
                name="close"
                size={sizes.icon.lg}
                color={colors.textMuted}
              />
            </Pressable>
          </View>

          <FlatList
            data={categories}
            keyExtractor={item => item.Id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            initialNumToRender={30}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <AppText
                color="textSecondary"
                align="center"
                style={styles.empty}
              >
                {t('category.none')}
              </AppText>
            }
            renderItem={({ item }) => {
              const isSelected = category === item.Id;
              const itemStyle = styleFor(item.Name);
              return (
                <Pressable
                  style={({ pressed }) => [
                    styles.row,
                    isSelected && styles.rowSelected,
                    pressed && styles.pressed,
                  ]}
                  onPress={() => handleSelect(item.Id)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={item.Name}
                >
                  <View
                    style={[
                      styles.rowIcon,
                      {
                        backgroundColor: itemStyle.color || colors.primarySoft,
                      },
                    ]}
                  >
                    <Icon
                      name={itemStyle.icon}
                      size={sizes.icon.md}
                      color={itemStyle.iconColor}
                    />
                  </View>
                  <AppText
                    variant="bodyStrong"
                    numberOfLines={1}
                    style={styles.flex}
                  >
                    {item.Name}
                  </AppText>
                  <View style={[styles.rowEnd, isSelected && styles.rowEndOn]}>
                    <Icon
                      name={isSelected ? 'check' : 'chevron-right'}
                      size={sizes.icon.sm}
                      color={isSelected ? colors.onPrimary : colors.textMuted}
                    />
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );

  if (compact) {
    return (
      <View style={styles.flex}>
        {field}
        {sheet}
      </View>
    );
  }
  return (
    <FormField label={title} style={styles.formField}>
      {field}
      {sheet}
    </FormField>
  );
};

export default CategorySelector;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  pressed: { opacity: 0.8 },
  formField: {
    marginTop: spacing.lg,
  },
  field: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fieldCompact: {
    minHeight: 52,
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
  },
  fieldText: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.overlay,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  sheet: {
    maxHeight: '75%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    ...shadows.lg,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  sheetIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  empty: {
    paddingVertical: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceMuted,
  },
  rowSelected: {
    backgroundColor: colors.primarySoft,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowEnd: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowEndOn: {
    backgroundColor: colors.primary,
  },
});
