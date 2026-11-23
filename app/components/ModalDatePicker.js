import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import sizeHelper from '../helpers/sizeHelper';
import { theme } from '../theme';

const ModalDatePicker = ({ showDate, setShowDate, date, setDate }) => {
  const formatDate = d => {
    if (!d) return '';

    const months = [
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

    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dateBox}
        onPress={() => setShowDate(true)}
        activeOpacity={0.7}
      >
        <Icon
          name="calendar-today"
          size={sizeHelper.calHp(45)}
          color={theme.colors.primary}
          style={styles.calendarIcon}
        />

        <View style={styles.divider} />

        <Text style={styles.dateText}>{formatDate(date)}</Text>

        <Icon
          name="keyboard-arrow-down"
          size={sizeHelper.calHp(32)}
          color={theme.colors.textSecondary}
        />
      </TouchableOpacity>

      {showDate && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          accentColor={theme.colors.accent}
          onChange={(event, selectedDate) => {
            setShowDate(false);

            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
};

export default ModalDatePicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: sizeHelper.calHp(15),
  },

  label: {
    fontSize: sizeHelper.calHp(19),
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: sizeHelper.calHp(9),
  },

  dateBox: {
    width: '100%',
    minHeight: sizeHelper.calHp(130),
    backgroundColor: theme.colors.warningSoft,
    borderRadius: sizeHelper.calHp(35),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(18),
  },

  calendarIcon: {
    marginRight: sizeHelper.calWp(18),
  },

  divider: {
    width: 1.5,
    height: sizeHelper.calHp(48),
    backgroundColor: theme.colors.border,
    marginRight: sizeHelper.calWp(18),
  },

  dateText: {
    flex: 1,
    fontSize: sizeHelper.calHp(30),
    fontWeight: '600',
    color: theme.colors.textPrimary,
    fontFamily: theme.fontFamily.regular,
  },
});
