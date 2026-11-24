import React from 'react';
import TransactionDetail from './TransactionDetail';
import { GAVE, GOT } from '../helpers/moneyWords';
import { t } from '../i18n';

/**
 * Detail view for an outgoing OR incoming payment.
 * Callers pass name="ReceivedFrom" for incoming payments.
 */
const OutgoingDetails = ({
  Description,
  onPress,
  module,
  amount,
  reciptDate,
  formatAmount,
  formatDate,
  paymentMode,
  reciptNo,
  sentTo,
  name,
  id,
}) => {
  const incoming = name === 'ReceivedFrom';

  return (
    <TransactionDetail
      icon={incoming ? 'south-west' : 'north-east'}
      title={`${(incoming ? GOT : GAVE).detailPrefix} ${sentTo || '-'}`}
      amount={formatAmount ? formatAmount(amount) : String(amount ?? '0')}
      direction={incoming ? 'in' : 'out'}
      date={formatDate ? formatDate(reciptDate) : reciptDate}
      method={paymentMode}
      // Only show a receipt number when there is one; the internal id and
      // the Personal/Business account mean nothing to the user.
      rows={
        reciptNo
          ? [{ label: t('field.receiptNo'), value: reciptNo, icon: 'tag' }]
          : []
      }
      description={Description}
      onDelete={onPress}
    />
  );
};

export default OutgoingDetails;
