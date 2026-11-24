import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import LeadgerHeader from '../../components/LeadgerHeader';
import AmountInput from '../../components/AmountInput';
import styles from '../Collection/style';
import PaymentMethod from '../../components/PaymentMethod';
import sizeHelper from '../../helpers/sizeHelper';
import DatePicker from '../../components/DatePicker';
import NoteInput from '../../components/NoteInput';
import colors from '../../theme/colors';
import SavePayment from '../../components/SavePayment';
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
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ backgroundColor: colors.main }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <DropdownStylishBtn
            navigation={navigation}
            showDropdown={true}
            showBack={true}
            showPlus={false}
            back={() => navigation.goBack()}
          />
          <LeadgerHeader
            title={'Collection Payment'}
            subTitle={'Record and manage customer collections'}
            btnText={'Save'}
            navigation={navigation}
            btn={false}
          />
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: sizeHelper.calHp(180),
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <AmountInput
              amount={amount}
              amountTitle={'Collection Amount'}
              setAmount={setAmount}
              currency="Rs"
              handleAmountChange={handleAmountChange}
            />
            <View style={styles.CategorySelector}>
              <PaymentMethod
                paymentMode={paymentMode}
                setPaymentMode={setPaymentMode}
              />
            </View>
            <View style={styles.CategorySelector}>
              <DatePicker
                showDate={showDate}
                setShowDate={setShowDate}
                showTime={showTime}
                setShowTime={setShowTime}
                setDate={setDate}
                date={date}
                timePicker={false}
                DateStyle={{ fontSize: sizeHelper.calHp(30) }}
              />
            </View>

            <View style={styles.CategorySelector}>
              <NoteInput
                note={note}
                setNote={setNote}
                onFocus={() => {
                  setTimeout(() => {
                    scrollRef.current?.scrollToEnd({ animated: true });
                  }, 100);
                }}
              />
            </View>
            <SavePayment amount={amount} />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Design;
