import { View, ScrollView, Text, RefreshControl } from 'react-native';
import React from 'react';
import LeadgerHeader from '../../components/LeadgerHeader';
import PaymentCard from '../../components/PaymentCard';
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import sizeHelper from '../../helpers/sizeHelper';
import styles from '../../screens/SelfExpenseTab/style';
import ConfirmModal from '../../components/ConfirmModal';
import colors from '../../theme/colors';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import SearchBar from '../../components/SearchBar';
import PaymentSummaryCard from '../../components/PaymentSummaryCard';
import Filter from '../../components/Filter';
import FilterModal from '../../components/FilterModal';

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
  const getCategoryStyle = Category => {
    if (Category === 'Bill Expense') {
      return {
        icon: 'receipt-long',
        color: '#FCE8E8',
        iconColor: colors.dot,
      };
    }

    if (Category === 'Education & Learning') {
      return {
        icon: 'school',
        color: '#EDE7F6',
        iconColor: '#7E57C2',
      };
    }

    if (Category === 'Entertainment & Leisure') {
      return {
        icon: 'movie',
        color: '#FCE4EC',
        iconColor: '#D81B60',
      };
    }

    if (Category === 'Family & Personal Care') {
      return {
        icon: 'people',
        color: '#E0F2F1',
        iconColor: '#00897B',
      };
    }

    if (Category === 'Food & Groceries') {
      return {
        icon: 'restaurant',
        color: '#FFF3E0',
        iconColor: '#EF6C00',
      };
    }

    if (Category === 'Health & Medical') {
      return {
        icon: 'medical-services',
        color: '#FCE8E8',
        iconColor: '#E53935',
      };
    }

    if (Category === 'Home Expense') {
      return {
        icon: 'home',
        color: '#ECF5D9',
        iconColor: colors.categoryTravel,
      };
    }

    if (Category === 'Mobile & Internet') {
      return {
        icon: 'phone-iphone',
        color: '#E3F2FD',
        iconColor: '#1976D2',
      };
    }

    if (Category === 'Other') {
      return {
        icon: 'category',
        color: '#ECEFF1',
        iconColor: '#546E7A',
      };
    }

    if (Category === 'Saving & Investments') {
      return {
        icon: 'savings',
        color: '#E8F5E9',
        iconColor: '#388E3C',
      };
    }

    if (Category === 'Shopping & Clothing') {
      return {
        icon: 'shopping-bag',
        color: '#F3E5F5',
        iconColor: '#8E24AA',
      };
    }

    if (Category === 'Transportation') {
      return {
        icon: 'directions-car',
        color: '#E8F0FE',
        iconColor: '#3F51B5',
      };
    }

    return {
      icon: 'apps',
      color: '#E8F0FE',
      iconColor: colors.categoryClothing,
    };
  };
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
            <Text style={styles.emptyTitle}>No Self Expense Available</Text>

            <Text style={styles.emptySubtitle}>
              You haven't added any outgoing payments yet. Tap the plus icon
              above to create one.
            </Text>
          </View>
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
          style={{ backgroundColor: colors.lightDot }}
          iconColor={colors.redColor}
          title="Are You Sure?"
          deleteText="Delete"
          subTitle1="This payment will be permanently deleted."
          subTitle2="Do you want to continue?"
          onClose={() => SetDeleteModal3(false)}
          btnStyle={{ backgroundColor: colors.redColor }}
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
