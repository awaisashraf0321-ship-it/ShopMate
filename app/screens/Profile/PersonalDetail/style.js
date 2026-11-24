import { StyleSheet } from 'react-native';
import colors1 from '../../../theme/myColors';
import sizeHelper from '../../../helpers/sizeHelper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFAF5',
  },

  scrollContent: {
    paddingHorizontal: sizeHelper.calWp(35),
    paddingBottom: sizeHelper.calHp(900),
  },

  // Profile
  profileSection: {
    alignItems: 'center',
    marginTop: sizeHelper.calHp(35),
    marginBottom: sizeHelper.calHp(45),
  },

  avatar: {
    width: sizeHelper.calWp(415),
    height: sizeHelper.calHp(330),
    borderRadius: sizeHelper.calHp(300),
    backgroundColor: '#FFE5AD',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors1.white,
    overflow: 'hidden',
  },

  profileImage: {
    width: sizeHelper.calHp(320),
    height: sizeHelper.calHp(320),
    borderRadius: sizeHelper.calHp(300),
    // resizeMode: 'center',
  },

  profileText: {
    color: colors1.text,
    fontSize: sizeHelper.calHp(35),
    fontWeight: '700',
    marginTop: sizeHelper.calHp(25),
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },

  // Detail Cards
  detailCard: {
    backgroundColor: colors1.white,
    borderRadius: sizeHelper.calHp(50),
    borderWidth: 1,
    borderColor: '#F0EAE4',
    paddingHorizontal: sizeHelper.calWp(33),
    paddingVertical: sizeHelper.calHp(15),
    marginBottom: sizeHelper.calHp(35),
    elevation: 2,
  },

  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizeHelper.calHp(30),
    borderBottomWidth: 1,
    borderBottomColor: '#F0EAE4',
  },

  detailIcon: {
    width: sizeHelper.calWp(130),
    height: sizeHelper.calHp(100),
    borderRadius: sizeHelper.calHp(60),
    backgroundColor: '#FFE8C9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: sizeHelper.calWp(30),
  },

  detailContent: {
    flex: 1,
  },

  detailLabel: {
    color: colors1.textSecondary,
    fontSize: sizeHelper.calHp(30),
    marginBottom: sizeHelper.calHp(8),
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: '500',
  },

  detailValue: {
    color: '#000000be',
    fontSize: sizeHelper.calHp(37),
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Regular',
  },

  lastItem: {
    borderBottomWidth: 0,
  },
});

export default styles;
