import { StyleSheet, Text, View } from 'react-native';
import sizeHelper from '../../helpers/sizeHelper';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  dateHeading: {
    fontSize: sizeHelper.calHp(32),
    fontWeight: '700',
    color: colors.textPrimary,
    marginHorizontal: sizeHelper.calWp(40),
    marginTop: sizeHelper.calHp(20),
  },
});

export default styles;
