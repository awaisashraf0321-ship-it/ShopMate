// Customer balances, worked out in the app from the "You gave" and "You got"
// payment lists (the API has no per-customer balance yet).
//
// Khata rule: money you GAVE someone is money they owe you back.
//   balance = total you gave - total you got
//   > 0  you will get that much from them
//   < 0  you will give that much to them
//   = 0  all settled

import { t } from '../i18n';
import { normalizePhone, isValidPhone } from './phoneAccount';

const sameName = (a, b) =>
  String(a ?? '')
    .trim()
    .toLowerCase() ===
  String(b ?? '')
    .trim()
    .toLowerCase();

const customerIdOf = payment => payment?.CustomerId ?? payment?.customerId;

/** Does this payment belong to this customer? Id first, name as fallback. */
export const belongsTo = (payment, customer, nameField) => {
  const id = customerIdOf(payment);
  if (id != null && customer.Id != null)
    return String(id) === String(customer.Id);
  return sameName(payment?.[nameField], customer.Name);
};

const total = list => list.reduce((sum, p) => sum + (Number(p.Amount) || 0), 0);

const latestDate = list =>
  list.reduce((latest, p) => {
    const d = p.ReceiptDate ? new Date(p.ReceiptDate) : null;
    return d && (!latest || d > latest) ? d : latest;
  }, null);

/**
 * One row per customer with what you gave, what you got and the balance,
 * most recently active first; customers with no entries go last (by name).
 */
export const customerBalances = ({ customers, gave, got }) =>
  (customers ?? [])
    .map(customer => {
      const gaveList = (gave ?? []).filter(p =>
        belongsTo(p, customer, 'SentTo'),
      );
      const gotList = (got ?? []).filter(p =>
        belongsTo(p, customer, 'ReceivedFrom'),
      );
      const gaveTotal = total(gaveList);
      const gotTotal = total(gotList);
      return {
        id: customer.Id,
        name: customer.Name || 'No name',
        gave: gaveTotal,
        got: gotTotal,
        balance: gaveTotal - gotTotal,
        lastDate: latestDate([...gaveList, ...gotList]),
      };
    })
    .sort((a, b) => {
      if (a.lastDate && b.lastDate) return b.lastDate - a.lastDate;
      if (a.lastDate || b.lastDate) return a.lastDate ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

/** Every entry with this customer, newest first: { ...payment, kind }. */
export const customerHistory = ({ customer, gave, got }) =>
  [
    ...(gave ?? [])
      .filter(p => belongsTo(p, customer, 'SentTo'))
      .map(p => ({ ...p, kind: 'gave' })),
    ...(got ?? [])
      .filter(p => belongsTo(p, customer, 'ReceivedFrom'))
      .map(p => ({ ...p, kind: 'got' })),
  ].sort((a, b) => new Date(b.ReceiptDate) - new Date(a.ReceiptDate));

/** Totals across all customers, for the top of the Customers screen. */
export const khataTotals = rows => ({
  youWillGet: rows.reduce((s, r) => s + Math.max(r.balance, 0), 0),
  youWillGive: rows.reduce((s, r) => s + Math.max(-r.balance, 0), 0),
});

const amt = amount => Math.round(Math.abs(amount)).toLocaleString();
const rs = amount => `Rs ${Math.round(Math.abs(amount)).toLocaleString()}`;

/** Plain words + colour token for a balance. */
export const balanceLabel = balance => {
  if (balance > 0)
    return {
      text: t('khata.willGet', { amount: amt(balance) }),
      color: 'moneyIn',
    };
  if (balance < 0)
    return {
      text: t('khata.willGive', { amount: amt(balance) }),
      color: 'moneyOut',
    };
  return { text: t('khata.settled'), color: 'textMuted' };
};

/** "03001234567" / "3001234567" / "+92 300..." -> "923001234567" for wa.me. */
export const toWhatsappNumber = raw => {
  const phone = normalizePhone(raw);
  return isValidPhone(phone) ? `92${phone.slice(1)}` : null;
};

/** The customer's WhatsApp (or phone) number from a Customer/getById reply. */
export const customerWhatsapp = customer =>
  toWhatsappNumber(
    customer?.WhatsappNumber ??
      customer?.WhatsAppNumber ??
      customer?.whatsappNumber ??
      customer?.PhoneNo ??
      customer?.phoneNo ??
      customer?.PhoneNumber,
  );

/** Polite, short payment reminder in English and Roman Urdu. */
export const reminderMessage = ({ name, balance }) =>
  `Salam ${name}, your balance with me is ${rs(balance)}. ` +
  'Please pay when you can. Shukriya!\n\n' +
  `Aap ka baqaya ${rs(
    balance,
  )} hai. Meherbani kar ke jab mumkin ho ada kar dein. Shukriya!`;
