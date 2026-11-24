import {
  balanceLabel,
  customerBalances,
  customerHistory,
  khataTotals,
  reminderMessage,
  toWhatsappNumber,
} from '../app/helpers/khata';

const customers = [
  { Id: 1, Name: 'Ahmed' },
  { Id: 2, Name: 'Zubair' },
  { Id: 3, Name: 'New Guy' },
];
const gave = [
  {
    Id: 10,
    CustomerId: 1,
    SentTo: 'Ahmed',
    Amount: 5000,
    ReceiptDate: '2026-11-01',
  },
  { Id: 11, SentTo: 'zubair ', Amount: 1000, ReceiptDate: '2026-11-20' }, // no id: name match
];
const got = [
  {
    Id: 20,
    CustomerId: 1,
    ReceivedFrom: 'Ahmed',
    Amount: 2000,
    ReceiptDate: '2026-11-10',
  },
  {
    Id: 21,
    CustomerId: 2,
    ReceivedFrom: 'Zubair',
    Amount: 3000,
    ReceiptDate: '2026-11-05',
  },
];

test('balance = gave - got, most recent first, idle customers last', () => {
  const rows = customerBalances({ customers, gave, got });
  expect(rows.map(r => [r.name, r.gave, r.got, r.balance])).toEqual([
    ['Zubair', 1000, 3000, -2000],
    ['Ahmed', 5000, 2000, 3000],
    ['New Guy', 0, 0, 0],
  ]);
  expect(khataTotals(rows)).toEqual({ youWillGet: 3000, youWillGive: 2000 });
});

test('history is newest first and tagged', () => {
  const h = customerHistory({ customer: customers[0], gave, got });
  expect(h.map(e => [e.kind, e.Id])).toEqual([
    ['got', 20],
    ['gave', 10],
  ]);
});

test('plain balance words', () => {
  expect(balanceLabel(3000).text).toBe(
    `You will get Rs ${(3000).toLocaleString()}`,
  );
  expect(balanceLabel(-2000).text).toBe(
    `You will give Rs ${(2000).toLocaleString()}`,
  );
  expect(balanceLabel(0).text).toBe('All settled');
});

test('WhatsApp number and reminder', () => {
  expect(toWhatsappNumber('0300 1234567')).toBe('923001234567');
  expect(toWhatsappNumber('3001234567')).toBe('923001234567');
  expect(toWhatsappNumber('042 3576')).toBeNull();
  expect(reminderMessage({ name: 'Ahmed', balance: 3000 })).toContain(
    'Salam Ahmed',
  );
});
