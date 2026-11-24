import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Text,
} from 'react-native';
import React from 'react';
import {
  GOT,
  deletePaymentPrompt,
  findPayment,
} from '../../helpers/moneyWords';
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
import { EmptyState } from '../../ui';
import { t } from '../../i18n';

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
        showPlus={true}
        Margin={false}
        back={() => navigation.goBack()}
        onPlusPress={() => navigation.navigate('InComing')}
      />

      <LeadgerHeader
        title={GOT.label}
        subTitle={GOT.listSubtitle}
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
          paymentText={GOT.total}
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
            setPaymentMethodId={setPaymentMethodId}
            PaymentMethod={PaymentMethodId}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </View>
        {payment.length === 0 && !loading ? (
          <EmptyState title={GOT.emptyTitle} message={GOT.emptyMessage} />
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
          {...deletePaymentPrompt(
            GOT,
            findPayment(groupedPayments, selectedPaymentId),
          )}
          deleteText={t('delete.button')}
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
