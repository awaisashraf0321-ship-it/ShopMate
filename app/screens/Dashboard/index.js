import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import Design from './design';
import { dashboardApi, DashboardGraph } from '../../api/DashboardApi';
import { useModule } from '../../components/ModuleContext';
import { useFocusEffect } from '@react-navigation/native';

const DashboardScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Today');
  const [selectedTab1, setSelectedTab1] = useState('Today');
  const [refreshing, setRefreshing] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // DashboardCard ke liye date navigation
  const [selectedPeriod, setSelectedPeriod] = useState('Today');

  const [loading, setLoading] = useState(false);
  const [DashboardData, setDashboardData] = useState([]);

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [Period, setPeriod] = useState('Today');
  const { selectedModule } = useModule();
  const [Graph, setGraph] = useState([]);
  const isSelected = selectedModule === 'Self Expense' ? 1 : 2;

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

    const [year, month, day] = date.split('-');
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

  const handleDashboard = async () => {
    try {
      const { fromDate: start, toDate: end } = getDateRange(selectedPeriod);

      setFromDate(start);
      setToDate(end);

      const response = await dashboardApi(isSelected, start, end);
      const data = await response.json();

      setDashboardData(data.obj);
    } catch (error) {
      setErrorModal(true);
      setErrorMessage('No internet Connection');
      console.log('Dashboard Api error', error);
    }
  };

  const handleGraph = async () => {
    try {
      const response = await DashboardGraph(
        isSelected,
        Period === 'Today' ? 1 : Period === 'This Week' ? 2 : 3,
      );

      const data = await response.json();

      setGraph(data.obj || []);
    } catch (error) {
      console.log('Graph API Error:', error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          setLoading(true);
          await Promise.all([handleDashboard(), handleGraph()]);
        } finally {
          setLoading(false);
        }
      };
      getData();
    }, [selectedModule, selectedPeriod, Period]),
  );

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await handleGraph();
      await handleDashboard();
    } catch (error) {
      console.log('Refreshing Api Error', error);
    } finally {
      setRefreshing(false);
    }
  };

  const currentDate = new Date();
  const hours = currentDate.getHours();

  let greeting = '';
  if (hours >= 5 && hours < 12) greeting = 'Good Morning';
  else if (hours >= 12 && hours < 17) greeting = 'Good Afternoon';
  else greeting = 'Good Evening';

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
      date={date}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      refreshing={refreshing}
      setRefreshing={setRefreshing}
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
      setFromDate={setFromDate}
      toDate={toDate}
      setToDate={setToDate}
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
