import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Design from '../SelfDetail/design';
import { useMutation } from '@tanstack/react-query';
import { Delete, SelfGetById } from '../../../api/ExpenseApi';
import { useState, useEffect } from 'react';
const SelfDetailScreen = ({ navigation, route }) => {
  const [deleteModal3, SetDeleteModal3] = useState(false);
  const [selectedPaymentId3, setSelectedPaymentId3] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [Get, setGet] = useState(null);
  const [Loading, setLoading] = useState(false);
  console.log('Self expense Id', route.params.id);
  const onRefresh = async () => {
    await handleGetById(true);
  };

  const handleGetById = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) {
        setLoading(true);
      }

      const response = await SelfGetById(route.params.id);
      const data = await response.json();
      console.log('myExpenseData', data);
      if (data.Status === 200 && data.obj) {
        setGet(data.obj);
      }

      console.log('Get Data:', response);
    } catch (error) {
      console.log('Get Error:', error.message);
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

  const deleteMutation = useMutation({
    mutationFn: Delete,

    onSuccess: response => {
      console.log('Delete response:', response);

      if (response.Status === 200) {
        navigation.goBack();
      }
    },

    onError: error => {
      console.log('Delete error:', error);
    },
  });
  const { isPending } = deleteMutation;
  const handleDelete = id => {
    deleteMutation.mutate(id);
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
  const formatAmount = amount => {
    return Number(amount).toLocaleString('en-US');
  };
  return (
    <View>
      <Design
        Get={Get}
        formatDate={formatDate}
        formatAmount={formatAmount}
        navigation={navigation}
        handleDelete={handleDelete}
        deleteModal3={deleteModal3}
        SetDeleteModal3={SetDeleteModal3}
        selectedPaymentId3={selectedPaymentId3}
        setSelectedPaymentId3={setSelectedPaymentId3}
        refreshing={refreshing}
        setRefreshing={setRefreshing}
        onRefresh={onRefresh}
        Loading={Loading}
        loader={isPending}
      />
    </View>
  );
};

export default SelfDetailScreen;

const styles = StyleSheet.create({});
