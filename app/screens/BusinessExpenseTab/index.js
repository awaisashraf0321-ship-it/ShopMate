import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback, act } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Design from './design';
import { GetOutgoingPayments } from '../../api/OutgoingPaymentsApi';
import { deleteOutgoingPayments } from '../../api/OutgoingPaymentsApi';
import { getOutInDashboard } from '../../api/OutgoingPaymentsApi';
import { useMutation } from '@tanstack/react-query';
import { useModule } from '../../components/ModuleContext';
import AuthTextField from '../../components/AuthTextField';
import PaymentSummaryCard from '../../components/PaymentSummaryCard';
const OutgoingPaymentsScreen = ({ navigation }) => {
  const [deleteModal, SetDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [outgoingdashboard, setOutgoingDashboard] = useState([]);
  const [PaymentMode, setPaymentMode] = useState(0);
  const [Page, setPage] = useState(1);
  const [PageSize, setPageSize] = useState(10);
  const [visible, setVisible] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await handleOutgoingPayments();
      await handleOutgoing();
    } catch (error) {
      console.log('refreshing error', error);
    } finally {
      setRefreshing(false);
    }
  };
  const { selectedModule } = useModule();

  const handleOutgoingPayments = async () => {
    try {
      setLoading(true);
      const response = await GetOutgoingPayments(PaymentMode, Page, PageSize);
      const data = await response.json();
      console.log('outgoing response', data);
      if (response.ok) {
        setPayment(data.obj.data);
      } else {
        console.log('Outgoing Payments Error:', data);
      }
    } catch (error) {
      console.log('Outgoing Payments Error:', error.message);
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
  const handleOutgoing = async () => {
    try {
      setLoading(true);
      const response = await getOutInDashboard(isSelected, myPeriod);
      const data = await response.json();
      setOutgoingDashboard(data.obj);
      console.log('Outgoing Api resposne', data);
    } catch (error) {
      console.log('Outgoing Dashboard Error', error);
    } finally {
      setLoading(false);
    }
  };
  const methods = outgoingdashboard?.Methods;
  console.log('Outgoing', methods);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);

        try {
          await Promise.all([
            handleOutgoingPayments(true),
            handleOutgoing(true),
          ]);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [selectedPeriod, PaymentMode, selectedModule]),
  );
  const deleteMutation = useMutation({
    mutationFn: deleteOutgoingPayments,
    onSuccess: () => {
      handleOutgoingPayments();
      handleOutgoing();
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
    <View>
      <Design
        navigation={navigation}
        payment={mySearch}
        setPayment={setPayment}
        loading={loading}
        setLoading={setLoading}
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

const styles = StyleSheet.create({});
