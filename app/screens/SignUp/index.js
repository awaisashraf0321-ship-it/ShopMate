import React, { useCallback, useEffect, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';

import Design from './design';
import { postSignUp } from '../../api/AuthApi';
import { useModule } from '../../components/ModuleContext';
import {
  PHONE_LENGTH,
  PIN_LENGTH,
  isAlreadyRegistered,
  isValidPhone,
  normalizePhone,
  phoneProblem,
  signUpFields,
} from '../../helpers/phoneAccount';
import {
  friendlyError,
  goToApp,
  logInWithPhone,
  serverMessage,
} from '../../helpers/session';
import { t } from '../../i18n';

// phone -> pin -> confirm (same 4 digits again) -> what the app is for
const STEPS = ['phone', 'pin', 'confirm', 'purpose'];

const SignUpScreen = ({ navigation, route }) => {
  const { myModule } = useModule();
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState(normalizePhone(route?.params?.phone));
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [mismatchCount, setMismatchCount] = useState(0);
  const [purpose, setPurpose] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null); // { message, alreadyRegistered }
  const timer = useRef(null);
  // Set before leaving on purpose (to the app or to Login), so the
  // step-by-step back handling below doesn't block it.
  const leaving = useRef(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  const stepName = STEPS[step];
  const phoneError = phoneProblem(phone);

  const goBackStep = useCallback(() => {
    clearTimeout(timer.current);
    setError(null);
    setStep(s => {
      const prev = s - 1;
      // Going back to "make a PIN" starts the PIN over.
      if (STEPS[prev] === 'pin' || STEPS[prev] === 'confirm') {
        setPin('');
        setConfirmPin('');
        return STEPS.indexOf('pin');
      }
      return prev;
    });
  }, []);

  // Hardware back / swipe back walks back through the steps first.
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (leaving.current || step === 0) return;
      e.preventDefault();
      if (!submitting) goBackStep();
    });
    return unsubscribe;
  }, [navigation, step, submitting, goBackStep]);

  const leaveTo = go => {
    leaving.current = true;
    go();
  };

  const onBack = () => (step === 0 ? navigation.goBack() : goBackStep());

  const onDigit = digit => {
    if (stepName === 'phone') {
      setPhone(p => {
        // People often skip the leading 0: "3" becomes "03".
        if (!p && digit === '3') return '03';
        return p.length < PHONE_LENGTH ? p + digit : p;
      });
      return;
    }

    if (stepName === 'pin') {
      if (pin.length >= PIN_LENGTH) return;
      const next = pin + digit;
      setPin(next);
      if (next.length === PIN_LENGTH) {
        timer.current = setTimeout(
          () => setStep(STEPS.indexOf('confirm')),
          200,
        );
      }
      return;
    }

    if (stepName === 'confirm') {
      if (confirmPin.length >= PIN_LENGTH) return;
      const next = confirmPin + digit;
      setConfirmPin(next);
      if (next.length === PIN_LENGTH) {
        timer.current = setTimeout(() => {
          if (next === pin) {
            setStep(STEPS.indexOf('purpose'));
          } else {
            setMismatchCount(c => c + 1);
            setPin('');
            setConfirmPin('');
            setStep(STEPS.indexOf('pin'));
          }
        }, 200);
      }
    }
  };

  const onBackspace = clearAll => {
    const cut = v => (clearAll ? '' : v.slice(0, -1));
    if (stepName === 'phone') setPhone(cut);
    if (stepName === 'pin') setPin(cut);
    if (stepName === 'confirm') setConfirmPin(cut);
  };

  const onPhoneNext = () => {
    if (isValidPhone(phone)) {
      setStep(STEPS.indexOf('pin'));
    }
  };

  const onCreateAccount = async () => {
    if (!purpose || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await postSignUp(
        signUpFields({
          phone,
          pin,
          moduleId: purpose === 'Self Expense' ? 1 : 2,
        }),
      );
      const data = await response.json().catch(() => ({}));
      const created =
        response.ok && (data.Status === 200 || data.Status === 201);

      if (!created) {
        const message = serverMessage(data);
        setError(
          isAlreadyRegistered(message)
            ? {
                alreadyRegistered: true,
                message: t('signup.exists'),
              }
            : {
                message: message || t('signup.failed'),
              },
        );
        return;
      }

      await myModule(purpose);
      const login = await logInWithPhone({ phone, pin });
      if (login.ok) {
        Toast.show({ type: 'success', text1: t('signup.welcome') });
        leaveTo(() => goToApp(navigation));
      } else {
        // Account exists; let them log in with the PIN they just made.
        Toast.show({
          type: 'success',
          text1: t('signup.createdLogin'),
        });
        leaveTo(() => navigation.navigate('Login', { phone }));
      }
    } catch (e) {
      setError({ message: friendlyError(e) });
    } finally {
      setSubmitting(false);
    }
  };

  const onLogInInstead = () =>
    leaveTo(() => navigation.navigate('Login', { phone }));

  return (
    <Design
      stepName={stepName}
      phone={phone}
      phoneError={phoneError}
      phoneValid={isValidPhone(phone)}
      pin={pin}
      confirmPin={confirmPin}
      mismatchCount={mismatchCount}
      purpose={purpose}
      setPurpose={value => {
        setPurpose(value);
        setError(null);
      }}
      submitting={submitting}
      error={error}
      onBack={onBack}
      onDigit={onDigit}
      onBackspace={onBackspace}
      onPhoneNext={onPhoneNext}
      onCreateAccount={onCreateAccount}
      onLogInInstead={onLogInInstead}
    />
  );
};

export default SignUpScreen;
