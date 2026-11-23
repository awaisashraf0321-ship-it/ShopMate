import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import AmountInput from '../../components/AmountInput';
import CategorySelector from '../../components/CategorySelector';
import NoteInput from '../../components/NoteInput';
import DatePicker from '../../components/DatePicker';
import Loader from '../../components/Loader';
import PaymentMethod from '../../components/PaymentMethod';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import SavePayment from '../../components/SavePayment';
import { categoryStyle } from '../../theme';
import styles from './style';

/**
 * Add Expense form, shared by the personal (SelfExpense) and business
 * (Business Expense) screens; only the header text differs.
 * Header row (back + title), then the fields in the order people fill
 * them: amount, category, date, payment method, note. "Save Expense"
 * stays pinned at the bottom.
 */
const Design = ({
  navigation,
  amount,
  setAmount,
  category,
  setCategory,
  note,
  date,
  setDate,
  setNote,
  showDate,
  setShowDate,
  showTime,
  setShowTime,
  paymentMode,
  setPaymentMode,
  categories,
  loading,
  handleExpense,
  handleAmountChange,
  scrollRef,
  visible,
  setVisible,
  showPhotoModal,
  setShowPhotoModal,
  pickFromGallery,
  openCamera,
  imageUri,
  imageRemove,
  setImageUri,
  setDescriptionFoucused,
  title = 'Add Expense',
  subTitle = 'Personal expense',
}) => (
  <View style={styles.screen}>
    <DropdownStylishBtn
      navigation={navigation}
      showDropdown={false}
      showBack
      Margin={false}
      showPlus={false}
      title={title}
      subTitle={subTitle}
      back={() => navigation.goBack()}
    />
    <Loader visible={loading} />

    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        ref={scrollRef}
        style={styles.screen}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <AmountInput
          amount={amount}
          setAmount={setAmount}
          currency="Rs"
          amountTitle="Amount"
          placeholder="0"
          handleAmountChange={handleAmountChange}
          onFocus={() => setDescriptionFoucused(true)}
          onBlur={() => setDescriptionFoucused(false)}
        />

        <View style={styles.section}>
          <CategorySelector
            categories={categories || []}
            category={category}
            setCategory={setCategory}
            selectedIcon={categoryStyle}
            visible={visible}
            setVisible={setVisible}
            amount={amount}
            title="Category"
          />
        </View>

        <View style={styles.section}>
          <DatePicker
            date={date}
            setDate={setDate}
            showDate={showDate}
            setShowDate={setShowDate}
            showTime={showTime}
            setShowTime={setShowTime}
            timePicker={false}
          />
        </View>

        <View style={styles.section}>
          <PaymentMethod
            paymentMode={paymentMode}
            setPaymentMode={setPaymentMode}
            amount={amount}
            condition
            showPhotoModal={showPhotoModal}
            setShowPhotoModal={setShowPhotoModal}
            pickFromGallery={pickFromGallery}
            openCamera={openCamera}
            imageUri={imageUri}
            imageRemove={imageRemove}
            setImageUri={setImageUri}
          />
        </View>

        <View style={styles.section}>
          <NoteInput
            note={note}
            setNote={setNote}
            onFocus={() => {
              setDescriptionFoucused(true);
              setTimeout(
                () => scrollRef?.current?.scrollToEnd({ animated: true }),
                150,
              );
            }}
            onBlur={() => setDescriptionFoucused(false)}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <SavePayment
          amount={amount}
          onPress={handleExpense}
          title="Save Expense"
        />
      </View>
    </KeyboardAvoidingView>
  </View>
);

export default Design;
