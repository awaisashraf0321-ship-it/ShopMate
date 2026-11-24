import { Keyboard, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import Design from './design';
import { useState, useEffect } from 'react';
import { customerPost } from '../../api/CustomerApi';

const AddCustomerScreen = ({ navigation }) => {
  const scrollRef = useRef();
  const [loading, setLoading] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const handleCustomer = async values => {
    try {
      setLoading(true);
      console.log('Form values:', values);

      const response = await customerPost(values);

      const data = await response.json();

      console.log('Customer API response:', data);

      if (response.ok) {
        navigation.navigate('MainTabs', {
          screen: 'DashboardTab',
        });
        console.log('API request successful');
      } else {
        console.log('API request failed:', data);
      }
    } catch (error) {
      console.log('Customer API error:', error);
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
    <View>
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
