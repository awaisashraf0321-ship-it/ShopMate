import { screenFill } from '../../../theme';
import { View } from 'react-native';
import React, { useState } from 'react';
import Design from '../OutgoingDetail/design';
import { deleteOutgoingPayments } from '../../../api/OutgoingPaymentsApi';
import {
  useOutgoingPaymentById,
  usePullToRefresh,
} from '../../../hooks/queries';

const OutgoingDetailscreen = ({ navigation, route }) => {
  const [deleteModal2, SetDeleteModal2] = useState(false);
  const [selectedPaymentId2, setSelectedPaymentId2] = useState(null);

  const {
    data: getPayments = null,
    isLoading: loading,
    refetch,
  } = useOutgoingPaymentById(route.params.id);
  const { refreshing, onRefresh } = usePullToRefresh(refetch);

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
        getPayments={getPayments}
        loading={loading}
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
