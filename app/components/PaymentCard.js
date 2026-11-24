import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Swipeable } from 'react-native-gesture-handler';

import colors from '../theme/colors';
import sizeHelper from '../helpers/sizeHelper';

const PaymentCard = ({
  sentTo,
  paymentMode,
  amount,
  getPaymentModeIcon,
  onDelete,
  onPress,
  formatDate,
  handleBudgetUpdate,
  categoryId,
  editDisabled,
  formatAmount,
  budgetId,
  selectedIcon,
  editBtn = false,
  setEditModalVisible,
  date,
}) => {
  const swipeRef = useRef(null);

  const matching =
    typeof selectedIcon === 'function' ? selectedIcon(sentTo) : 0;

  const name = String(sentTo || 'Unknown');

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();

  const mode = String(paymentMode || '').toLowerCase();

  const isCash = mode.includes('cash');
  const isBank =
    mode.includes('bank') ||
    mode.includes('transfer') ||
    mode.includes('online');
  const isCard =
    mode.includes('card') || mode.includes('credit') || mode.includes('debit');

  const avatarColor = isCash
    ? '#FFEBD5'
    : isBank
    ? '#DCEAFF'
    : isCard
    ? '#DDF5E8'
    : '#EDE7FF';

  const avatarTextColor = isCash
    ? '#A45A16'
    : isBank
    ? '#285BAA'
    : isCard
    ? '#247B52'
    : '#4A24B8';

  const paymentIcon = isCash
    ? 'payments'
    : isBank
    ? 'account-balance'
    : isCard
    ? 'credit-card'
    : 'payment';

  const renderRightActions = () => (
    <View style={styles.swipeActions}>
      {editBtn && (
        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.8}
          disabled={editDisabled}
          onPress={() => {
            swipeRef.current?.close();
            handleBudgetUpdate?.();
            setEditModalVisible(true);
          }}
        >
          <Icon name="edit" size={sizeHelper.calHp(45)} color="#FFFFFF" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.deleteButton}
        activeOpacity={0.8}
        onPress={onDelete}
      >
        <Icon
          name="delete-outline"
          size={sizeHelper.calHp(45)}
          color="#FFFFFF"
        />
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <Swipeable
          ref={swipeRef}
          renderRightActions={renderRightActions}
          overshootRight={false}
          containerStyle={styles.swipeContainer}
          rightThreshold={sizeHelper.calHp(40)}
        >
          <TouchableOpacity
            onPress={onPress}
            style={styles.row}
            activeOpacity={0.8}
          >
            {/* Initials avatar */}
            <View
              style={[
                styles.avatar,
                {
                  backgroundColor: matching.color || avatarColor,
                },
              ]}
            >
              {matching?.icon ? (
                <Icon
                  name={matching.icon}
                  size={sizeHelper.calHp(45)}
                  color={matching.iconColor}
                />
              ) : (
                <Text style={[styles.initials, { color: avatarTextColor }]}>
                  {initials || 'U'}
                </Text>
              )}
            </View>

            {/* Payee name and payment method */}
            <View style={styles.details}>
              <Text
                style={styles.receiverName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {name}
              </Text>

              {date ? (
                <View style={styles.paymentInfo}>
                  <Icon
                    name="calendar-today"
                    size={sizeHelper.calHp(40)}
                    color="#85839A"
                  />

                  <Text
                    style={styles.paymentMode}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {formatDate(date)}
                  </Text>
                </View>
              ) : (
                <View style={styles.paymentInfo}>
                  <Icon
                    name={paymentIcon}
                    size={sizeHelper.calHp(32)}
                    color="#85839A"
                  />

                  <Text
                    style={styles.paymentMode}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {paymentMode || 'Payment'}
                  </Text>
                </View>
              )}
            </View>

            {/* Outgoing amount */}
            <View style={styles.amountWrap}>
              <Text
                style={styles.amount}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
              >
                Rs {formatAmount?.(amount)}
              </Text>
            </View>
          </TouchableOpacity>
        </Swipeable>

        <View style={styles.rowDivider} />
      </View>
    </View>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  cardWrapper: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },

  swipeContainer: {
    width: '100%',
  },

  row: {
    width: '100%',
    minHeight: sizeHelper.calHp(180),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sizeHelper.calHp(40),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: sizeHelper.calWp(30),
    paddingVertical: sizeHelper.calHp(30),
  },

  avatar: {
    width: sizeHelper.calHp(115),
    height: sizeHelper.calHp(115),
    borderRadius: sizeHelper.calHp(34),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: sizeHelper.calWp(24),
  },

  initials: {
    fontSize: sizeHelper.calHp(37),
    fontWeight: '700',
  },

  details: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },

  receiverName: {
    fontSize: sizeHelper.calHp(35),
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: colors.textPrimary || '#17142B',
    marginBottom: sizeHelper.calHp(14),
  },

  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },

  paymentMode: {
    flexShrink: 1,
    fontSize: sizeHelper.calHp(30),
    marginBottom: sizeHelper.calHp(10),
    fontWeight: '400',

    fontFamily: 'PlusJakartaSans-Regular',
    color: colors.textSecondary || '#85839A',
    marginLeft: sizeHelper.calWp(10),
  },

  referenceBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: sizeHelper.calWp(6),
    paddingVertical: sizeHelper.calHp(2),
    borderRadius: sizeHelper.calHp(4),
    marginLeft: sizeHelper.calWp(8),
  },

  referenceText: {
    fontSize: sizeHelper.calHp(11),
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: '500',
  },

  amountWrap: {
    maxWidth: '40%',
    marginLeft: sizeHelper.calWp(10),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  amount: {
    fontSize: sizeHelper.calHp(34),
    fontWeight: 'bold',
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: colors.textPrimary || '#17142B',
    textAlign: 'right',
  },

  swipeActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: sizeHelper.calHp(10),
    borderRadius: sizeHelper.calHp(25),
  },

  editButton: {
    width: sizeHelper.calWp(170),
    height: sizeHelper.calHp(180),
    backgroundColor: '#FFB52E',
    justifyContent: 'center',
    alignItems: 'center',
    gap: sizeHelper.calHp(8),
  },

  deleteButton: {
    width: sizeHelper.calWp(170),
    height: sizeHelper.calHp(180),
    borderTopEndRadius: sizeHelper.calHp(20),
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    gap: sizeHelper.calHp(8),
  },

  actionText: {
    fontSize: sizeHelper.calHp(30),
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans-Regular',
  },

  rowDivider: {
    height: 1,
    backgroundColor: '#F0EDF5',
    width: '100%',
  },
});
