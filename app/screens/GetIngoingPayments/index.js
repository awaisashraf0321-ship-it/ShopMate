import { Text, View } from 'react-native';
import React, { useCallback } from 'react';
import Design from './design';
import { useFocusEffect } from '@react-navigation/native';
import { deleteIngoingPayments } from '../../api/IngoingPayments';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { GetIngoingPayments } from '../../api/IngoingPayments';
import { useModule } from '../../components/ModuleContext';
import { getOutInDashboard } from '../../api/OutgoingPaymentsApi';
const IngoingTab = ({ navigation }) => {
  const [payment, setPayment] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const [deleteModal, SetDeleteModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [Ingoingdashboard, setIngoingDashboard] = useState([]);
  const [PaymentMethodId, setPaymentMethodId] = useState(0);
  const [visible, setVisible] = useState(false);
  const [PaymentMode, setPaymentMode] = useState(0);
  const [Page, setPage] = useState(1);
  const [PageSize, setPageSize] = useState(10);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await handleIngoing();
      await handleIngoingDashboard();
    } catch (error) {
      console.log('refreshing error', error);
    } finally {
      setRefreshing(false);
    }
  };
  const { selectedModule } = useModule();

  const moduleId = selectedModule === 'Self Expense' ? 1 : 2;
  const handleIngoing = async () => {
    try {
      setLoading(true);
      const response = await GetIngoingPayments(PaymentMode, Page, PageSize);
      const data = await response.json();
      console.log('Ingoing response', data);
      if (response.ok) {
        setPayment(data.obj.data);
      } else {
        console.log('Ingoing Payment error', data);
      }
    } catch (error) {
      console.log('Ingoing Payment error', error.message);
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
  const handleIngoingDashboard = async () => {
    try {
      setLoading(true);
      const response = await getOutInDashboard(isSelected, myPeriod);
      const data = await response.json();
      setIngoingDashboard(data.obj);
      console.log('Outgoing Api resposne', data);
    } catch (error) {
      console.log('Outgoing Dashboard Error', error);
    } finally {
      setLoading(false);
    }
  };
  const methods = Ingoingdashboard?.Methods;
  console.log('Ingoing', methods);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          await Promise.all([
            handleIngoing(true),
            handleIngoingDashboard(true),
          ]);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [PaymentMode, selectedPeriod, selectedModule]),
  );

  const deleteMutation = useMutation({
    mutationFn: deleteIngoingPayments,
    onSuccess: () => {
      handleIngoing();
      handleIngoingDashboard();
    },
    onError: error => {
      console.log('Delete error:', error);
    },
  });
  const handleDelete = id => {
    const previousPayments = payment;
    setPayment(prev => prev.filter(item => item.Id !== id));
    deleteMutation.mutate(id, {
      onError: error => {
        setPayment(previousPayments);
        console.log('Delete error:', error);
      },
    });
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
    <View>
      <Design
        navigation={navigation}
        loading={loading}
        setLoading={setLoading}
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
        setIngoingDashboard={setIngoingDashboard}
        Page={Page}
      />
    </View>
  );
};

export default IngoingTab;
