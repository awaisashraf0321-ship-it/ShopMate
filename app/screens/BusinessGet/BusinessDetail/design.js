import { StyleSheet, Text, View, RefreshControl } from 'react-native';
import React from 'react';
import styles from '../BusinessDetail/style';
import LeadgerHeader from '../../../components/LeadgerHeader';
import Loader from '../../../components/Loader';
import ExpenseDetail from '../../../components/ExpenseDetail';
import { ScrollView } from 'react-native';
import sizeHelper from '../../../helpers/sizeHelper';
import ConfirmModal from '../../../components/ConfirmModal';
import DropdownStylishBtn from '../../../components/DropdownStylishBtn';
import colors from '../../../theme/colors';
const Design = ({
  Get,
  navigation,
  refreshing,
  onRefresh,
  formatDate,
  formatAmount,
  handleDelete1,
  deleteModal4,
  SetDeleteModal4,
  selectedPaymentId4,
  setSelectedPaymentId4,
  Loading,
}) => {
  const selectedIcon = Category => {
    if (Category === 'Office Expense') {
      return {
        icon: 'business',
        color: '#FF6B6B',
      };
    }

    if (Category === 'Other Expense') {
      return {
        icon: 'apps',
        color: '#3B82F6',
      };
    }

    return {
      icon: 'category',
      color: '#65A30D',
    };
  };
  return (
    <View>
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={true}
        showBack={true}
        showPlus={true}
        Margin={false}
        back={() => navigation.goBack()}
      />
      <LeadgerHeader
        title={'Buisness Expense Details'}
        subTitle={'View and manage Buisness Expense information'}
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
            module={Get.ModuleId}
            description={Get.Description}
            formatDate={formatDate}
            formatAmount={formatAmount}
            onPress={() => {
              setSelectedPaymentId4(Get.Id);
              SetDeleteModal4(true);
            }}
          />
        )}
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
            handleDelete1(selectedPaymentId4);
            SetDeleteModal4(false);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Design;
