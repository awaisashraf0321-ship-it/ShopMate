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
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LeadgerHeader from '../../components/LeadgerHeader';

import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import customerStyles from './style';
import sizeHelper from '../../helpers/sizeHelper';
import Loader from '../../components/Loader';
import { theme } from '../../theme';
import ContactPicker from '../../components/ContactPicker';
import { Button } from '../../ui';
import { t } from '../../i18n';

const validationSchema = Yup.object().shape({
  customerName: Yup.string()
    .trim()
    .min(2, () => t('customer.nameShort'))
    .max(50, () => t('customer.nameLong'))
    .required(() => t('customer.nameRequired')),

  phoneNo: Yup.string()
    .trim()
    .required(() => t('customer.phoneRequired'))
    .test(
      'valid-phone',
      () => t('customer.phoneInvalid'),
      value => {
        if (!value) return false;
        const number = value.replace(/[\s-]/g, '');
        return /^(?:(?:\+92|0092)|0)?3\d{9}$/.test(number);
      },
    ),

  whatsappNumber: Yup.string().when('sameWhatsapp', {
    is: false,
    then: schema =>
      schema
        .trim()
        .required(() => t('customer.whatsappRequired'))
        .test(
          'valid-whatsapp',
          () => t('customer.whatsappInvalid'),
          value => {
            if (!value) return false;
            const number = value.replace(/[\s-]/g, '');
            return /^(?:(?:\+92|0092)|0)?3\d{9}$/.test(number);
          },
        ),
    otherwise: schema => schema.notRequired(),
  }),

  email: Yup.string()
    .trim()
    .email(() => t('customer.emailInvalid'))
    .notRequired(),

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
  // WhatsApp, email and address are optional: hidden until asked for.
  const [moreOpen, setMoreOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);

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
    <View style={customerStyles.safeArea}>
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={false}
        showBack={true}
        Margin={true}
        showPlus={false}
        title={t('customer.new')}
        subTitle={t('customer.newSubtitle')}
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
                  { paddingBottom: theme.spacing.xl },
                ]}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {/* Header / Module Dropdown */}
                <View style={customerStyles.dropdownWrapper}></View>

                {/* Screen heading */}

                {/* Fastest way: pick someone already in the phone */}
                <Button
                  title={t('customer.fromContacts')}
                  icon="contacts"
                  variant="secondary"
                  size="lg"
                  onPress={() => setContactsOpen(true)}
                />
                <View style={contactStyles.orRow}>
                  <View style={contactStyles.orLine} />
                  <Text style={customerStyles.optionalText}>
                    {t('customer.orType')}
                  </Text>
                  <View style={contactStyles.orLine} />
                </View>
                <ContactPicker
                  visible={contactsOpen}
                  onClose={() => setContactsOpen(false)}
                  onSelect={({ name, phone }) => {
                    // The field shows +92 separately, so drop the leading 0.
                    const local = phone.slice(1);
                    setFieldValue('customerName', name.slice(0, 50));
                    setFieldValue('phoneNo', local);
                    if (values.sameWhatsapp) {
                      setFieldValue('whatsappNumber', local);
                    }
                    setContactsOpen(false);
                  }}
                />

                {/* Full name */}
                <View style={customerStyles.fieldContainer}>
                  <Text style={customerStyles.fieldLabel}>
                    {t('customer.name')}
                  </Text>

                  <TextInput
                    style={[
                      customerStyles.input,
                      errors.customerName && customerStyles.inputError,
                    ]}
                    placeholder={t('customer.namePlaceholder')}
                    placeholderTextColor={theme.colors.textMuted}
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
                    {t('customer.phone')}
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
                      placeholderTextColor={theme.colors.textMuted}
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

                {/* Everything optional lives behind t('customer.more') */}
                <TouchableOpacity
                  style={moreStyles.toggle}
                  activeOpacity={0.8}
                  onPress={() => setMoreOpen(open => !open)}
                  accessibilityRole="button"
                  accessibilityState={{ expanded: moreOpen }}
                >
                  <Icon
                    name={
                      moreOpen ? 'remove-circle-outline' : 'add-circle-outline'
                    }
                    size={22}
                    color={theme.colors.primary}
                  />
                  <Text style={moreStyles.toggleText}>
                    {moreOpen ? t('customer.less') : t('customer.more')}
                  </Text>
                  <Text style={customerStyles.optionalText}>
                    {t('customer.moreWhat')}
                  </Text>
                </TouchableOpacity>

                {moreOpen || errors.whatsappNumber || errors.email ? (
                  <>
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
                          <Icon
                            name="check"
                            size={16}
                            color={theme.colors.onPrimary}
                          />
                        ) : null}
                      </View>

                      <Text style={customerStyles.checkboxLabel}>
                        {t('customer.sameWhatsapp')}
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
                          placeholderTextColor={theme.colors.textMuted}
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
                        <Text style={customerStyles.optionalText}>
                          (optional)
                        </Text>
                      </Text>

                      <TextInput
                        style={[
                          customerStyles.input,
                          errors.email && customerStyles.inputError,
                        ]}
                        placeholder="name@example.com"
                        placeholderTextColor={theme.colors.textMuted}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                      />

                      {errors.email ? (
                        <Text style={customerStyles.errorText}>
                          {errors.email}
                        </Text>
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
                            color={theme.colors.primary}
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
                          color={theme.colors.textSecondary}
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
                                    selected &&
                                      customerStyles.addressTypeSelected,
                                  ]}
                                  onPress={() =>
                                    setFieldValue('addressName', type)
                                  }
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
                              {t('customer.street')}
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
                              placeholder={t('customer.streetPlaceholder')}
                              placeholderTextColor={theme.colors.textMuted}
                              value={values.addressLine1}
                              onChangeText={handleChange('addressLine1')}
                              returnKeyType="next"
                            />
                          </View>

                          {/* City */}
                          <View style={customerStyles.addressField}>
                            <Text style={customerStyles.fieldLabel}>
                              {t('customer.city')}
                            </Text>

                            <TextInput
                              style={customerStyles.input}
                              placeholder={t('customer.cityPlaceholder')}
                              onFocus={() => {
                                setOnFocus(true);
                                setTimeout(() => {
                                  scrollRef?.current.scrollToEnd();
                                }, 100);
                              }}
                              onBlur={() => setOnFocus(false)}
                              placeholderTextColor={theme.colors.textMuted}
                              value={values.city}
                              onChangeText={handleChange('city')}
                              autoCapitalize="words"
                              returnKeyType="done"
                            />
                          </View>
                        </View>
                      )}
                    </View>
                  </>
                ) : null}
              </ScrollView>

              {/* Save button pinned below the form */}
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
                    <Icon
                      name="check"
                      size={21}
                      color={theme.colors.onPrimary}
                    />
                    <Text style={customerStyles.saveButtonText}>
                      {t('customer.save')}
                    </Text>
                  </>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
};

const contactStyles = StyleSheet.create({
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginVertical: theme.spacing.lg,
  },
  orLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.borderStrong,
  },
});

const moreStyles = StyleSheet.create({
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  toggleText: {
    ...theme.typography.bodyStrong,
    color: theme.colors.primary,
  },
});

export default CustomerScreen;
