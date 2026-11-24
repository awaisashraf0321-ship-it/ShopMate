import {
  GAVE,
  GOT,
  deletePaymentPrompt,
  findPayment,
  missingPaymentField,
} from '../app/helpers/moneyWords';

const groups = [
  { children: [{ Id: 1, Amount: 5000, SentTo: 'Ahmed' }] },
  { children: [{ Id: 2, Amount: 1200, ReceivedFrom: 'Zubair' }] },
];

test('delete prompt names the amount and person', () => {
  expect(deletePaymentPrompt(GAVE, findPayment(groups, 1)).title).toBe(
    `Delete Rs ${(5000).toLocaleString()} given to Ahmed?`,
  );
  expect(deletePaymentPrompt(GOT, findPayment(groups, 2)).title).toBe(
    `Delete Rs ${(1200).toLocaleString()} got from Zubair?`,
  );
  expect(deletePaymentPrompt(GAVE, findPayment(groups, 99)).title).toBe(
    'Delete this entry?',
  );
});

test('missing field messages', () => {
  expect(missingPaymentField({ amount: '', party: 'A', words: GAVE })).toBe(
    'Please type the amount.',
  );
  expect(missingPaymentField({ amount: '10', party: '', words: GOT })).toBe(
    'Please choose: Who gave it to you?',
  );
  expect(
    missingPaymentField({ amount: '10', party: 'A', words: GOT }),
  ).toBeNull();
});
