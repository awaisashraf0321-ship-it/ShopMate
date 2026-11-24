import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import {
  formatPhone,
  isAlreadyRegistered,
  isPlaceholderEmail,
  loginFields,
  normalizePhone,
  phoneProblem,
  signUpFields,
} from '../app/helpers/phoneAccount';

jest.mock('@react-native-async-storage/async-storage', () => {
  const store = {};
  return {
    getItem: jest.fn(async k => store[k] ?? null),
    setItem: jest.fn(async (k, v) => {
      store[k] = v;
    }),
    removeItem: jest.fn(async k => {
      delete store[k];
    }),
  };
});
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }) => children,
}));
jest.mock('react-native-toast-message', () => ({ show: jest.fn() }));
jest.mock('../app/components/ModuleContext', () => ({
  useModule: () => ({ myModule: jest.fn() }),
}));
jest.mock('../app/api/AuthApi', () => ({
  postSignUp: jest.fn(),
  login: jest.fn(),
}));

const { postSignUp, login } = require('../app/api/AuthApi');
const SignUpScreen = require('../app/screens/SignUp/index').default;

describe('phone account helpers', () => {
  test('normalizes the ways people write a number', () => {
    expect(normalizePhone('+92 300-1234567')).toBe('03001234567');
    expect(normalizePhone('923001234567')).toBe('03001234567');
    expect(normalizePhone('3001234567')).toBe('03001234567');
    expect(normalizePhone(undefined)).toBe('');
  });

  test('formats and checks numbers', () => {
    expect(formatPhone('03001234567')).toBe('0300 1234567');
    expect(phoneProblem('04')).toBe('Mobile numbers start with 03');
    expect(phoneProblem('030')).toBeNull();
  });

  test('sign-up and log-in build the same password', () => {
    const up = signUpFields({ phone: '03001234567', pin: '4821', moduleId: 2 });
    const inn = loginFields({ phone: '03001234567', pin: '4821' });
    expect(up.userName).toBe(inn.username);
    expect(up.password).toBe(inn.password);
    expect(up.confirmPassword).toBe(up.password);
    expect(isPlaceholderEmail(up.email)).toBe(true);
    expect(isPlaceholderEmail('ali@gmail.com')).toBe(false);
  });

  test('spots "already registered" errors', () => {
    expect(isAlreadyRegistered("Username '0300' is already taken.")).toBe(true);
    expect(isAlreadyRegistered('Server error')).toBe(false);
  });
});

describe('SignUp screen', () => {
  jest.useFakeTimers();

  const setup = () => {
    const navigation = {
      addListener: jest.fn(() => jest.fn()),
      goBack: jest.fn(),
      navigate: jest.fn(),
      getParent: () => ({ reset: jest.fn() }),
    };
    let tree;
    act(() => {
      tree = ReactTestRenderer.create(
        <SignUpScreen navigation={navigation} route={{}} />,
      );
    });
    const press = label =>
      act(() => {
        tree.root
          .findAll(
            n => n.props.accessibilityLabel === label && n.props.onPress,
          )[0]
          .props.onPress();
      });
    const typeDigits = digits => {
      for (const d of digits) press(d);
      act(() => jest.runAllTimers());
    };
    const text = () =>
      tree.root
        .findAll(n => typeof n.children?.[0] === 'string')
        .map(n => n.children.join(''))
        .join(' | ');
    return { tree, navigation, press, typeDigits, text };
  };

  test('number -> PIN -> same PIN -> purpose -> account created', async () => {
    postSignUp.mockResolvedValue({
      ok: true,
      json: async () => ({ Status: 200 }),
    });
    login.mockResolvedValue({
      ok: true,
      json: async () => ({
        Status: 200,
        obj: { Accesstoken: 'a', Refreshtoken: 'r' },
      }),
    });
    const { press, typeDigits, text } = setup();

    expect(text()).toContain('Your mobile number');
    typeDigits('3001234567'); // leading 0 added automatically
    press('Next');
    expect(text()).toContain('Make a 4-number PIN');
    expect(text()).toContain('0300 1234567');

    typeDigits('4821');
    expect(text()).toContain('Type your PIN again');
    typeDigits('4821');
    expect(text()).toContain('What is ShopMate for?');

    press('My shop or business. Track sales, payments, staff and loans');
    await act(async () => press('Create my account'));

    expect(postSignUp).toHaveBeenCalledWith(
      expect.objectContaining({
        userName: '03001234567',
        phoneNumber: '03001234567',
        moduleId: 2,
      }),
    );
    expect(login).toHaveBeenCalledWith(
      loginFields({ phone: '03001234567', pin: '4821' }),
    );
  });

  test('different PINs send you back to make it again', () => {
    const { press, typeDigits, text } = setup();
    typeDigits('03001234567');
    press('Next');
    typeDigits('1111');
    typeDigits('2222');
    expect(text()).toContain('The two PINs were different');
    expect(text()).toContain('Make a 4-number PIN');
  });

  test('number already registered offers to log in', async () => {
    postSignUp.mockResolvedValue({
      ok: false,
      json: async () => ({ Message: 'Username is already taken' }),
    });
    const { press, typeDigits, text, navigation } = setup();
    typeDigits('03001234567');
    press('Next');
    typeDigits('4821');
    typeDigits('4821');
    press('My home. Track my own and home spending');
    await act(async () => press('Create my account'));

    expect(text()).toContain('This number already has an account.');
    press('Log in with this number');
    expect(navigation.navigate).toHaveBeenCalledWith('Login', {
      phone: '03001234567',
    });
  });
});
