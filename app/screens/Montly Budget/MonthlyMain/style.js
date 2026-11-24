import sizeHelper from '../../../helpers/sizeHelper';
import { StyleSheet } from 'react-native';
import colors1 from '../../../theme/myColors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors1.background,
  },

  scrollContent: {
    paddingHorizontal: sizeHelper.calWp(34),
    // paddingTop: sizeHelper.calHp(10),
    paddingBottom: sizeHelper.calHp(365),
  },

  mainCard: {
    backgroundColor: colors1.white,
    borderRadius: sizeHelper.calHp(48),
    padding: sizeHelper.calHp(40),
    borderWidth: 1,
    borderColor: colors1.border,
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
    backgroundColor: colors1.infoLight,
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
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: colors1.text,
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizeHelper.calHp(19),
    gap: sizeHelper.calWp(15),
  },

  dateText: {
    fontSize: sizeHelper.calHp(32),
    fontFamily: 'PlusJakartaSans-Regular',
    color: colors1.textSecondary,
  },

  amountContainer: {
    backgroundColor: colors1.accentLight,
    borderRadius: sizeHelper.calHp(60),
    paddingVertical: sizeHelper.calHp(42),
    marginTop: sizeHelper.calHp(54),
    alignItems: 'center',
  },

  amountText: {
    fontSize: sizeHelper.calHp(42),
    fontWeight: '900',
    color: colors1.text,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },

  detailsCard: {
    backgroundColor: colors1.white,
    borderRadius: sizeHelper.calHp(40),
    padding: sizeHelper.calHp(40),
    borderWidth: 1,
    borderColor: colors1.border,
    marginBottom: sizeHelper.calHp(50),
    elevation: 3,
  },

  sectionHeading: {
    backgroundColor: colors1.primaryLight,
    borderRadius: sizeHelper.calHp(35),
    paddingVertical: sizeHelper.calHp(32),
    paddingHorizontal: sizeHelper.calWp(39),
    marginBottom: sizeHelper.calHp(30),
  },

  sectionTitle: {
    fontSize: sizeHelper.calHp(36),
    fontWeight: '800',
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: colors1.text,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: sizeHelper.calHp(150),
    borderBottomWidth: 1,
    borderBottomColor: colors1.border,
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
    color: colors1.textSecondary,
    marginLeft: sizeHelper.calWp(25),
    fontFamily: 'PlusJakartaSans-Regular',
    flex: 1,
  },

  detailValue: {
    fontSize: sizeHelper.calHp(31),
    fontWeight: '700',
    color: colors1.text,
    maxWidth: '48%',
    textAlign: 'right',
  },

  deleteButton: {
    height: sizeHelper.calHp(140),
    borderRadius: sizeHelper.calHp(65),
    backgroundColor: colors1.dangerLight,
    borderWidth: 1,
    borderColor: '#FFB8B8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'PlusJakartaSans-ExtraBold',
    gap: sizeHelper.calWp(28),
  },

  deleteButtonText: {
    fontSize: sizeHelper.calHp(37),
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontWeight: '800',
    color: colors1.danger,
  },
});

export default styles;
