import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import { AppText } from '../ui';
import DatePicker from './DatePicker';

/** Screen title + optional subtitle, with an optional date picker on the right. */
const LeadgerHeader = ({
  title,
  subTitle,
  gaping = true,
  date,
  setDate,
  showDate,
  setShowDate,
  showTime,
  setShowTime,
}) => {
  return (
    <View style={gaping ? styles.header : styles.lowGap}>
      <View style={styles.titleContainer}>
        <AppText variant="h1" numberOfLines={2} style={styles.title}>
          {title}
        </AppText>

        {subTitle ? (
          <AppText
            variant="body"
            color="textSecondary"
            numberOfLines={2}
            style={styles.subTitle}
          >
            {subTitle}
          </AppText>
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
  );
};

export default LeadgerHeader;

const styles = StyleSheet.create({
  header: {
    minHeight: 66,
    marginHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },

  lowGap: {
    minHeight: 18,
  },

  titleContainer: {
    flex: 1,
    minWidth: 0,
    marginRight: theme.spacing.md,
    justifyContent: 'center',
  },

  title: {
    marginTop: theme.spacing.lg,
  },

  subTitle: {
    marginTop: theme.spacing.xxs,
    marginBottom: theme.spacing.md,
  },

  dateContainer: {
    width: '39%',
    marginTop: theme.spacing.md,
    flexShrink: 0,
  },
});
