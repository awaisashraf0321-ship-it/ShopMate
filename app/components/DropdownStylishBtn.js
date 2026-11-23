import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MODULE_OPTIONS, useModule } from './ModuleContext';
import { theme } from '../theme';
import { AppText, SegmentedControl } from '../ui';

const { colors, spacing, radius, shadows, sizes } = theme;

/**
 * Screen header used by every screen except the Dashboard (which has its
 * own greeting header in the same style). One row:
 *
 *   [back]  [Personal | Business switch]  [+]   main list screens
 *   [back]  [Title / subtitle]            [+]   detail, form, account screens
 *
 * The switch shows on the main list screens (`showDropdown`). Detail and
 * form screens turn it off (switching module there would throw the user out
 * of what they're doing) and show their big title just below the header.
 */
const DropdownStylishBtn = ({
  showDropdown = true,
  showBack = false,
  showPlus = false,
  onPlusPress,
  back,
  title,
  subTitle,
  Margin = true,
}) => {
  const { selectedModule, myModule } = useModule();
  const insets = useSafeAreaInsets();
  const showSwitch = showDropdown && !title;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing.sm,
          marginBottom: Margin ? spacing.lg : spacing.sm,
        },
      ]}
    >
      <View style={styles.row}>
        {showBack ? (
          <Pressable
            style={({ pressed }) => [
              styles.roundButton,
              pressed && styles.pressed,
            ]}
            onPress={back}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Icon
              name="chevron-left"
              size={sizes.icon.xl - 4}
              color={colors.textPrimary}
            />
          </Pressable>
        ) : null}

        {showSwitch ? (
          <View style={styles.middle}>
            <SegmentedControl
              options={MODULE_OPTIONS}
              value={selectedModule}
              onChange={value => {
                if (value !== selectedModule) myModule(value);
              }}
              size="sm"
            />
          </View>
        ) : title ? (
          <View style={[styles.middle, styles.titleBlock]}>
            <AppText variant="h2" numberOfLines={1}>
              {title}
            </AppText>
            {subTitle ? (
              <AppText
                variant="caption"
                color="textSecondary"
                numberOfLines={1}
              >
                {String(subTitle).trim()}
              </AppText>
            ) : null}
          </View>
        ) : (
          <View style={styles.middle} />
        )}

        {showPlus ? (
          <Pressable
            style={({ pressed }) => [
              styles.plusButton,
              pressed && styles.pressed,
            ]}
            onPress={onPlusPress}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Add new"
          >
            <Icon name="add" size={sizes.icon.lg} color={colors.onPrimary} />
          </Pressable>
        ) : showBack && showSwitch ? (
          // keeps the switch centred when there's a back button but no "+"
          <View style={styles.placeholder} />
        ) : null}
      </View>
    </View>
  );
};

export default DropdownStylishBtn;

const BUTTON = sizes.touchTarget; // 44pt, same as the Dashboard avatar

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    zIndex: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: BUTTON,
  },
  middle: {
    flex: 1,
    alignItems: 'center',
  },
  titleBlock: {
    alignItems: 'flex-start',
  },
  placeholder: {
    width: BUTTON,
    height: BUTTON,
  },
  pressed: { opacity: 0.7 },
  roundButton: {
    width: BUTTON,
    height: BUTTON,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  plusButton: {
    width: BUTTON,
    height: BUTTON,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
});
