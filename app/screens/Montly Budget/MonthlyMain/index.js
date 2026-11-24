import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Design from './design';
import { monthlyGetById } from '../../../api/MontlyApi';
import { useMutation } from '@tanstack/react-query';
import { budgetDelete } from '../../../api/MontlyApi';
const MonhlyBudgetScreen = ({ navigation, route }) => {
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [idResponse, setIdResponse] = useState(null);
  const [deleteModal2, SetDeleteModal2] = useState(false);
  const [selectedPaymentId2, setSelectedPaymentId2] = useState(null);

  const Id = route.params.id;
  console.log('Monthly budget Id', Id);
  const onRefresh = async () => {
    await handleMonthlyGetById();
  };
  const handleMonthlyGetById = async () => {
    try {
      setLoader(true);
      const response = await monthlyGetById(route.params.id);
      const data = await response.json();
      setIdResponse(data.obj);
      console.log('MonthlyGetBYId Api Response', data);
    } catch (error) {
      console.log('Monthly Budget Api Errror', error);
    } finally {
      setLoader(false);
    }
  };

  const handleDelete = useMutation({
    mutationFn: id => budgetDelete(id),
    onSuccess: async response => {
      const data = await response.json();
      console.log('Delete Response:', data);
      if (response.ok) {
        SetDeleteModal2(false);
        navigation.goBack();
      }
    },

    onError: error => {
      console.log('Delete Error:', error.message);
    },
  });

  useEffect(() => {
    handleMonthlyGetById();
  }, []);
  const formatAmount = amount => {
    return (Number(amount) || 0).toLocaleString('en-US');
  };
  const formatDate = date => {
    if (!date) return;
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
        handleMonthlyGetById={handleMonthlyGetById}
        refreshing={refreshing}
        onRefresh={onRefresh}
        idResponse={idResponse}
        loader={loader}
        formatDate={formatDate}
        formatAmount={formatAmount}
        deleteModal2={deleteModal2}
        SetDeleteModal2={SetDeleteModal2}
        selectedPaymentId2={selectedPaymentId2}
        handleDelete={handleDelete}
        setSelectedPaymentId2={setSelectedPaymentId2}
      />
    </View>
  );
};

export default MonhlyBudgetScreen;
