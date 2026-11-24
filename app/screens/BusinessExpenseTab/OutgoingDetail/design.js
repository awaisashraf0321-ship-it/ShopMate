import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import OutgoingDetails from '../../../components/OutgoingDetail';
import LeadgerHeader from '../../../components/LeadgerHeader';
import sizeHelper from '../../../helpers/sizeHelper';
import React from 'react';
import { GAVE, deletePaymentPrompt } from '../../../helpers/moneyWords';
import ConfirmModal from '../../../components/ConfirmModal';
import Loader from '../../../components/Loader';
import DropdownStylishBtn from '../../../components/DropdownStylishBtn';
import { t } from '../../../i18n';

const Design = ({
  navigation,
  getPayments,
  handleDelete,
  loading,
  refreshing,
  onRefresh,
  formatAmount,
  formatDate,
  deleteModal2,
  SetDeleteModal2,
  selectedPaymentId2,
  setSelectedPaymentId2,
}) => {
  return (
    <View>
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={false}
        showBack={true}
        Margin={false}
        showPlus={false}
        back={() => navigation.goBack()}
      />
      <LeadgerHeader
        title={GAVE.detailTitle}
        subTitle={t('payment.detailsSubtitle')}
        btnText={t('common.save')}
        btn={false}
        plus={false}
        navigation={navigation}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizeHelper.calHp(400) }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Loader visible={loading} />
        {getPayments && (
          <OutgoingDetails
            id={getPayments.Id}
            name={'Sent To'}
            sentTo={getPayments.SentTo}
            amount={getPayments.Amount}
            module={getPayments.Module}
            reciptNo={getPayments.ReceiptNo}
            Description={getPayments.Description}
            paymentMode={getPayments.Paymentmode}
            reciptDate={getPayments.ReceiptDate}
            navigation={navigation}
            formatDate={formatDate}
            formatAmount={formatAmount}
            onPress={() => {
              setSelectedPaymentId2(getPayments.Id);
              SetDeleteModal2(true);
            }}
          />
        )}
        <ConfirmModal
          visible={deleteModal2}
          icon="delete"
          tone="danger"
          {...deletePaymentPrompt(GAVE, getPayments)}
          deleteText={t('delete.button')}
          onClose={() => SetDeleteModal2(false)}
          onOk={() => {
            handleDelete(selectedPaymentId2);
            SetDeleteModal2(false);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Design;
