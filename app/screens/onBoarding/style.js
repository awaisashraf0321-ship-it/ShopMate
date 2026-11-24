import { Image, StyleSheet } from 'react-native';
import sizeHelper from '../../helpers/sizeHelper';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: colors.main,
  },

  logoHeader: {
    alignItems: 'center',
    paddingTop: sizeHelper.calHp(20),
    paddingBottom: sizeHelper.calHp(10),
  },

  sliderContainer: {
    flex: 1,
    backgroundColor: colors.main,
  },

  slideContainer: {
    // flex: 1,
    // marginTop: sizeHelper.calHp(100),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: sizeHelper.calWp(40),
    paddingBottom: sizeHelper.calHp(150),
  },
  img: {
    height: sizeHelper.calHp(1110),
    width: '105%',
  },

  iconCircle: {
    width: sizeHelper.calHp(180),
    height: sizeHelper.calHp(180),
    borderRadius: sizeHelper.calHp(90),
    backgroundColor: colors.lightPrimaryGradientStart,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(45),
    borderWidth: 2,
    borderColor: colors.primaryGradientStart,
  },

  titleText: {
    fontSize: sizeHelper.calHp(50),
    fontWeight: '700',
    marginTop: sizeHelper.calHp(50),
    color: colors.textPrimary,
    fontFamily: 'InterSBold',
    textAlign: 'center',
    marginBottom: sizeHelper.calHp(18),
  },

  context: {
    fontSize: sizeHelper.calHp(30),
    fontFamily: 'InterRegular',
    color: '#000000a8',
    lineHeight: sizeHelper.calHp(40),
    textAlign: 'center',
  },

  dotStyle: {
    backgroundColor: '#00000038',
    width: sizeHelper.calWp(25),
    height: sizeHelper.calHp(7),
    borderRadius: sizeHelper.calHp(4),
    marginHorizontal: sizeHelper.calWp(5),
  },

  activeDot: {
    backgroundColor: colors.primaryGradientStart,
    width: sizeHelper.calWp(50),

    height: sizeHelper.calHp(7),
    borderRadius: sizeHelper.calHp(4),
    marginHorizontal: sizeHelper.calWp(5),
  },

  navButton: {
    width: sizeHelper.calHp(80),
    height: sizeHelper.calHp(80),
    borderRadius: sizeHelper.calHp(40),
    backgroundColor: colors.primaryGradientStart,
    justifyContent: 'center',
    alignItems: 'center',
  },

  skipText: {
    color: '#000000a3',
    fontFamily: 'Poppins-Regular',

    marginTop: sizeHelper.calHp(30),
    fontSize: sizeHelper.calHp(33),
    letterSpacing: sizeHelper.calHp(3),
    paddingHorizontal: sizeHelper.calWp(15),
  },

  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryGradientStart,
    paddingVertical: sizeHelper.calHp(25),
    paddingHorizontal: sizeHelper.calWp(35),
    borderRadius: sizeHelper.calHp(30),
    gap: sizeHelper.calWp(10),
  },

  doneButtonText: {
    color: colors.white,
    fontFamily: 'InterSBold',
    fontWeight: 'bold',
    fontSize: sizeHelper.calHp(24),
  },
});

export default styles;
