import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import sizeHelper from '../helpers/sizeHelper';
import colors from '../theme/colors';
import DatePicker from './DatePicker';

const LeadgerHeader = ({
  btn = true,
  onSave,
  title,
  subTitle,
  btnText = 'Save',
  gaping = true,
  date,
  setDate,
  showDate,
  setShowDate,
  showTime,
  setShowTime,
}) => {
  return (
    <View style={styles.safeContainer}>
      <View style={gaping ? styles.header : styles.lowGap}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>

          {subTitle ? (
            <Text numberOfLines={2} style={styles.subTitle}>
              {subTitle}
            </Text>
          ) : null}
        </View>

        {date && setDate && (
          <View style={styles.dateContainer}>
            <DatePicker
              showDate={showDate}
              setShowDate={setShowDate}
              showTime={showTime}
              setShowTime={setShowTime}
              setDate={setDate}
              date={date}
              timePicker={false}
              compact={true}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default LeadgerHeader;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: 'transparent',
  },

  header: {
    minHeight: sizeHelper.calHp(145),
    marginHorizontal: sizeHelper.calWp(25),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'visible',
  },

  lowGap: {
    minHeight: sizeHelper.calHp(40),
  },

  titleContainer: {
    flex: 1,
    minWidth: 0,
    marginLeft: sizeHelper.calWp(15),
    marginRight: sizeHelper.calWp(12),
    justifyContent: 'center',
  },

  title: {
    fontSize: sizeHelper.calHp(54),
    fontWeight: 'bold',
    marginTop: sizeHelper.calHp(35),
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: colors.dark,
  },

  subTitle: {
    marginTop: sizeHelper.calHp(4),
    fontSize: sizeHelper.calHp(32),
    color: '#64718A',
    marginBottom: sizeHelper.calHp(30),
    fontFamily: 'PlusJakartaSans-Regular',
  },

  dateContainer: {
    width: '39%',
    marginTop: sizeHelper.calHp(30),
    flexShrink: 0,
  },
});
