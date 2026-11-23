import { screenFill } from '../../theme';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Design from './design';
import { useState, useRef } from 'react';
import { OutgoingPayment } from '../../api/OutgoingPaymentsApi';
import ErrorModal from '../../components/ErrorModal';
import { Screen } from 'react-native-screens';
import { useModule } from '../../components/ModuleContext';
import { GetLookups } from '../../api/IngoingPayments';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomerDelete } from '../../api/CustomerApi';
import { useEffect } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const LoanScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [paymentMode, setPaymentMode] = useState(null);
  const [note, setNote] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [Loading, setLoading] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [imageUri1, setImageUri1] = useState(null);
  const [base64Image1, setBase64Image1] = useState(null);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const [selectedPaymentId3, setSelectedPaymentId3] = useState(null);
  const [deleteModal4, SetDeleteModal4] = useState(false);
  const scrollRef = useRef(null);

  const { selectedModule } = useModule();
  const moduleId = selectedModule === 'Self Expense' ? 1 : 2;
  const handleSave = async () => {
    try {
      if (!amount || !sentTo || !paymentMode) {
        setErrorMessage('Please fill all inputs');
        setShowErrorModal(true);
        return;
      }

      setLoading(true);
      const paymentData = {
        customerId: selectedCustomerId,
        sentTo: sentTo,
        receiptDate: date.toISOString().split('T')[0],
        amount: Number(amount),
        image: base64Image1 || '',
        paymentMode: Number(paymentMode),
        moduleId: Number(moduleId),
        description: note,
      };

      const response = await OutgoingPayment(paymentData);

      const data = await response.json();

      console.log('Outgoing Payment Response:', data);

      if (response.ok) {
        console.log('Outgoing Payment Created Successfully');
        navigation.navigate('MainTabs', {
          screen: 'DashboardTab',
        });
      } else {
        console.log('Outgoing Payment Failed:', data);
      }
    } catch (error) {
      console.log('Outgoing Payment Error:', error.message);
    } finally {
      setLoading(false);
    }
  };
  const {
    data: getNames,
    isLoading: getLoading,
    refetch,
    isError: getError,
  } = useQuery({
    queryKey: ['getmyLookups'],
    queryFn: () => GetLookups(),
  });
  console.log('myLookups data', getNames);
  console.log('loading data', getLoading);
  console.log('myLookups error', getError);

  const queryClient = useQueryClient();

  const deleteCustomer = useMutation({
    mutationFn: id => CustomerDelete(id),

    onMutate: async id => {
      await queryClient.cancelQueries({
        queryKey: ['getmyLookups'],
      });

      const previousData = queryClient.getQueryData(['getmyLookups']);

      queryClient.setQueryData(['getmyLookups'], oldData => {
        return oldData?.filter(item => item.Id !== id);
      });

      return { previousData };
    },

    onError: (error, id, context) => {
      queryClient.setQueryData(['getmyLookups'], context?.previousData);

      console.log('delete api error', error);
    },

    onSuccess: async () => {
      await refetch();
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['getmyLookups'],
      });
    },
  });
  const cusLength = getNames?.length;

  let cusSearch = [];
  for (let i = 0; i < getNames?.length; i++) {
    if (
      getNames[i].Name.trim()
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    ) {
      cusSearch.push(getNames[i]);
    }
  }
  const handleAmountChange = value => {
    const cleanedValue = value.replace(/[^0-9]/g, '');
    const parts = cleanedValue.split('.');
    if (parts[0].length > 7) return;

    setAmount(cleanedValue);
  };
  const pickFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: true,
      },
      async response => {
        if (response.didCancel) return;
        if (response.errorMessage) {
          console.log(response.errorMessage);
        }
        const assets = response?.assets[0];
        if (assets?.uri && assets?.base64) {
          setImageUri1(assets?.uri);
          setBase64Image1(assets?.base64);
          await AsyncStorage.setItem('MygalleryImage', assets?.uri);
        }
      },
    );
  };

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: true,
        includeBase64: true,
      },
      async response => {
        if (response.didCancel) return;
        if (response.errorMessage) {
          console.log(response.errorMessage);
          return;
        }
        const assets = response.assets[0];
        if (assets?.uri && assets?.base64) {
          setImageUri1(assets?.uri);
          setBase64Image1(assets?.base64);
        }
      },
    );
  };

  const imageRemove = () => {
    setImageUri1(null);
    setBase64Image1(null);
  };

  useEffect(() => {
    const KeyboardHide = Keyboard.addListener('keyboardDidHide', () => {
      setIsDescriptionFocused(false);
    });
    return () => KeyboardHide.remove();
  }, []);

  return (
    <View style={screenFill}>
      <ErrorModal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        text={'Outgoing Payments Failed!'}
        errorMessage={errorMessage}
      />
      <Design
        date={date}
        setDate={setDate}
        showDate={showDate}
        setShowDate={setShowDate}
        showTime={showTime}
        setShowTime={setShowTime}
        note={note}
        setNote={setNote}
        paymentMode={paymentMode}
        setPaymentMode={setPaymentMode}
        sentTo={sentTo}
        setSentTo={setSentTo}
        navigation={navigation}
        amount={amount}
        setAmount={setAmount}
        category={category}
        setCategory={setCategory}
        handleSave={handleSave}
        Loading={Loading}
        setLoading={setLoading}
        handleAmountChange={handleAmountChange}
        getNames={cusSearch}
        selectedCustomerId={selectedCustomerId}
        setSelectedCustomerId={setSelectedCustomerId}
        visible={visible}
        setVisible={setVisible}
        scrollRef={scrollRef}
        search={search}
        setSearch={setSearch}
        cusLength={cusLength}
        showPhotoModal={showPhotoModal}
        setShowPhotoModal={setShowPhotoModal}
        pickFromGallery={pickFromGallery}
        launchImageLibrary={launchImageLibrary}
        openCamera={openCamera}
        imageUri1={imageUri1}
        imageRemove={imageRemove}
        setImageUri1={setImageUri1}
        isDescriptionFocused={isDescriptionFocused}
        setIsDescriptionFocused={setIsDescriptionFocused}
        deleteCustomer={deleteCustomer}
        selectedPaymentId3={selectedPaymentId3}
        setSelectedPaymentId3={setSelectedPaymentId3}
        deleteModal4={deleteModal4}
        SetDeleteModal4={SetDeleteModal4}
      />
    </View>
  );
};

export default LoanScreen;

const styles = StyleSheet.create({});
