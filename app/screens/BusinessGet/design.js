import { View, ScrollView, Text, RefreshControl } from 'react-native';
import React from 'react';
import { deleteExpensePrompt } from '../../helpers/moneyWords';
import LeadgerHeader from '../../components/LeadgerHeader';
import PaymentCard from '../../components/PaymentCard';
import Loader from '../../components/Loader';
import sizeHelper from '../../helpers/sizeHelper';
import styles from '../../screens/BusinessGet/style';
import ConfirmModal from '../../components/ConfirmModal';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import SearchBar from '../../components/SearchBar';
import PaymentSummaryCard from '../../components/PaymentSummaryCard';
import FilterModal from '../../components/FilterModal';
import Filter from '../../components/Filter';
import { EmptyState } from '../../ui';
import { theme, categoryStyle } from '../../theme';
import { t } from '../../i18n';

const Design = ({
  navigation,
  myExpenses1,
  getPaymentModeIcon,
  formatAmount,
  Loading1,
  refreshing,
  formatDate,
  handleDelete,
  onRefresh,
  selectedPaymentId2,
  setSelectedPaymentId2,
  deleteModal3,
  SetDeleteModal3,
  groupedPayments,
  search,
  setSearch,
  Total,
  TransactionsLength,
  activeTab,
  setActiveTab,
  visible,
  setVisible,
  myDashboard,
  methods,
  selectedPeriod,
  setSelectedPeriod,
  PaymentMethodId,
  setPaymentMethodId,
}) => {
  console.log('myExpenses:', myExpenses1);
  const selectedIcon = categoryStyle;
  const filtering = [
    { id: 'All', label: t('period.all'), PaymentMethodId: 0 },
    { id: 'Cash', label: t('money.cash'), PaymentMethodId: 1 },
    { id: 'Bank Transfer', label: t('money.bank'), PaymentMethodId: 2 },
    { id: 'Credit Card', label: t('money.card'), PaymentMethodId: 3 },
  ];
  const periodOptions = [
    { id: 1, title: 'Today', icon: 'today' },
    { id: 2, title: 'This Week', icon: 'date-range' },
    { id: 3, title: 'This Month', icon: 'calendar-month' },
    {
      id: 4,
      title: 'All',
      icon: 'apps',
    },
  ];
  return (
    <View style={styles.main}>
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={true}
        showBack={true}
        Margin={false}
        showPlus={true}
        back={() => navigation.goBack()}
        onPlusPress={() => navigation.navigate('BusinessExpense')}
      />
      <LeadgerHeader
        title={t('expense.business')}
        subTitle={t('expense.businessSubtitle')}
        btn={false}
        navigation={navigation}
        plus={true}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PaymentSummaryCard
          totalAmount={myDashboard.TotalExpense}
          totalTransactions={myDashboard.PaymentCount}
          paymentText={t('expense.businessTotal')}
          paymentPercentage="Business"
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          formatAmount={formatAmount}
          paymentType="Business"
          methods={methods}
          setVisible={setVisible}
          visible={visible}
        />
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder={t('common.searchName')}
        />
        <FilterModal
          visible={visible}
          setVisible={setVisible}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          periodOptions={periodOptions}
        />
        <Filter
          filtering={filtering}
          activeTab={activeTab}
          PaymentMethodId={PaymentMethodId}
          setPaymentMethodId={setPaymentMethodId}
          setSelectedPaymentId2
          setActiveTab={setActiveTab}
        />
        {groupedPayments.length === 0 && !Loading1 ? (
          <EmptyState
            title={t('expense.businessEmpty')}
            message={t('expense.emptyMessage')}
          />
        ) : (
          groupedPayments.map(group => (
            <View key={group.date} style={styles.dateGroup}>
              <View style={styles.dateHeader}>
                <Text style={styles.dateHeading}>{formatDate(group.date)}</Text>

                <Text style={styles.dateTotal}>
                  - Rs {formatAmount(group.groupedAmount)}
                </Text>
              </View>
              <View style={styles.groupCard}>
                {group.children.map((item, itemIndex) => (
                  <View key={item.Id}>
                    {itemIndex > 0 && <View style={styles.rowDivider} />}
                    <PaymentCard
                      sentTo={item.ExpenseCategory}
                      receiptDate={item.ExpenseDate}
                      amount={item.Amount}
                      formatAmount={formatAmount}
                      // getPaymentModeIcon={getPaymentModeIcon}
                      description={item.Description}
                      paymentMode={item.PaymentMethod}
                      formatDate={formatDate}
                      selectedIcon={selectedIcon}
                      onPress={() =>
                        navigation.navigate('BuisnessDetail', {
                          id: item.Id,
                        })
                      }
                      onDelete={() => {
                        setSelectedPaymentId2(item.Id);
                        SetDeleteModal3(true);
                      }}
                    />
                  </View>
                ))}
              </View>
            </View>
          ))
        )}
        <ConfirmModal
          visible={deleteModal3}
          icon="delete"
          tone="danger"
          title={deleteExpensePrompt().title}
          deleteText={t('delete.button')}
          subTitle1={deleteExpensePrompt().subTitle1}
          onClose={() => SetDeleteModal3(false)}
          onOk={() => {
            handleDelete(selectedPaymentId2);
            SetDeleteModal3(false);
          }}
        />
      </ScrollView>

      <Loader visible={Loading1} />
    </View>
  );
};

export default Design;
