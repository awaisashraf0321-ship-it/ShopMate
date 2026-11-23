import React, { useEffect, useState } from 'react';

import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthStack from './AuthStack';

import SplashScreen from '../screens/Splash/index';

import MainStack from './MianStack';

import OnBoardingScreen from '../screens/onBoarding/index';

import { useModule } from '../components/ModuleContext';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const [initialScreen, setInitialScreen] = useState(null);
  const { moduleLoading } = useModule();

  useEffect(() => {
    checkApp();
  }, []);

  const checkApp = async () => {
    try {
      const onBoarding = await AsyncStorage.getItem('MY_REAL_APP');

      if (onBoarding === 'true') {
        setInitialScreen('Splash');
      } else {
        setInitialScreen('OnBoarding');
      }
    } catch (error) {
      console.log('Check App Error:', error);
      setInitialScreen('OnBoarding');
    }
  };

  // Wait for the saved Self/Business module too, so screens never
  // mount with the default module and then flip.
  if (!initialScreen || moduleLoading) {
    return <View style={{ flex: 1 }} />;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />

      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />

      <Stack.Screen name="Auth" component={AuthStack} />

      <Stack.Screen name="Main" component={MainStack} />
    </Stack.Navigator>
  );
};

export default RootStack;
