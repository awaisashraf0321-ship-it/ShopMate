import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Design from '../OutgoingDetail/design';
import { GetByIdOutgoingPayments } from '../../../api/OutgoingPaymentsApi';
import { deleteOutgoingPayments } from '../../../api/OutgoingPaymentsApi';

const OutgoingDetailscreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getPayments, setGetPayments] = useState(null);
  const [deleteModal2, SetDeleteModal2] = useState(false);
  const [selectedPaymentId2, setSelectedPaymentId2] = useState(null);

  const onRefresh = async () => {
    await handleGetById(true);
  };
  const handleGetById = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) {
        setLoading(true);
      }
      const response = await GetByIdOutgoingPayments(route.params.id);
      const data = await response.json();
      setGetPayments(data.obj);
      console.log('api response', data);
      if (response.ok) {
        console.log('data fetched successfully');
      } else {
        console.log('data not fetched');
      }
    } catch (error) {
      console.log('api error', error.message);
    } finally {
      if (!isRefreshing) {
        setLoading(false);
      }
      setRefreshing(false);
    }
  };
  useEffect(() => {
    handleGetById();
  }, []);

  const handleDelete = async id => {
    try {
      const response = await deleteOutgoingPayments(id);
      const data = await response.json();

      console.log('Delete API response:', data);

      if (response.ok && data.Status === 200) {
        SetDeleteModal2(false);
        navigation.goBack();
      } else {
        console.log('Payment delete failed:', data.Message);
      }
    } catch (error) {
      console.log('Delete API error:', error.message);
    }
  };

  const formatAmount = amount => {
    return Number(amount).toLocaleString('en-US');
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
  return (
    <View>
      <Design
        navigation={navigation}
        handleGetById={handleGetById}
        getPayments={getPayments}
        loading={loading}
        setLoading={setLoading}
        refreshing={refreshing}
        onRefresh={onRefresh}
        formatDate={formatDate}
        formatAmount={formatAmount}
        handleDelete={handleDelete}
        deleteModal2={deleteModal2}
        SetDeleteModal2={SetDeleteModal2}
        selectedPaymentId2={selectedPaymentId2}
        setSelectedPaymentId2={setSelectedPaymentId2}
      />
    </View>
  );
};

export default OutgoingDetailscreen;

const styles = StyleSheet.create({});
