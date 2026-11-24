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
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import SavePayment from '../../components/SavePayment';
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
  handleIncomingPayments,
  activeModal,
  setSelectedCustomerId1,
  getNames1,
  setActiveModal,
  scrollRef,
  showPhotoModal,
  setShowPhotoModal,
  pickFromGallery,
  openCamera,
  imageUri2,
  setImageUri2,
  imageRemove,
  launchImageLibrary,
  isDescriptionFocused,
  setDescriptionFoucused,
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
        Margin={false}
        showBack={true}
        showPlus={false}
        back={() => navigation.goBack()}
      />
      <LeadgerHeader
        title={'Ingoing Payments'}
        subTitle={'Manage your received payments'}
        btnText={'Save'}
        navigation={navigation}
        btn={true}
        onSave={handleIncomingPayments}
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
            amountTitle={'Received Amount'}
            placeholder={'Enter Amount'}
            currency="Rs"
            handleAmountChange={handleAmountChange}
          />

          <View style={styles.CategorySelector}>
            <SentToInput
              text={'Received from'}
              sentTo={sentTo}
              setSentTo={setSentTo}
              setVisible={setActiveModal}
              visible={activeModal}
              setSelectedCustomerId={setSelectedCustomerId1}
              getNames={getNames1}
              navigation={navigation}
              onDelete={deleteFun}
            />
          </View>

          <View style={styles.CategorySelector}>
            <PaymentMethod
              paymentMode={paymentMode}
              setPaymentMode={setPaymentMode}
              condition={true}
              amount={amount}
              screenType={'InComing'}
              showPhotoModal={showPhotoModal}
              setShowPhotoModal={setShowPhotoModal}
              pickFromGallery={pickFromGallery}
              openCamera={openCamera}
              imageUri={imageUri2}
              imageRemove={imageRemove}
              setImageUri={setImageUri2}
              launchImageLibrary={launchImageLibrary}
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
              onBlur={() => setDescriptionFoucused(false)}
              onFocus={() => {
                setDescriptionFoucused(true);
              }}
            />
          </View>
          <SavePayment amount={amount} onPress={handleIncomingPayments} />
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
