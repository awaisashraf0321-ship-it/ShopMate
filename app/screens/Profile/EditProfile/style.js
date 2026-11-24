import { StyleSheet } from 'react-native';
import colors1 from '../../../theme/myColors';
import sizeHelper from '../../../helpers/sizeHelper';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#FFFAF5',
  },

  scrollContent: {
    paddingHorizontal: sizeHelper.calWp(35),
    paddingBottom: sizeHelper.calHp(30),
  },

  // Profile
  profileSection: {
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(50),
  },

  avatarContainer: {
    position: 'relative',
    marginBottom: sizeHelper.calHp(28),
  },

  avatar: {
    width: sizeHelper.calWp(415),
    height: sizeHelper.calHp(330),
    borderRadius: sizeHelper.calHp(300),
    backgroundColor: '#FFE5AD',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },

  cameraButton: {
    position: 'absolute',
    bottom: sizeHelper.calHp(5),
    right: sizeHelper.calWp(-5),
    width: sizeHelper.calWp(125),
    height: sizeHelper.calHp(100),
    borderRadius: sizeHelper.calHp(50),
    backgroundColor: colors1.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors1.accentLight,
    elevation: 3,
  },

  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors1.accentLight,
    paddingHorizontal: sizeHelper.calWp(65),
    paddingVertical: sizeHelper.calHp(30),
    borderRadius: sizeHelper.calHp(65),
    gap: sizeHelper.calHp(25),
  },

  changePhotoText: {
    color: colors1.text,
    fontSize: sizeHelper.calHp(38),
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },

  // Input Cards
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors1.white,
    borderRadius: sizeHelper.calHp(50),
    borderWidth: 1,
    borderColor: '#F0EAE4',
    paddingHorizontal: sizeHelper.calWp(33),
    paddingVertical: sizeHelper.calHp(33),
    marginBottom: sizeHelper.calHp(33),
    minHeight: sizeHelper.calHp(182),
  },

  inputIcon: {
    width: sizeHelper.calWp(130),
    height: sizeHelper.calHp(100),
    borderRadius: sizeHelper.calHp(60),
    backgroundColor: '#FFE8C9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: sizeHelper.calWp(33),
  },

  inputContent: {
    flex: 1,
  },

  inputLabel: {
    color: colors1.textSecondary,
    fontSize: sizeHelper.calHp(30),
    marginBottom: sizeHelper.calHp(7),
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: '500',
  },

  input: {
    color: '#000000be',
    fontSize: sizeHelper.calHp(37),
    fontWeight: '700',
    padding: sizeHelper.calHp(0),
    fontFamily: 'PlusJakartaSans-Regular',
    minHeight: sizeHelper.calHp(66),
  },

  // Save Button
  saveButton: {
    backgroundColor: colors1.accent,
    minHeight: sizeHelper.calHp(145),
    borderRadius: sizeHelper.calHp(70),
    marginTop: sizeHelper.calHp(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizeHelper.calHp(35),
    elevation: 2,
  },

  saveButtonText: {
    fontSize: sizeHelper.calHp(40),
    fontWeight: '800',
    fontFamily: 'jhatka/PlusJakartaSans-ExtraBoldItalic',
    color: colors1.black,
  },

  errors: {
    fontSize: sizeHelper.calHp(24),
    color: 'red',
    marginHorizontal: sizeHelper.calWp(60),
    marginBottom: sizeHelper.calHp(20),
    marginTop: sizeHelper.calHp(4),
  },
});

export default styles;
