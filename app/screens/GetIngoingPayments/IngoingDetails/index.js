import { screenFill } from '../../../theme';
import { View } from 'react-native';
import React, { useState } from 'react';
import Design from '../IngoingDetails/design';
import { deleteIngoingPayments } from '../../../api/IngoingPayments';
import {
  useIncomingPaymentById,
  usePullToRefresh,
} from '../../../hooks/queries';

const IngoingDetail = ({ route, navigation }) => {
  const [deleteModal1, SetDeleteModal1] = useState(false);
  const [selectedPaymentId1, setSelectedPaymentId1] = useState(null);

  const {
    data: getPayments1 = null,
    isLoading: loading,
    refetch,
  } = useIncomingPaymentById(route.params.id);
  const { refreshing, onRefresh } = usePullToRefresh(refetch);

  const handleDelete = async id => {
    try {
      const response = await deleteIngoingPayments(id);
      const data = await response.json();

      console.log('Delete API response:', data);

      if (response.ok && data.Status === 200) {
        SetDeleteModal1(false);
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
        getPayments1={getPayments1}
        loading={loading}
        refreshing={refreshing}
        onRefresh={onRefresh}
        formatDate={formatDate}
        formatAmount={formatAmount}
        handleDelete={handleDelete}
        deleteModal1={deleteModal1}
        SetDeleteModal1={SetDeleteModal1}
        selectedPaymentId1={selectedPaymentId1}
        setSelectedPaymentId1={setSelectedPaymentId1}
      />
    </View>
  );
};

export default IngoingDetail;
