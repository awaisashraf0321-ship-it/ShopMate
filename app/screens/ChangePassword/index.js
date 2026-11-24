import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import Design from './design';
import { ChangePassword } from '../../api/AuthApi';
import { t } from '../../i18n';

const ChangePasswordScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handlePassword = async values => {
    try {
      setLoading(true);
      const response = await ChangePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      });
      const data = await response.json();

      if (response.ok) {
        Toast.show({ type: 'success', text1: t('password.changed') });
        navigation.replace('Profile');
      } else {
        Toast.show({
          type: 'error',
          text1: data?.Message || t('password.failed'),
        });
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: t('common.somethingWrong') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Design
      navigation={navigation}
      handlePassword={handlePassword}
      loading={loading}
    />
  );
};

export default ChangePasswordScreen;
