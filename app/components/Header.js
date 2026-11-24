import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';
import { AppText, SegmentedControl } from '../ui';
import { MODULE_OPTIONS, useModule, useSwitchModule } from './ModuleContext';

const AVATAR = 44;

/**
 * Dashboard header, one row: greeting, Personal | Business module switch,
 * and the avatar (opens Profile).
 * Dev builds only: long-press the greeting to open the style guide.
 */
const Header = ({ navigation, title, subTitle, initial }) => {
  const insets = useSafeAreaInsets();
  const { selectedModule } = useModule();
  const switchModule = useSwitchModule();

  return (
    <View
      style={[styles.container, { paddingTop: insets.top + theme.spacing.sm }]}
    >
      <View style={styles.row}>
        <Pressable
          style={styles.text}
          onLongPress={
            __DEV__ ? () => navigation.navigate('StyleGuide') : undefined
          }
          accessible={false}
        >
          <AppText variant="caption" color="textSecondary">
            {title}
          </AppText>
          <AppText variant="title" numberOfLines={1}>
            {subTitle}
          </AppText>
        </Pressable>

        <SegmentedControl
          options={MODULE_OPTIONS}
          value={selectedModule}
          onChange={switchModule}
          size="sm"
        />

        <Pressable
          onPress={() => navigation.navigate('Profile')}
          accessibilityRole="button"
          accessibilityLabel="Open profile"
          hitSlop={8}
          style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}
        >
          {initial ? (
            <AppText variant="subtitle" color="primary">
              {initial}
            </AppText>
          ) : (
            <Icon
              name="person"
              size={theme.sizes.icon.lg}
              color={theme.colors.primary}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    backgroundColor: theme.colors.primarySoft,
    borderWidth: 2,
    borderColor: theme.colors.surface,
    marginLeft: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  pressed: { opacity: 0.7 },
});
