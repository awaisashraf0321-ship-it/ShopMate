import React from 'react';
import PaymentForm from '../../components/PaymentForm';
import ConfirmModal from '../../components/ConfirmModal';

/** New Incoming Payment: money received from a customer. */
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
  setNote,
  Loading,
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
  setDescriptionFoucused,
  deleteCustomer,
  selectedPaymentId3,
  setSelectedPaymentId3,
  deleteModal4,
  SetDeleteModal4,
}) => (
  <PaymentForm
    navigation={navigation}
    title="New Payment"
    subTitle="Money you've received"
    loading={Loading}
    scrollRef={scrollRef}
    amount={amount}
    setAmount={setAmount}
    handleAmountChange={handleAmountChange}
    amountTitle="Amount received"
    party={{
      text: 'Received from',
      sentTo,
      setSentTo,
      visible: activeModal,
      setVisible: setActiveModal,
      setSelectedCustomerId: setSelectedCustomerId1,
      getNames: getNames1,
      onDelete: item => {
        setSelectedPaymentId3(item.Id);
        SetDeleteModal4(true);
      },
    }}
    payment={{
      paymentMode,
      setPaymentMode,
      condition: true,
      screenType: 'InComing',
      showPhotoModal,
      setShowPhotoModal,
      pickFromGallery,
      openCamera,
      imageUri: imageUri2,
      setImageUri: setImageUri2,
      imageRemove,
      launchImageLibrary,
    }}
    date={{ date, setDate, showDate, setShowDate, showTime, setShowTime }}
    note={note}
    setNote={setNote}
    onFieldFocus={setDescriptionFoucused}
    onSave={handleIncomingPayments}
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
