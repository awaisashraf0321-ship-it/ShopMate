import { parseExpense, normalizeNumbers } from '../app/voice/parseExpense';

// Personal categories as the API returns them.
const categories = [
  { Id: 1, Name: 'Bill Expense' },
  { Id: 2, Name: 'Education & Learning' },
  { Id: 3, Name: 'Entertainment & Leisure' },
  { Id: 4, Name: 'Family & Personal Care' },
  { Id: 5, Name: 'Food & Groceries' },
  { Id: 6, Name: 'Health & Medical' },
  { Id: 7, Name: 'Home Expense' },
  { Id: 8, Name: 'Mobile & Internet' },
  { Id: 9, Name: 'Other' },
  { Id: 10, Name: 'Saving & Investments' },
  { Id: 11, Name: 'Shopping & Clothing' },
  { Id: 12, Name: 'Transportation' },
];
// Wednesday 18 November 2026
const today = new Date(2026, 10, 18);
const parse = text => parseExpense(text, { categories, today });
const ymd = d =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;

describe('normalizeNumbers', () => {
  test.each([
    ['five hundred', '500'],
    ['twelve hundred', '1200'],
    ['two thousand five hundred', '2500'],
    ['one hundred and fifty', '150'],
    ['a thousand', '1000'],
    ['1.5 lakh', '150000'],
    ['2k', '2000'],
    ['3 thousand', '3000'],
    ['1,200', '1200'],
    ['fifty five', '55'],
  ])('%s -> %s', (input, out) => {
    expect(normalizeNumbers(input)).toBe(out);
  });

  test('keeps other words', () => {
    expect(normalizeNumbers('bought a shirt for two thousand')).toBe(
      'bought a shirt for 2000',
    );
  });
});

describe('parseExpense', () => {
  test('the headline example', () => {
    const r = parse('Spent 1,200 on petrol by cash yesterday');
    expect(r.amount).toBe(1200);
    expect(r.categoryName).toBe('Transportation');
    expect(r.paymentMode).toBe(1);
    expect(ymd(r.date)).toBe('2026-11-17');
    expect(r.note).toBe('Petrol');
    expect(r.missing).toEqual([]);
  });

  test('spelled-out amount, card payment', () => {
    const r = parse('add expense five hundred rupees groceries paid by card');
    expect(r.amount).toBe(500);
    expect(r.categoryName).toBe('Food & Groceries');
    expect(r.paymentMode).toBe(2);
    expect(r.note).toBe('Groceries');
  });

  test('currency before the number wins over other numbers', () => {
    const r = parse('bought 2 shirts for Rs 3000');
    expect(r.amount).toBe(3000);
    expect(r.categoryName).toBe('Shopping & Clothing');
  });

  test('without a currency, the larger number is the amount', () => {
    expect(parse('2 shirts 3000').amount).toBe(3000);
  });

  test('a date number is not the amount', () => {
    const r = parse('electricity bill 4500 on the 5th');
    expect(r.amount).toBe(4500);
    expect(ymd(r.date)).toBe('2026-11-05');
    expect(r.categoryName).toBe('Bill Expense');
  });

  test('day before a month name', () => {
    const r = parse('doctor 2000 on 3 november bank transfer');
    expect(r.amount).toBe(2000);
    expect(ymd(r.date)).toBe('2026-11-03');
    expect(r.categoryName).toBe('Health & Medical');
    expect(r.paymentMode).toBe(2);
  });

  test('a day later this month means last month', () => {
    expect(ymd(parse('rent 30000 on the 25th').date)).toBe('2026-10-25');
  });

  test('weekday means the most recent past one', () => {
    // 18 Nov 2026 is a Wednesday; Monday is the 16th.
    expect(ymd(parse('lunch 800 on monday').date)).toBe('2026-11-16');
    expect(ymd(parse('lunch 800 last wednesday').date)).toBe('2026-11-11');
  });

  test('days ago', () => {
    const r = parse('mobile load 500 3 days ago');
    expect(r.amount).toBe(500);
    expect(ymd(r.date)).toBe('2026-11-15');
    expect(r.categoryName).toBe('Mobile & Internet');
  });

  test('defaults to today and reports what is missing', () => {
    const r = parse('something 750');
    expect(ymd(r.date)).toBe('2026-11-18');
    expect(r.dateSaid).toBe(false);
    expect(r.categoryName).toBe('Other');
    expect(r.categoryGuessed).toBe(true);
    expect(r.missing).toEqual(['paymentMode']);
  });

  test('no amount', () => {
    const r = parse('petrol by cash');
    expect(r.amount).toBeNull();
    expect(r.missing).toContain('amount');
  });

  test('more specific keyword wins (gas bill vs gas)', () => {
    expect(parse('sui gas bill 2300').categoryName).toBe('Bill Expense');
  });

  test('lakh and k', () => {
    expect(parse('gold 1.5 lakh savings').amount).toBe(150000);
    expect(parse('uber 2k').amount).toBe(2000);
  });

  test('Roman Urdu basics', () => {
    const r = parse('kal 500 ka petrol naqad');
    expect(r.amount).toBe(500);
    expect(ymd(r.date)).toBe('2026-11-17');
    expect(r.paymentMode).toBe(1);
    expect(r.categoryName).toBe('Transportation');
  });

  test('module hint', () => {
    expect(parse('business expense 5000 stationery').module).toBe('business');
    expect(parse('5000 stationery').module).toBeNull();
  });

  test('empty input', () => {
    const r = parse('');
    expect(r.amount).toBeNull();
    expect(r.missing).toEqual(['amount', 'category', 'paymentMode'].filter(
      f => f !== 'category',
    ));
  });
});
