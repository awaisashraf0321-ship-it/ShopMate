import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';
import { FormField } from '../ui';

const { colors, spacing, radius, sizes, typography } = theme;

/** Multi-line note field with an optional "Note" label. */
const NoteInput = ({
  onFocus,
  onBlur,
  note,
  setNote,
  placeholder = 'e.g. invoice #1042, partial payment',
  style,
  myNote = true,
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <FormField label={myNote ? 'Note' : undefined}>
      <View style={[styles.box, focused && styles.boxFocused, style]}>
        <TextInput
          style={styles.input}
          value={note}
          onChangeText={setNote}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          accessibilityLabel="Note"
          onFocus={e => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={e => {
            setFocused(false);
            onBlur?.(e);
          }}
        />
        <Icon name="edit" size={sizes.icon.sm + 2} color={colors.textMuted} />
      </View>
    </FormField>
  );
};

export default NoteInput;

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  boxFocused: {
    borderColor: colors.primary,
  },
  input: {
    flex: 1,
    minHeight: 64,
    padding: 0,
    ...typography.body,
    color: colors.textPrimary,
  },
});
