import { screenFill } from '../../theme';
import { View } from 'react-native';
import React, { useState, useCallback } from 'react';
import Design from './design';
import { deleteIngoingPayments } from '../../api/IngoingPayments';
import { useModule } from '../../components/ModuleContext';
import {
  moduleIdFor,
  periodIdFor,
  queryKeys,
  useIncomingPayments,
  useOptimisticDelete,
  usePaymentDashboard,
  usePullToRefresh,
  useRefreshOnFocus,
} from '../../hooks/queries';

const IngoingTab = ({ navigation }) => {
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
  } = useIncomingPayments(listParams);
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
  const Ingoingdashboard = dashboardData ?? [];
  const methods = Ingoingdashboard?.Methods;
  const loading = paymentsLoading || dashboardLoading;

  const deleteMutation = useOptimisticDelete({
    mutationFn: deleteIngoingPayments,
    listKey: queryKeys.incoming(listParams),
    invalidateKeys: [queryKeys.incomingAll, ['paymentDashboard']],
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
      payment[i].ReceivedFrom.trim()
        .toLowerCase()
        .includes(search.trim().toLowerCase()) &&
      (activeTab === 'All' || activeTab === payment[i].Paymentmode)
    ) {
      mySearch.push(payment[i]);
    }
  }
  let totaIngoing = 0;
  for (let i = 0; i < mySearch.length; i++) {
    totaIngoing += Number(mySearch[i].Amount);
  }
  console.log('total outgoing', totaIngoing);
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
      existingDate.groupedAmmount += Number(item.Amount);
    } else {
      groupedPayments.push({
        date: date,
        children: [item],
        groupedAmmount: Number(item.Amount),
      });
    }
  }

  return (
    <View style={screenFill}>
      <Design
        navigation={navigation}
        loading={loading}
        refreshing={refreshing}
        onRefresh={onRefresh}
        payment={mySearch}
        getPaymentModeIcon={getPaymentModeIcon}
        totalTransactions={totalTransactions}
        totaIngoing={totaIngoing}
        formatAmount={formatAmount}
        deleteModal={deleteModal}
        SetDeleteModal={SetDeleteModal}
        selectedPaymentId={selectedPaymentId}
        setSelectedPaymentId={setSelectedPaymentId}
        handleDelete={handleDelete}
        formatDate={formatDate}
        groupedPayments={groupedPayments}
        search={search}
        setSearch={setSearch}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        visible={visible}
        setVisible={setVisible}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        PaymentMethodId={PaymentMode}
        setPaymentMethodId={setPaymentMode}
        methods={methods}
        Ingoingdashboard={Ingoingdashboard}
        Page={Page}
      />
    </View>
  );
};

export default IngoingTab;
