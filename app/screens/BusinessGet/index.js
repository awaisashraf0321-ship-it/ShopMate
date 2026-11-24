import { StyleSheet, Text, View } from 'react-native';
import React, { useSyncExternalStore } from 'react';
import Design from '../BusinessGet/design';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { GetExpenses } from '../../api/ExpenseApi';
import { useMutation } from '@tanstack/react-query';
import { Delete, expensesDashboard } from '../../api/ExpenseApi';
import { useModule } from '../../components/ModuleContext';

const BusinessGetScreen = ({ navigation }) => {
  const [myExpenses1, setMyExpenses1] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const [Loading1, setLoading1] = useState(false);
  const [selectedPaymentId2, setSelectedPaymentId2] = useState(null);
  const [deleteModal3, SetDeleteModal3] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [visible, setVisible] = useState(false);
  const [myDashboard, setDashboard] = useState([]);
  const [PaymentMethodId, setPaymentMethodId] = useState(0);
  const [Page, setPage] = useState(1);
  const [PageSize, setPageSize] = useState(10);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchExpenses();
      await handleMyDashboard();
    } catch (error) {
      console.log('refreshing error', error);
    } finally {
      setRefreshing(false);
    }
  };
  const { selectedModule } = useModule();
  const ExpenseType = selectedModule === 'Self Expense' ? 1 : 2;
  const fetchExpenses = async () => {
    try {
      setLoading1(true);
      const response = await GetExpenses(
        ExpenseType,
        PaymentMethodId,
        Page,
        PageSize,
      );
      const data = await response.json();
      console.log('expense api response', data);

      setMyExpenses1(
        data.obj.data.filter(item => item.Module === 'BusinessExpense'),
      );
    } catch (error) {
      console.log('api error', error);
    } finally {
      setLoading1(false);
    }
  };

  const isSelected = selectedModule === 'Self Expendse' ? 1 : 2;
  const myPeriod =
    selectedPeriod === 'Today'
      ? 1
      : selectedPeriod === 'This Week'
      ? 2
      : selectedPeriod === 'This Month'
      ? 3
      : 4;
  const handleMyDashboard = async () => {
    try {
      setLoading1(true);
      const response = await expensesDashboard(isSelected, myPeriod);
      const data = await response.json();
      setDashboard(data.obj);
      console.log('My Business Dashboard', data);
    } catch (error) {
      console.log('Dasboard Business Api Error', error);
    } finally {
      setLoading1(false);
    }
  };
  const methods = myDashboard?.Methods;
  console.log(' Business methods', methods);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading1(true);
        try {
          await Promise.all([fetchExpenses(), handleMyDashboard()]);
        } finally {
          setLoading1(false);
        }
      };

      fetchData();
    }, [selectedPeriod, PaymentMethodId]),
  );

  const deleteMutation = useMutation({
    mutationFn: Delete,
    onSuccess: () => {
      fetchExpenses();
      handleMyDashboard();
    },
    onError: error => {
      console.log('Delete error:', error);
    },
  });
  const handleDelete = id => {
    const previousExpenses = myExpenses1;
    setMyExpenses1(prev => prev.filter(item => item.Id !== id));
    deleteMutation.mutate(id, {
      onError: error => {
        setMyExpenses1(previousExpenses);
        console.log('Delete error:', error);
      },
    });
  };
  const formatAmount = amount => {
    return Number(amount || 0).toLocaleString('en-US');
  };
  const formatDate = date => {
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
  const getPaymentModeIcon = mode => {
    if (mode === 'Cash') {
      return 'account-balance-wallet';
    }

    if (mode === 'Bank Transfer') {
      return 'account-balance';
    }

    if (mode === 'Credit Card') {
      return 'credit-card';
    }
    return 'account-balance-wallet';
  };
  let searching = [];
  for (let i = 0; i < myExpenses1.length; i++) {
    if (
      myExpenses1[i].ExpenseCategory.trim()
        .toLowerCase()
        .includes(search.trim().toLowerCase()) &&
      (activeTab === 'All' || activeTab === myExpenses1[i].PaymentMethod)
    ) {
      searching.push(myExpenses1[i]);
    }
  }
  let Total = 0;
  for (let i = 0; i < searching.length; i++) {
    Total += Number(searching[i].Amount);
  }

  const TransactionsLength = searching.length;

  const groupedPayments = [];

  for (let i = 0; i < searching.length; i++) {
    const item = searching[i];
    const date = item.ExpenseDate;

    const existingDate = groupedPayments.find(group => group.date === date);

    if (existingDate) {
      existingDate.children.push(item);
      existingDate.groupedAmount += Number(item.Amount) || 0;
    } else {
      groupedPayments.push({
        date: date,
        children: [item],
        groupedAmount: Number(item.Amount) || 0,
      });
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Design
        formatAmount={formatAmount}
        formatDate={formatDate}
        myExpenses1={myExpenses1}
        refreshing={refreshing}
        Loading1={Loading1}
        onRefresh={onRefresh}
        handleDelete={handleDelete}
        selectedPaymentId2={selectedPaymentId2}
        setSelectedPaymentId2={setSelectedPaymentId2}
        deleteModal3={deleteModal3}
        SetDeleteModal3={SetDeleteModal3}
        navigation={navigation}
        groupedPayments={groupedPayments}
        search={search}
        setSearch={setSearch}
        Total={Total}
        TransactionsLength={TransactionsLength}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        visible={visible}
        setVisible={setVisible}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        myDashboard={myDashboard}
        setDashboard={setDashboard}
        methods={methods}
        PaymentMethodId={PaymentMethodId}
        setPaymentMethodId={setPaymentMethodId}
        Page={Page}
        setPage={setPage}
        PageSize={PageSize}
      />
    </View>
  );
};

export default BusinessGetScreen;
