import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import LeadgerHeader from '../../components/LeadgerHeader';
import AmountInput from '../../components/AmountInput';
import SentToInput from '../../components/SentToInput';
import PaymentMethod from '../../components/PaymentMethod';
import NoteInput from '../../components/NoteInput';
import DatePicker from '../../components/DatePicker';
import styles from './style';
import sizeHelper from '../../helpers/sizeHelper';
import colors from '../../theme/colors';
import Loader from '../../components/Loader';
import SavePayment from '../../components/SavePayment';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import ConfirmModal from '../../components/ConfirmModal';

const Design = ({
  date,
  setDate,
  showTime,
  setShowTime,
  showDate,
  setShowDate,
  navigation,
  amount,
  setAmount,
  sentTo,
  setSentTo,
  paymentMode,
  setPaymentMode,
  note,
  handleSave,
  setNote,
  Loading,
  setLoading,
  handleAmountChange,
  getNames,
  selectedCustomerId,
  setSelectedCustomerId,
  visible,
  scrollRef,
  setVisible,
  search,
  setSearch,
  cusLength,
  showPhotoModal,
  setShowPhotoModal,
  pickFromGallery,
  openCamera,
  imageUri1,
  setImageUri1,
  launchImageLibrary,
  imageRemove,
  isDescriptionFocused,
  setIsDescriptionFocused,
  deleteCustomer,
  selectedPaymentId3,
  setSelectedPaymentId3,
  deleteModal4,
  SetDeleteModal4,
}) => {
  const deleteFun = item => {
    setSelectedPaymentId3(item.Id);
    SetDeleteModal4(true);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ backgroundColor: colors.main }}
    >
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={true}
        showBack={true}
        showPlus={false}
        Margin={false}
        back={() => navigation.goBack()}
      />
      <LeadgerHeader
        title={'New Outgoing Payments'}
        subTitle={'Manage outgoing payments'}
        btnText={'Save'}
        navigation={navigation}
        btn={false}
      />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: isDescriptionFocused
            ? sizeHelper.calHp(100)
            : sizeHelper.calHp(960),
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ flex: 1, backgroundColor: colors.main }}>
          <Loader visible={Loading} />

          <AmountInput
            amount={amount}
            setAmount={setAmount}
            amountTitle={' Sent Amount'}
            placeholder={'Enter Amount'}
            onBlur={() => setIsDescriptionFocused(false)}
            onFocus={() => {
              setIsDescriptionFocused(true);
            }}
            handleAmountChange={handleAmountChange}
          />

          <View style={styles.CategorySelector}>
            <SentToInput
              text={'Sent To'}
              sentTo={sentTo}
              navigation={navigation}
              getNames={getNames}
              setSentTo={setSentTo}
              setSelectedCustomerId={setSelectedCustomerId}
              visible={visible}
              search={search}
              setSearch={setSearch}
              setVisible={setVisible}
              cusLength={cusLength}
              SetDeleteModal4={SetDeleteModal4}
              onDelete={deleteFun}
            />
          </View>

          <View style={styles.CategorySelector}>
            <PaymentMethod
              paymentMode={paymentMode}
              condition={true}
              setPaymentMode={setPaymentMode}
              amount={amount}
              screenType={'Loan'}
              showPhotoModal={showPhotoModal}
              setShowPhotoModal={setShowPhotoModal}
              pickFromGallery={pickFromGallery}
              launchImageLibrary={launchImageLibrary}
              openCamera={openCamera}
              imageUri={imageUri1}
              setImageUri={setImageUri1}
              imageRemove={imageRemove}
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
              onBlur={() => setIsDescriptionFocused(false)}
              onFocus={() => {
                setIsDescriptionFocused(true);
              }}
            />
          </View>
          <SavePayment amount={amount} onPress={handleSave} />
          <ConfirmModal
            visible={deleteModal4}
            icon="delete"
            style={{ backgroundColor: colors.lightDot }}
            iconColor={colors.redColor}
            title="Are You Sure?"
            deleteText="Delete"
            subTitle1="This payment will be permanently deleted."
            subTitle2="Do you want to continue?"
            onClose={() => SetDeleteModal4(false)}
            btnStyle={{ backgroundColor: colors.redColor }}
            onOk={() => {
              deleteCustomer.mutate(selectedPaymentId3);
              SetDeleteModal4(false);
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Design;
