import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';
import { Formik } from 'formik';

import style from './style';
import ErrorModal from '../../components/ErrorModal';
import { useTheme } from '../../theme';
import { AppText, Button, SegmentedControl, TextField } from '../../ui';

const loginSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const signUpSchema = Yup.object({
  userName: Yup.string()
    .matches(/^\S*$/, 'Username must not contain spaces')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^03[0-9]{9}$/, 'Enter a valid phone number')
    .required('Phone number is required'),
  salary: Yup.string().required('Please Enter Your Budget Salary'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const TABS = [
  { value: 1, label: 'Log in' },
  { value: 2, label: 'Sign up' },
];

const MODULES = [
  { value: 'Self Expense', label: 'Personal' },
  { value: 'Business Expense', label: 'Business' },
];

/** Shows a Formik error only once the field has been touched. */
const fieldError = (touched, errors, name) =>
  touched[name] && errors[name] ? errors[name] : undefined;

const Design = ({
  activeTab,
  setActiveTab,
  rememberPassword,
  setRememberPassword,
  handleLogin,
  errorModal,
  setErrorModal,
  errorMessage,
  setErrorMessage,
  loading,
  loading1,
  username,
  signupErrorModal,
  setSignupErrorModal,
  signupErrorMessage,
  setSignupErrorMessage,
  handleSignUp,
  selectedModule,
  myModule,
}) => {
  const { colors, spacing } = useTheme();
  const isLogin = activeTab === 1;

  return (
    <View style={[style.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={style.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={style.flex}
          contentContainerStyle={style.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand header (gradient is a background layer: padding on
              LinearGradient itself renders inset) */}
          <View style={style.header}>
            <LinearGradient
              colors={colors.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <View style={style.blobLarge} />
            <View style={style.blobSmall} />
            <SafeAreaView edges={['top']} style={style.headerContent}>
              <View style={style.logoRing}>
                <View style={style.logoCircle}>
                  <Image
                    style={style.logo}
                    source={require('../../assets/image/favicon1.png')}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <AppText variant="display" color="onPrimary" style={style.center}>
                {isLogin ? 'Welcome back' : 'Create account'}
              </AppText>
              <AppText
                variant="body"
                color="onPrimaryMuted"
                style={[style.center, { marginTop: spacing.xs }]}
              >
                {isLogin
                  ? 'Log in to manage your expenses and business.'
                  : 'Track personal and business spending in one place.'}
              </AppText>
            </SafeAreaView>
          </View>

          {/* Form sheet, pulled up over the header */}
          <View style={[style.sheet, { backgroundColor: colors.surface }]}>
            <SegmentedControl
              options={TABS}
              value={activeTab}
              onChange={setActiveTab}
              style={{ marginBottom: spacing.xl }}
            />

            {isLogin ? (
              <Formik
                enableReinitialize
                initialValues={{ username, password: '' }}
                validationSchema={loginSchema}
                onSubmit={handleLogin}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <>
                    <TextField
                      inset={false}
                      label="Username"
                      icon="person-outline"
                      placeholder="Enter your username"
                      value={values.username}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      error={fieldError(touched, errors, 'username')}
                    />
                    <TextField
                      inset={false}
                      password
                      label="Password"
                      icon="lock-outline"
                      placeholder="Enter your password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={fieldError(touched, errors, 'password')}
                    />

                    <Pressable
                      onPress={() => setRememberPassword(!rememberPassword)}
                      style={[style.remember, { gap: spacing.sm }]}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: rememberPassword }}
                      hitSlop={8}
                    >
                      <Icon
                        name={
                          rememberPassword
                            ? 'check-box'
                            : 'check-box-outline-blank'
                        }
                        size={22}
                        color={
                          rememberPassword ? colors.primary : colors.textMuted
                        }
                      />
                      <AppText variant="body">Remember me</AppText>
                    </Pressable>

                    <Button
                      title="Log in"
                      variant="primary"
                      size="lg"
                      onPress={handleSubmit}
                      loading={loading}
                      style={{ marginTop: spacing.xl }}
                    />
                  </>
                )}
              </Formik>
            ) : (
              <Formik
                initialValues={{
                  userName: '',
                  email: '',
                  phoneNumber: '',
                  salary: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={signUpSchema}
                onSubmit={handleSignUp}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <>
                    <TextField
                      inset={false}
                      label="Username"
                      icon="person-outline"
                      placeholder="No spaces, e.g. ali_traders"
                      value={values.userName}
                      onChangeText={handleChange('userName')}
                      onBlur={handleBlur('userName')}
                      error={fieldError(touched, errors, 'userName')}
                    />
                    <TextField
                      inset={false}
                      label="Email"
                      icon="mail-outline"
                      placeholder="you@example.com"
                      keyboardType="email-address"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      error={fieldError(touched, errors, 'email')}
                    />
                    <TextField
                      inset={false}
                      label="Phone number"
                      icon="phone-iphone"
                      placeholder="03XXXXXXXXX"
                      keyboardType="phone-pad"
                      maxLength={11}
                      value={values.phoneNumber}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      error={fieldError(touched, errors, 'phoneNumber')}
                    />
                    <TextField
                      inset={false}
                      label="Monthly salary / budget"
                      icon="account-balance-wallet"
                      placeholder="e.g. 80000"
                      keyboardType="number-pad"
                      value={values.salary}
                      onChangeText={handleChange('salary')}
                      onBlur={handleBlur('salary')}
                      error={fieldError(touched, errors, 'salary')}
                    />

                    <AppText
                      variant="label"
                      style={{ marginBottom: spacing.sm }}
                    >
                      What will you track?
                    </AppText>
                    <SegmentedControl
                      options={MODULES}
                      value={selectedModule}
                      onChange={value => myModule(value)}
                      style={{ marginBottom: spacing.lg }}
                    />

                    <TextField
                      inset={false}
                      password
                      label="Password"
                      icon="lock-outline"
                      placeholder="At least 6 characters, 1 capital"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={fieldError(touched, errors, 'password')}
                    />
                    <TextField
                      inset={false}
                      password
                      label="Confirm password"
                      icon="lock-outline"
                      placeholder="Re-enter your password"
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      error={fieldError(touched, errors, 'confirmPassword')}
                    />

                    <Button
                      title="Create account"
                      variant="primary"
                      size="lg"
                      onPress={handleSubmit}
                      loading={loading1}
                      style={{ marginTop: spacing.md }}
                    />
                  </>
                )}
              </Formik>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ErrorModal
        visible={errorModal}
        onClose={() => setErrorModal(false)}
        errorMessage={errorMessage}
        text="Login Failed!"
        setErrorMessage={setErrorMessage}
        icon="error-outline"
      />
      <ErrorModal
        visible={signupErrorModal}
        onClose={() => setSignupErrorModal(false)}
        errorMessage={signupErrorMessage}
        text="Sign Up Failed!"
        setErrorMessage={setSignupErrorMessage}
        icon="error-outline"
      />
    </View>
  );
};

export default Design;
