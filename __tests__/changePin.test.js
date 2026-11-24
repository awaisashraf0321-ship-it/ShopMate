import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { changePinFields, pinPassword } from '../app/helpers/phoneAccount';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(async k => (k === 'rememberedPhone' ? '03001234567' : null)),
  setItem: jest.fn(async () => {}),
  removeItem: jest.fn(async () => {}),
}));
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }) => children,
}));
jest.mock('react-native-toast-message', () => ({ show: jest.fn() }));
jest.mock('../app/api/AuthApi', () => ({ ChangePassword: jest.fn() }));

const { ChangePassword } = require('../app/api/AuthApi');
const ChangePinScreen = require('../app/screens/ChangePin/index').default;

jest.useFakeTimers();

const setup = async () => {
  const navigation = { goBack: jest.fn(), navigate: jest.fn() };
  let tree;
  await act(async () => {
    tree = ReactTestRenderer.create(
      <ChangePinScreen navigation={navigation} route={{}} />,
    );
  });
  const type = async digits => {
    for (const d of digits) {
      act(() => {
        tree.root
          .findAll(n => n.props.accessibilityLabel === d && n.props.onPress)[0]
          .props.onPress();
      });
    }
    await act(async () => jest.runAllTimers());
  };
  const text = () =>
    tree.root
      .findAll(n => typeof n.children?.[0] === 'string')
      .map(n => n.children.join(''))
      .join(' | ');
  return { navigation, type, text };
};

test('builds the same passwords sign-up and login use', () => {
  expect(
    changePinFields({
      phone: '03001234567',
      currentPin: '1111',
      newPin: '2468',
    }),
  ).toEqual({
    currentPassword: pinPassword('03001234567', '1111'),
    newPassword: pinPassword('03001234567', '2468'),
    confirmNewPassword: pinPassword('03001234567', '2468'),
  });
});

test('current PIN -> new PIN -> again -> saved', async () => {
  ChangePassword.mockResolvedValue({ ok: true, json: async () => ({}) });
  const { type, text, navigation } = await setup();
  expect(text()).toContain('Type your current PIN');
  await type('1111');
  expect(text()).toContain('Make a new PIN');
  await type('2468');
  expect(text()).toContain('Type the new PIN again');
  await type('2468');
  expect(ChangePassword).toHaveBeenCalledWith(
    changePinFields({
      phone: '03001234567',
      currentPin: '1111',
      newPin: '2468',
    }),
  );
  expect(navigation.goBack).toHaveBeenCalled();
});

test('wrong current PIN goes back to the first step', async () => {
  ChangePassword.mockResolvedValue({
    ok: false,
    json: async () => ({ Message: 'Incorrect password.' }),
  });
  const { type, text } = await setup();
  await type('1111');
  await type('2468');
  await type('2468');
  expect(text()).toContain('Your current PIN is wrong');
  expect(text()).toContain('Type your current PIN');
});

test('new PINs that differ ask again', async () => {
  const { type, text } = await setup();
  await type('1111');
  await type('2468');
  await type('9999');
  expect(text()).toContain('The two new PINs were different');
  expect(text()).toContain('Make a new PIN');
});
