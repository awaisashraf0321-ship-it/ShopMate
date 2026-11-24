import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import sizeHelper from '../helpers/sizeHelper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = ({ navigation, title, subTitle }) => {
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView edges={['left', 'right']}>
        <View style={styles.topHeader}>
          {/* Menu */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.5}
          >
            <Image
              style={styles.img}
              source={require('../assets/image/favicon1.png')}
            />
          </TouchableOpacity>

          {/* Text */}
          <View style={styles.content}>
            <Text style={styles.headerText}>{title}</Text>

            <Text style={styles.Hi}>{subTitle}</Text>
            <View style={styles.main}></View>
          </View>

          {/* <View style={styles.bell}>
            <Icon
              name="notifications-none"
              size={sizeHelper.calHp(40)}
              color={colors.primary}
            />
          </View> */}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {},

  Animated: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: colors.categoryTravel,
    zIndex: 1,
    width: sizeHelper.calWp(690),
  },

  close: {
    height: sizeHelper.calHp(70),
    position: 'absolute',
    top: sizeHelper.calHp(60),
    left: sizeHelper.calWp(50),
    justifyContent: 'center',
    alignItems: 'center',
    width: sizeHelper.calWp(70),
    backgroundColor: colors.white,
    borderRadius: sizeHelper.calHp(70),
  },

  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(50),
    paddingTop: sizeHelper.calHp(15),
    paddingBottom: sizeHelper.calHp(15),
  },

  img: {
    height: sizeHelper.calHp(90),
    width: sizeHelper.calWp(90),
  },

  content: {
    marginLeft: sizeHelper.calWp(25),
    marginBottom: sizeHelper.calHp(10),
  },

  headerText: {
    fontSize: sizeHelper.calHp(28),
    fontFamily: 'PlusJakartaSans-Regular',
  },

  Hi: {
    fontSize: sizeHelper.calHp(32),
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#000',
    fontWeight: 'bold',
    marginTop: sizeHelper.calHp(2),
  },

  main: {
    flexDirection: 'row',
  },

  today: {
    fontSize: sizeHelper.calHp(25),
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-Regular',
  },

  date: {
    fontSize: sizeHelper.calHp(25),
    fontFamily: 'PlusJakartaSans-Regular',
  },

  end: {
    flex: 1,
    justifyContent: 'flex-end',
    fontFamily: 'PlusJakartaSans-Regular',
    alignItems: 'flex-end',
  },

  bell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
