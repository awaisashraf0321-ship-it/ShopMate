import React, { useState, useEffect } from 'react';
import Design from '../../screens/Login/design';
import { login } from '../../api/AuthApi';
import { postSignUp } from '../../api/AuthApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useModule } from '../../components/ModuleContext';
const LoginScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(1);

  const [rememberPassword, setRememberPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [signupErrorModal, setSignupErrorModal] = useState(false);
  const [signupErrorMessage, setSignupErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  useEffect(() => {
    const loadSavedUsername = async () => {
      const savedUsername = await AsyncStorage.getItem('rememberedUsername');
      if (savedUsername) {
        setUsername(savedUsername);
        setRememberPassword(true);
      }
    };
    loadSavedUsername();
  }, []);

  const handleLogin = async value => {
    try {
      setLoading(true);
      console.log('loading true');
      const fields = {
        username: value.username,
        password: value.password,
      };
      const response = await login(fields);
      const data = await response.json();

      if (response.ok && data.Status === 200) {
        await AsyncStorage.setItem('accessToken', data.obj.Accesstoken);
        await AsyncStorage.setItem('refreshToken', data.obj.Refreshtoken);
        if (rememberPassword) {
          await AsyncStorage.setItem('rememberedUsername', value.username);
        } else {
          await AsyncStorage.removeItem('rememberedUsername');
        }

        navigation.navigate('Main');
      } else {
        setErrorModal(true);
        setErrorMessage(data.Message || 'Invalid username or password.');
      }
    } catch (error) {
      console.log(error.Message);
      setErrorModal(true);
      setErrorMessage('Something Went Wrong');
    } finally {
      setLoading(false);
      console.log('loading false');
    }
  };

  const { selectedModule, myModule } = useModule();
  const isActive = selectedModule === 'Self Expense' ? 1 : 2;
  const handleSignUp = async values => {
    try {
      setLoading1(true);
      const fields = {
        userName: values.userName,
        email: values.email,
        moduleId: isActive,
        phoneNumber: values.phoneNumber,
        salary: Number(values.salary),
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      setSignupErrorModal(false);
      setSignupErrorMessage('');

      const response = await postSignUp(fields);

      const data = await response.json();
      console.log('api response', data);

      console.log('Signup status:', response.status);
      console.log('Signup response:', data);

      if (response.ok && (data.Status === 201 || data.Status === 200)) {
        Toast.show({
          type: 'success',
          text1: data.Message || 'Account Created Successfully',
        });

        setActiveTab(1);
      } else {
        setSignupErrorMessage(data.Message || data.message || 'SignUp Failed');

        setSignupErrorModal(true);
      }
    } catch (error) {
      console.log('Signup error:', error.message);

      setSignupErrorMessage('Something Went Wrong');
      setSignupErrorModal(true);
    } finally {
      setLoading1(false);
    }
  };

  return (
    <Design
      loading={loading}
      errorModal={errorModal}
      setErrorModal={setErrorModal}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      handleLogin={handleLogin}
      rememberPassword={rememberPassword}
      setRememberPassword={setRememberPassword}
      handleSignUp={handleSignUp}
      loading1={loading1}
      username={username}
      signupErrorModal={signupErrorModal}
      setSignupErrorModal={setSignupErrorModal}
      signupErrorMessage={signupErrorMessage}
      setSignupErrorMessage={setSignupErrorMessage}
      selectedModule={selectedModule}
      myModule={myModule}
    />
  );
};

export default LoginScreen;
