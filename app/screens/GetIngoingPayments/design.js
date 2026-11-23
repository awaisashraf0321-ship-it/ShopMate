import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Text,
} from 'react-native';
import React from 'react';
import LeadgerHeader from '../../components/LeadgerHeader';
import styles from './style';
import sizeHelper from '../../helpers/sizeHelper';
import PaymentSummaryCard from '../../components/PaymentSummaryCard';
import Loader from '../../components/Loader';
import PaymentCard from '../../components/PaymentCard';
import ConfirmModal from '../../components/ConfirmModal';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import SearchBar from '../../components/SearchBar';
import Filter from '../../components/Filter';
import FilterModal from '../../components/FilterModal';
import { useModule } from '../../components/ModuleContext';
import { EmptyState } from '../../ui';

const Design = ({
  navigation,
  refreshing,
  onRefresh,
  totaIngoing,
  totalTransactions,
  search,
  setSearch,
  formatAmount,
  loading,
  payment,
  getPaymentModeIcon,
  deleteModal,
  selectedPaymentId,
  setSelectedPaymentId,
  SetDeleteModal,
  handleDelete,
  formatDate,
  groupedPayments,
  activeTab,
  setActiveTab,
  Ingoingdashboard,
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
        showPlus={true}
        Margin={false}
        back={() => navigation.goBack()}
        onPlusPress={() => navigation.navigate('InComing')}
      />

      <LeadgerHeader
        title={
          selectedModule === 'Self Expense'
            ? 'Receiving Payments'
            : 'Incoming Payments'
        }
        subTitle={'Manage your received payments'}
        btn={false}
        navigation={navigation}
        plus={true}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PaymentSummaryCard
          totalAmount={Ingoingdashboard.TotalIncoming}
          totalTransactions={Ingoingdashboard.IncomingCount}
          methods={methods}
          paymentText="Total InComing"
          paymentType="Ingoing"
          paymentPercentage="Ingoing"
          formatAmount={formatAmount}
          visible={visible}
          setVisible={setVisible}
          periodOptions={periodOptions}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
        <View>
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
            PaymentMethod={PaymentMethodId}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </View>
        {payment.length === 0 && !loading ? (
          <EmptyState
            title="No Incoming Payments Available"
            message="You haven't added any Incoming payments yet. Tap the plus icon above to create one."
          />
        ) : (
          groupedPayments.map((group, index) => (
            <View key={group.date || index} style={styles.dateGroup}>
              <View style={styles.dateHeader}>
                <Text style={styles.dateHeading}>
                  {group.date ? formatDate(group.date) : 'Date unavailable'}
                </Text>

                <Text style={styles.dateTotal}>
                  + Rs {formatAmount(group.groupedAmmount)}
                </Text>
              </View>

              <View style={styles.groupCard}>
                {group.children.map((item, itemIndex) => (
                  <View key={item.Id}>
                    {itemIndex > 0 && <View style={styles.rowDivider} />}

                    <PaymentCard
                      id={item.Id}
                      sentTo={item.ReceivedFrom}
                      receiptDate={item.ReceiptDate}
                      amount={item.Amount}
                      formatAmount={formatAmount}
                      getPaymentModeIcon={getPaymentModeIcon}
                      description={item.Description}
                      paymentMode={item.Paymentmode}
                      reference={item.Reference || item.RefNo}
                      navigation={navigation}
                      formatDate={formatDate}
                      onPress={() =>
                        navigation.navigate('Ingoing', {
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
