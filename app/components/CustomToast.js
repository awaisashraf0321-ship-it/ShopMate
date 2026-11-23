import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';
import { AppText } from '../ui';

const { colors, spacing, radius, shadows, sizes } = theme;

/** Themed toast. tone: 'success' (default) | 'error'. */
const CustomToast = ({ text1, text2, tone = 'success' }) => {
  const isError = tone === 'error';
  return (
    <View
      style={[
        styles.toast,
        { borderLeftColor: isError ? colors.danger : colors.success },
      ]}
      accessibilityRole="alert"
    >
      <Icon
        name={isError ? 'error-outline' : 'check-circle'}
        size={sizes.icon.lg}
        color={isError ? colors.danger : colors.success}
      />
      <View style={styles.text}>
        <AppText variant="bodyStrong">{text1}</AppText>
        {text2 ? (
          <AppText variant="caption" color="textSecondary">
            {text2}
          </AppText>
        ) : null}
      </View>
    </View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({
  toast: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderLeftWidth: 4,
    backgroundColor: colors.surface,
    ...shadows.md,
  },
  text: { flex: 1 },
});
