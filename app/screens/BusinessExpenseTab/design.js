import React, { use } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import LeadgerHeader from '../../components/LeadgerHeader';
import PaymentCard from '../../components/PaymentCard';
import PaymentSummaryCard from '../../components/PaymentSummaryCard';
import Loader from '../../components/Loader';
import ConfirmModal from '../../components/ConfirmModal';
import SearchBar from '../../components/SearchBar';
import FilterModal from '../../components/FilterModal';

import sizeHelper from '../../helpers/sizeHelper';
import Filter from '../../components/Filter';
import { useModule } from '../../components/ModuleContext';
import { EmptyState } from '../../ui';
import { theme } from '../../theme';

const Design = ({
  navigation,
  payment = [],
  groupedPayments = [],
  loading,
  refreshing,
  onRefresh,
  handleDelete,
  deleteModal,
  SetDeleteModal,
  selectedPaymentId,
  setSelectedPaymentId,
  formatAmount,
  formatDate,
  getPaymentModeIcon,
  search,
  setSearch,
  activeTab,
  setActiveTab,
  outgoingdashboard,
  selectedPeriod,
  visible,
  setVisible,
  setSelectedPeriod,
  methods,
  PaymentMethodId,
  setPaymentMethodId,
}) => {
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
  const { selectedModule } = useModule();
  return (
    <View style={styles.main}>
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={true}
        showBack={true}
        Margin={false}
        showPlus={true}
        back={() => navigation.goBack()}
        onPlusPress={() => navigation.navigate('Loan')}
      />

      <LeadgerHeader
        title={
          selectedModule === 'Self Expense'
            ? 'Sending Payments'
            : 'Outgoing Payments'
        }
        subTitle="Money you've paid out from this account"
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
          totalAmount={outgoingdashboard.TotalOutgoing}
          totalTransactions={outgoingdashboard.OutgoingCount}
          methods={methods}
          paymentText="Total outcoming"
          paymentType="Outgoing"
          paymentPercentage="Outgoing"
          formatAmount={formatAmount}
          visible={visible}
          setVisible={setVisible}
          periodOptions={periodOptions}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder="Search payee or reference"
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
          setPaymentMethodId={setPaymentMethodId}
          PaymentMethodId={PaymentMethodId}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {payment.length === 0 && !loading ? (
          <EmptyState
            title="No Outgoing Payments Available"
            message="You haven't added any outcoming payments yet. Tap the plus icon above to create one."
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
                      id={item.Id}
                      sentTo={item.SentTo}
                      receiptDate={item.ReceiptDate}
                      amount={item.Amount}
                      formatAmount={formatAmount}
                      getPaymentModeIcon={getPaymentModeIcon}
                      description={item.Description}
                      paymentMode={item.Paymentmode}
                      navigation={navigation}
                      formatDate={formatDate}
                      onPress={() =>
                        navigation.navigate('Outgoing', {
                          id: item.Id,
                        })
                      }
                      onDelete={() => {
                        setSelectedPaymentId(item.Id);
                        SetDeleteModal(true);
                      }}
                    />
                  </View>
                ))}
              </View>
            </View>
          ))
        )}

        <ConfirmModal
          visible={deleteModal}
          icon="delete"
          tone="danger"
          title="Are You Sure?"
          deleteText="Delete"
          subTitle1="This payment will be permanently deleted."
          subTitle2="Do you want to continue?"
          onClose={() => SetDeleteModal(false)}
          onOk={() => {
            handleDelete(selectedPaymentId);
            SetDeleteModal(false);
          }}
        />
      </ScrollView>
      <Loader visible={loading} />
    </View>
  );
};

export default Design;

const styles = StyleSheet.create({
  main: {
    backgroundColor: theme.colors.background,
  },

  scrollContent: {
    paddingHorizontal: sizeHelper.calHp(30),
    paddingBottom: sizeHelper.calHp(1200),
  },

  dateGroup: {
    marginTop: sizeHelper.calHp(10),
    // marginBottom: sizeHelper.calHp(8),
  },

  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(27),
    paddingHorizontal: sizeHelper.calHp(4),
  },

  dateHeading: {
    flex: 1,
    fontSize: sizeHelper.calHp(31),
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    marginLeft: sizeHelper.calHp(20),
  },

  dateTotal: {
    marginBottom: sizeHelper.calHp(8),

    fontSize: sizeHelper.calHp(31),
    fontWeight: '700',
    color: theme.colors.moneyOut,
    marginRight: sizeHelper.calWp(18),
  },

  groupCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: sizeHelper.calHp(38),
    transform: [{ translateY: sizeHelper.calHp(-10) }],
    marginBottom: sizeHelper.calHp(5),
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },

  rowDivider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    width: '100%',
  },
});
