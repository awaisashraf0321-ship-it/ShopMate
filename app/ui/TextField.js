import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme';
import FormField from './FormField';

/**
 * The app's one text input: optional label, leading icon, error message,
 * and a show/hide toggle for passwords. Same look as the other form fields.
 *
 *   <TextField label="Email" icon="email" value={v} onChangeText={set}
 *     error={touched && errors.email} keyboardType="email-address" />
 *   <TextField label="Password" icon="lock" password value={p} onChangeText={setP} />
 *
 * inset: true (default) adds the screen's side margin; false when the field
 * already sits inside a padded card.
 */
export default function TextField({
  label,
  icon,
  value,
  onChangeText,
  onBlur,
  onFocus,
  placeholder,
  password = false,
  keyboardType,
  maxLength,
  autoCapitalize = 'none',
  editable = true,
  error,
  hint,
  inset = true,
  style,
  ...rest
}) {
  const { colors, spacing, radius, typography, sizes } = useTheme();
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);

  const borderColor = error
    ? colors.danger
    : focused
    ? colors.primary
    : colors.border;

  return (
    <FormField
      label={label}
      error={error || undefined}
      hint={hint}
      style={[{ marginBottom: spacing.md }, !inset && styles.noInset, style]}
    >
      <View
        style={[
          styles.box,
          {
            borderColor,
            borderRadius: radius.lg,
            paddingHorizontal: spacing.md,
            gap: spacing.sm,
            backgroundColor: editable ? colors.surface : colors.surfaceMuted,
          },
        ]}
      >
        {icon ? (
          <Icon
            name={icon}
            size={sizes.icon.md}
            color={focused ? colors.primary : colors.textMuted}
          />
        ) : null}
        <TextInput
          style={[
            styles.input,
            typography.body,
            { color: colors.textPrimary, lineHeight: undefined },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={password && hidden}
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          editable={editable}
          accessibilityLabel={label || placeholder}
          onFocus={e => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={e => {
            setFocused(false);
            onBlur?.(e);
          }}
          underlineColorAndroid={colors.transparent}
          {...rest}
        />
        {password ? (
          <Pressable
            onPress={() => setHidden(h => !h)}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
          >
            <Icon
              name={hidden ? 'visibility-off' : 'visibility'}
              size={sizes.icon.md}
              color={colors.textMuted}
            />
          </Pressable>
        ) : null}
      </View>
    </FormField>
  );
}

const styles = StyleSheet.create({
  noInset: { marginHorizontal: 0 },
  box: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
});
