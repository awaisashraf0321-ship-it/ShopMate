// The words, icons and colours for money moving between the user and other
// people. Use these everywhere so the same thing always has the same name:
// shopkeepers think "I gave / I got" (diye / liye), not "outgoing / incoming".
// Words are getters, so they follow the chosen language (see app/i18n).
import { t } from '../i18n';

const words = (prefix, icon, color) => ({
  icon,
  color,
  get label() {
    return t(`${prefix}.label`);
  },
  get formTitle() {
    return t(`${prefix}.label`);
  },
  get formSubtitle() {
    return t(`${prefix}.formSubtitle`);
  },
  get amountTitle() {
    return t(`${prefix}.amountTitle`);
  },
  get partyLabel() {
    return t(`${prefix}.partyLabel`);
  },
  get listSubtitle() {
    return t(`${prefix}.listSubtitle`);
  },
  get total() {
    return t(`${prefix}.total`);
  },
  get detailTitle() {
    return t(`${prefix}.label`);
  },
  get detailPrefix() {
    return t(`${prefix}.detailPrefix`);
  },
  get emptyTitle() {
    return t('money.emptyTitle');
  },
  get emptyMessage() {
    return t(`${prefix}.emptyMessage`);
  },
  deletePrompt: vars => t(`${prefix}.deletePrompt`, vars),
  saved: vars => t(`${prefix}.saved`, vars),
});

export const GAVE = words('gave', 'north-east', 'moneyOut');
export const GOT = words('got', 'south-west', 'moneyIn');

/**
 * The first missing thing on a payment form, said plainly, or null.
 * Checked in the order the fields appear on screen.
 */
export const missingPaymentField = ({ amount, party, words: w }) => {
  if (!amount || Number(amount) <= 0) return t('money.typeAmount');
  if (!party) return t('money.choose', { what: w.partyLabel });
  return null;
};

/** The first missing thing on an expense form, said plainly, or null. */
export const missingExpenseField = ({ amount, category }) => {
  if (!amount || Number(amount) <= 0) return t('money.typeAmount');
  if (!category) return t('money.chooseCategory');
  return null;
};

/** Finds a payment by Id inside the lists' { children: [...] } groups. */
export const findPayment = (groups, id) =>
  (groups ?? []).flatMap(group => group.children ?? []).find(p => p.Id === id);

/**
 * Text for "delete this payment?" that says exactly what goes:
 * "Delete Rs 5,000 given to Ahmed?" instead of "Are You Sure?".
 */
export const deletePaymentPrompt = (w, payment) => {
  const name = payment?.SentTo ?? payment?.ReceivedFrom;
  const amount = Number(payment?.Amount);
  return {
    title:
      amount && name
        ? w.deletePrompt({ amount: amount.toLocaleString(), name })
        : t('delete.entry'),
    subTitle1: t('delete.forGood'),
  };
};

export const deleteExpensePrompt = () => ({
  title: t('delete.expense'),
  subTitle1: t('delete.forGood'),
});
