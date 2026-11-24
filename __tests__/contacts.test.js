jest.mock('react-native-contacts', () => ({}));

const { toCustomerRows, matchesSearch } = require('../app/helpers/contacts');

const contacts = [
  {
    displayName: 'Zubair Shop',
    phoneNumbers: [
      { label: 'mobile', number: '+92 321-7654321' },
      { label: 'work', number: '042 35761234' }, // landline: left out
    ],
  },
  {
    givenName: 'Ahmed',
    familyName: 'Khan',
    phoneNumbers: [
      { label: 'mobile', number: '0300 1234567' },
      { label: 'other', number: '923001234567' }, // same number again
    ],
  },
  { displayName: 'No Number', phoneNumbers: [] },
  { displayName: '', phoneNumbers: [{ number: '3335550000' }] },
];

test('one row per mobile number, sorted, no duplicates or landlines', () => {
  expect(toCustomerRows(contacts)).toEqual([
    { key: '03335550000', name: '03335550000', phone: '03335550000' },
    { key: '03001234567', name: 'Ahmed Khan', phone: '03001234567' },
    { key: '03217654321', name: 'Zubair Shop', phone: '03217654321' },
  ]);
});

test('search matches name or digits', () => {
  const row = { name: 'Ahmed Khan', phone: '03001234567' };
  expect(matchesSearch(row, 'khan')).toBe(true);
  expect(matchesSearch(row, '0300 123')).toBe(true);
  expect(matchesSearch(row, 'ali')).toBe(false);
  expect(matchesSearch(row, '  ')).toBe(true);
});
