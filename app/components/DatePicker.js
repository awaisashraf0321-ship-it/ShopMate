import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';
import { AppText, FormField } from '../ui';
import { t } from '../i18n';

const { colors, spacing, radius, sizes, shadows } = theme;

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const formatDate = d =>
  d ? `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}` : '';
const formatTime = d =>
  `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(
    2,
    '0',
  )}`;

const PickerRow = ({ icon, value, onPress, compact, label }) => (
  <Pressable
    style={({ pressed }) => [
      styles.box,
      compact && styles.compactBox,
      pressed && styles.pressed,
    ]}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={`${label}: ${value}. Change ${label.toLowerCase()}`}
  >
    <Icon
      name={icon}
      size={compact ? sizes.icon.sm : sizes.icon.md}
      color={compact ? colors.textPrimary : colors.textSecondary}
    />
    <AppText
      variant={compact ? 'caption' : 'body'}
      numberOfLines={1}
      adjustsFontSizeToFit
      minimumFontScale={0.75}
      // A fixed lineHeight makes iOS over-shrink adjustsFontSizeToFit text.
      style={[styles.value, styles.autoLine, compact && styles.compactValue]}
    >
      {value}
    </AppText>
    <Icon
      name={compact ? 'keyboard-arrow-down' : 'chevron-right'}
      size={compact ? sizes.icon.sm : sizes.icon.md}
      color={colors.textMuted}
    />
  </Pressable>
);

/**
 * Date (and optional time) field. `compact` is the small pill used next to
 * screen titles; otherwise it renders as a labelled form field.
 */
const DatePicker = ({
  showDate,
  setShowDate,
  showTime,
  timePicker = true,
  setShowTime,
  date,
  setDate,
  compact = false,
}) => {
  const rows = (
    <>
      <PickerRow
        icon="calendar-today"
        label={t('field.date')}
        value={formatDate(date)}
        compact={compact}
        onPress={() => setShowDate(true)}
      />
      {timePicker && (
        <View style={styles.timeRow}>
          <PickerRow
            icon="access-time"
            label={t('field.time')}
            value={formatTime(date)}
            onPress={() => setShowTime(true)}
          />
        </View>
      )}

      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          accentColor={colors.primary}
          display="default"
          onChange={(event, selectedDate) => {
            setShowDate(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
      {showTime && timePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour={true}
          accentColor={colors.primary}
          display="default"
          onChange={(event, selectedTime) => {
            setShowTime(false);
            if (selectedTime) setDate(selectedTime);
          }}
        />
      )}
    </>
  );

  if (compact) {
    return <View style={styles.compactContainer}>{rows}</View>;
  }
  return (
    <FormField label={t('field.date')} style={styles.field}>
      {rows}
    </FormField>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  field: {
    marginTop: spacing.xs,
  },
  compactContainer: {
    flex: 1,
  },
  pressed: { opacity: 0.8 },
  // Same look as ui/TextField
  box: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  compactBox: {
    minHeight: 52,
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.none,
    elevation: 0,
  },
  value: {
    flex: 1,
  },
  autoLine: {
    lineHeight: undefined,
  },
  compactValue: {
    fontFamily: theme.fontFamily.semiBold,
  },
  timeRow: {
    marginTop: spacing.sm,
  },
});
