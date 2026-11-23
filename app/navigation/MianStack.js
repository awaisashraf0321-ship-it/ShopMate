import React, { useEffect } from 'react';
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
import StyleGuideScreen from '../screens/StyleGuide/index';
import MonthlyBudgetScreen from '../screens/Montly Budget';
import BusinessExpenseScreen from '../screens/Business Expense';
import { useModule } from '../components/ModuleContext';
import SelfDetailScreen from '../screens/SelfExpenseTab/SelfDetail/index';
import MonthlyDetailScreen from '../screens/Montly Budget/MonthlyMain/index';
import EditProfileScreen from '../screens/Profile/EditProfile/index';
import PersonalDetailScreen from '../screens/Profile/PersonalDetail/index';

import { theme } from '../theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HIDDEN_TAB = { display: 'none' };
const VISIBLE_TAB = { flex: 1 };

// Defined once at module level so React keeps the same component between
// renders (an inline component would remount every icon on each render).
const TabIcon = ({ name, color, focused }) => (
  <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
    <Icon
      name={name}
      size={focused ? theme.sizes.icon.lg : theme.sizes.icon.md + 2}
      color={color}
    />
  </View>
);

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
const OutgoingPaymentsWrapper = props => {
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
      label: 'Home',
      icon: 'home-filled',
    },
    {
      name: 'SelfExpensesTab',
      component: SelfExpensesModuleTab,
      label: 'Expenses',
      icon: 'inventory-2',
    },
    {
      name: 'BusinessExpensesTab',
      component: BusinessExpensesModuleTab,
      label: 'Expenses',
      icon: 'account-balance',
    },
    {
      name: 'OutgoingPaymentsTab',
      component: OutgoingPaymentsWrapper,
      label: 'Sent',
      icon: 'payments',
    },
    {
      name: 'IngoingTab',
      component: IngoingScreenWrapper,
      label: 'Received',
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
            height: 68 + insets.bottom,
            paddingTop: theme.spacing.xs,
            paddingBottom: insets.bottom + theme.spacing.xs,
            backgroundColor: theme.colors.surface,
            borderTopWidth: 0,
            ...theme.shadows.lg,
          },

          tabBarItemStyle: isHidden ? HIDDEN_TAB : VISIBLE_TAB,

          tabBarLabelStyle: {
            ...theme.typography.caption,
            fontFamily: theme.fontFamily.semiBold,
          },

          tabBarActiveTintColor: theme.colors.iconActive,
          tabBarInactiveTintColor: theme.colors.iconInactive,

          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={item ? item.icon : 'help-outline'}
              color={color}
              focused={focused}
            />
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
        screen: 'DashboardTab',
      });
    }
  }, [selectedModule, props.navigation]);

  return <SelfExpenseScreen {...props} />;
};

const LoanScreenWrapper = props => {
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
        screen: 'DashboardTab',
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
// ========================================
// Main Stack
// ========================================
const MainStack = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.dropdownContainer} />

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

          <Stack.Screen name="Loan" component={LoanScreenWrapper} />

          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
          {__DEV__ && (
            <Stack.Screen name="StyleGuide" component={StyleGuideScreen} />
          )}
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
    backgroundColor: theme.colors.background,
  },

  navigatorContainer: {
    flex: 1,
  },

  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconWrapActive: {
    backgroundColor: theme.colors.primarySoft,
  },
});
