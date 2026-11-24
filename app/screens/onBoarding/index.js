import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Design from './design';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SLIDES = [
  {
    key: 1,
    title: 'Complete Financial Management',
    text: 'Track your income, expenses, and manage your business all in one place.',
    img: require('../../assets/image/first (2).jpeg'),
  },
  {
    key: 2,
    title: 'Manage Your Expenses',
    text: 'Easily add and track your personal expenses with simple categories and notes.',
    img: require('../../assets/image/page2 (2).jpeg'),
  },
  {
    key: 3,
    title: 'Manage Your Employees',
    text: 'Add employee details, manage salaries, and keep your team organized with ease.',
    img: require('../../assets/image/page3 (2).jpeg'),
  },
];

const OnBoardingScreen = () => {
  const navigation = useNavigation();

  const handleDone = async () => {
    await AsyncStorage.setItem('MY_REAL_APP', 'true');

    console.log('Onboarding completed');

    navigation.replace('Splash');
  };

  return <Design SLIDES={SLIDES} onDone={handleDone} />;
};

export default OnBoardingScreen;
