import { StyleSheet, Text, View } from 'react-native';
import sizeHelper from '../../helpers/sizeHelper';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  dateHeading: {
    fontSize: sizeHelper.calHp(32),
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginHorizontal: sizeHelper.calWp(40),
    marginTop: sizeHelper.calHp(20),
  },
});

export default styles;
