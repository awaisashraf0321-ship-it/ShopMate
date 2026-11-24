import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import sizeHelper from '../helpers/sizeHelper';
import colors from '../theme/colors';

const DashboardCard = ({
  formatAmount,
  netBalance,
  MoneyIn,
  MoneyOut,
  getDateRange,
  selectedPeriod,
  setSelectedPeriod,
  formatDate,
}) => {
  const { fromDate, toDate } = getDateRange(selectedPeriod);

  const handlePrevious = () => {
    if (selectedPeriod === 'Month') {
      setSelectedPeriod('Week');
    } else if (selectedPeriod === 'Week') {
      setSelectedPeriod('Today');
    }
  };

  const handleNext = () => {
    if (selectedPeriod === 'Today') {
      setSelectedPeriod('Week');
    } else if (selectedPeriod === 'Week') {
      setSelectedPeriod('Month');
    }
  };

  const isPreviousDisabled = selectedPeriod === 'Today';
  const isNextDisabled = selectedPeriod === 'Month';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Date navigation */}
        <View style={styles.dateRow}>
          <TouchableOpacity
            style={[
              styles.dateButton,
              isPreviousDisabled && styles.disabledButton,
            ]}
            disabled={isPreviousDisabled}
            onPress={handlePrevious}
          >
            <Icon
              name="chevron-back"
              size={sizeHelper.calHp(40)}
              color={isPreviousDisabled ? '#FFFFFF55' : '#FFFFFF'}
            />
          </TouchableOpacity>

          <View style={styles.dateCenter}>
            <Text style={styles.dateText}>
              {fromDate === toDate
                ? formatDate(fromDate)
                : `${formatDate(fromDate)} - ${formatDate(toDate)}`}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.dateButton, isNextDisabled && styles.disabledButton]}
            disabled={isNextDisabled}
            onPress={handleNext}
          >
            <Icon
              name="chevron-forward"
              size={sizeHelper.calHp(40)}
              color={isNextDisabled ? '#FFFFFF55' : '#FFFFFF'}
            />
          </TouchableOpacity>
        </View>

        {/* Total Balance */}
        <Text style={styles.balanceLabel}>Net Balance</Text>

        <Text style={styles.balanceAmount} numberOfLines={1}>
          Rs {formatAmount(netBalance)}
        </Text>

        {/* Money In and Money Out */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <View style={styles.summaryTitleRow}>
              <Icon
                name="arrow-down-outline"
                size={sizeHelper.calHp(43)}
                color="#D8CCFF"
              />
              <Text style={styles.summaryLabel}>Money in</Text>
            </View>

            <Text style={styles.summaryAmount} numberOfLines={1}>
              Rs {formatAmount(MoneyIn)}
            </Text>
          </View>

          <View style={styles.summaryBox}>
            <View style={styles.summaryTitleRow}>
              <Icon
                name="arrow-up-outline"
                size={sizeHelper.calHp(43)}
                color="#D8CCFF"
              />
              <Text style={styles.summaryLabel}>Money out</Text>
            </View>

            <Text style={styles.summaryAmount} numberOfLines={1}>
              Rs {formatAmount(MoneyOut)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashboardCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: sizeHelper.calHp(12),
  },

  card: {
    width: '94%',
    backgroundColor: colors.summaryBackground || '#4A24B8',
    borderRadius: sizeHelper.calHp(46),
    paddingVertical: sizeHelper.calHp(20),
    paddingHorizontal: sizeHelper.calWp(20),
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: sizeHelper.calHp(22),
  },

  dateCenter: {
    flex: 1,
    alignItems: 'center',
  },

  periodLabel: {
    color: colors.summaryTextSecondary,
    fontSize: sizeHelper.calHp(23),
    marginBottom: sizeHelper.calHp(4),
  },

  dateButton: {
    width: sizeHelper.calWp(85),
    height: sizeHelper.calHp(85),
    borderRadius: sizeHelper.calHp(23),
    marginTop: sizeHelper.calHp(10),
    marginHorizontal: sizeHelper.calWp(10),
    borderWidth: 1,
    borderColor: colors.BorderColor,
    backgroundColor: colors.dateBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledButton: {
    opacity: 0.45,
  },

  dateText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: sizeHelper.calHp(30),
    fontWeight: '600',
  },

  balanceLabel: {
    color: colors.summaryTextSecondary,
    fontSize: sizeHelper.calHp(28),
    fontFamily: 'Poppins-Regular',
  },

  balanceAmount: {
    color: colors.white,
    fontSize: sizeHelper.calHp(65),
    fontWeight: '700',
    fontFamily: 'Poppins-SemiBold',
    marginTop: sizeHelper.calHp(3),
    marginBottom: sizeHelper.calHp(20),
  },

  summaryRow: {
    flexDirection: 'row',
    gap: sizeHelper.calWp(10),
  },

  summaryBox: {
    flex: 1,
    minWidth: 0,
    paddingVertical: sizeHelper.calHp(23),
    paddingHorizontal: sizeHelper.calWp(23),
    borderRadius: sizeHelper.calHp(27),
    backgroundColor: colors.summarybox,
    marginBottom: sizeHelper.calHp(20),
  },

  summaryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizeHelper.calWp(5),
    marginBottom: sizeHelper.calHp(8),
  },

  summaryLabel: {
    color: colors.summaryTextSecondary,
    fontSize: sizeHelper.calHp(25),
    flexShrink: 1,
  },

  summaryAmount: {
    color: colors.white,
    fontSize: sizeHelper.calHp(31),
    fontWeight: 'bold',
    marginLeft: sizeHelper.calWp(10),
  },
});
