import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import sizeHelper from '../../helpers/sizeHelper';
import colors from '../../theme/colors';
import colors1 from '../../theme/myColors';

const styles = StyleSheet.create({
  top: {
    backgroundColor: colors1.Backgroundcolor,
  },

  main: {
    marginTop: sizeHelper.calHp(20),
  },

  card: {
    width: '92%',
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E8E5F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 1,
    borderRadius: sizeHelper.calHp(30),
    paddingHorizontal: sizeHelper.calWp(25),
    paddingVertical: sizeHelper.calHp(25),
    marginBottom: sizeHelper.calHp(25),
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(10),
  },

  walletIcon: {
    width: sizeHelper.calWp(80),
    height: sizeHelper.calHp(80),
    borderRadius: sizeHelper.calHp(40),
    backgroundColor: '#F0E9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: sizeHelper.calWp(20),
  },

  walletIconText: {
    color: '#6735C5',
    fontSize: sizeHelper.calHp(50),
    fontWeight: 'bold',
  },

  conText: {
    flex: 1,
    fontWeight: 'bold',
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: sizeHelper.calHp(30),
    color: '#17153B',
  },

  menuIcon: {
    color: '#6735C5',
    fontSize: sizeHelper.calHp(48),
    fontWeight: 'bold',
    paddingHorizontal: sizeHelper.calWp(5),
  },

  cateText: {
    color: '#9290AB',
    marginTop: sizeHelper.calHp(20),
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: sizeHelper.calHp(27),
  },

  cateName: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontWeight: 'bold',
    fontSize: sizeHelper.calHp(28),
    color: '#17153B',
    marginTop: sizeHelper.calHp(10),
  },

  amountLabel: {
    color: '#9290AB',
    marginTop: sizeHelper.calHp(25),
    marginBottom: sizeHelper.calHp(8),
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: sizeHelper.calHp(27),
  },

  overviewCard: {
    marginHorizontal: sizeHelper.calWp(33),
    marginTop: sizeHelper.calHp(25),
    borderRadius: sizeHelper.calHp(44),
    padding: sizeHelper.calHp(32),
    paddingBottom: sizeHelper.calHp(33),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors1.successLight,
    backgroundColor: colors1.successLight,
  },

  overviewTitle: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: sizeHelper.calHp(38),
    color: colors1.text,
    marginBottom: sizeHelper.calHp(30),
  },

  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: sizeHelper.calHp(16),
  },

  overviewItem: {
    width: '49%',
    minHeight: sizeHelper.calHp(140),
    backgroundColor: colors1.white,
    borderRadius: sizeHelper.calHp(35),
    paddingHorizontal: sizeHelper.calWp(25),
    paddingVertical: sizeHelper.calHp(25),
    flexDirection: 'row',
    alignItems: 'center',
  },

  overviewIcon: {
    width: sizeHelper.calWp(110),
    height: sizeHelper.calHp(84),
    borderRadius: sizeHelper.calHp(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: sizeHelper.calWp(20),
  },

  overviewInfo: {
    flex: 1,
  },

  overviewLabel: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: sizeHelper.calHp(22),
    color: colors1.textSecondary,
  },

  overviewAmount: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: sizeHelper.calHp(28),
    color: colors1.text,
    marginTop: sizeHelper.calHp(9),
  },

  budgetUsedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: sizeHelper.calHp(30),
    marginBottom: sizeHelper.calHp(20),
  },

  budgetUsedTitle: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: sizeHelper.calHp(33),
    color: colors1.text,
  },

  budgetUsedPercentage: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: sizeHelper.calHp(34),
    color: colors1.success,
  },

  overviewProgressBackground: {
    height: sizeHelper.calHp(20),
    width: '100%',
    backgroundColor: colors1.white,
    borderRadius: sizeHelper.calHp(40),
    overflow: 'hidden',
  },

  overviewProgressFill: {
    height: '100%',
    borderRadius: sizeHelper.calHp(40),
    backgroundColor: colors1.success,
  },

  expensesCon: {
    marginHorizontal: sizeHelper.calWp(40),
    marginTop: sizeHelper.calHp(-10),
  },

  expenseText: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontWeight: 'bold',
    fontSize: sizeHelper.calHp(35),
    color: colors1.text,
  },

  paymentCon: {
    borderRadius: sizeHelper.calHp(35),
    shadowColor: colors1.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 6,
    elevation: 1,
    // borderWidth: 1,
    // borderColor: colors1.border,
    marginTop: sizeHelper.calHp(20),
    overflow: 'hidden',
    backgroundColor: colors1.white,
  },

  expenseFormCard: {
    backgroundColor: colors1.white,
    borderRadius: sizeHelper.calHp(50),
    borderWidth: 1,
    borderColor: colors1.border,
    padding: sizeHelper.calHp(33),
    marginHorizontal: sizeHelper.calWp(35),
    marginTop: sizeHelper.calHp(10),
    marginBottom: sizeHelper.calHp(40),
    shadowColor: colors1.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  expenseFormHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(35),
  },

  expenseFormIcon: {
    width: sizeHelper.calWp(90),
    height: sizeHelper.calHp(70),
    borderRadius: sizeHelper.calHp(40),
    backgroundColor: colors1.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: sizeHelper.calWp(20),
  },

  expenseFormTitle: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: sizeHelper.calHp(37),
    color: colors1.text,
  },

  expenseFieldsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: sizeHelper.calWp(20),
  },

  expenseField: {
    flex: 1,
    minWidth: 0,
  },

  expenseFieldLabel: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: sizeHelper.calHp(27),
    color: '#000000',
    fontWeight: '800',
    marginBottom: sizeHelper.calHp(20),
  },

  emptyContainer: {
    flex: 1,
    minHeight: sizeHelper.calHp(650),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: sizeHelper.calWp(40),
    paddingTop: sizeHelper.calHp(30),
  },

  illustrationContainer: {
    width: sizeHelper.calWp(300),
    height: sizeHelper.calHp(230),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: sizeHelper.calHp(25),
    position: 'relative',
  },

  illustrationCircle: {
    width: sizeHelper.calHp(180),
    height: sizeHelper.calHp(180),
    borderRadius: sizeHelper.calHp(90),
    backgroundColor: '#F0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  storeIcon: {
    position: 'absolute',
    width: sizeHelper.calWp(65),
    height: sizeHelper.calHp(65),
    borderRadius: sizeHelper.calHp(15),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
  },

  sparkleOne: {
    position: 'absolute',
    top: sizeHelper.calHp(30),
    left: sizeHelper.calWp(30),
  },

  sparkleTwo: {
    position: 'absolute',
    top: sizeHelper.calHp(55),
    right: sizeHelper.calWp(25),
  },

  sparkleThree: {
    position: 'absolute',
    bottom: sizeHelper.calHp(45),
    left: sizeHelper.calWp(10),
  },

  emptyTitle: {
    fontSize: sizeHelper.calHp(33),
    fontWeight: '700',
    color: '#172554',
    transform: [{ translateY: sizeHelper.calHp(-40) }],
    marginBottom: sizeHelper.calHp(12),
    textAlign: 'center',
  },

  emptySubtitle: {
    fontSize: sizeHelper.calHp(25),
    color: '#8B93A7',
    width: sizeHelper.calWp(700),
    textAlign: 'center',
    transform: [{ translateY: sizeHelper.calHp(-25) }],
    lineHeight: sizeHelper.calHp(35),
  },
});

export default styles;
