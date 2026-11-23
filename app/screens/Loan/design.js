import React from 'react';
import PaymentForm from '../../components/PaymentForm';
import ConfirmModal from '../../components/ConfirmModal';

/** New Outgoing Payment: money sent to a customer. */
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
  handleAmountChange,
  getNames,
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
  setIsDescriptionFocused,
  deleteCustomer,
  selectedPaymentId3,
  setSelectedPaymentId3,
  deleteModal4,
  SetDeleteModal4,
}) => (
  <PaymentForm
    navigation={navigation}
    title="New Payment"
    subTitle="Money you're sending"
    loading={Loading}
    scrollRef={scrollRef}
    amount={amount}
    setAmount={setAmount}
    handleAmountChange={handleAmountChange}
    amountTitle="Amount sent"
    party={{
      text: 'Sent to',
      sentTo,
      setSentTo,
      getNames,
      setSelectedCustomerId,
      visible,
      setVisible,
      search,
      setSearch,
      cusLength,
      SetDeleteModal4,
      onDelete: item => {
        setSelectedPaymentId3(item.Id);
        SetDeleteModal4(true);
      },
    }}
    payment={{
      paymentMode,
      setPaymentMode,
      condition: true,
      screenType: 'Loan',
      showPhotoModal,
      setShowPhotoModal,
      pickFromGallery,
      launchImageLibrary,
      openCamera,
      imageUri: imageUri1,
      setImageUri: setImageUri1,
      imageRemove,
    }}
    date={{ date, setDate, showDate, setShowDate, showTime, setShowTime }}
    note={note}
    setNote={setNote}
    onFieldFocus={setIsDescriptionFocused}
    onSave={handleSave}
  >
    <ConfirmModal
      visible={deleteModal4}
      icon="delete"
      tone="danger"
      title="Delete this customer?"
      deleteText="Delete"
      subTitle1="This customer will be permanently deleted."
      subTitle2="Do you want to continue?"
      onClose={() => SetDeleteModal4(false)}
      onOk={() => {
        deleteCustomer.mutate(selectedPaymentId3);
        SetDeleteModal4(false);
      }}
    />
  </PaymentForm>
);

export default Design;
