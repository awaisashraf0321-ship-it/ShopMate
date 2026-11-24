import React, { useState, useCallback, useEffect } from 'react';
import Design from './design';
import { useModule } from '../../components/ModuleContext';
import {
  moduleIdFor,
  useBalanceSummary,
  useProfile,
  usePullToRefresh,
  useRefreshOnFocus,
  useSpendingGraph,
} from '../../hooks/queries';
import { t } from '../../i18n';

const DashboardScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Today');
  const [selectedTab1, setSelectedTab1] = useState('Today');
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // DashboardCard ke liye date navigation
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [Period, setPeriod] = useState('Today');
  const { selectedModule } = useModule();
  const isSelected = moduleIdFor(selectedModule);

  // "Hi, Faisal" from the cached profile; falls back while it loads.
  const { data: profile } = useProfile();
  const fullName = profile?.details?.FullName || profile?.user?.FullName || '';
  const firstName = fullName.trim().split(/\s+/)[0];
  const welcome = firstName
    ? t('home.hi', { name: firstName })
    : t('home.hiThere');
  const initial = firstName ? firstName[0].toUpperCase() : '';

  const formatDate1 = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const getDateRange = period => {
    const today = new Date();
    const startDate = new Date(today);
    const endingDate = new Date(today);
    if (period === 'Month') {
      startDate.setDate(1);
      endingDate.setMonth(today.getMonth() + 1, 0);
    }

    if (period === 'Week') {
      const day = (today.getDay() + 6) % 7;

      startDate.setDate(today.getDate() - day);
      endingDate.setTime(startDate.getTime());
      endingDate.setDate(startDate.getDate() + 6);
    }

    return {
      fromDate: formatDate1(startDate),
      toDate: formatDate1(endingDate),
    };
  };
  const formatDate = date => {
    if (!date) return '';

    const [year, month, day] = String(date).slice(0, 10).split('-');
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return `${day}-${monthNames[Number(month) - 1]}-${year}`;
  };

  const { fromDate, toDate } = getDateRange(selectedPeriod);

  const {
    data: DashboardData = [],
    isLoading: summaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = useBalanceSummary(isSelected, fromDate, toDate);
  const {
    data: Graph = [],
    isLoading: graphLoading,
    refetch: refetchGraph,
  } = useSpendingGraph(
    isSelected,
    Period === 'Today' ? 1 : Period === 'This Week' ? 2 : 3,
  );
  useRefreshOnFocus(refetchSummary);
  useRefreshOnFocus(refetchGraph);

  const loading = summaryLoading || graphLoading;

  // Same message the screen showed before when the summary failed to load.
  useEffect(() => {
    if (summaryError) {
      setErrorMessage(t('common.noInternetTitle'));
      setErrorModal(true);
    }
  }, [summaryError]);

  const refetchAll = useCallback(
    () => Promise.all([refetchGraph(), refetchSummary()]),
    [refetchGraph, refetchSummary],
  );
  const { refreshing, onRefresh } = usePullToRefresh(refetchAll);

  const currentDate = new Date();
  const hours = currentDate.getHours();

  let greeting = '';
  if (hours >= 5 && hours < 12) greeting = t('home.greetMorning');
  else if (hours >= 12 && hours < 17) greeting = t('home.greetAfternoon');
  else greeting = t('home.greetEvening');

  const date = currentDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  });

  const formatAmount = amount => {
    if (amount == null || amount === '') return 0;
    return Number(amount).toLocaleString('en-US');
  };

  return (
    <Design
      activeTab={activeTab}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      setActiveTab={setActiveTab}
      greeting={greeting}
      welcome={welcome}
      initial={initial}
      date={date}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      refreshing={refreshing}
      navigation={navigation}
      selectedTab1={selectedTab1}
      setSelectedTab1={setSelectedTab1}
      formatAmount={formatAmount}
      DashboardData={DashboardData}
      selectedPeriod={selectedPeriod}
      setSelectedPeriod={setSelectedPeriod}
      formatDate={formatDate}
      loading={loading}
      onRefresh={onRefresh}
      fromDate={fromDate}
      toDate={toDate}
      getDateRange={getDateRange}
      setErrorModal={setErrorModal}
      errorModal={errorModal}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      Period={Period}
      setPeriod={setPeriod}
      Graph={Graph}
    />
  );
};

export default DashboardScreen;
