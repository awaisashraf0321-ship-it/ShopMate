import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Design from '../Collection/design';
import { useState } from 'react';
import { useRef } from 'react';
const CollectionScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState(null);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState('');
  const scrollRef = useRef(null);

  const handleAmountChange = value => {
    const cleanedValue = value.replace(/[^0-9]/g, '');
    const parts = cleanedValue.split('.');
    if (parts[0].length > 7) return;
    setAmount(cleanedValue);
  };
  return (
    <View>
      <Design
        navigation={navigation}
        amount={amount}
        setAmount={setAmount}
        handleAmountChange={handleAmountChange}
        paymentMode={paymentMode}
        setPaymentMode={setPaymentMode}
        showDate={showDate}
        setShowDate={setShowDate}
        showTime={showTime}
        setShowTime={setShowTime}
        date={date}
        setDate={setDate}
        note={note}
        setNote={setNote}
        scrollRef={scrollRef}
      />
    </View>
  );
};

export default CollectionScreen;
