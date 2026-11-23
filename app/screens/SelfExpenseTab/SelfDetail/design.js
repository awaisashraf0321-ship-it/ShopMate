import { Text, View, RefreshControl } from 'react-native';
import React from 'react';
import styles from '../SelfDetail/style';
import LeadgerHeader from '../../../components/LeadgerHeader';
import Loader from '../../../components/Loader';
import ExpenseDetail from '../../../components/ExpenseDetail';
import { ScrollView } from 'react-native';
import sizeHelper from '../../../helpers/sizeHelper';
import ConfirmModal from '../../../components/ConfirmModal';
import DropdownStylishBtn from '../../../components/DropdownStylishBtn';
import { categoryStyle } from '../../../theme';
const Design = ({
  Get,
  navigation,
  formatDate,
  formatAmount,
  deleteModal3,
  SetDeleteModal3,
  selectedPaymentId3,
  setSelectedPaymentId3,
  handleDelete,
  refreshing,
  onRefresh,
  Loading,
}) => {
  const selectedIcon = categoryStyle;
  console.log('my data of self', Get);
  return (
    <View>
      <DropdownStylishBtn
        Margin={false}
        navigation={navigation}
        showDropdown={false}
        showBack={true}
        back={() => navigation.goBack()}
        showPlus={false}
      />
      <LeadgerHeader
        title={'Self Expense Details'}
        subTitle={'View and manage Self Expense information'}
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
        <Loader visible={Loading} />
        {Get && (
          <ExpenseDetail
            Date={Get.ExpenseDate}
            selectedIcon={selectedIcon}
            expenseType={Get.ExpenseType}
            Expensetype={Get.Expensetype}
            amount={Get.Amount}
            paymentMethodId={Get.PaymentMethodId}
            expenseCategory={Get.ExpenseCategory}
            paymentMethod={Get.PaymentMethod}
            description={Get.Description}
            formatDate={formatDate}
            module={Get.ModuleId}
            formatAmount={formatAmount}
            onPress={() => {
              setSelectedPaymentId3(Get.Id);
              SetDeleteModal3(true);
            }}
          />
        )}
        <ConfirmModal
          visible={deleteModal3}
          icon="delete"
          tone="danger"
          title="Are You Sure?"
          deleteText="Delete"
          subTitle1="This payment will be permanently deleted."
          subTitle2="Do you want to continue?"
          onClose={() => SetDeleteModal3(false)}
          onOk={() => {
            handleDelete(selectedPaymentId3);
            SetDeleteModal3(false);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Design;
