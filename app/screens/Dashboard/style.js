import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import colors from '../../theme/colors';
import sizeHelper from '../../helpers/sizeHelper';

const styles = StyleSheet.create({
  cardContainer: {
    transform: [{ translateY: sizeHelper.calHp(-880) }],
  },

  PlusButton: {
    transform: [{ translateY: sizeHelper.calHp(-820) }],
  },

  CategorySelector: {
    marginTop: sizeHelper.calHp(20),
  },

  main: {
    flex: 1,
    backgroundColor: colors.BackgroundColor,
    marginTop: sizeHelper.calHp(20),
  },

  refresh: {
    marginTop: sizeHelper.calHp(40),
  },

  scrollView: {
    flex: 1,
  },

  quickActionsWrapper: {
    marginTop: sizeHelper.calHp(-10),
  },

  scrollContent: {
    paddingBottom: sizeHelper.calHp(180),
  },
});

export default styles;
