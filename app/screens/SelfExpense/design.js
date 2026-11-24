import {
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
import Loader from '../../components/Loader';
import PaymentMethod from '../../components/PaymentMethod';
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
  isDescriptionFocused,
  setDescriptionFoucused,
}) => {
  const getCategoryStyle = Category => {
    if (Category === 'Bill Expense') {
      return {
        icon: 'receipt-long',
        color: '#FCE8E8',
        iconColor: colors.dot,
      };
    }

    if (Category === 'Education & Learning') {
      return {
        icon: 'school',
        color: '#EDE7F6',
        iconColor: '#7E57C2',
      };
    }

    if (Category === 'Entertainment & Leisure') {
      return {
        icon: 'movie',
        color: '#FCE4EC',
        iconColor: '#D81B60',
      };
    }

    if (Category === 'Family & Personal Care') {
      return {
        icon: 'people',
        color: '#E0F2F1',
        iconColor: '#00897B',
      };
    }

    if (Category === 'Food & Groceries') {
      return {
        icon: 'restaurant',
        color: '#FFF3E0',
        iconColor: '#EF6C00',
      };
    }

    if (Category === 'Health & Medical') {
      return {
        icon: 'medical-services',
        color: '#FCE8E8',
        iconColor: '#E53935',
      };
    }

    if (Category === 'Home Expense') {
      return {
        icon: 'home',
        color: '#ECF5D9',
        iconColor: colors.categoryTravel,
      };
    }

    if (Category === 'Mobile & Internet') {
      return {
        icon: 'phone-iphone',
        color: '#E3F2FD',
        iconColor: '#1976D2',
      };
    }

    if (Category === 'Other') {
      return {
        icon: 'category',
        color: '#ECEFF1',
        iconColor: '#546E7A',
      };
    }

    if (Category === 'Saving & Investments') {
      return {
        icon: 'savings',
        color: '#E8F5E9',
        iconColor: '#388E3C',
      };
    }

    if (Category === 'Shopping & Clothing') {
      return {
        icon: 'shopping-bag',
        color: '#F3E5F5',
        iconColor: '#8E24AA',
      };
    }

    if (Category === 'Transportation') {
      return {
        icon: 'directions-car',
        color: '#E8F0FE',
        iconColor: '#3F51B5',
      };
    }

    return {
      icon: 'apps',
      color: '#E8F0FE',
      iconColor: colors.categoryClothing,
    };
  };

  return (
    <View>
      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <DropdownStylishBtn
          navigation={navigation}
          showDropdown={true}
          showBack={true}
          Margin={false}
          showPlus={false}
          back={() => navigation.goBack()}
        />
        <LeadgerHeader
          title={'Add Self Expense'}
          subTitle={'Track your Self expenses'}
          btnText={'Save'}
          navigation={navigation}
          onSave={handleExpense}
          plus={false}
          date={date}
          setDate={setDate}
          showDate={showDate}
          setShowDate={setShowDate}
          showTime={showTime}
          setShowTime={setShowTime}
        />
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: isDescriptionFocused
              ? sizeHelper.calHp(50)
              : sizeHelper.calHp(1390),
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
              amountTitle={'Self Amount'}
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
                categories={categories || []}
                category={category}
                setCategory={setCategory}
                selectedIcon={getCategoryStyle}
                visible={visible}
                setVisible={setVisible}
                amount={amount}
                title="Purpose of Payment"
              />
            </View>
            <View style={styles.main}>
              <PaymentMethod
                paymentMode={paymentMode}
                setPaymentMode={setPaymentMode}
                amount={amount}
                condition={true}
                showPhotoModal={showPhotoModal}
                setShowPhotoModal={setShowPhotoModal}
                pickFromGallery={pickFromGallery}
                openCamera={openCamera}
                imageUri={imageUri}
                imageRemove={imageRemove}
                setImageUri={setImageUri}
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
              <SavePayment amount={amount} onPress={handleExpense} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Design;
