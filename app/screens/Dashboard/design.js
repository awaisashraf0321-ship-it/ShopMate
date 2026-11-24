import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header';
import DashboardCard from '../../components/DashboardCard';
import QuickActions from '../../components/QuickActions';
import sizeHelper from '../../helpers/sizeHelper';
import ExpenseOverview from '../../components/ExpenseOverview';
import Loader from '../../components/Loader';
import ErrorModal from '../../components/ErrorModal';
import styles from '../Dashboard/style';
import { t } from '../../i18n';
const Design = ({
  navigation,
  selectedTab,
  setSelectedTab,
  greeting,
  welcome,
  initial,
  refreshing,
  DashboardData,
  formatAmount,
  loading,
  getDateRange,
  onRefresh,
  selectedPeriod,
  setSelectedPeriod,
  formatDate,
  errorModal,
  setErrorModal,
  errorMessage,
  setErrorMessage,
  Graph,
  Period,
  setPeriod,
}) => {
  const filterData = [
    {
      id: 'Today',
      label: t('period.today'),
    },
    { id: 'This Week', label: t('period.thisWeek') },
    { id: 'This Month', label: t('period.thisMonth') },
  ];

  return (
    <View style={styles.main}>
      <StatusBar hidden={true} barStyle={'dark-content'} />

      <Header
        title={greeting}
        subTitle={welcome}
        initial={initial}
        navigation={navigation}
      />
      <Loader visible={loading} />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <DashboardCard
          netBalance={DashboardData?.NetBalance}
          openingBalance={DashboardData?.OpeningBalance}
          MoneyIn={DashboardData?.MoneyIn}
          MoneyOut={DashboardData?.MoneyOut}
          formatAmount={formatAmount}
          getDateRange={getDateRange}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          formatDate={formatDate}
        />
        <View style={styles.quickActionsWrapper}>
          <QuickActions navigation={navigation} />
        </View>
        <View style={styles.expense}>
          <ExpenseOverview
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            filterData={filterData}
            formatAmount={formatAmount}
            totalSpending={Graph.TotalSpending}
            Period={Period}
            setPeriod={setPeriod}
            Graph={Graph}
          />
          <ErrorModal
            visible={errorModal}
            onClose={() => setErrorModal(false)}
            errorMessage={errorMessage}
            text={t('home.failed')}
            setErrorMessage={setErrorMessage}
            icon="error-outline"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Design;
