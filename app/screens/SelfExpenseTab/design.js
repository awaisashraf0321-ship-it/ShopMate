import { View, ScrollView, Text, RefreshControl } from 'react-native';
import React from 'react';
import LeadgerHeader from '../../components/LeadgerHeader';
import PaymentCard from '../../components/PaymentCard';
import Loader from '../../components/Loader';
import sizeHelper from '../../helpers/sizeHelper';
import styles from '../../screens/SelfExpenseTab/style';
import ConfirmModal from '../../components/ConfirmModal';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import SearchBar from '../../components/SearchBar';
import PaymentSummaryCard from '../../components/PaymentSummaryCard';
import Filter from '../../components/Filter';
import FilterModal from '../../components/FilterModal';
import { EmptyState } from '../../ui';
import { theme, categoryStyle } from '../../theme';

const Design = ({
  navigation,
  myExpenses,
  formatAmount,
  Loading,
  refreshing,
  formatDate,
  onRefresh,
  setSelectedPaymentId2,
  selectedPaymentId2,
  deleteModal3,
  SetDeleteModal3,
  handleDelete,
  groupedPayments,
  search,
  setSearch,
  activeTab,
  setActiveTab,
  dashboard,
  methods,
  visible,
  setVisible,
  setSelectedPeriod,
  selectedPeriod,
  PaymentMethodId,
  setPaymentMethodId,
  scrollRef,
}) => {
  console.log('myExpenses:', myExpenses);
  const getCategoryStyle = categoryStyle;
  const filtering = [
    { id: 'All', label: 'All', PaymentMethodId: 0 },
    { id: 'Cash', label: 'Cash', PaymentMethodId: 1 },
    { id: 'Bank Transfer', label: 'Bank', PaymentMethodId: 2 },
    { id: 'Credit Card', label: 'Credit', PaymentMethodId: 3 },
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
        onPlusPress={() => navigation.navigate('SelfExpense')}
      />
      <LeadgerHeader
        title={'Self Expense'}
        subTitle="Manage your personal expenses"
        btn={false}
        navigation={navigation}
        plus={true}
      />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PaymentSummaryCard
          totalAmount={dashboard.TotalExpense}
          totalTransactions={dashboard.PaymentCount}
          paymentText="Total Self Expense"
          formatAmount={formatAmount}
          methods={methods}
          visible={visible}
          paymentPercentage="Self"
          paymentType="Self"
          setVisible={setVisible}
          periodOptions={periodOptions}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
        <FilterModal
          visible={visible}
          setVisible={setVisible}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          periodOptions={periodOptions}
        />
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder="Search payee or reference"
          onFocus={() =>
            setTimeout(() => {
              scrollRef?.current.scrollToEnd({
                animated: true,
              });
            }, 3000)
          }
        />
        <Filter
          filtering={filtering}
          setPaymentMethodId={setPaymentMethodId}
          PaymentMethod={PaymentMethodId}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {groupedPayments.length === 0 && !Loading ? (
          <EmptyState
            title="No Self Expense Available"
            message="You haven't added any outgoing payments yet. Tap the plus icon above to create one."
          />
        ) : (
          groupedPayments?.map(group => (
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
                      selectedIcon={getCategoryStyle}
                      // getPaymentModeIcon={getPaymentModeIcon}
                      description={item.Description}
                      paymentMode={item.PaymentMethod}
                      formatDate={formatDate}
                      // formatDate={formatDate}
                      onPress={() =>
                        navigation.navigate('SelfDetail', {
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
          title="Are You Sure?"
          deleteText="Delete"
          subTitle1="This payment will be permanently deleted."
          subTitle2="Do you want to continue?"
          onClose={() => SetDeleteModal3(false)}
          onOk={() => {
            handleDelete(selectedPaymentId2);
            SetDeleteModal3(false);
          }}
        />
      </ScrollView>
      <Loader visible={Loading} />
    </View>
  );
};

export default Design;
