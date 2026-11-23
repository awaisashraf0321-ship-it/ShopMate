import { StyleSheet } from 'react-native';
import sizeHelper from '../../helpers/sizeHelper';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  safeArea: {
    flex: 1,
  },

  content: {
    paddingHorizontal: sizeHelper.calWp(20),
    paddingBottom: sizeHelper.calHp(120),
  },

  // ================= PROFILE CARD =================

  profileCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: sizeHelper.calHp(40),
    paddingHorizontal: sizeHelper.calWp(20),
    paddingVertical: sizeHelper.calHp(26),
    marginBottom: sizeHelper.calHp(16),
    marginHorizontal: sizeHelper.calWp(10),
    overflow: 'hidden',
    position: 'relative',
    top: sizeHelper.calHp(5),
    shadowColor: theme.colors.accent,
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
    backgroundColor: theme.colors.onPrimarySurface,
  },

  blob2: {
    position: 'absolute',
    bottom: -sizeHelper.calHp(100),
    left: -sizeHelper.calWp(100),
    width: sizeHelper.calWp(280),
    height: sizeHelper.calHp(280),
    borderRadius: sizeHelper.calHp(140),
    backgroundColor: theme.colors.onPrimarySurface,
  },

  blob3: {
    position: 'absolute',
    top: sizeHelper.calHp(20),
    left: -sizeHelper.calWp(70),
    width: sizeHelper.calWp(180),
    height: sizeHelper.calHp(180),
    borderRadius: sizeHelper.calHp(90),
    backgroundColor: theme.colors.onPrimarySurface,
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
    borderColor: theme.colors.onPrimaryMuted,
    borderRadius: sizeHelper.calHp(110),
    padding: sizeHelper.calHp(4),
    backgroundColor: theme.colors.onPrimarySurface,
  },

  avatarFallback: {
    width: sizeHelper.calHp(200),
    height: sizeHelper.calHp(200),
    borderRadius: sizeHelper.calHp(100),
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: theme.colors.highlight,
    borderWidth: 3,
    borderColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
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
    fontFamily: theme.fontFamily.regular,
    fontWeight: '800',
    color: theme.colors.onPrimary,
    marginBottom: sizeHelper.calHp(10),
    letterSpacing: 0.4,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizeHelper.calHp(8),
  },

  infoText: {
    fontFamily: theme.fontFamily.regular,
    marginLeft: sizeHelper.calWp(10),
    fontSize: sizeHelper.calHp(26),
    fontWeight: '500',
    color: theme.colors.onPrimary,
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
    backgroundColor: theme.colors.onPrimarySurface,
    borderWidth: 1,
    borderColor: theme.colors.onPrimaryMuted,
  },

  editButtonText: {
    fontFamily: theme.fontFamily.regular,
    marginLeft: sizeHelper.calWp(6),
    color: theme.colors.onPrimary,
    fontSize: sizeHelper.calHp(24),
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // ================= ACCOUNT INFO =================

  accountInfo: {
    marginTop: sizeHelper.calHp(26),
    backgroundColor: theme.colors.onPrimarySurface,
    borderRadius: sizeHelper.calHp(24),
    paddingVertical: sizeHelper.calHp(22),
    paddingHorizontal: sizeHelper.calWp(6),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.onPrimaryMuted,
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
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(10),
    shadowColor: theme.colors.shadow,
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
    fontFamily: theme.fontFamily.regular,
    fontWeight: '800',
    color: theme.colors.onPrimary,
    textAlign: 'center',
    letterSpacing: 0.3,
  },

  accountSubTitle: {
    marginTop: sizeHelper.calHp(4),
    fontFamily: theme.fontFamily.regular,
    fontSize: sizeHelper.calHp(20),
    fontWeight: '500',
    color: theme.colors.onPrimaryMuted,
    textAlign: 'center',
  },

  accountDivider: {
    width: sizeHelper.calWp(1),
    height: sizeHelper.calHp(80),
    backgroundColor: theme.colors.onPrimarySurface,
  },

  // ================= SECTION =================

  sectionHeading: {
    fontFamily: theme.fontFamily.regular,
    fontSize: sizeHelper.calHp(28),
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginTop: sizeHelper.calHp(20),
    marginBottom: sizeHelper.calHp(10),
    marginLeft: sizeHelper.calWp(20),
    letterSpacing: 0.3,
  },

  sectionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: sizeHelper.calHp(40),
    paddingHorizontal: sizeHelper.calWp(10),
    marginTop: 0,
    marginHorizontal: sizeHelper.calWp(10),
    borderWidth: 1,
    borderColor: theme.colors.border,
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
    borderColor: theme.colors.transparent,
  },

  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },

  rowIcon: {
    width: sizeHelper.calWp(100),
    height: sizeHelper.calHp(85),
    borderRadius: sizeHelper.calHp(40),
    backgroundColor: theme.colors.primarySoft,
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
    fontFamily: theme.fontFamily.regular,
    fontSize: sizeHelper.calHp(30),
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },

  rowSubText: {
    marginTop: sizeHelper.calHp(10),
    fontSize: sizeHelper.calHp(25),
    fontFamily: theme.fontFamily.regular,
    fontWeight: '400',
    color: theme.colors.textSecondary,
  },

  // ================= LOGOUT =================

  logout: {
    marginHorizontal: theme.spacing.xs,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.sm,
  },

  errors: {
    fontSize: sizeHelper.calHp(23),
    color: theme.colors.danger,
    marginHorizontal: sizeHelper.calWp(60),
    marginTop: sizeHelper.calHp(4),
  },
});

export default styles;
