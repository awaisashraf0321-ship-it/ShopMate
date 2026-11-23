import React from 'react';
import PaymentForm from '../../components/PaymentForm';

/**
 * Collection Payment. Note: nothing in the app navigates to this screen
 * yet, and it has no save handler, so "Save Payment" does nothing.
 */
const Design = ({
  handleAmountChange,
  navigation,
  setAmount,
  amount,
  paymentMode,
  setPaymentMode,
  showDate,
  setShowDate,
  showTime,
  setShowTime,
  date,
  setDate,
  note,
  setNote,
  scrollRef,
}) => (
  <PaymentForm
    navigation={navigation}
    title="Collection"
    subTitle="Record a customer collection"
    scrollRef={scrollRef}
    amount={amount}
    setAmount={setAmount}
    handleAmountChange={handleAmountChange}
    amountTitle="Amount collected"
    payment={{ paymentMode, setPaymentMode }}
    date={{ date, setDate, showDate, setShowDate, showTime, setShowTime }}
    note={note}
    setNote={setNote}
  />
);

export default Design;
