import React, { use, useEffect, useLayoutEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, StyleSheet } from 'react-native';

import BuisnessDetailScreen from '../screens/BusinessGet/BusinessDetail/index';
import BusinessGetScreen from '../screens/BusinessGet';
import DashboardScreen from '../screens/Dashboard/index';
import SelfExpenseScreen from '../screens/SelfExpense/index';
import AddCustomerScreen from '../screens/AddEmployment/index';
import InComingScreen from '../screens/MarkAttendance';
import ProfileScreen from '../screens/Profile/index';
import IngoingDetail from '../screens/GetIngoingPayments/IngoingDetails';
import OutgoingDetailscreen from '../screens/BusinessExpenseTab/OutgoingDetail/index';
import SelfExpensesTabScreen from '../screens/SelfExpenseTab/index';
import OutgoingPaymentsScreen from '../screens/BusinessExpenseTab/index';
import IngoingTab from '../screens/GetIngoingPayments/index';
import LoanScreen from '../screens/Loan/index';
import CollectionScreen from '../screens/Collection/index';
import ChangePasswordScreen from '../screens/ChangePassword/index';
import MonthlyBudgetScreen from '../screens/Montly Budget';
import BusinessExpenseScreen from '../screens/Business Expense';
import { useModule } from '../components/ModuleContext';
import SelfDetailScreen from '../screens/SelfExpenseTab/SelfDetail/index';
import MonthlyDetailScreen from '../screens/Montly Budget/MonthlyMain/index';
import EditProfileScreen from '../screens/Profile/EditProfile/index';
import PersonalDetailScreen from '../screens/Profile/PersonalDetail/index';

import sizeHelper from '../helpers/sizeHelper';
import colors from '../theme/colors';
import { Screen } from 'react-native-screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ========================================
// Self Expense Tab Wrapper
// ========================================
const SelfExpensesModuleTab = props => {
  const { selectedModule } = useModule();

  useEffect(() => {
    if (selectedModule === 'Business Expense' && props.navigation.isFocused()) {
      props.navigation.navigate('MainTabs', {
        screen: 'DashboardTab',
      });
    }
  }, [selectedModule, props.navigation]);

  return <SelfExpensesTabScreen {...props} />;
};

// ========================================
// Business Expense Tab Wrapper
// ========================================
const BusinessExpensesModuleTab = props => {
  const { selectedModule } = useModule();

  useEffect(() => {
    if (selectedModule === 'Self Expense' && props.navigation.isFocused()) {
      props.navigation.navigate('MainTabs', {
        screen: 'DashboardTab',
      });
    }
  }, [selectedModule, props.navigation]);

  return <BusinessGetScreen {...props} />;
};

// ========================================
// Self Detail -> Business List
// ========================================
const SelfExpenseDetail = props => {
  const { selectedModule } = useModule();

  useEffect(() => {
    if (selectedModule === 'Business Expense' && props.navigation.isFocused()) {
      props.navigation.replace('MainTabs', {
        screen: 'DashboardTab',
      });
    }
  }, [selectedModule, props.navigation]);

  return <SelfDetailScreen {...props} />;
};

// ========================================
// Business Detail -> Self List
// ========================================
const BusinessExpenseDetail = props => {
  const { selectedModule } = useModule();

  useEffect(() => {
    if (selectedModule === 'Self Expense' && props.navigation.isFocused()) {
      props.navigation.replace('MainTabs', {
        screen: 'DashboardTab',
      });
    }
  }, [selectedModule, props.navigation]);

  return <BuisnessDetailScreen {...props} />;
};

// ========================================
// Outgoing Detail Wrapper
// ========================================

const OutgoingDetailWrapper = props => {
  const { selectedModule } = useModule();
  const previousModule = React.useRef(selectedModule);

  useEffect(() => {
    if (previousModule.current !== selectedModule) {
      previousModule.current = selectedModule;

      props.navigation.replace('MainTabs', {
        screen: 'DashboardTab',
      });
    }
  }, [selectedModule, props.navigation]);

  return <OutgoingDetailscreen {...props} />;
};
const outcomingScreenWrapper = props => {
  const { selectedModule } = useModule();
  const previousModule = React.useRef(selectedModule);

  useEffect(() => {
    if (previousModule.current !== selectedModule) {
      previousModule.current = selectedModule;
      if (props.navigation.isFocused()) {
        props.navigation.navigate('MainTabs', {
          screen: 'DashboardTab',
        });
      }
    }
  }, [selectedModule, props.navigation]);
  return <OutgoingPaymentsScreen {...props} />;
};

// =======================================
// Ingoing Detail Wrapper

// ==============
const IngoingDetailWrapper = props => {
  const { selectedModule } = useModule();
  const previousModule = React.useRef(selectedModule);

  useEffect(() => {
    if (previousModule.current !== selectedModule) {
      previousModule.current = selectedModule;

      props.navigation.replace('MainTabs', {
        screen: 'DashboardTab',
      });
    }
  }, [selectedModule, props.navigation]);

  return <IngoingDetail {...props} />;
};
const IngoingScreenWrapper = props => {
  const { selectedModule } = useModule();
  const previousModule = React.useRef(selectedModule);
  useEffect(() => {
    if (previousModule.current !== selectedModule) {
      previousModule.current = selectedModule;
      if (props.navigation.isFocused()) {
        props.navigation.navigate('MainTabs', {
          screen: 'DashboardTab',
        });
      }
    }
  }, [selectedModule, props.navigation]);
  return <IngoingTab {...props} />;
};

const MainTabs = () => {
  const { selectedModule } = useModule();
  const insets = useSafeAreaInsets();

  const AllTabs = [
    {
      name: 'DashboardTab',
      component: DashboardScreen,
      label: 'Dashboard',
      icon: 'home-filled',
    },
    {
      name: 'SelfExpensesTab',
      component: SelfExpensesModuleTab,
      label: 'Self Expense',
      icon: 'inventory-2',
    },
    {
      name: 'BusinessExpensesTab',
      component: BusinessExpensesModuleTab,
      label: 'Business Expense',
      icon: 'account-balance',
    },
    {
      name: 'OutgoingPaymentsTab',
      component: outcomingScreenWrapper,
      label: selectedModule === 'Self Expense' ? 'Sending' : 'Outgoing ',
      icon: 'payments',
    },
    {
      name: 'IngoingTab',
      component: IngoingScreenWrapper,
      label: selectedModule === 'Self Expense' ? 'Receiving' : 'Incoming',
      icon: 'input',
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="DashboardTab"
      screenOptions={({ route }) => {
        const item = AllTabs.find(tab => tab.name === route.name);

        const isHidden =
          (route.name === 'SelfExpensesTab' &&
            selectedModule !== 'Self Expense') ||
          (route.name === 'BusinessExpensesTab' &&
            selectedModule !== 'Business Expense');

        return {
          headerShown: false,
          animation: 'none',

          tabBarStyle: {
            left: '4%',
            right: '4%',
            bottom: insets.bottom + sizeHelper.calHp(10),
            height: sizeHelper.calHp(150),
            backgroundColor: colors.white,
            borderRadius: 0,
            borderTopWidth: 0,
            paddingTop: sizeHelper.calHp(8),
            paddingBottom: sizeHelper.calHp(8),
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: sizeHelper.calHp(4),
            },
            shadowOpacity: 0.08,
            shadowRadius: sizeHelper.calHp(12),
          },

          tabBarItemStyle: isHidden ? { display: 'none' } : { flex: 1 },

          tabBarLabelStyle: {
            fontSize: sizeHelper.calHp(22),
            fontFamily: 'Poppins-Regular',
            fontWeight: '600',
            marginTop: sizeHelper.calHp(0),
          },

          tabBarActiveTintColor: colors.primaryGradientStart,
          tabBarInactiveTintColor: '#8E8E93',

          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Icon
                name={item ? item.icon : 'help-outline'}
                size={sizeHelper.calHp(focused ? 40 : 38)}
                color={color}
              />
            </View>
          ),

          tabBarHideOnKeyboard: true,
        };
      }}
      safeAreaInsets={{ bottom: 0 }}
    >
      {AllTabs.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            tabBarLabel: item.label,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

// ========================================
// Self Expense Stack Wrapper
// ========================================
const SelfExpenseWrapper = props => {
  const { selectedModule } = useModule();

  useEffect(() => {
    if (selectedModule === 'Business Expense') {
      props.navigation.replace('MainTabs', {
        screen: 'Dashboard',
      });
    }
  }, [selectedModule, props.navigation]);

  return <SelfExpenseScreen {...props} />;
};

const outgoingScreen = props => {
  const { selectedModule } = useModule();
  const previousModule = React.useRef(selectedModule);
  useEffect(() => {
    if (previousModule.current !== selectedModule) {
      previousModule.current = selectedModule;
      if (props.navigation.isFocused()) {
        props.navigation.navigate('MainTabs', {
          screen: 'DashboardTab',
        });
      }
    }
  }, [selectedModule, props.navigation]);
  return <LoanScreen {...props} />;
};
const InComingScreenWraper = props => {
  const { selectedModule } = useModule();
  const previousModule = React.useRef(selectedModule);
  useEffect(() => {
    if (previousModule.current !== selectedModule) {
      previousModule.current = selectedModule;
      if (props.navigation.isFocused()) {
        props.navigation.navigate('MainTabs', {
          screen: 'DashboardTab',
        });
      }
    }
  }, [selectedModule, props.navigation]);
  return <InComingScreen {...props} />;
};

// ========================================
// Business Expense Stack Wrapper
// ========================================
const BusinessExpenseWrapper = props => {
  const { selectedModule } = useModule();

  useEffect(() => {
    if (selectedModule === 'Self Expense') {
      props.navigation.replace('MainTabs', {
        screen: 'Dashboard',
      });
    }
  }, [selectedModule, props.navigation]);

  return <BusinessExpenseScreen {...props} />;
};

// ========================================
// Add Customer Wrapper
// ========================================
const AddCustomerWrapper = props => {
  return <AddCustomerScreen {...props} />;
};
const AddProfileWrapper = props => {
  const { selectedModule } = useModule();
  useEffect(() => {
    if (
      selectedModule === 'Self Expense' ||
      selectedModule === 'Business Expense'
    ) {
      {
        props.navigation.navigate('MainTabs', {
          screen: 'DasboardTab',
        });
      }
    }
  }, [selectedModule, props.navigation]);
  return <ProfileScreen {...props} />;
};
// ========================================
// Main Stack
// ========================================
const MainStack = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.dropdownContainer}></View>

      <View style={styles.navigatorContainer}>
        <Stack.Navigator
          initialRouteName="MainTabs"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="MainTabs" component={MainTabs} />

          <Stack.Screen name="SelfExpense" component={SelfExpenseWrapper} />

          <Stack.Screen
            name="BusinessExpense"
            component={BusinessExpenseWrapper}
          />

          <Stack.Screen name="AddCustomer" component={AddCustomerWrapper} />

          <Stack.Screen name="Outgoing" component={OutgoingDetailWrapper} />
          <Stack.Screen name="MonthlyDetail" component={MonthlyDetailScreen} />

          <Stack.Screen name="SelfDetail" component={SelfExpenseDetail} />

          <Stack.Screen
            name="BuisnessDetail"
            component={BusinessExpenseDetail}
          />

          <Stack.Screen name="Ingoing" component={IngoingDetailWrapper} />

          <Stack.Screen name="InComing" component={InComingScreenWraper} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen
            name="PersonalDetail"
            component={PersonalDetailScreen}
          />

          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Collection" component={CollectionScreen} />

          <Stack.Screen name="Monthly" component={MonthlyBudgetScreen} />

          <Stack.Screen name="Loan" component={outgoingScreen} />

          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MainStack;

// ========================================
// Styles
// ========================================
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F6F5FB',
  },

  navigatorContainer: {
    flex: 1,
  },

  iconWrap: {
    width: sizeHelper.calHp(70),
    height: sizeHelper.calHp(70),
    borderRadius: sizeHelper.calHp(35),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  iconWrapActive: {
    backgroundColor: colors.lightPrimaryGradientStart,
  },
});
