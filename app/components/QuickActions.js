import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useModule } from './ModuleContext';
import colors from '../theme/colors';
import sizeHelper from '../helpers/sizeHelper';
const QuickActions = ({ navigation }) => {
  const { selectedModule } = useModule();

  const Actions = [
    {
      key: 'self',
      label: ' Add Self Expenses',
      icon: 'account-balance-wallet',
      color: colors.categoryTravel,
      lightColor: colors.primary,
      screen: 'SelfExpense',
    },
    {
      key: 'business',
      label: 'Business Expense',
      icon: 'business-center',
      color: colors.dot,
      lightColor: colors.primary,
      screen: 'BusinessExpense',
    },
    {
      key: 'loan',
      label: 'Outgoing Payments',
      icon: 'payments',
      color: colors.primaryGradientStart,
      lightColor: colors.primary,
      screen: 'Loan',
    },
    {
      key: 'Ingoing',
      label: 'Incoming Payments',
      icon: 'call-received',
      color: colors.primaryGradientStart,
      lightColor: colors.primary,
      screen: 'InComing',
    },
    {
      key: 'Monthly',
      label: 'Montly Budget',
      icon: 'calendar-month',
      color: colors.primaryGradientStart,
      lightColor: colors.primary,
      screen: 'Monthly',
    },
    {
      key: 'customer',
      label: 'Add Customer',
      icon: 'person',
      color: colors.primaryGradientStart,
      lightColor: colors.primary,
      screen: 'AddCustomer',
    },
  ];

  let actions = [];

  for (let i = 0; i < Actions.length; i++) {
    const item = Actions[i];

    if (selectedModule === 'Self Expense') {
      if (
        item.key === 'self' ||
        item.key === 'loan' ||
        item.key === 'Ingoing' ||
        item.key === 'Monthly'
      ) {
        actions.push(item);
      }
    } else {
      if (
        item.key === 'business' ||
        item.key === 'loan' ||
        item.key === 'Ingoing' ||
        item.key === 'customer'
      ) {
        actions.push(item);
      }
    }
  }
  const renderAction = ({ item }) => (
    <View style={styles.con}>
      <TouchableOpacity
        onPress={() => navigation.navigate(item.screen)}
        activeOpacity={0.8}
        style={styles.wrapper}
      >
        {/* Light Circle */}
        <View style={[styles.iconOuter, { backgroundColor: item.lightColor }]}>
          {/* Colored Circle */}
          <View style={[styles.iconCircle]}>
            <Icon
              name={item.icon}
              size={sizeHelper.calHp(45)}
              color={colors.white}
            />
          </View>
        </View>

        <Text style={styles.label} numberOfLines={2}>
          {item.label}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <FlatList
        data={actions}
        renderItem={renderAction}
        keyExtractor={item => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => (
          <View style={{ width: sizeHelper.calHp(14) }} />
        )}
      />
    </View>
  );
};

export default QuickActions;

const styles = StyleSheet.create({
  container: {
    marginTop: sizeHelper.calHp(24),
  },

  title: {
    fontSize: sizeHelper.calHp(32),
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: sizeHelper.calHp(5),
    marginLeft: sizeHelper.calHp(35),
    marginBottom: sizeHelper.calHp(18),
  },

  listContent: {
    paddingBottom: sizeHelper.calHp(5),
    marginHorizontal: sizeHelper.calHp(23),
    justifyContent: 'center',
    // paddingRight: sizeHelper.calWp(55),
  },

  wrapper: {
    width: sizeHelper.calWp(242),
    height: sizeHelper.calHp(265),
    backgroundColor: colors.white,
    borderRadius: sizeHelper.calHp(28),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
    // elevation: 2,
  },

  iconOuter: {
    width: sizeHelper.calHp(90),
    height: sizeHelper.calHp(90),
    borderRadius: sizeHelper.calHp(31),

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: sizeHelper.calHp(12),
  },

  iconCircle: {
    width: sizeHelper.calHp(56),
    height: sizeHelper.calHp(56),
    borderRadius: sizeHelper.calHp(28),

    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    fontSize: sizeHelper.calHp(22),
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: sizeHelper.calHp(22),
    width: sizeHelper.calWp(130),
  },
  con: {
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
});
