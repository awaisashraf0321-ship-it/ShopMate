import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import sizeHelper from '../helpers/sizeHelper';
import colors from '../theme/colors';

const PaymentSummaryCard = ({
  totalAmount,
  totalTransactions,
  formatAmount,

  methods,
  setVisible,
  selectedPeriod,
  paymentType,
  paymentPercentage,

  paymentText,
}) => {
  const getAmount = id => {
    const item = methods?.find(item => item.PaymentMethodId === id);
    const percentage =
      paymentPercentage === 'Outgoing'
        ? item?.OutgoingPercentage
        : paymentPercentage === 'Ingoing'
        ? item?.IncomingPercentage
        : paymentPercentage === 'Self'
        ? item?.Percentage
        : item?.Percentage;
    return Number(percentage ?? 0);
  };

  const cashPercentage = getAmount(1);
  const bankPercentage = getAmount(2);
  const creditPercentage = getAmount(3);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* --- HEADER SECTION --- */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title} numberOfLines={1}>
              {paymentText}
            </Text>

            <Text
              style={styles.totalAmount}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.65}
            >
              Rs {formatAmount(totalAmount)}
            </Text>

            <Text style={styles.subtitle}>{totalTransactions} payments</Text>
          </View>

          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={styles.periodButton}
          >
            <Text style={styles.periodText} numberOfLines={1}>
              {selectedPeriod}
            </Text>
            <Icon
              style={styles.chevron}
              name="keyboard-arrow-down"
              size={sizeHelper.calHp(30)}
              color={colors.summaryText || '#FFFFFF'}
            />
          </TouchableOpacity>
        </View>

        {/* --- PROGRESS BAR SECTION --- */}
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressSegment,
              styles.cashSegment,
              { flex: cashPercentage },
            ]}
          />
          <View
            style={[
              styles.progressSegment,
              styles.bankSegment,
              { flex: bankPercentage },
            ]}
          />
          <View
            style={[
              styles.progressSegment,
              styles.creditSegment,
              { flex: creditPercentage },
            ]}
          />
        </View>

        {/* --- BOTTOM CATEGORIES --- */}
        <View style={styles.paymentMethods}>
          {methods?.map(item => {
            const amount =
              paymentType === 'Outgoing'
                ? item?.OutgoingAmount
                : paymentType === 'Self'
                ? item?.Amount
                : paymentType === 'Business'
                ? item?.Amount
                : item?.IncomingAmount;

            return (
              <View style={styles.methodItem} key={item.PaymentMethodId}>
                <View style={styles.methodLabel}>
                  <View
                    style={
                      item.PaymentMethodId === 1
                        ? styles.cashDot
                        : item.PaymentMethodId === 2
                        ? styles.bankDot
                        : styles.creditDot
                    }
                  />

                  <Text style={styles.methodText} numberOfLines={1}>
                    {item.PaymentMethodName}
                  </Text>
                </View>

                <Text style={styles.methodAmount} numberOfLines={1}>
                  Rs {formatAmount(amount ?? 0)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default PaymentSummaryCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: sizeHelper.calHp(40),
    marginBottom: sizeHelper.calHp(15),
  },

  card: {
    width: '100%',
    height: sizeHelper.calHp(450),
    backgroundColor: colors.summaryBackground,
    borderRadius: sizeHelper.calHp(44),
    paddingHorizontal: sizeHelper.calWp(22),
    paddingVertical: sizeHelper.calHp(22),
    overflow: 'hidden',
    justifyContent: 'space-between',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  headerContent: {
    flex: 1,
    minWidth: 0,
    paddingRight: sizeHelper.calWp(10),
  },

  title: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: sizeHelper.calHp(30),
    marginTop: sizeHelper.calHp(15),
    fontWeight: '600',
    marginLeft: sizeHelper.calWp(20),
    color: colors.summaryTextSecondary || '#E5D9FF',
    marginBottom: sizeHelper.calHp(4),
  },

  totalAmount: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: sizeHelper.calHp(70),
    color: colors.summaryText || '#FFFFFF',
    marginTop: sizeHelper.calHp(2),
    marginLeft: sizeHelper.calWp(20),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  subtitle: {
    fontFamily: 'JhatakaSans-Regular',
    fontSize: sizeHelper.calHp(31),
    color: colors.summaryTextSecondary || '#D8CCFF',
    marginTop: sizeHelper.calHp(6),
    marginLeft: sizeHelper.calWp(20),
  },

  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: sizeHelper.calHp(70),
    marginRight: sizeHelper.calWp(20),
    paddingHorizontal: sizeHelper.calWp(30),
    borderRadius: sizeHelper.calHp(30),
    backgroundColor: colors.filterColor,
    marginTop: sizeHelper.calHp(10),
  },

  periodText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: sizeHelper.calHp(24),
    fontWeight: 'bold',
    color: colors.summaryText || '#FFFFFF',
    marginRight: sizeHelper.calWp(4),
  },

  progressContainer: {
    flexDirection: 'row',
    width: '95%',
    height: sizeHelper.calHp(15),
    marginTop: sizeHelper.calHp(28),
    marginBottom: sizeHelper.calHp(24),
    gap: sizeHelper.calWp(10),
    marginLeft: sizeHelper.calWp(20),
    overflow: 'hidden',
  },

  progressSegment: {
    height: '100%',
    borderRadius: sizeHelper.calHp(5),
  },

  bankSegment: {
    backgroundColor: colors.summaryTrackActive,
  },

  creditSegment: {
    backgroundColor: colors.summaryCreditCard1,
  },

  cashSegment: {
    backgroundColor: colors.summarycash,
  },

  paymentMethods: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  methodItem: {
    flex: 1,
    minWidth: 0,
    paddingRight: sizeHelper.calWp(5),
  },

  methodLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(8),
  },

  bankDot: {
    width: sizeHelper.calWp(18),
    height: sizeHelper.calHp(18),
    borderRadius: sizeHelper.calHp(10),
    backgroundColor: colors.summaryTrackActive,
    marginLeft: sizeHelper.calWp(22),
    marginTop: sizeHelper.calHp(10),
    marginRight: sizeHelper.calWp(6),
  },

  creditDot: {
    width: sizeHelper.calWp(18),
    height: sizeHelper.calHp(18),
    marginLeft: sizeHelper.calWp(20),
    borderRadius: sizeHelper.calHp(10),
    backgroundColor: colors.creditCard,
    marginRight: sizeHelper.calWp(6),
  },

  cashDot: {
    marginLeft: sizeHelper.calWp(20),
    width: sizeHelper.calWp(18),
    height: sizeHelper.calHp(18),
    borderRadius: sizeHelper.calHp(10),
    backgroundColor: colors.summarycash,
    marginRight: sizeHelper.calWp(6),
  },

  methodText: {
    flex: 1,
    marginLeft: sizeHelper.calWp(10),
    fontFamily: 'PlusJakarta-Regular',
    fontSize: sizeHelper.calHp(26),
    color: colors.summaryTextSecondary || '#D8CCFF',
  },

  methodAmount: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: sizeHelper.calHp(30),
    color: colors.summaryText || '#FFFFFF',
    fontWeight: 'bold',
    marginTop: sizeHelper.calHp(5),
    marginLeft: sizeHelper.calWp(25),
    marginBottom: sizeHelper.calHp(25),
  },

  chevron: {
    marginLeft: sizeHelper.calWp(6),
  },
});
