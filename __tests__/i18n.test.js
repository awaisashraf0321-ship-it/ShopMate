import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { Text } from 'react-native';
import { LanguageProvider, t, useLanguage } from '../app/i18n';
import { STRINGS } from '../app/i18n/strings';
import { GAVE } from '../app/helpers/moneyWords';

let api;
const Probe = () => {
  api = useLanguage();
  return <Text>{GAVE.label}</Text>;
};

test('every string has English, Urdu and Roman Urdu', () => {
  const missing = Object.entries(STRINGS)
    .filter(([, row]) => row.length !== 3 || row.some(s => !s))
    .map(([key]) => key);
  expect(missing).toEqual([]);
});

test('switching language changes the words', async () => {
  let tree;
  await act(async () => {
    tree = ReactTestRenderer.create(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
  });
  const shown = () => tree.root.findByType(Text).props.children;
  expect(shown()).toBe('You gave');

  await act(async () => api.setLanguage('ur'));
  expect(shown()).toBe('آپ نے دیے');

  await act(async () => api.setLanguage('roman'));
  expect(shown()).toBe('Aap ne diye');
  expect(t('khata.willGet', { amount: '500' })).toBe('Aap ko Rs 500 milne hain');

  await act(async () => api.setLanguage('en'));
  expect(t('unknown.key')).toBe('unknown.key');
});
