import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Design from './design';
import { ChangePassword } from '../../api/AuthApi';
import Toast from 'react-native-toast-message';

const ChangePasswordScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const handlePassword = async values => {
    try {
      setLoading(true);
      const myData = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      };
      const response = await ChangePassword(myData);
      const data = await response.json();
      console.log('changed Password response', data);

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Password Changed Successfully',
        });
        navigation.replace('Profile');
        console.log('Password changed successfully');
      } else {
        console.log('Change Password Failed:', data);
      }
    } catch (error) {
      console.log('Change Password Error:', error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <Design
        visible2={visible2}
        setVisible2={setVisible2}
        visible={visible}
        setVisible={setVisible}
        navigation={navigation}
        handlePassword={handlePassword}
        loading={loading}
        setLoading={setLoading}
        visible1={visible1}
        setVisible1={setVisible1}
      />
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({});
