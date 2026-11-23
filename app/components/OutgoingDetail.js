import React from 'react';
import TransactionDetail from './TransactionDetail';

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
      title={`${incoming ? 'Received from' : 'Paid to'} ${sentTo || '-'}`}
      amount={formatAmount ? formatAmount(amount) : String(amount ?? '0')}
      direction={incoming ? 'in' : 'out'}
      date={formatDate ? formatDate(reciptDate) : reciptDate}
      method={paymentMode}
      rows={[
        { label: 'Account', value: module },
        { label: 'Reference', value: reciptNo || id, icon: 'tag' },
      ]}
      description={Description}
      onDelete={onPress}
    />
  );
};

export default OutgoingDetails;
