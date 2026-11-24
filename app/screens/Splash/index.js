import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Design from './design';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem('accessToken');

    if (token) {
      navigation.replace('Main');
    } else {
      navigation.replace('Auth');
    }
  };

  return <Design />;
};

export default SplashScreen;
