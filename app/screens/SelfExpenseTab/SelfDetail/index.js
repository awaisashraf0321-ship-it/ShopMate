import { screenFill } from '../../../theme';
import { View } from 'react-native';
import React, { useState } from 'react';
import Design from '../SelfDetail/design';
import { useMutation } from '@tanstack/react-query';
import { Delete } from '../../../api/ExpenseApi';
import { useExpenseById, usePullToRefresh } from '../../../hooks/queries';

const SelfDetailScreen = ({ navigation, route }) => {
  const [deleteModal3, SetDeleteModal3] = useState(false);
  const [selectedPaymentId3, setSelectedPaymentId3] = useState(null);

  const {
    data: Get = null,
    isLoading: Loading,
    refetch,
  } = useExpenseById(route.params.id);
  const { refreshing, onRefresh } = usePullToRefresh(refetch);

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
        onRefresh={onRefresh}
        Loading={Loading}
        loader={isPending}
      />
    </View>
  );
};

export default SelfDetailScreen;
