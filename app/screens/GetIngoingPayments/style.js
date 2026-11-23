import { StyleSheet } from 'react-native';
import sizeHelper from '../../helpers/sizeHelper';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  main: {
    backgroundColor: theme.colors.background,
  },

  scrollContent: {
    paddingHorizontal: sizeHelper.calWp(36),
    paddingBottom: sizeHelper.calHp(1200),
  },

  dateGroup: {
    marginTop: sizeHelper.calHp(10),
    // marginBottom: sizeHelper.calHp(8),
  },

  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(27),
    paddingHorizontal: sizeHelper.calWp(4),
  },

  dateHeading: {
    flex: 1,
    fontSize: sizeHelper.calHp(31),
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginLeft: sizeHelper.calWp(20),
  },

  dateTotal: {
    marginBottom: sizeHelper.calHp(8),
    fontSize: sizeHelper.calHp(31),
    fontWeight: '700',
    color: theme.colors.moneyIn,
    marginRight: sizeHelper.calWp(18),
  },

  groupCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: sizeHelper.calHp(38),
    transform: [{ translateY: sizeHelper.calHp(-10) }],
    marginBottom: sizeHelper.calHp(5),
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },

  rowDivider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    width: '100%',
  },
});

export default styles;
