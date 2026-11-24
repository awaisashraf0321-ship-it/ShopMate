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
import ConfirmModal from '../../../components/ConfirmModal';
import colors from '../../../theme/colors';
import Loader from '../../../components/Loader';
import DropdownStylishBtn from '../../../components/DropdownStylishBtn';

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
        showDropdown={true}
        showBack={true}
        Margin={false}
        showPlus={false}
        back={() => navigation.goBack()}

        // onPress={() => navigation.navigate('InComing')}
      />
      <LeadgerHeader
        title={'Outcoming Details'}
        subTitle={'View and manage payment information'}
        btnText={'Save'}
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
          style={{ backgroundColor: colors.lightDot }}
          iconColor={colors.redColor}
          title="Are You Sure?"
          deleteText="Delete"
          subTitle1="This payment will be permanently deleted."
          subTitle2="Do you want to continue?"
          onClose={() => SetDeleteModal2(false)}
          btnStyle={{ backgroundColor: colors.redColor }}
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
