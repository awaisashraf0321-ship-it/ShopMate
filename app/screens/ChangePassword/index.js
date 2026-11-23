import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import Design from './design';
import { ChangePassword } from '../../api/AuthApi';

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
        Toast.show({ type: 'success', text1: 'Password Changed Successfully' });
        navigation.replace('Profile');
      } else {
        Toast.show({
          type: 'error',
          text1: data?.Message || 'Could not change password',
        });
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Something went wrong' });
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
