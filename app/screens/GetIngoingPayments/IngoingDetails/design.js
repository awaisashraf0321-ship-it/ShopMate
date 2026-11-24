import { StyleSheet, Text, View, RefreshControl } from 'react-native';
import OutgoingDetails from '../../../components/OutgoingDetail';
import LeadgerHeader from '../../../components/LeadgerHeader';
import sizeHelper from '../../../helpers/sizeHelper';
import React from 'react';
import Loader from '../../../components/Loader';
import { ScrollView } from 'react-native';
import ConfirmModal from '../../../components/ConfirmModal';
import colors from '../../../theme/colors';
import DropdownStylishBtn from '../../../components/DropdownStylishBtn';
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
          showDropdown={true}
          showBack={true}
          showPlus={false}
          back={() => navigation.goBack()}

          // onPress={() => navigation.navigate('InComing')}
        />
        <LeadgerHeader
          title={'Payment Details'}
          subTitle={'View and manage payment information'}
          btnText={'Save'}
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
              paymentMode={getPayments1.paymentMode}
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
            style={{ backgroundColor: colors.lightDot }}
            iconColor={colors.redColor}
            title="Are You Sure?"
            deleteText="Delete"
            subTitle1="This payment will be permanently deleted."
            subTitle2="Do you want to continue?"
            onClose={() => SetDeleteModal1(false)}
            btnStyle={{ backgroundColor: colors.redColor }}
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
