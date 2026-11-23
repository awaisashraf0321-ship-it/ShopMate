import { screenFill } from '../../../theme';
import { View } from 'react-native';
import React, { useState } from 'react';
import Design from '../BusinessDetail/design';
import { useMutation } from '@tanstack/react-query';
import { Delete } from '../../../api/ExpenseApi';
import { useExpenseById, usePullToRefresh } from '../../../hooks/queries';

const BuisnessDetailScreen = ({ navigation, route }) => {
  const [deleteModal4, SetDeleteModal4] = useState(false);
  const [selectedPaymentId4, setSelectedPaymentId4] = useState(null);

  const {
    data: Get = null,
    isLoading: Loading,
    refetch,
  } = useExpenseById(route.params.id);
  const { refreshing, onRefresh } = usePullToRefresh(refetch);

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
  const formatAmount = amount => {
    return Number(amount).toLocaleString('en-US');
  };

  return (
    <View style={screenFill}>
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
