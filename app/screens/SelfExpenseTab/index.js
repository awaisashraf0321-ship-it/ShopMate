import { StyleSheet, Text, TurboModuleRegistry, View } from 'react-native';
import Design from './design';
import { GetExpenses } from '../../api/ExpenseApi';
import { useFocusEffect } from '@react-navigation/native';

import { Children, useCallback, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Delete, expensesDashboard } from '../../api/ExpenseApi';
import { useModule } from '../../components/ModuleContext';

const SelfExpensesTabScreen = ({ navigation }) => {
  const [myExpenses1, setMyExpenses1] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [selectedPaymentId2, setSelectedPaymentId2] = useState(null);
  const [deleteModal3, SetDeleteModal3] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [dashboard, setDashboard] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [PaymentMethodId, setPaymentMethodId] = useState(0);
  const [Page, setPage] = useState(1);
  const [PageSize, setPageSize] = useState(10);
  const scrollRef = useRef();

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchExpenses();
      await handleDashboard();
    } catch (error) {
      console.log('refreshing Error', error);
    } finally {
      setRefreshing(false);
    }
  };
  const { selectedModule } = useModule();

  const ExpenseType = selectedModule === 'Self Expense' ? 1 : 2;

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await GetExpenses(
        ExpenseType,
        PaymentMethodId,
        Page,
        PageSize,
      );
      const data = await response.json();
      console.log('expense api response', data);

      setMyExpenses1(
        data.obj.data.filter(item => item.Module === 'SelfExpense'),
      );
      console.log('setMyExpense1', setMyExpenses1);
    } catch (error) {
      console.log('api error', error);
    } finally {
      setLoading(false);
    }
  };

  const isSelected = selectedModule === 'Self Expense' ? 1 : 2;
  const myPeriod =
    selectedPeriod === 'Today'
      ? 1
      : selectedPeriod === 'This Week'
      ? 2
      : selectedPeriod === 'This Month'
      ? 3
      : 4;
  const handleDashboard = async () => {
    try {
      setLoading(true);
      const response = await expensesDashboard(isSelected, myPeriod);
      const data = await response.json();
      setDashboard(data.obj);
      console.log('self dashboard response', data);
    } catch (error) {
      console.log('Dashboard Api Error', error);
    } finally {
      setLoading(false);
    }
  };

  const methods = dashboard?.Methods;
  console.log('methods', methods);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          await Promise.all([fetchExpenses(), handleDashboard()]);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [selectedPeriod, PaymentMethodId]),
  );

  const deleteMutation = useMutation({
    mutationFn: Delete,
    onSuccess: () => {
      fetchExpenses();
      handleDashboard();
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
    return (Number(amount) || 0).toLocaleString('en-US');
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
    <View>
      <Design
        navigation={navigation}
        formatAmount={formatAmount}
        Loading={Loading}
        formatDate={formatDate}
        myExpenses={myExpenses1}
        getPaymentModeIcon={getPaymentModeIcon}
        refreshing={refreshing}
        onRefresh={onRefresh}
        selectedPaymentId2={selectedPaymentId2}
        setSelectedPaymentId2={setSelectedPaymentId2}
        deleteModal3={deleteModal3}
        SetDeleteModal3={SetDeleteModal3}
        handleDelete={handleDelete}
        groupedPayments={groupedPayments}
        search={search}
        setSearch={setSearch}
        TransactionsLength={TransactionsLength}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dashboard={dashboard}
        methods={methods}
        visible={visible}
        setVisible={setVisible}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        PaymentMethodId={PaymentMethodId}
        setPaymentMethodId={setPaymentMethodId}
        Page={Page}
        setPage={setPage}
        PageSize={PageSize}
        scrollRef={scrollRef}
      />
    </View>
  );
};

export default SelfExpensesTabScreen;
