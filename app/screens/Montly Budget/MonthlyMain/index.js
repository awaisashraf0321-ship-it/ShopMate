import { screenFill } from '../../../theme';
import { View } from 'react-native';
import React, { useState } from 'react';
import Design from './design';
import { useMutation } from '@tanstack/react-query';
import { budgetDelete } from '../../../api/MontlyApi';
import { useMonthlyBudgetById, usePullToRefresh } from '../../../hooks/queries';

const MonhlyBudgetScreen = ({ navigation, route }) => {
  const [deleteModal2, SetDeleteModal2] = useState(false);
  const [selectedPaymentId2, setSelectedPaymentId2] = useState(null);

  const Id = route.params.id;
  const {
    data: idResponse = null,
    isLoading: loader,
    refetch: handleMonthlyGetById,
  } = useMonthlyBudgetById(Id);
  const { refreshing, onRefresh } = usePullToRefresh(handleMonthlyGetById);

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

  const formatAmount = amount => {
    return (Number(amount) || 0).toLocaleString('en-US');
  };
  const formatDate = date => {
    if (!date) return;
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
  return (
    <View style={screenFill}>
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
