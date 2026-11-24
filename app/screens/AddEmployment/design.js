import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LeadgerHeader from '../../components/LeadgerHeader';

import colors from '../../theme/colors';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import customerStyles from './style';
import sizeHelper from '../../helpers/sizeHelper';
import Loader from '../../components/Loader';

const validationSchema = Yup.object().shape({
  customerName: Yup.string()
    .trim()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Full name is required'),

  phoneNo: Yup.string()
    .trim()
    .required('Phone number is required')
    .test('valid-phone', 'Enter a valid Pakistani mobile number', value => {
      if (!value) return false;
      const number = value.replace(/[\s-]/g, '');
      return /^(?:(?:\+92|0092)|0)?3\d{9}$/.test(number);
    }),

  whatsappNumber: Yup.string().when('sameWhatsapp', {
    is: false,
    then: schema =>
      schema
        .trim()
        .required('WhatsApp number is required')
        .test('valid-whatsapp', 'Enter a valid WhatsApp number', value => {
          if (!value) return false;
          const number = value.replace(/[\s-]/g, '');
          return /^(?:(?:\+92|0092)|0)?3\d{9}$/.test(number);
        }),
    otherwise: schema => schema.notRequired(),
  }),

  email: Yup.string().trim().email('Enter a valid email address').notRequired(),

  addressName: Yup.string().notRequired(),
  addressLine1: Yup.string().notRequired(),
  city: Yup.string().notRequired(),
});

const initialValues = {
  customerName: '',
  phoneNo: '',
  whatsappNumber: '',
  sameWhatsapp: true,
  email: '',
  addressName: 'Office',
  addressLine1: '',
  city: '',
};

const CustomerScreen = ({
  navigation,
  handleCustomer,
  loading,
  scrollRef,
  onFocus,
  setOnFocus,
}) => {
  const [addressExpanded, setAddressExpanded] = useState(true);

  const saveCustomer = async values => {
    const payload = {
      ...values,
      customerName: values.customerName.trim(),
      phoneNo: values.phoneNo.trim(),
      whatsappNumber: values.sameWhatsapp
        ? values.phoneNo.trim()
        : values.whatsappNumber.trim(),
      email: values.email.trim(),
      addressName: values.addressName,
      addressLine1: values.addressLine1.trim(),
      city: values.city.trim(),
    };

    await handleCustomer(payload);
  };

  return (
    <SafeAreaView style={customerStyles.safeArea}>
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={false}
        showBack={true}
        Margin={true}
        showPlus={false}
        title={'New customer'}
        subTitle={'Only name and phone are required.'}
        back={() => navigation.goBack()}
      />
      <Loader visible={loading} />
      <KeyboardAvoidingView
        style={customerStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={saveCustomer}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ values, errors, setFieldValue, handleChange, handleSubmit }) => (
            <>
              <ScrollView
                ref={scrollRef}
                style={customerStyles.scrollView}
                contentContainerStyle={[
                  customerStyles.scrollContent,
                  {
                    paddingBottom: onFocus
                      ? sizeHelper.calHp(1600)
                      : sizeHelper.calHp(1200),
                  },
                ]}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {/* Header / Module Dropdown */}
                <View style={customerStyles.dropdownWrapper}></View>

                {/* Screen heading */}

                {/* Full name */}
                <View style={customerStyles.fieldContainer}>
                  <Text style={customerStyles.fieldLabel}>
                    Full name <Text style={customerStyles.requiredText}>*</Text>
                  </Text>

                  <TextInput
                    style={[
                      customerStyles.input,
                      errors.customerName && customerStyles.inputError,
                    ]}
                    placeholder="e.g. Full Name"
                    placeholderTextColor={colors.textSecondary || '#858392'}
                    value={values.customerName}
                    onChangeText={handleChange('customerName')}
                    returnKeyType="next"
                    autoCapitalize="words"
                  />

                  {errors.customerName ? (
                    <Text style={customerStyles.errorText}>
                      {errors.customerName}
                    </Text>
                  ) : null}
                </View>

                {/* Phone number */}
                <View style={customerStyles.fieldContainer}>
                  <Text style={customerStyles.fieldLabel}>
                    Phone number
                    <Text style={customerStyles.requiredText}>*</Text>
                  </Text>

                  <View
                    style={[
                      customerStyles.phoneWrapper,
                      errors.phoneNo && customerStyles.inputError,
                    ]}
                  >
                    <View style={customerStyles.countryCode}>
                      <Text style={customerStyles.countryCodeText}>+92</Text>
                    </View>

                    <TextInput
                      style={customerStyles.phoneInput}
                      placeholder="300 1234567"
                      placeholderTextColor={colors.textSecondary || '#858392'}
                      value={values.phoneNo}
                      onChangeText={text => {
                        const cleaned = text.replace(/[^\d]/g, '');
                        const localNumber = cleaned.startsWith('92')
                          ? cleaned.slice(2)
                          : cleaned.startsWith('0')
                          ? cleaned.slice(1)
                          : cleaned;

                        setFieldValue('phoneNo', localNumber);

                        if (values.sameWhatsapp) {
                          setFieldValue('whatsappNumber', localNumber);
                        }
                      }}
                      keyboardType="phone-pad"
                      maxLength={12}
                      returnKeyType="next"
                    />
                  </View>

                  {errors.phoneNo ? (
                    <Text style={customerStyles.errorText}>
                      {errors.phoneNo}
                    </Text>
                  ) : null}
                </View>

                {/* Same WhatsApp number */}
                <TouchableOpacity
                  style={customerStyles.checkboxRow}
                  activeOpacity={0.8}
                  onPress={() => {
                    const nextValue = !values.sameWhatsapp;
                    setFieldValue('sameWhatsapp', nextValue);

                    if (nextValue) {
                      setFieldValue('whatsappNumber', values.phoneNo);
                    } else {
                      setFieldValue('whatsappNumber', '');
                    }
                  }}
                >
                  <View
                    style={[
                      customerStyles.checkbox,
                      values.sameWhatsapp && customerStyles.checkboxChecked,
                    ]}
                  >
                    {values.sameWhatsapp ? (
                      <Icon name="check" size={16} color="#FFFFFF" />
                    ) : null}
                  </View>

                  <Text style={customerStyles.checkboxLabel}>
                    Same number on WhatsApp
                  </Text>
                </TouchableOpacity>

                {/* Separate WhatsApp number */}
                {!values.sameWhatsapp && (
                  <View style={customerStyles.fieldContainer}>
                    <Text style={customerStyles.fieldLabel}>
                      WhatsApp number{' '}
                      <Text style={customerStyles.requiredText}>*</Text>
                    </Text>

                    <TextInput
                      style={[
                        customerStyles.input,
                        errors.whatsappNumber && customerStyles.inputError,
                      ]}
                      placeholder="300 1234567"
                      placeholderTextColor={colors.textSecondary || '#858392'}
                      value={values.whatsappNumber}
                      onChangeText={handleChange('whatsappNumber')}
                      keyboardType="phone-pad"
                      maxLength={13}
                      returnKeyType="next"
                    />

                    {errors.whatsappNumber ? (
                      <Text style={customerStyles.errorText}>
                        {errors.whatsappNumber}
                      </Text>
                    ) : null}
                  </View>
                )}

                {/* Email */}
                <View style={customerStyles.fieldContainer}>
                  <Text style={customerStyles.fieldLabel}>
                    Email{' '}
                    <Text style={customerStyles.optionalText}>(optional)</Text>
                  </Text>

                  <TextInput
                    style={[
                      customerStyles.input,
                      errors.email && customerStyles.inputError,
                    ]}
                    placeholder="name@example.com"
                    placeholderTextColor={colors.textSecondary || '#858392'}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                  />

                  {errors.email ? (
                    <Text style={customerStyles.errorText}>{errors.email}</Text>
                  ) : null}
                </View>

                {/* Address card */}
                <View style={customerStyles.addressCard}>
                  <TouchableOpacity
                    style={customerStyles.addressHeader}
                    activeOpacity={0.8}
                    onPress={() => setAddressExpanded(!addressExpanded)}
                  >
                    <View style={customerStyles.addressIconBox}>
                      <Icon
                        name="place"
                        size={21}
                        color={colors.primary || '#4A24B8'}
                      />
                    </View>

                    <View style={customerStyles.addressHeadingText}>
                      <Text style={customerStyles.addressTitle}>
                        Address{' '}
                        <Text style={customerStyles.optionalText}>
                          (optional)
                        </Text>
                      </Text>
                    </View>

                    <Icon
                      name={
                        addressExpanded
                          ? 'keyboard-arrow-up'
                          : 'keyboard-arrow-down'
                      }
                      size={25}
                      color={colors.textSecondary || '#6B6880'}
                    />
                  </TouchableOpacity>

                  {addressExpanded && (
                    <View style={customerStyles.addressBody}>
                      {/* Address type */}
                      <View style={customerStyles.addressTypeRow}>
                        {['Home', 'Office', 'Other'].map(type => {
                          const selected = values.addressName === type;

                          return (
                            <TouchableOpacity
                              key={type}
                              activeOpacity={0.8}
                              style={[
                                customerStyles.addressTypeButton,
                                selected && customerStyles.addressTypeSelected,
                              ]}
                              onPress={() => setFieldValue('addressName', type)}
                            >
                              <Text
                                style={[
                                  customerStyles.addressTypeText,
                                  selected &&
                                    customerStyles.addressTypeTextSelected,
                                ]}
                              >
                                {type}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>

                      {/* Street address */}
                      <View style={customerStyles.addressField}>
                        <Text style={customerStyles.fieldLabel}>
                          Street address
                        </Text>

                        <TextInput
                          style={customerStyles.input}
                          onFocus={() => {
                            setOnFocus(true);
                            setTimeout(() => {
                              scrollRef?.current.scrollToEnd();
                            }, 100);
                          }}
                          onBlur={() => setOnFocus(false)}
                          placeholder="House, street, area"
                          placeholderTextColor={
                            colors.textSecondary || '#858392'
                          }
                          value={values.addressLine1}
                          onChangeText={handleChange('addressLine1')}
                          returnKeyType="next"
                        />
                      </View>

                      {/* City */}
                      <View style={customerStyles.addressField}>
                        <Text style={customerStyles.fieldLabel}>City</Text>

                        <TextInput
                          style={customerStyles.input}
                          placeholder="e.g. Lahore"
                          onFocus={() => {
                            setOnFocus(true);
                            setTimeout(() => {
                              scrollRef?.current.scrollToEnd();
                            }, 100);
                          }}
                          onBlur={() => setOnFocus(false)}
                          placeholderTextColor={
                            colors.textSecondary || '#858392'
                          }
                          value={values.city}
                          onChangeText={handleChange('city')}
                          autoCapitalize="words"
                          returnKeyType="done"
                        />
                      </View>
                    </View>
                  )}
                </View>
                <View style={customerStyles.bottomBar}>
                  <TouchableOpacity
                    style={[
                      customerStyles.saveButton,
                      loading && customerStyles.saveButtonDisabled,
                    ]}
                    activeOpacity={0.85}
                    disabled={loading}
                    onPress={handleSubmit}
                  >
                    <>
                      <Icon name="check" size={21} color="#FFFFFF" />
                      <Text style={customerStyles.saveButtonText}>
                        Save customer
                      </Text>
                    </>
                  </TouchableOpacity>
                </View>
              </ScrollView>

              {/* Fixed bottom save button */}
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CustomerScreen;
