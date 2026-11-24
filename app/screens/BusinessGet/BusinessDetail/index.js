import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Design from '../BusinessDetail/design';
import { SelfGetById } from '../../../api/ExpenseApi';
import { useMutation } from '@tanstack/react-query';
import { Delete } from '../../../api/ExpenseApi';
import { useState, useEffect } from 'react';
const BuisnessDetailScreen = ({ navigation, route }) => {
  const [deleteModal4, SetDeleteModal4] = useState(false);
  const [selectedPaymentId4, setSelectedPaymentId4] = useState(null);
  const [Get, setGet] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  console.log('Business expense Id', route.params.id);
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

  const deleteMutation2 = useMutation({
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
  const handleDelete1 = id => {
    deleteMutation2.mutate(id);
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
  const formatAmount = amount => {
    return Number(amount).toLocaleString('en-US');
  };

  return (
    <View>
      <Design
        navigation={navigation}
        Get={Get}
        formatDate={formatDate}
        formatAmount={formatAmount}
        handleDelete1={handleDelete1}
        deleteModal4={deleteModal4}
        SetDeleteModal4={SetDeleteModal4}
        selectedPaymentId4={selectedPaymentId4}
        setSelectedPaymentId4={setSelectedPaymentId4}
        Loading={Loading}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default BuisnessDetailScreen;

const styles = StyleSheet.create({});
