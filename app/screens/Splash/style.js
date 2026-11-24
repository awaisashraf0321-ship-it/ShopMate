import { StyleSheet, Text, View } from 'react-native';
import sizeHelper from '../../helpers/sizeHelper';
import colors from '../../theme/colors';
const styles = StyleSheet.create({
  imgCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.white,
    fontSize: sizeHelper.calHp(40),
  },
  khata: {
    height: sizeHelper.calHp(409),
    width: sizeHelper.calHp(409),
    borderRadius: sizeHelper.calHp(50),
  },
  container: {
    flex: 1,
    backgroundColor: colors.primaryGradientStart,
  },
});
export default styles;
