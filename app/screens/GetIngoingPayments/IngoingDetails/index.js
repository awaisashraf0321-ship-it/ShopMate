import { StyleSheet, Text, View } from 'react-native';
import { GetByIdIngoingPayments } from '../../../api/IngoingPayments';
import Design from '../IngoingDetails/design';
import { useState, useEffect } from 'react';
import { deleteIngoingPayments } from '../../../api/IngoingPayments';
const IngoingDetail = ({ route, navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getPayments1, setGetPayments1] = useState(null);
  const [deleteModal1, SetDeleteModal1] = useState(false);
  const [selectedPaymentId1, setSelectedPaymentId1] = useState(null);

  const onRefresh = async () => {
    await handleIngoingGetById(true);
  };
  console.log('payment Id', route.params.id);
  const handleIngoingGetById = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) {
        setLoading(true);
      }
      const response = await GetByIdIngoingPayments(route.params.id);
      const data = await response.json();
      setGetPayments1(data.obj);
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
    handleIngoingGetById();
  }, []);

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
        handleIngoingGetById={handleIngoingGetById}
        getPayments1={getPayments1}
        loading={loading}
        setLoading={setLoading}
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

const styles = StyleSheet.create({});
