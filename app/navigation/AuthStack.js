import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../../app/screens/Login/index';
import SignUpScreen from '../screens/SignUp/index';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* Back is handled step by step inside the screen */}
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ gestureEnabled: false, animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
