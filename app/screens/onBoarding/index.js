import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Design from './design';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from '../../i18n';

// Keep these short and true: only promise what the app does today.
const getSlides = () => [
  {
    key: 1,
    title: t('onboarding.khataTitle'),
    text: t('onboarding.khataText'),
    img: require('../../assets/image/first (2).jpeg'),
  },
  {
    key: 2,
    title: t('onboarding.spendTitle'),
    text: t('onboarding.spendText'),
    img: require('../../assets/image/page2 (2).jpeg'),
  },
];

const OnBoardingScreen = () => {
  const navigation = useNavigation();

  const handleDone = async () => {
    await AsyncStorage.setItem('MY_REAL_APP', 'true');

    console.log('Onboarding completed');

    navigation.replace('Splash');
  };

  return <Design SLIDES={getSlides()} onDone={handleDone} />;
};

export default OnBoardingScreen;
