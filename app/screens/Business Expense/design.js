import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import LeadgerHeader from '../../components/LeadgerHeader';
import AmountInput from '../../components/AmountInput';
import CategorySelector from '../../components/CategorySelector';
import NoteInput from '../../components/NoteInput';
import DatePicker from '../../components/DatePicker';
import styles from './style';
import sizeHelper from '../../helpers/sizeHelper';
import PaymentMethod from '../../components/PaymentMethod';
import Loader from '../../components/Loader';
import colors from '../../theme/colors';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import SavePayment from '../../components/SavePayment';

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
  loading,
  categories,
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
  setImageUri,
  imageRemove,
  isDescriptionFocused,
  setDescriptionFoucused,
}) => {
  const selectedIcon = Category => {
    if (Category === 'Office Expense') {
      return {
        icon: 'business',
        color: '#FEE2E2',
        iconColor: '#B91C1C',
      };
    }

    if (Category === 'Other Expense') {
      return {
        icon: 'apps',
        color: '#DBEAFE',
        iconColor: '#1D4ED8',
      };
    }

    return {
      icon: 'category',
      color: '#ECFCCB',
      iconColor: '#3F6212',
    };
  };
  return (
    <KeyboardAvoidingView
      // style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={true}
        showBack={true}
        showPlus={false}
        back={() => navigation.goBack()}
        onPlusPress={() => navigation.navigate('Loan')}
      />
      <LeadgerHeader
        title={'Add Business Expense'}
        subTitle={'Track your business expenses'}
        btnText={'Save'}
        navigation={navigation}
        onSave={handleExpense}
      />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: isDescriptionFocused
            ? sizeHelper.calHp(50)
            : sizeHelper.calHp(960),
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.mainContainer}>
          <AmountInput
            amount={amount}
            setAmount={setAmount}
            currency="Rs"
            amountTitle={'Business Amount'}
            onFocus={() => {
              setDescriptionFoucused(true);
            }}
            onBlur={() => setDescriptionFoucused(false)}
            placeholder={'Enter Amount'}
            handleAmountChange={handleAmountChange}
          />
          <Loader visible={loading} />
          <View style={styles.main}>
            <CategorySelector
              categories={categories}
              category={category}
              setCategory={setCategory}
              amount={amount}
              visible={visible}
              setVisible={setVisible}
              title="Category"
              selectedIcon={selectedIcon}
            />
          </View>
          <View style={styles.main}>
            <PaymentMethod
              amount={amount}
              paymentMode={paymentMode}
              condition={true}
              showPhotoModal={showPhotoModal}
              setShowPhotoModal={setShowPhotoModal}
              pickFromGallery={pickFromGallery}
              openCamera={openCamera}
              imageUri={imageUri}
              setImageUri={setImageUri}
              imageRemove={imageRemove}
              setPaymentMode={setPaymentMode}
            />
          </View>
          <View style={styles.main}>
            <NoteInput
              note={note}
              setNote={setNote}
              onFocus={() => {
                setDescriptionFoucused(true);
              }}
              onBlur={() => setDescriptionFoucused(false)}
            />
          </View>

          {/* Date + Time */}
          <View style={styles.main}>
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
          <View style={styles.main}>
            <SavePayment amount={amount} onPress={handleExpense} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Design;
