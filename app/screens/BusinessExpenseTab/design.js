import React, { use } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import LeadgerHeader from '../../components/LeadgerHeader';
import PaymentCard from '../../components/PaymentCard';
import PaymentSummaryCard from '../../components/PaymentSummaryCard';
import Loader from '../../components/Loader';
import ConfirmModal from '../../components/ConfirmModal';
import SearchBar from '../../components/SearchBar';
import FilterModal from '../../components/FilterModal';

import colors from '../../theme/colors';
import sizeHelper from '../../helpers/sizeHelper';
import Filter from '../../components/Filter';
import { useModule } from '../../components/ModuleContext';

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
          <View style={styles.emptyContainer}>
            {/* Empty State Illustration */}
            <View style={styles.illustrationContainer}>
              <View style={styles.illustrationCircle}>
                <Icon
                  name="receipt-long"
                  size={sizeHelper.calHp(100)}
                  color="#8B5CF6"
                />

                <View style={styles.storeIcon}>
                  <Icon
                    name="storefront"
                    size={sizeHelper.calHp(35)}
                    color="#8B5CF6"
                  />
                </View>
              </View>

              {/* Decorative Icons */}
              <Icon
                name="auto-awesome"
                size={sizeHelper.calHp(18)}
                color="#A78BFA"
                style={styles.sparkleOne}
              />

              <Icon
                name="auto-awesome"
                size={sizeHelper.calHp(14)}
                color="#A78BFA"
                style={styles.sparkleTwo}
              />

              <Icon
                name="auto-awesome"
                size={sizeHelper.calHp(16)}
                color="#A78BFA"
                style={styles.sparkleThree}
              />
            </View>

            {/* Empty State Text */}
            <Text style={styles.emptyTitle}>
              No Outcoming Payments Available
            </Text>

            <Text style={styles.emptySubtitle}>
              You haven't added any outcoming payments yet. Tap the plus icon
              above to create one.
            </Text>
          </View>
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
          style={{ backgroundColor: colors.lightDot }}
          iconColor={colors.redColor}
          title="Are You Sure?"
          deleteText="Delete"
          subTitle1="This payment will be permanently deleted."
          subTitle2="Do you want to continue?"
          onClose={() => SetDeleteModal(false)}
          btnStyle={{ backgroundColor: colors.redColor }}
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
    backgroundColor: '#F6F5FB',
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
    fontWeight: '600',
    color: colors.dark,
    fontWeight: 'bold',
    marginLeft: sizeHelper.calHp(20),
  },

  dateTotal: {
    marginBottom: sizeHelper.calHp(8),

    fontSize: sizeHelper.calHp(31),
    fontWeight: '700',
    color: '#00000080',
    marginRight: sizeHelper.calWp(18),
  },

  groupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: sizeHelper.calHp(38),
    transform: [{ translateY: sizeHelper.calHp(-10) }],
    marginBottom: sizeHelper.calHp(5),
    borderWidth: 1,
    borderColor: '#E9E6F2',
    overflow: 'hidden',
  },

  rowDivider: {
    height: 1,
    backgroundColor: '#F0EDF5',
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    minHeight: sizeHelper.calHp(650),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: sizeHelper.calWp(40),
    paddingTop: sizeHelper.calHp(30),
  },

  illustrationContainer: {
    width: sizeHelper.calWp(300),
    height: sizeHelper.calHp(230),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: sizeHelper.calHp(25),
    position: 'relative',
  },

  illustrationCircle: {
    width: sizeHelper.calHp(180),
    height: sizeHelper.calHp(180),
    borderRadius: sizeHelper.calHp(90),
    backgroundColor: '#F0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  storeIcon: {
    position: 'absolute',
    width: sizeHelper.calWp(65),
    height: sizeHelper.calWp(65),
    borderRadius: sizeHelper.calWp(15),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
  },

  sparkleOne: {
    position: 'absolute',
    top: sizeHelper.calHp(30),
    left: sizeHelper.calWp(30),
  },

  sparkleTwo: {
    position: 'absolute',
    top: sizeHelper.calHp(55),
    right: sizeHelper.calWp(25),
  },

  sparkleThree: {
    position: 'absolute',
    bottom: sizeHelper.calHp(45),
    left: sizeHelper.calWp(10),
  },

  emptyTitle: {
    fontSize: sizeHelper.calHp(33),
    fontWeight: '700',
    color: '#172554',
    transform: [{ translateY: sizeHelper.calHp(-40) }],
    marginBottom: sizeHelper.calHp(12),
    textAlign: 'center',
  },

  emptySubtitle: {
    fontSize: sizeHelper.calHp(25),
    color: '#8B93A7',
    width: sizeHelper.calHp(700),
    textAlign: 'center',
    transform: [{ translateY: sizeHelper.calHp(-25) }],

    lineHeight: sizeHelper.calHp(35),
  },
});
