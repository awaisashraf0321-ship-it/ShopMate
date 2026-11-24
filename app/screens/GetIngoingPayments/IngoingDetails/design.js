import { StyleSheet, Text, View, RefreshControl } from 'react-native';
import OutgoingDetails from '../../../components/OutgoingDetail';
import LeadgerHeader from '../../../components/LeadgerHeader';
import sizeHelper from '../../../helpers/sizeHelper';
import React from 'react';
import { GOT, deletePaymentPrompt } from '../../../helpers/moneyWords';
import Loader from '../../../components/Loader';
import { ScrollView } from 'react-native';
import ConfirmModal from '../../../components/ConfirmModal';
import DropdownStylishBtn from '../../../components/DropdownStylishBtn';
import { t } from '../../../i18n';
const Design = ({
  navigation,
  getPayments1,
  loading,
  refreshing,
  onRefresh,
  formatAmount,
  formatDate,
  deleteModal1,
  SetDeleteModal1,
  selectedPaymentId1,
  setSelectedPaymentId1,
  handleDelete,
}) => {
  return (
    <View>
      <View>
        <DropdownStylishBtn
          navigation={navigation}
          Margin={false}
          showDropdown={false}
          showBack={true}
          showPlus={false}
          back={() => navigation.goBack()}
        />
        <LeadgerHeader
          title={GOT.detailTitle}
          subTitle={t('payment.detailsSubtitle')}
          btnText={t('common.save')}
          btn={false}
          navigation={navigation}
          plus={false}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: sizeHelper.calHp(740) }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Loader visible={loading} />
          {getPayments1 && (
            <OutgoingDetails
              id={getPayments1.Id}
              name={'ReceivedFrom'}
              sentTo={getPayments1.ReceivedFrom}
              amount={getPayments1.Amount}
              reciptNo={getPayments1.ReceiptNo}
              module={getPayments1.Module}
              Description={getPayments1.Description}
              paymentMode={getPayments1.Paymentmode ?? getPayments1.paymentMode}
              reciptDate={getPayments1.ReceiptDate}
              navigation={navigation}
              formatDate={formatDate}
              onPress={() => {
                setSelectedPaymentId1(getPayments1.Id);
                SetDeleteModal1(true);
              }}
              formatAmount={formatAmount}
            />
          )}
          <ConfirmModal
            visible={deleteModal1}
            icon="delete"
            tone="danger"
            {...deletePaymentPrompt(GOT, getPayments1)}
            deleteText={t('delete.button')}
            onClose={() => SetDeleteModal1(false)}
            onOk={() => {
              handleDelete(selectedPaymentId1);
              SetDeleteModal1(false);
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Design;

const styles = StyleSheet.create({});
