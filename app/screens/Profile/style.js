import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import sizeHelper from '../../helpers/sizeHelper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.main || '#F7F6FC',
  },

  safeArea: {
    // flex: 1,
  },

  content: {
    paddingHorizontal: sizeHelper.calWp(20),
    paddingBottom: sizeHelper.calHp(120),
  },

  // ================= PROFILE CARD =================

  profileCard: {
    backgroundColor: colors.primary,
    borderRadius: sizeHelper.calHp(40),
    paddingHorizontal: sizeHelper.calWp(20),
    paddingVertical: sizeHelper.calHp(26),
    marginBottom: sizeHelper.calHp(16),
    marginHorizontal: sizeHelper.calWp(10),
    overflow: 'hidden',
    position: 'relative',
    top: sizeHelper.calHp(5),
    shadowColor: colors.primaryGradientStart,
    shadowOffset: {
      width: 0,
      height: sizeHelper.calHp(10),
    },
    shadowOpacity: 0.25,
    shadowRadius: sizeHelper.calHp(18),
    elevation: 8,
  },

  // ================= PREMIUM BLOBS =================

  blob1: {
    position: 'absolute',
    top: -sizeHelper.calHp(90),
    right: -sizeHelper.calWp(90),
    width: sizeHelper.calWp(260),
    height: sizeHelper.calHp(260),
    borderRadius: sizeHelper.calHp(130),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },

  blob2: {
    position: 'absolute',
    bottom: -sizeHelper.calHp(100),
    left: -sizeHelper.calWp(100),
    width: sizeHelper.calWp(280),
    height: sizeHelper.calHp(280),
    borderRadius: sizeHelper.calHp(140),
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
  },

  blob3: {
    position: 'absolute',
    top: sizeHelper.calHp(20),
    left: -sizeHelper.calWp(70),
    width: sizeHelper.calWp(180),
    height: sizeHelper.calHp(180),
    borderRadius: sizeHelper.calHp(90),
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },

  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },

  imageContainer: {
    position: 'relative',
  },

  imgBorder: {
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: sizeHelper.calHp(110),
    padding: sizeHelper.calHp(4),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },

  profileImage: {
    width: sizeHelper.calHp(200),
    height: sizeHelper.calHp(200),
    borderRadius: sizeHelper.calHp(100),
    // resizeMode: '',
  },

  camera: {
    position: 'absolute',
    right: -sizeHelper.calWp(6),
    bottom: sizeHelper.calHp(4),
    width: sizeHelper.calWp(80),
    height: sizeHelper.calHp(64),
    borderRadius: sizeHelper.calHp(28),
    backgroundColor: colors.primaryGradientEnd,
    borderWidth: 3,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: sizeHelper.calHp(4),
    },
    shadowOpacity: 0.25,
    shadowRadius: sizeHelper.calHp(8),
    elevation: 5,
  },

  userInfo: {
    flex: 1,
    marginLeft: sizeHelper.calWp(18),
  },

  name: {
    fontSize: sizeHelper.calHp(40),
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: '800',
    color: colors.white,
    marginBottom: sizeHelper.calHp(10),
    letterSpacing: 0.4,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizeHelper.calHp(8),
  },

  infoText: {
    fontFamily: 'PlusJakartaSans-Regular',
    marginLeft: sizeHelper.calWp(10),
    fontSize: sizeHelper.calHp(26),
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.95)',
  },

  editButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(18),
    paddingVertical: sizeHelper.calHp(12),
    borderRadius: sizeHelper.calHp(24),
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },

  editButtonText: {
    fontFamily: 'Poppins-Regular',
    marginLeft: sizeHelper.calWp(6),
    color: colors.white,
    fontSize: sizeHelper.calHp(24),
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // ================= ACCOUNT INFO =================

  accountInfo: {
    marginTop: sizeHelper.calHp(26),
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: sizeHelper.calHp(24),
    paddingVertical: sizeHelper.calHp(22),
    paddingHorizontal: sizeHelper.calWp(6),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    zIndex: 2,
  },

  accountItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: sizeHelper.calWp(6),
  },

  accountIcon: {
    width: sizeHelper.calWp(80),
    height: sizeHelper.calHp(64),
    borderRadius: sizeHelper.calHp(32),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(10),
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: sizeHelper.calHp(4),
    },
    shadowOpacity: 0.1,
    shadowRadius: sizeHelper.calHp(8),
    elevation: 3,
  },

  accountTitle: {
    fontSize: sizeHelper.calHp(26),
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
    letterSpacing: 0.3,
  },

  accountSubTitle: {
    marginTop: sizeHelper.calHp(4),
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: sizeHelper.calHp(20),
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },

  accountDivider: {
    width: sizeHelper.calWp(1),
    height: sizeHelper.calHp(80),
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  // ================= SECTION =================

  sectionHeading: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: sizeHelper.calHp(28),
    fontWeight: '700',
    color: colors.textSecondary,
    marginTop: sizeHelper.calHp(20),
    marginBottom: sizeHelper.calHp(10),
    marginLeft: sizeHelper.calWp(20),
    letterSpacing: 0.3,
  },

  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: sizeHelper.calHp(40),
    paddingHorizontal: sizeHelper.calWp(10),
    marginTop: 0,
    marginHorizontal: sizeHelper.calWp(10),
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowOpacity: 0,
    elevation: 0,
  },

  row: {
    minHeight: sizeHelper.calHp(68),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(16),
    paddingVertical: sizeHelper.calHp(40),
    borderColor: 'transparent',
  },

  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0EEF6',
  },

  rowIcon: {
    width: sizeHelper.calWp(100),
    height: sizeHelper.calHp(85),
    borderRadius: sizeHelper.calHp(40),
    backgroundColor: colors.iconBackground,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0,
    elevation: 0,
  },

  rowContent: {
    flex: 1,
    marginLeft: sizeHelper.calWp(12),
    minWidth: 0,
  },

  rowText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: sizeHelper.calHp(30),
    fontWeight: '800',
    color: colors.textPrimary,
  },

  rowSubText: {
    marginTop: sizeHelper.calHp(10),
    fontSize: sizeHelper.calHp(25),
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    color: colors.textSecondary,
  },

  // ================= LOGOUT =================

  logout: {
    height: sizeHelper.calHp(116),
    borderRadius: sizeHelper.calHp(34),
    marginTop: sizeHelper.calHp(56),
    marginBottom: sizeHelper.calHp(10),
    marginHorizontal: sizeHelper.calWp(10),
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.categoryFood,
  },

  logoutText: {
    marginLeft: sizeHelper.calWp(10),
    fontSize: sizeHelper.calHp(35),
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
    color: colors.redColor,
    letterSpacing: 0.3,
  },

  errors: {
    fontSize: sizeHelper.calHp(23),
    color: 'red',
    marginHorizontal: sizeHelper.calWp(60),
    marginTop: sizeHelper.calHp(4),
  },
});

export default styles;
