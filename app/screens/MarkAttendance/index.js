import { screenFill } from '../../theme';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import React from 'react';
import Design from './design';
import { useState } from 'react';
import { IngoingPayments } from '../../api/IngoingPayments';
import Toast from 'react-native-toast-message';
import { GOT, missingPaymentField } from '../../helpers/moneyWords';
import { friendlyError, serverMessage } from '../../helpers/session';
import ErrorModal from '../../components/ErrorModal';
import { useModule } from '../../components/ModuleContext';
import { GetLookups } from '../../api/IngoingPayments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CustomerDelete } from '../../api/CustomerApi';

import { useEffect } from 'react';
import { useRef } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { t } from '../../i18n';
const InComingScreen = ({ navigation, route }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  // Opened from a customer's page: that customer is already chosen.
  const fromCustomer = route?.params?.customerId != null;
  const [sentTo, setSentTo] = useState(route?.params?.customerName ?? '');
  // Most payments are cash, so start there.
  const [paymentMode, setPaymentMode] = useState(1);
  const [note, setNote] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [date, setDate] = useState(new Date());
  const [Loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeModal, setActiveModal] = useState(false);
  const [selectedCustomerId1, setSelectedCustomerId1] = useState(
    route?.params?.customerId ?? null,
  );
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [imageUri2, setImageUri2] = useState(null);
  const [base64Image2, setBase64Image2] = useState(null);
  const [isDescriptionFocused, setDescriptionFoucused] = useState(false);
  const [selectedPaymentId3, setSelectedPaymentId3] = useState(null);
  const [deleteModal4, SetDeleteModal4] = useState(false);

  const scrollRef = useRef(null);

  const { selectedModule } = useModule();
  const moduleId = selectedModule === 'Self Expense' ? 1 : 2;
  const handleIncomingPayments = async () => {
    const missing = missingPaymentField({ amount, party: sentTo, words: GOT });
    if (missing) {
      Toast.show({ type: 'error', text1: missing });
      return;
    }
    try {
      setLoading(true);
      const myIncomingPayments = {
        customerId: selectedCustomerId1,
        ReceivedFrom: sentTo,
        ReceiptDate: date.toISOString().split('T')[0],
        Amount: Number(amount),
        image: base64Image2 || '',
        moduleId: moduleId,
        PaymentMode: Number(paymentMode),
        Description: note,
      };
      const response = await IngoingPayments(myIncomingPayments);
      const data = await response.json();
      console.log('IngoingPayments response', data);
      if (response.ok && data.Status === 201) {
        Toast.show({
          type: 'success',
          text1: GOT.saved({
            amount: Number(amount).toLocaleString(),
            name: sentTo,
          }),
        });
        if (fromCustomer) {
          navigation.goBack();
        } else {
          navigation.navigate('MainTabs', {
            screen: 'DashboardTab',
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: t('money.notSaved'),
          text2: serverMessage(data) || t('common.tryAgain'),
        });
      }
    } catch (error) {
      console.log('Ingoing Payment Error:', error.message);
      Toast.show({
        type: 'error',
        text1: t('money.notSaved'),
        text2: friendlyError(error),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = value => {
    const cleanedValue = value.replace(/[^0-9]/g, '');
    const parts = cleanedValue.split('.');
    if (parts[0].length > 7) return;
    setAmount(cleanedValue);
  };
  const {
    data: getNames1,
    isLoading: getLoading,
    refetch,
    isError: getError,
  } = useQuery({
    queryKey: ['getmyLookups'],
    queryFn: () => GetLookups(),
  });
  console.log('myLookups data', getNames1);
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
          setImageUri2(assets?.uri);
          setBase64Image2(assets?.base64);
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
          setImageUri2(assets?.uri);
          setBase64Image2(assets?.base64);
        }
      },
    );
  };
  const imageRemove = () => {
    setImageUri2(null);
    setBase64Image2(null);
  };
  useEffect(() => {
    const KeyboardHide = Keyboard.addListener('keyboardDidHide', () => {
      setDescriptionFoucused(false);
    });
    return () => KeyboardHide.remove();
  }, []);

  return (
    <View style={screenFill}>
      <ErrorModal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        text={t('money.notSaved')}
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
        Loading={Loading}
        setLoading={setLoading}
        handleIncomingPayments={handleIncomingPayments}
        handleAmountChange={handleAmountChange}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        selectedCustomerId1={selectedCustomerId1}
        setSelectedCustomerId1={setSelectedCustomerId1}
        getNames1={getNames1}
        scrollRef={scrollRef}
        showPhotoModal={showPhotoModal}
        setShowPhotoModal={setShowPhotoModal}
        pickFromGallery={pickFromGallery}
        openCamera={openCamera}
        imageUri2={imageUri2}
        setImageUri2={setImageUri2}
        imageRemove={imageRemove}
        isDescriptionFocused={isDescriptionFocused}
        setDescriptionFoucused={setDescriptionFoucused}
        deleteCustomer={deleteCustomer}
        selectedPaymentId3={selectedPaymentId3}
        setSelectedPaymentId3={setSelectedPaymentId3}
        deleteModal4={deleteModal4}
        SetDeleteModal4={SetDeleteModal4}
      />
    </View>
  );
};

export default InComingScreen;

const styles = StyleSheet.create({});
