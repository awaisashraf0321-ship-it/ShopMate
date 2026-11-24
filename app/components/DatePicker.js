import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../theme/colors';
import colors1 from '../theme/myColors';
import sizeHelper from '../helpers/sizeHelper';

const DatePicker = ({
  showDate,
  setShowDate,
  showTime,
  timePicker = true,
  setShowTime,
  date,
  style,
  style2,
  setDate,
  DateStyle,
  compact = false,
}) => {
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

  const formatTime = d => {
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      {!compact && <Text style={styles.label}>Date</Text>}

      <TouchableOpacity
        style={[styles.box, compact && styles.compactBox, style]}
        onPress={() => setShowDate(true)}
        activeOpacity={0.7}
      >
        <Icon
          name="calendar-today"
          size={sizeHelper.calHp(compact ? 30 : 38)}
          color={compact ? colors1.black : colors.textSecondary}
          style={[
            styles.calendarIcon,
            compact && styles.compactCalendarIcon,
            style2,
          ]}
        />

        <Text
          style={[styles.value, compact && styles.compactValue, DateStyle]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {formatDate(date)}
        </Text>

        <Icon
          name={compact ? 'keyboard-arrow-down' : 'chevron-right'}
          size={sizeHelper.calHp(compact ? 21 : 38)}
          color={compact ? colors1.textSecondary : colors.textSecondary}
        />
      </TouchableOpacity>

      {timePicker && (
        <TouchableOpacity
          style={[styles.box, styles.timeBox]}
          onPress={() => setShowTime(true)}
          activeOpacity={0.7}
        >
          <Icon
            name="access-time"
            size={sizeHelper.calHp(38)}
            color={colors.textSecondary}
          />

          <Text style={styles.value}>{formatTime(date)}</Text>

          <Icon
            name="chevron-right"
            size={sizeHelper.calHp(38)}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      )}

      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          accentColor={compact ? colors1.primary : colors.primaryGradientStart}
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
          accentColor={compact ? colors1.primary : colors.primaryGradientStart}
          display="default"
          onChange={(event, selectedTime) => {
            setShowTime(false);
            if (selectedTime) setDate(selectedTime);
          }}
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    marginTop: sizeHelper.calHp(10),
    marginHorizontal: sizeHelper.calWp(40),
  },

  compactContainer: {
    marginTop: sizeHelper.calHp(0),
    marginHorizontal: sizeHelper.calWp(0),
    flex: 1,
  },

  label: {
    fontSize: sizeHelper.calHp(30),
    fontWeight: '500',
    color: colors.textPrimary,
    marginHorizontal: sizeHelper.calWp(20),
    marginBottom: sizeHelper.calHp(10),
  },

  box: {
    width: '100%',
    minHeight: sizeHelper.calHp(100),
    backgroundColor: colors.white,
    borderRadius: sizeHelper.calHp(45),
    shadowColor: colors.dark,
    shadowOffset: {
      width: sizeHelper.calWp(0),
      height: sizeHelper.calHp(3),
    },
    shadowRadius: 6,
    shadowOpacity: 0.09,
    elevation: 2,
    paddingHorizontal: sizeHelper.calWp(38),
    flexDirection: 'row',
    alignItems: 'center',
  },

  compactBox: {
    width: '100%',
    minHeight: sizeHelper.calHp(85),
    paddingHorizontal: sizeHelper.calWp(9),
    borderWidth: 1,
    borderColor: colors1.border,
    borderRadius: sizeHelper.calHp(14),
    backgroundColor: colors1.white,
    elevation: 0,
    shadowOpacity: 0,
  },

  calendarIcon: {
    marginRight: sizeHelper.calWp(35),
  },

  compactCalendarIcon: {
    marginLeft: sizeHelper.calWp(0),
    marginRight: sizeHelper.calWp(6),
  },

  value: {
    flex: 1,
    fontSize: sizeHelper.calHp(30),
    fontWeight: '400',
    marginLeft: sizeHelper.calWp(0),
    transform: [{ translateX: sizeHelper.calWp(-10) }],
    color: colors.textPrimary,
  },

  compactValue: {
    fontSize: sizeHelper.calHp(25),
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: '800',
    marginLeft: sizeHelper.calWp(10),
    transform: [{ translateX: 0 }],
    color: colors1.text,
  },

  timeBox: {
    marginTop: sizeHelper.calHp(15),
  },
});
