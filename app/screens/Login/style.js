import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import sizeHelper from '../../helpers/sizeHelper';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },

  blob1: {
    position: 'absolute',
    top: sizeHelper.calHp(-120),
    right: sizeHelper.calWp(-100),
    width: sizeHelper.calWp(420),
    height: sizeHelper.calHp(420),
    borderRadius: sizeHelper.calHp(210),
    backgroundColor: colors.white,
    opacity: 0.08,
  },

  blob2: {
    position: 'absolute',
    top: sizeHelper.calHp(60),
    left: sizeHelper.calWp(-160),
    width: sizeHelper.calWp(300),
    height: sizeHelper.calHp(300),
    borderRadius: sizeHelper.calHp(150),
    backgroundColor: colors.white,
    opacity: 0.06,
  },

  blob3: {
    position: 'absolute',
    bottom: sizeHelper.calHp(500),
    right: sizeHelper.calWp(-140),
    width: sizeHelper.calWp(360),
    height: sizeHelper.calHp(360),
    borderRadius: sizeHelper.calHp(180),
    backgroundColor: colors.white,
    opacity: 0.05,
  },

  blobSmall1: {
    position: 'absolute',
    top: sizeHelper.calHp(340),
    left: sizeHelper.calWp(40),
    width: sizeHelper.calWp(40),
    height: sizeHelper.calHp(40),
    borderRadius: sizeHelper.calHp(20),
    backgroundColor: colors.white,
    opacity: 0.25,
  },

  blobSmall2: {
    position: 'absolute',
    top: sizeHelper.calHp(200),
    right: sizeHelper.calWp(60),
    width: sizeHelper.calWp(22),
    height: sizeHelper.calHp(22),
    borderRadius: sizeHelper.calHp(11),
    backgroundColor: colors.white,
    opacity: 0.35,
  },

  blobSmall3: {
    position: 'absolute',
    top: sizeHelper.calHp(560),
    right: sizeHelper.calWp(120),
    width: sizeHelper.calWp(30),
    height: sizeHelper.calHp(30),
    borderRadius: sizeHelper.calHp(15),
    backgroundColor: colors.white,
    opacity: 0.18,
  },

  topSection: {
    flexShrink: 0,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: sizeHelper.calHp(40),
  },

  logoHalo: {
    width: sizeHelper.calWp(320),
    height: sizeHelper.calHp(320),
    borderRadius: sizeHelper.calHp(160),
    backgroundColor: colors.white,
    opacity: 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },

  border: {
    height: sizeHelper.calHp(260),
    width: sizeHelper.calHp(260),
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: sizeHelper.calHp(260),
    borderColor: 'rgba(255,255,255,0.45)',
  },

  border2: {
    height: sizeHelper.calHp(210),
    width: sizeHelper.calHp(210),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: sizeHelper.calHp(105),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },

  menImg: {
    height: sizeHelper.calHp(150),
    width: sizeHelper.calWp(120),
  },

  content: {
    justifyContent: 'center',
    marginTop: sizeHelper.calHp(30),
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(40),
  },

  welcome: {
    color: colors.white,
    fontFamily: 'Poppins-Bold',
    fontSize: sizeHelper.calHp(58),
    letterSpacing: 0.5,
  },

  welcomeAccent: {
    color: colors.white,
    fontFamily: 'Poppins-Bold',
    fontSize: sizeHelper.calHp(58),
    opacity: 0.75,
    letterSpacing: 0.5,
  },

  description: {
    fontSize: sizeHelper.calHp(28),
    color: 'rgba(255,255,255,0.85)',
    fontFamily: 'Poppins-Regular',
    width: sizeHelper.calWp(600),
    textAlign: 'center',
    lineHeight: sizeHelper.calHp(44),
    marginTop: sizeHelper.calHp(12),
  },

  cardWrapper: {
    flex: 1,
    minHeight: 0,
    width: '100%',
    marginTop: sizeHelper.calHp(40),
    paddingHorizontal: sizeHelper.calWp(30),
    paddingBottom: sizeHelper.calHp(20),
  },

  card: {
    flex: 1,
    minHeight: 0,
    backgroundColor: colors.white,
    borderRadius: sizeHelper.calHp(60),
    paddingVertical: sizeHelper.calHp(30),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 10,
    overflow: 'hidden',
  },

  cardScrollContent: {
    flexGrow: 1,
    paddingBottom: sizeHelper.calHp(140),
  },

  btn: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: sizeHelper.calHp(80),
    justifyContent: 'space-between',
    height: sizeHelper.calHp(120),
    marginTop: sizeHelper.calHp(10),
    flexDirection: 'row',
    backgroundColor: colors.tab,
    padding: sizeHelper.calHp(10),
  },

  wrapUp: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: sizeHelper.calHp(70),
    height: '100%',
    justifyContent: 'center',
    marginHorizontal: sizeHelper.calWp(4),
  },

  activeTab: {
    backgroundColor: colors.primaryGradientStart,
    shadowColor: colors.primaryGradientStart,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },

  login: {
    fontSize: sizeHelper.calHp(30),
    color: colors.primary,
    fontFamily: 'Poppins-Regular',
  },

  activeText: {
    fontFamily: 'Poppins-Bold',
    fontSize: sizeHelper.calHp(30),
    color: colors.white,
  },

  // INPUT
  inputContainer: {
    borderRadius: sizeHelper.calHp(100),
    marginTop: sizeHelper.calHp(10),
  },

  input: {
    fontFamily: 'Poppins-Regular',
    position: 'relative',
    color: colors.dark,
    backgroundColor: colors.white,
    fontSize: sizeHelper.calHp(26),
    paddingLeft: sizeHelper.calWp(70),
    borderRadius: sizeHelper.calHp(30),
    marginHorizontal: sizeHelper.calWp(50),
    borderWidth: 2,
    borderColor: colors.border,
    height: sizeHelper.calHp(120),
  },

  passwordWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },

  passwordIcon: {
    position: 'absolute',
    right: sizeHelper.calWp(90),
    top: sizeHelper.calHp(120),
    zIndex: 10,
  },

  checkCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizeHelper.calHp(10),
  },

  check: {
    marginLeft: sizeHelper.calWp(63),
  },

  Remember: {
    fontSize: sizeHelper.calHp(28),
    fontFamily: 'Poppins-Regular',
    color: colors.textPrimary,
    marginLeft: sizeHelper.calWp(10),
  },

  // MAIN BUTTON
  optionSelected: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: sizeHelper.calHp(30),
    marginBottom: sizeHelper.calHp(10),
    height: sizeHelper.calHp(130),
    borderRadius: sizeHelper.calHp(100),
    gap: sizeHelper.calWp(25),
    shadowColor: colors.primaryGradientStart,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },

  loginText: {
    color: colors.white,
    fontFamily: 'Poppins-Bold',
    fontSize: sizeHelper.calHp(32),
    letterSpacing: sizeHelper.calHp(0.6),
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sizeHelper.calHp(40),
  },

  line1: {
    height: sizeHelper.calHp(2),
    backgroundColor: '#0000001a',
    width: sizeHelper.calWp(180),
  },

  line2: {
    height: sizeHelper.calHp(2),
    backgroundColor: '#0000001a',
    width: sizeHelper.calWp(180),
  },

  continueText: {
    fontSize: sizeHelper.calHp(26),
    fontFamily: 'Poppins-Regular',
    color: colors.textSecondary || '#6B7280',
    marginHorizontal: sizeHelper.calWp(16),
  },

  // SOCIAL BUTTONS
  footerCon: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: sizeHelper.calHp(24),
    paddingHorizontal: sizeHelper.calWp(20),
  },

  footer2: {
    width: sizeHelper.calWp(320),
    height: sizeHelper.calHp(100),
    borderRadius: sizeHelper.calHp(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: sizeHelper.calWp(14),
  },

  img: {
    height: sizeHelper.calHp(60),
    width: sizeHelper.calWp(60),
  },

  google: {
    fontFamily: 'Poppins-Regular',
    fontSize: sizeHelper.calHp(28),
    color: colors.textPrimary,
  },

  // ERRORS
  errors: {
    fontSize: sizeHelper.calHp(23),
    color: 'red',
    marginHorizontal: sizeHelper.calWp(60),
    marginTop: sizeHelper.calHp(4),
  },
  moduleContainer: {
    marginTop: sizeHelper.calHp(15),
    marginBottom: sizeHelper.calHp(20),
  },

  moduleLabel: {
    fontSize: sizeHelper.calHp(30),
    marginHorizontal: sizeHelper.calWp(65),
    fontFamily: 'PlusJakartaSans-Medium',
    color: '#171717',
    marginBottom: sizeHelper.calHp(18),
  },

  dropdownButton: {
    height: sizeHelper.calHp(130),
    // backgroundColor: '#FFFEF8',
    borderWidth: 1,
    marginHorizontal: sizeHelper.calHp(50),
    borderColor: '#E5E2D8',
    borderRadius: sizeHelper.calHp(60),
    paddingHorizontal: sizeHelper.calHp(25),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },

  dropdownText: {
    fontSize: sizeHelper.calHp(30),
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#171717',
    marginLeft: sizeHelper.calWp(10),
  },

  placeholderText: {
    color: '#999',
  },

  dropdownOptions: {
    marginTop: sizeHelper.calHp(0),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E5E2D8',
    borderRadius: sizeHelper.calHp(30),
    marginHorizontal: sizeHelper.calWp(60),
    overflow: 'hidden',
    elevation: 1,
    zIndex: 10,
  },

  dropdownItem: {
    minHeight: sizeHelper.calHp(130),
    paddingHorizontal: sizeHelper.calHp(33),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0EEE7',
  },

  dropdownItemText: {
    fontSize: sizeHelper.calHp(30),
    fontFamily: 'PlusJakartaSans-Medium',
    color: '#171717',
  },
  iconCircle: {
    width: sizeHelper.calHp(68),
    height: sizeHelper.calHp(68),
    borderRadius: sizeHelper.calHp(34),
    backgroundColor: colors.lightPrimaryGradientStart,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: sizeHelper.calWp(14),
  },
});

export default styles;
