import { StyleSheet, Text, View, RefreshControl } from 'react-native';
import React from 'react';
import { deleteExpensePrompt } from '../../../helpers/moneyWords';
import styles from '../BusinessDetail/style';
import LeadgerHeader from '../../../components/LeadgerHeader';
import Loader from '../../../components/Loader';
import ExpenseDetail from '../../../components/ExpenseDetail';
import { ScrollView } from 'react-native';
import sizeHelper from '../../../helpers/sizeHelper';
import ConfirmModal from '../../../components/ConfirmModal';
import DropdownStylishBtn from '../../../components/DropdownStylishBtn';
import { categoryStyle } from '../../../theme';
import { t } from '../../../i18n';
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
  const selectedIcon = categoryStyle;
  return (
    <View>
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={false}
        showBack={true}
        showPlus={true}
        Margin={false}
        back={() => navigation.goBack()}
      />
      <LeadgerHeader
        title={t('expense.businessDetails')}
        subTitle={t('expense.detailsSubtitle')}
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
          tone="danger"
          title={deleteExpensePrompt().title}
          deleteText={t('delete.button')}
          subTitle1={deleteExpensePrompt().subTitle1}
          onClose={() => SetDeleteModal4(false)}
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
