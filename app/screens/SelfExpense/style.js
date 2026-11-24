import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import sizeHelper from '../../helpers/sizeHelper';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background || '#F8F9FE',
  },

  main: {
    marginTop: sizeHelper.calHp(20),
  },

  tabWrapper: {
    marginHorizontal: sizeHelper.calWp(20),
    marginTop: sizeHelper.calHp(16),
    marginBottom: sizeHelper.calHp(10),
    backgroundColor: '#FFFFFF',
    borderRadius: sizeHelper.calHp(48),
    padding: sizeHelper.calHp(15),
    borderWidth: 1,
    borderColor: '#EFEFEF',

    // Smooth Card Shadow
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },

  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  tabBtn: {
    flex: 1,
    borderRadius: sizeHelper.calHp(48),
    overflow: 'hidden',
  },

  tabActiveGradient: {
    height: sizeHelper.calHp(108),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizeHelper.calHp(14),
    paddingHorizontal: sizeHelper.calWp(10),
  },

  tabActiveText: {
    fontSize: sizeHelper.calHp(27),
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  tabInactiveView: {
    height: sizeHelper.calHp(48),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: sizeHelper.calHp(14),
    paddingHorizontal: sizeHelper.calWp(10),
  },

  tabInactiveText: {
    fontSize: sizeHelper.calHp(27),
    fontWeight: '700',
    color: '#101828',
    textAlign: 'center',
  },
});

export default styles;
