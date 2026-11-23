import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import sizeHelper from '../../helpers/sizeHelper';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  top: {
    backgroundColor: theme.colors.background,
  },

  main: {
    marginTop: sizeHelper.calHp(20),
  },

  card: {
    marginHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
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
    backgroundColor: theme.colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: sizeHelper.calWp(20),
  },

  walletIconText: {
    color: theme.colors.primary,
    fontSize: sizeHelper.calHp(50),
    fontWeight: 'bold',
  },

  conText: {
    flex: 1,
    fontWeight: 'bold',
    fontFamily: theme.fontFamily.extraBold,
    fontSize: sizeHelper.calHp(30),
    color: theme.colors.textPrimary,
  },

  menuIcon: {
    color: theme.colors.primary,
    fontSize: sizeHelper.calHp(48),
    fontWeight: 'bold',
    paddingHorizontal: sizeHelper.calWp(5),
  },

  cateText: {
    color: theme.colors.textMuted,
    marginTop: sizeHelper.calHp(20),
    fontFamily: theme.fontFamily.regular,
    fontSize: sizeHelper.calHp(27),
  },

  cateName: {
    fontFamily: theme.fontFamily.extraBold,
    fontWeight: 'bold',
    fontSize: sizeHelper.calHp(28),
    color: theme.colors.textPrimary,
    marginTop: sizeHelper.calHp(10),
  },

  amountLabel: {
    color: theme.colors.textMuted,
    marginTop: sizeHelper.calHp(25),
    marginBottom: sizeHelper.calHp(8),
    fontFamily: theme.fontFamily.regular,
    fontSize: sizeHelper.calHp(27),
  },

  expensesCon: {
    marginHorizontal: sizeHelper.calWp(40),
    marginTop: sizeHelper.calHp(-10),
  },

  expenseText: {
    fontFamily: theme.fontFamily.extraBold,
    fontWeight: 'bold',
    fontSize: sizeHelper.calHp(35),
    color: theme.colors.textPrimary,
  },

  paymentCon: {
    borderRadius: sizeHelper.calHp(35),
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 6,
    elevation: 1,
    // borderWidth: 1,
    // borderColor: theme.colors.border,
    marginTop: sizeHelper.calHp(20),
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
  },

  // Same look as ui/Card and the overview card above it
  expenseFormCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.sm,
  },

  expenseFormHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },

  // Soft tile, same as the Dashboard quick actions
  expenseFormIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  expenseFormTitle: {
    ...theme.typography.title,
    color: theme.colors.textPrimary,
  },

  expenseFieldBlock: {
    marginBottom: theme.spacing.md,
  },

  expenseFieldsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },

  expenseField: {
    flex: 1,
    minWidth: 0,
  },

  expenseFieldLabel: {
    ...theme.typography.label,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
});

export default styles;
