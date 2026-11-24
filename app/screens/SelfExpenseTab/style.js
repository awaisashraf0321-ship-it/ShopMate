import { StyleSheet, Text, View } from 'react-native';
import sizeHelper from '../../helpers/sizeHelper';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: sizeHelper.calWp(36),
    paddingBottom: sizeHelper.calHp(1200),
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
    color: colors.dark,
    marginLeft: sizeHelper.calWp(20),
  },

  dateTotal: {
    marginBottom: sizeHelper.calHp(8),
    fontSize: sizeHelper.calHp(31),
    fontWeight: '700',
    color: '#00000080',
    marginRight: sizeHelper.calWp(18),
  },

  groupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: sizeHelper.calHp(38),
    transform: [{ translateY: sizeHelper.calHp(-10) }],
    marginBottom: sizeHelper.calHp(5),
    borderWidth: 1,
    borderColor: '#E9E6F2',
    overflow: 'hidden',
  },

  rowDivider: {
    height: 1,
    backgroundColor: '#F0EDF5',
    width: '100%',
  },
});

export default styles;
