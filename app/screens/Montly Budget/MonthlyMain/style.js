import sizeHelper from '../../../helpers/sizeHelper';
import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },

  scrollContent: {
    paddingHorizontal: sizeHelper.calWp(34),
    // paddingTop: sizeHelper.calHp(10),
    paddingBottom: sizeHelper.calHp(365),
  },

  mainCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: sizeHelper.calHp(48),
    padding: sizeHelper.calHp(40),
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: sizeHelper.calHp(38),
    elevation: 3,
  },

  expenseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  categoryIcon: {
    width: sizeHelper.calHp(135),
    height: sizeHelper.calHp(135),
    borderRadius: sizeHelper.calHp(80),
    backgroundColor: theme.colors.infoSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryInfo: {
    flex: 1,
    marginLeft: sizeHelper.calWp(40),
  },

  categoryTitle: {
    fontSize: sizeHelper.calHp(43),
    fontWeight: '800',
    fontFamily: theme.fontFamily.extraBold,
    color: theme.colors.textPrimary,
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizeHelper.calHp(19),
    gap: sizeHelper.calWp(15),
  },

  dateText: {
    fontSize: sizeHelper.calHp(32),
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.textSecondary,
  },

  amountContainer: {
    backgroundColor: theme.colors.warningSoft,
    borderRadius: sizeHelper.calHp(60),
    paddingVertical: sizeHelper.calHp(42),
    marginTop: sizeHelper.calHp(54),
    alignItems: 'center',
  },

  amountText: {
    fontSize: sizeHelper.calHp(42),
    fontWeight: '900',
    color: theme.colors.textPrimary,
    fontFamily: theme.fontFamily.extraBold,
  },

  detailsCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: sizeHelper.calHp(40),
    padding: sizeHelper.calHp(40),
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: sizeHelper.calHp(50),
    elevation: 3,
  },

  sectionHeading: {
    backgroundColor: theme.colors.primarySoft,
    borderRadius: sizeHelper.calHp(35),
    paddingVertical: sizeHelper.calHp(32),
    paddingHorizontal: sizeHelper.calWp(39),
    marginBottom: sizeHelper.calHp(30),
  },

  sectionTitle: {
    fontSize: sizeHelper.calHp(36),
    fontWeight: '800',
    fontFamily: theme.fontFamily.extraBold,
    color: theme.colors.textPrimary,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: sizeHelper.calHp(150),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: sizeHelper.calHp(30),
  },

  lastDetailRow: {
    borderBottomWidth: 0,
  },

  detailIcon: {
    width: sizeHelper.calHp(95),
    height: sizeHelper.calHp(95),
    borderRadius: sizeHelper.calHp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailLabel: {
    fontSize: sizeHelper.calHp(33),
    color: theme.colors.textSecondary,
    marginLeft: sizeHelper.calWp(25),
    fontFamily: theme.fontFamily.regular,
    flex: 1,
  },

  detailValue: {
    fontSize: sizeHelper.calHp(31),
    fontWeight: '700',
    color: theme.colors.textPrimary,
    maxWidth: '48%',
    textAlign: 'right',
  },

  deleteButton: {
    height: sizeHelper.calHp(140),
    borderRadius: sizeHelper.calHp(65),
    backgroundColor: theme.colors.dangerSoft,
    borderWidth: 1,
    borderColor: theme.colors.danger,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: theme.fontFamily.extraBold,
    gap: sizeHelper.calWp(28),
  },

  deleteButtonText: {
    fontSize: sizeHelper.calHp(37),
    fontFamily: theme.fontFamily.extraBold,
    fontWeight: '800',
    color: theme.colors.danger,
  },
});

export default styles;
