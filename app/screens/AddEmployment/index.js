import { screenFill } from '../../theme';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import Design from './design';
import { useState, useEffect } from 'react';
import { customerPost } from '../../api/CustomerApi';
import Toast from 'react-native-toast-message';
import { useQueryClient } from '@tanstack/react-query';
import { friendlyError } from '../../helpers/session';
import { t } from '../../i18n';

const AddCustomerScreen = ({ navigation }) => {
  const scrollRef = useRef();
  const [loading, setLoading] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const queryClient = useQueryClient();
  const handleCustomer = async values => {
    try {
      setLoading(true);
      console.log('Form values:', values);

      const response = await customerPost(values);

      const data = await response.json();

      console.log('Customer API response:', data);

      if (response.ok) {
        // Refresh the customer pickers, then go back to where the user was
        // (e.g. a half-filled "You gave" form), not to the Home tab.
        queryClient.invalidateQueries({ queryKey: ['getmyLookups'] });
        Toast.show({
          type: 'success',
          text1: t('customer.saved', { name: values.customerName }),
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: t('customer.notSaved'),
          text2: data?.Message || data?.message || t('common.tryAgain'),
        });
      }
    } catch (error) {
      console.log('Customer API error:', error);
      Toast.show({
        type: 'error',
        text1: t('customer.notSaved'),
        text2: friendlyError(error),
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const isHide = Keyboard.addListener('keyboardDidHide', () => {
      setOnFocus(false);
    });
    return () => isHide.remove();
  }, []);

  return (
    <View style={screenFill}>
      <Design
        navigation={navigation}
        handleCustomer={handleCustomer}
        loading={loading}
        setLoading={setLoading}
        scrollRef={scrollRef}
        onFocus={onFocus}
        setOnFocus={setOnFocus}
      />
    </View>
  );
};

export default AddCustomerScreen;

const styles = StyleSheet.create({});
