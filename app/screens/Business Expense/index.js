import VoiceSheet from '../../voice/VoiceSheet';
import { screenFill } from '../../theme';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import { friendlyError } from '../../helpers/session';
import { missingExpenseField } from '../../helpers/moneyWords';
import Design from '../Business Expense/design';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetCategories } from '../../api/ExpenseApi';
import { ExpensesPost } from '../../api/ExpenseApi';
import ErrorModal from '../../components/ErrorModal';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { useRef, useEffect } from 'react';
import { t } from '../../i18n';
const BusinessExpenseScreen = ({ navigation, route }) => {
  // Voice input: the mic in the header opens the panel; the Dashboard mic
  // opens this screen with { startVoice: true }.
  const [voiceOpen, setVoiceOpen] = useState(
    Boolean(route?.params?.startVoice),
  );
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [open, setOpen] = useState(false);
  const [expenseType, setExpenseType] = useState('');
  // Most expenses are paid in cash, so start there.
  const [paymentMode, setPaymentMode] = useState(1);
  const [activeExpenseTab, setActiveExpenseTab] = useState(1);
  const [showErrorModal2, setShowErrorModal2] = useState(false);
  const [errorMessage2, setErrorMessage2] = useState('');
  const scrollRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [imageUri3, setImageUri3] = useState(null);
  const [base64Image3, setBase64Image3] = useState(null);
  const [isDescriptionFocused, setDescriptionFoucused] = useState(false);

  const businessMutation = useMutation({
    mutationFn: ExpensesPost,
    onSuccess: response => {
      if (response?.Status === 200 || response?.Status === 201) {
        Toast.show({ type: 'success', text1: t('expense.saved') });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: t('expense.notSaved'),
          text2: response?.Message || 'Please try again.',
        });
      }
    },
    onError: error => {
      console.log('Add Expense Error:', error);
      Toast.show({
        type: 'error',
        text1: t('expense.notSaved'),
        text2: friendlyError(error),
      });
    },
  });
  const { isPending } = businessMutation;

  const handleExpense = () => {
    const missing = missingExpenseField({ amount, category });
    if (missing) {
      Toast.show({ type: 'error', text1: missing });
      return;
    }
    const payload = {
      expenseDate:
        date.getFullYear() +
        '-' +
        String(date.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(date.getDate()).padStart(2, '0'),
      expenseType: 2,
      amount: Number(amount),
      paymentMethodId: Number(paymentMode),
      image: base64Image3 || '',
      expenseCategoryId: Number(category),
      moduleId: 2,
      discription: note,
    };
    console.log('Business Expense Payload:', payload);

    businessMutation.mutate(payload);
  };

  const {
    data: categories,
    isLoading: categoriesLoading2,
    error: categoriesError,
  } = useQuery({
    queryKey: ['expenseCategories', 2],
    queryFn: () => GetCategories(2),
  });
  // console.log( categories);
  console.log('Loading:', categoriesLoading2);
  console.log('Error:', categoriesError);

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
          setImageUri3(assets?.uri);
          setBase64Image3(assets?.base64);
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
          setImageUri3(assets?.uri);
          setBase64Image3(assets?.base64);
        }
      },
    );
  };
  const imageRemove = () => {
    setImageUri3(null);
    setBase64Image3(null);
  };

  useEffect(() => {
    const KeyboardHide = Keyboard.addListener('keyboardDidHide', () => {
      setDescriptionFoucused(false);
    });
    return () => KeyboardHide.remove();
  }, []);

  const applyVoice = draft => {
    setVoiceOpen(false);
    if (!draft) return;
    if (draft.amount != null) setAmount(String(Math.round(draft.amount)));
    if (draft.categoryId != null) setCategory(draft.categoryId);
    if (draft.paymentMode != null) setPaymentMode(draft.paymentMode);
    if (draft.date) setDate(draft.date);
    if (draft.note) setNote(draft.note);
  };

  return (
    <View style={screenFill}>
      <ErrorModal
        visible={showErrorModal2}
        onClose={() => setShowErrorModal2(false)}
        text={t('common.couldNotSave')}
        errorMessage={errorMessage2}
      />
      <Loader visible={isPending} />
      <Design
        onVoicePress={() => setVoiceOpen(true)}
        paymentMode={paymentMode}
        setPaymentMode={setPaymentMode}
        open={open}
        expenseType={expenseType}
        setExpenseType={setExpenseType}
        setOpen={setOpen}
        amount={amount}
        setAmount={setAmount}
        date={date}
        showDate={showDate}
        showTime={showTime}
        setShowTime={setShowTime}
        setShowDate={setShowDate}
        note={note}
        setNote={setNote}
        category={category}
        setCategory={setCategory}
        navigation={navigation}
        activeExpenseTab={activeExpenseTab}
        categories={categories}
        loading={categoriesLoading2}
        setActiveExpenseTab={setActiveExpenseTab}
        handleExpense={handleExpense}
        handleAmountChange={handleAmountChange}
        setDate={setDate}
        scrollRef={scrollRef}
        visible={visible}
        setVisible={setVisible}
        showPhotoModal={showPhotoModal}
        setShowPhotoModal={setShowPhotoModal}
        pickFromGallery={pickFromGallery}
        openCamera={openCamera}
        imageUri={imageUri3}
        setImageUri={setImageUri3}
        imageRemove={imageRemove}
        isDescriptionFocused={isDescriptionFocused}
        setDescriptionFoucused={setDescriptionFoucused}
      />
      <VoiceSheet
        visible={voiceOpen}
        categories={categories || []}
        onClose={() => setVoiceOpen(false)}
        onApply={applyVoice}
      />
    </View>
  );
};

export default BusinessExpenseScreen;
