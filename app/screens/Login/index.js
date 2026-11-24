import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Design from './design';
import {
  PHONE_LENGTH,
  PIN_LENGTH,
  isValidPhone,
  normalizePhone,
  phoneProblem,
} from '../../helpers/phoneAccount';
import {
  friendlyError,
  getRememberedPhone,
  goToApp,
  logIn,
  logInWithPhone,
  setLoginMethod,
} from '../../helpers/session';
import { t } from '../../i18n';

const LoginScreen = ({ navigation, route }) => {
  // 'phone' = mobile number + PIN (default); 'password' = old username login
  const [mode, setMode] = useState('phone');
  const [phoneStep, setPhoneStep] = useState('number'); // 'number' | 'pin'
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [wrongCount, setWrongCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Old username + password login
  const [username, setUsername] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  // Start at the PIN when we know the number: from sign-up, or last login.
  const paramPhone = route?.params?.phone;
  useEffect(() => {
    const load = async () => {
      const known = normalizePhone(paramPhone || (await getRememberedPhone()));
      if (isValidPhone(known)) {
        setPhone(known);
        setPin('');
        setPinError('');
        setPhoneStep('pin');
        setMode('phone');
      }
    };
    load();
  }, [paramPhone]);

  useEffect(() => {
    AsyncStorage.getItem('rememberedUsername')
      .then(saved => {
        if (saved) {
          setUsername(saved);
          setRememberPassword(true);
        }
      })
      .catch(() => {});
  }, []);

  const submitPin = async value => {
    setLoading(true);
    setPinError('');
    try {
      const result = await logInWithPhone({ phone, pin: value });
      if (result.ok) {
        goToApp(navigation);
        return;
      }
      setWrongCount(c => c + 1);
      setPinError(t('pin.wrong'));
    } catch (e) {
      setPinError(friendlyError(e));
    } finally {
      setPin('');
      setLoading(false);
    }
  };

  const onDigit = digit => {
    if (loading) return;
    if (phoneStep === 'number') {
      setPhone(p => {
        if (!p && digit === '3') return '03';
        return p.length < PHONE_LENGTH ? p + digit : p;
      });
      return;
    }
    if (pin.length >= PIN_LENGTH) return;
    const next = pin + digit;
    setPin(next);
    setPinError('');
    if (next.length === PIN_LENGTH) {
      timer.current = setTimeout(() => submitPin(next), 150);
    }
  };

  const onBackspace = clearAll => {
    const cut = v => (clearAll ? '' : v.slice(0, -1));
    if (phoneStep === 'number') setPhone(cut);
    else setPin(cut);
  };

  const onPhoneNext = () => {
    if (isValidPhone(phone)) {
      setPin('');
      setPinError('');
      setPhoneStep('pin');
    }
  };

  const onChangeNumber = () => {
    setPin('');
    setPinError('');
    setPhoneStep('number');
  };

  const onForgotPin = () => navigation.navigate('ForgotPin', { phone });

  const onCreateAccount = () =>
    navigation.navigate('SignUp', {
      phone: isValidPhone(phone) ? phone : undefined,
    });

  const handlePasswordLogin = async values => {
    setLoading(true);
    try {
      const result = await logIn({
        username: values.username.trim(),
        password: values.password,
      });
      if (result.ok) {
        await setLoginMethod('password');
        if (rememberPassword) {
          await AsyncStorage.setItem(
            'rememberedUsername',
            values.username.trim(),
          );
        } else {
          await AsyncStorage.removeItem('rememberedUsername');
        }
        goToApp(navigation);
      } else {
        setErrorMessage(result.message || t('login.wrongPassword'));
        setErrorModal(true);
      }
    } catch (e) {
      setErrorMessage(friendlyError(e));
      setErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Design
      mode={mode}
      setMode={setMode}
      phoneStep={phoneStep}
      phone={phone}
      phoneError={phoneProblem(phone)}
      phoneValid={isValidPhone(phone)}
      pin={pin}
      pinError={pinError}
      wrongCount={wrongCount}
      loading={loading}
      onDigit={onDigit}
      onBackspace={onBackspace}
      onPhoneNext={onPhoneNext}
      onChangeNumber={onChangeNumber}
      onForgotPin={onForgotPin}
      onCreateAccount={onCreateAccount}
      username={username}
      rememberPassword={rememberPassword}
      setRememberPassword={setRememberPassword}
      handlePasswordLogin={handlePasswordLogin}
      errorModal={errorModal}
      setErrorModal={setErrorModal}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
    />
  );
};

export default LoginScreen;
