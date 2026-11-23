import React from 'react';
import AppText from './AppText';

/** "Rs 1,250" formatting in one place (replaces the per-screen formatAmount). */
export const formatAmount = amount =>
  (Number(amount) || 0).toLocaleString('en-US');

/**
 * Full money string with the app's one sign convention: the sign goes
 * before the currency. formatMoney(-6000) -> "- Rs 6,000",
 * formatMoney(1250) -> "Rs 1,250".
 */
export const formatMoney = (amount, currency = 'Rs') => {
  const n = Number(amount) || 0;
  return `${n < 0 ? '- ' : ''}${currency} ${formatAmount(Math.abs(n))}`;
};

/**
 * Money amount with consistent formatting and colour.
 *
 *   <AmountText value={1250} />                     // Rs 1,250
 *   <AmountText value={300} direction="out" />      // - Rs 300 in red
 *   <AmountText value={900} direction="in" variant="h2" />
 *
 * direction: none | in (green, "+") | out (red, "-")
 */
export default function AmountText({
  value,
  direction = 'none',
  currency = 'Rs',
  variant = 'bodyStrong',
  color,
  style,
}) {
  const sign = direction === 'in' ? '+ ' : direction === 'out' ? '- ' : '';
  const tone =
    color ??
    (direction === 'in'
      ? 'moneyIn'
      : direction === 'out'
      ? 'moneyOut'
      : 'textPrimary');
  return (
    <AppText variant={variant} color={tone} style={style}>
      {`${sign}${currency} ${formatAmount(value)}`}
    </AppText>
  );
}
