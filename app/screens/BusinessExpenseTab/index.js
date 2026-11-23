import { screenFill } from '../../theme';
import { View } from 'react-native';
import React, { useState, useCallback } from 'react';
import Design from './design';
import { deleteOutgoingPayments } from '../../api/OutgoingPaymentsApi';
import { useModule } from '../../components/ModuleContext';
import {
  moduleIdFor,
  periodIdFor,
  queryKeys,
  useOutgoingPayments,
  useOptimisticDelete,
  usePaymentDashboard,
  usePullToRefresh,
  useRefreshOnFocus,
} from '../../hooks/queries';

const OutgoingPaymentsScreen = ({ navigation }) => {
  const [deleteModal, SetDeleteModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [PaymentMode, setPaymentMode] = useState(0);
  const [Page, setPage] = useState(1);
  const [PageSize, setPageSize] = useState(10);
  const [visible, setVisible] = useState(false);

  const { selectedModule } = useModule();
  const listParams = {
    paymentMode: PaymentMode,
    page: Page,
    pageSize: PageSize,
  };

  const {
    data: paymentData,
    isLoading: paymentsLoading,
    refetch: refetchPayments,
  } = useOutgoingPayments(listParams);
  const {
    data: dashboardData,
    isLoading: dashboardLoading,
    refetch: refetchDashboard,
  } = usePaymentDashboard(
    moduleIdFor(selectedModule),
    periodIdFor(selectedPeriod),
  );
  useRefreshOnFocus(refetchPayments);
  useRefreshOnFocus(refetchDashboard);

  const refetchAll = useCallback(
    () => Promise.all([refetchPayments(), refetchDashboard()]),
    [refetchPayments, refetchDashboard],
  );
  const { refreshing, onRefresh } = usePullToRefresh(refetchAll);

  const payment = paymentData ?? [];
  const outgoingdashboard = dashboardData ?? [];
  const methods = outgoingdashboard?.Methods;
  const loading = paymentsLoading || dashboardLoading;

  const deleteMutation = useOptimisticDelete({
    mutationFn: deleteOutgoingPayments,
    listKey: queryKeys.outgoing(listParams),
    invalidateKeys: [queryKeys.outgoingAll, ['paymentDashboard']],
  });
  const handleDelete = id => deleteMutation.mutate(id);
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

  let mySearch = [];
  for (let i = 0; i < payment.length; i++) {
    if (
      payment[i].SentTo.trim()
        .toLowerCase()
        .includes(search.trim().toLowerCase()) &&
      (activeTab === 'All' || activeTab === payment[i].Paymentmode)
    ) {
      mySearch.push(payment[i]);
    }
  }
  let totalOutgoing = 0;
  for (let i = 0; i < mySearch.length; i++) {
    totalOutgoing += Number(mySearch[i].Amount);
  }
  const totalTransactions = mySearch.length;

  const formatAmount = amount => {
    return (Number(amount) || 0).toLocaleString('en-US');
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

  const groupedPayments = [];

  for (let i = 0; i < mySearch.length; i++) {
    const item = mySearch[i];
    const date = item.ReceiptDate;

    const existingDate = groupedPayments.find(group => group.date === date);

    if (existingDate) {
      existingDate.children.push(item);
      existingDate.groupedAmount += Number(item.Amount);
    } else {
      groupedPayments.push({
        date: date,
        children: [item],
        groupedAmount: Number(item.Amount),
      });
    }
  }
  console.log('grouped pytments', groupedPayments);
  let groupedTotal = 0;
  for (let i = 0; i < groupedPayments.length; i++) {
    groupedTotal += Number(groupedPayments[i].Amount);
  }
  return (
    <View style={screenFill}>
      <Design
        navigation={navigation}
        payment={mySearch}
        loading={loading}
        getPaymentModeIcon={getPaymentModeIcon}
        totalOutgoing={totalOutgoing}
        totalTransactions={totalTransactions}
        refreshing={refreshing}
        onRefresh={onRefresh}
        handleDelete={handleDelete}
        deleteModal={deleteModal}
        SetDeleteModal={SetDeleteModal}
        selectedPaymentId={selectedPaymentId}
        setSelectedPaymentId={setSelectedPaymentId}
        formatAmount={formatAmount}
        formatDate={formatDate}
        search={search}
        setSearch={setSearch}
        groupedPayments={groupedPayments}
        groupedTotal={groupedTotal}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        outgoingdashboard={outgoingdashboard}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        visible={visible}
        setVisible={setVisible}
        methods={methods}
        PaymentMethodId={PaymentMode}
        setPaymentMethodId={setPaymentMode}
      />
    </View>
  );
};

export default OutgoingPaymentsScreen;
