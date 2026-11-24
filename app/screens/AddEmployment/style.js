import { StyleSheet, Platform } from 'react-native';
import colors from '../../theme/colors';
import sizeHelper from '../../helpers/sizeHelper';

const PURPLE = colors.primary || '#4A24B8';
const BG = colors.background || '#F6F5FB';
const SURFACE = colors.surface || '#FFFFFF';
const TEXT = colors.textPrimary || '#17142B';
const MUTED = colors.textSecondary || '#6B6880';
const BORDER = colors.border || '#E5E7EB';

const styles = StyleSheet.create({
  safeArea: {
    // flex: 1,
    backgroundColor: BG,
  },

  container: {
    // flex: 1,
    backgroundColor: BG,
  },

  scrollView: {
    // flex: 1,
  },

  scrollContent: {
    paddingHorizontal: sizeHelper.calWp(42),
    // paddingTop: 12,
  },

  dropdownWrapper: {
    marginBottom: sizeHelper.calHp(22),
  },

  heading: {
    marginBottom: sizeHelper.calHp(30),
  },

  screenTitle: {
    fontSize: sizeHelper.calHp(69),
    lineHeight: sizeHelper.calHp(77),
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
    color: TEXT,
  },

  screenSubtitle: {
    marginTop: sizeHelper.calHp(8),
    fontSize: sizeHelper.calHp(30),
    lineHeight: sizeHelper.calHp(41),
    fontFamily: 'Poppins-Regular',
    color: MUTED,
  },

  fieldContainer: {
    width: '100%',
    marginBottom: sizeHelper.calHp(25),
  },

  fieldLabel: {
    marginBottom: sizeHelper.calHp(17),
    fontSize: sizeHelper.calHp(30),
    lineHeight: sizeHelper.calHp(39),
    fontFamily: 'Poppins-Medium',
    marginHorizontal: sizeHelper.calWp(10),
    color: TEXT,
  },

  requiredText: {
    color: PURPLE,
    fontFamily: 'Poppins-SemiBold',
  },

  optionalText: {
    color: MUTED,
    fontFamily: 'Poppins-Regular',
  },

  input: {
    width: '100%',
    height: sizeHelper.calHp(123),
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: sizeHelper.calHp(35),
    backgroundColor: SURFACE,
    paddingHorizontal: sizeHelper.calWp(44),
    paddingVertical: sizeHelper.calHp(0),
    fontSize: sizeHelper.calHp(32),
    fontFamily: 'Poppins-Regular',
    color: TEXT,
  },

  inputError: {
    borderColor: '#D93025',
  },

  errorText: {
    marginTop: sizeHelper.calHp(15),
    marginLeft: sizeHelper.calWp(6),
    fontSize: sizeHelper.calHp(27),
    fontFamily: 'Poppins-Regular',
    color: '#D93025',
  },

  phoneWrapper: {
    width: '100%',
    height: sizeHelper.calHp(126),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: SURFACE,
    borderWidth: 2,
    borderColor: BORDER,
    borderRadius: sizeHelper.calHp(35),
  },

  countryCode: {
    height: '100%',
    paddingHorizontal: sizeHelper.calWp(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1EFF7',
    borderRightWidth: 2,
    borderRightColor: BORDER,
  },

  countryCodeText: {
    fontSize: sizeHelper.calHp(28),
    fontFamily: 'Poppins-SemiBold',
    color: MUTED,
  },

  phoneInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: sizeHelper.calWp(28),
    paddingVertical: sizeHelper.calHp(0),
    fontSize: sizeHelper.calHp(32),
    fontFamily: 'Poppins-Regular',
    color: TEXT,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: sizeHelper.calHp(0),
    marginBottom: sizeHelper.calHp(45),
    minHeight: sizeHelper.calHp(66),
    marginHorizontal: sizeHelper.calWp(10),
  },

  checkbox: {
    width: sizeHelper.calWp(63),
    height: sizeHelper.calHp(53),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizeHelper.calHp(10),
    borderWidth: 1.5,
    borderColor: BORDER,
    backgroundColor: SURFACE,
    marginRight: sizeHelper.calWp(20),
  },

  checkboxChecked: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },

  checkboxLabel: {
    fontSize: sizeHelper.calHp(30),
    fontFamily: 'Poppins-Regular',
    color: TEXT,
  },

  addressCard: {
    width: '100%',
    backgroundColor: SURFACE,
    borderWidth: 2,
    borderColor: BORDER,
    borderRadius: sizeHelper.calHp(35),
    overflow: 'hidden',
    marginTop: sizeHelper.calHp(3),
    marginBottom: sizeHelper.calHp(18),
  },

  addressHeader: {
    minHeight: sizeHelper.calHp(130),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(33),
  },

  addressIconBox: {
    width: sizeHelper.calWp(74),
    height: sizeHelper.calHp(74),
    borderRadius: sizeHelper.calHp(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDE7FF',
    marginRight: sizeHelper.calWp(27),
  },

  addressHeadingText: {
    flex: 1,
  },

  addressTitle: {
    fontSize: sizeHelper.calHp(35),
    fontFamily: 'Poppins-SemiBold',
    color: TEXT,
  },

  addressBody: {
    borderTopWidth: 2,
    borderTopColor: '#F0EEF6',
    paddingHorizontal: sizeHelper.calWp(35),
    paddingTop: sizeHelper.calHp(35),
    paddingBottom: sizeHelper.calHp(30),
  },

  addressTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: sizeHelper.calWp(20),
    marginBottom: sizeHelper.calHp(40),
  },

  addressTypeButton: {
    minWidth: sizeHelper.calWp(127),
    minHeight: sizeHelper.calHp(87),
    paddingHorizontal: sizeHelper.calWp(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: BORDER,
    borderRadius: sizeHelper.calHp(50),
    backgroundColor: SURFACE,
  },

  addressTypeSelected: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },

  addressTypeText: {
    fontSize: sizeHelper.calHp(28),
    fontFamily: 'Poppins-Medium',
    color: TEXT,
  },

  addressTypeTextSelected: {
    color: '#FFFFFF',
  },

  addressField: {
    marginBottom: sizeHelper.calHp(30),
  },

  saveButton: {
    width: '100%',
    minHeight: sizeHelper.calHp(126),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizeHelper.calWp(19),
    backgroundColor: PURPLE,
    borderRadius: sizeHelper.calHp(35),
  },

  saveButtonDisabled: {
    opacity: 1,
  },

  saveButtonText: {
    fontSize: sizeHelper.calHp(37),
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
});

export default styles;
