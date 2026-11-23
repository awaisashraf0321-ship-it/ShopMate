import { View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import Design from '../BusinessGet/design';
import { Delete } from '../../api/ExpenseApi';
import { useModule } from '../../components/ModuleContext';
import {
  moduleIdFor,
  periodIdFor,
  queryKeys,
  useExpenseDashboard,
  useExpenses,
  useOptimisticDelete,
  usePullToRefresh,
  useRefreshOnFocus,
} from '../../hooks/queries';

const BusinessGetScreen = ({ navigation }) => {
  const [selectedPaymentId2, setSelectedPaymentId2] = useState(null);
  const [deleteModal3, SetDeleteModal3] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [visible, setVisible] = useState(false);
  const [PaymentMethodId, setPaymentMethodId] = useState(0);
  const [Page, setPage] = useState(1);
  const [PageSize, setPageSize] = useState(10);

  const { selectedModule } = useModule();
  const moduleId = moduleIdFor(selectedModule);
  const listParams = {
    expenseType: moduleId,
    paymentMethodId: PaymentMethodId,
    page: Page,
    pageSize: PageSize,
  };

  const {
    data: expensesData,
    isLoading: expensesLoading,
    refetch: refetchExpenses,
  } = useExpenses(listParams);
  const {
    data: dashboardData,
    isLoading: dashboardLoading,
    refetch: refetchDashboard,
  } = useExpenseDashboard(moduleId, periodIdFor(selectedPeriod));
  useRefreshOnFocus(refetchExpenses);
  useRefreshOnFocus(refetchDashboard);

  const refetchAll = useCallback(
    () => Promise.all([refetchExpenses(), refetchDashboard()]),
    [refetchExpenses, refetchDashboard],
  );
  const { refreshing, onRefresh } = usePullToRefresh(refetchAll);

  const myExpenses1 = useMemo(
    () =>
      (expensesData ?? []).filter(item => item.Module === 'BusinessExpense'),
    [expensesData],
  );
  const myDashboard = dashboardData ?? [];
  const methods = myDashboard?.Methods;
  const Loading1 = expensesLoading || dashboardLoading;

  const deleteMutation = useOptimisticDelete({
    mutationFn: Delete,
    listKey: queryKeys.expenses(listParams),
    invalidateKeys: [queryKeys.expensesAll, ['expenseDashboard']],
  });
  const handleDelete = id => deleteMutation.mutate(id);
  const formatAmount = amount => {
    return Number(amount || 0).toLocaleString('en-US');
  };
  const formatDate = date => {
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
