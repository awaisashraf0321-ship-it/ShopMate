import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableNativeFeedback,
  Keyboard,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';
import { Formik } from 'formik';

import style from './style';
import sizeHelper from '../../helpers/sizeHelper';
import colors from '../../theme/colors';
import AuthTextField from '../../components/AuthTextField';
import ErrorModal from '../../components/ErrorModal';

const textFieldStyles = {
  usernameStyle: {
    fontSize: sizeHelper.calHp(31),
    marginLeft: sizeHelper.calHp(62),
    marginTop: sizeHelper.calHp(20),
  },
  iconDesign: {
    marginLeft: sizeHelper.calHp(10),
  },
  inputStyle: {
    width: '90%',
    height: sizeHelper.calHp(130),
    borderRadius: sizeHelper.calHp(100),
    marginLeft: sizeHelper.calHp(40),
    elevation: 0,
  },
};

const Design = ({
  activeTab,
  setActiveTab,
  visible,
  setVisible,
  rememberPassword,
  setRememberPassword,
  navigation,
  handleLogin,
  errorModal,
  setErrorModal,
  errorMessage,
  setErrorMessage,
  loading,
  loading1,
  username,
  visible1,
  setVisible1,
  visible2,
  setVisible2,
  signupErrorModal,
  setSignupErrorModal,
  signupErrorMessage,
  setSignupErrorMessage,
  handleSignUp,
  moduleDropdown,
  setModuleDropdown,
  selectedModule,
  setSelectedModule,
  myModule,
}) => {
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <LinearGradient
          colors={[colors.primaryGradientStart, colors.primaryGradientEnd]}
          style={style.root}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* BACKGROUND BLOBS */}
          <View style={style.blob1} />
          <View style={style.blob2} />
          <View style={style.blob3} />
          <View style={style.blobSmall1} />
          <View style={style.blobSmall2} />
          <View style={style.blobSmall3} />

          <SafeAreaView edges={['top']} style={{ flex: 1 }}>
            <StatusBar hidden />

            {/* TOP SECTION */}
            <View style={style.topSection}>
              <View style={style.center}>
                <View style={style.border}>
                  <View style={style.border2}>
                    <Image
                      style={style.menImg}
                      source={require('../../assets/image/favicon1.png')}
                    />
                  </View>
                </View>
              </View>

              <View style={style.content}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={style.welcome}>Welcome </Text>
                  <Text style={style.welcomeAccent}>Back</Text>
                </View>

                <Text style={style.description}>
                  Sign in or sign up to manage your expenses and business with
                  ease.
                </Text>
              </View>
            </View>

            {/* SCROLLABLE CARD */}
            <View style={style.cardWrapper}>
              <View style={style.card}>
                <ScrollView
                  style={{ flex: 1 }}
                  contentContainerStyle={style.cardScrollContent}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled
                >
                  {/* TAB SWITCHER */}
                  <View style={style.btn}>
                    <TouchableOpacity
                      onPress={() => setActiveTab(1)}
                      style={[style.wrapUp, activeTab === 1 && style.activeTab]}
                      activeOpacity={0.85}
                    >
                      <Text
                        style={[
                          style.login,
                          activeTab === 1 && style.activeText,
                        ]}
                      >
                        Log in
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setActiveTab(2)}
                      style={[style.wrapUp, activeTab === 2 && style.activeTab]}
                      activeOpacity={0.85}
                    >
                      <Text
                        style={[
                          style.login,
                          activeTab === 2 && style.activeText,
                        ]}
                      >
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* LOGIN TAB */}
                  {activeTab === 1 && (
                    <View style={style.inputContainer}>
                      <Formik
                        enableReinitialize
                        initialValues={{
                          username: username,
                          password: '',
                        }}
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
                            <AuthTextField
                              style={style.input}
                              label="Username"
                              icon="person"
                              value={values.username}
                              onChangeText={handleChange('username')}
                              onBlur={handleBlur('username')}
                              placeholder="Enter Your Username"
                              usernameStyle={textFieldStyles.usernameStyle}
                              iconDesign={textFieldStyles.iconDesign}
                              inputStyle={textFieldStyles.inputStyle}
                            />

                            {touched.username && errors.username && (
                              <Text style={style.errors}>
                                {errors.username}
                              </Text>
                            )}

                            <View style={style.passwordWrapper}>
                              <AuthTextField
                                style={style.input}
                                label="Password"
                                icon="lock"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                placeholder="Enter Your Password"
                                secureTextEntry={!visible}
                                usernameStyle={textFieldStyles.usernameStyle}
                                iconDesign={textFieldStyles.iconDesign}
                                inputStyle={textFieldStyles.inputStyle}
                              />

                              <TouchableOpacity
                                onPress={() => setVisible(!visible)}
                                style={style.passwordIcon}
                              >
                                <Icon
                                  name={
                                    visible ? 'visibility' : 'visibility-off'
                                  }
                                  size={sizeHelper.calHp(40)}
                                  color="#171717a9"
                                />
                              </TouchableOpacity>
                            </View>

                            {touched.password && errors.password && (
                              <Text style={style.errors}>
                                {errors.password}
                              </Text>
                            )}

                            <TouchableOpacity
                              onPress={() =>
                                setRememberPassword(!rememberPassword)
                              }
                              style={style.checkCon}
                            >
                              <Icon
                                style={style.check}
                                name={
                                  rememberPassword
                                    ? 'check-box'
                                    : 'check-box-outline-blank'
                                }
                                size={sizeHelper.calHp(38)}
                                color={colors.primaryGradientStart}
                              />

                              <Text style={style.Remember}>Remember me</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={handleSubmit}
                              activeOpacity={0.9}
                            >
                              <LinearGradient
                                colors={[
                                  colors.primaryGradientStart,
                                  colors.primaryGradientEnd,
                                ]}
                                style={style.optionSelected}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                              >
                                {loading ? (
                                  <ActivityIndicator
                                    size="small"
                                    color={colors.white}
                                  />
                                ) : (
                                  <Text style={style.loginText}>Log in</Text>
                                )}
                              </LinearGradient>
                            </TouchableOpacity>

                            <View style={style.footer}>
                              <View style={style.line1} />
                              <Text style={style.continueText}>
                                Or continue with
                              </Text>
                              <View style={style.line2} />
                            </View>

                            <View style={style.footerCon}>
                              <TouchableOpacity
                                style={style.footer2}
                                activeOpacity={0.85}
                              >
                                <Image
                                  style={style.img}
                                  source={require('../../assets/image/images.png')}
                                />
                                <Text style={style.google}>Google</Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={style.footer2}
                                activeOpacity={0.85}
                              >
                                <Image
                                  style={style.img}
                                  source={require('../../assets/image/iphone.png')}
                                />
                                <Text style={style.google}>Apple</Text>
                              </TouchableOpacity>
                            </View>
                          </>
                        )}
                      </Formik>

                      <ErrorModal
                        visible={errorModal}
                        onClose={() => setErrorModal(false)}
                        errorMessage={errorMessage}
                        text="Login Failed!"
                        setErrorMessage={setErrorMessage}
                        icon="error-outline"
                      />
                    </View>
                  )}

                  {/* SIGN UP TAB */}
                  {activeTab === 2 && (
                    <View style={style.inputContainer}>
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
                          touched,
                          errors,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                        }) => (
                          <View
                            style={{
                              borderRadius: sizeHelper.calHp(100),
                            }}
                          >
                            <AuthTextField
                              label="Full Name"
                              icon="person-outline"
                              value={values.userName}
                              onChangeText={handleChange('userName')}
                              onBlur={handleBlur('userName')}
                              style={style.input}
                              placeholder="Enter Your User Name"
                              usernameStyle={textFieldStyles.usernameStyle}
                              iconDesign={textFieldStyles.iconDesign}
                              inputStyle={textFieldStyles.inputStyle}
                            />

                            {touched.userName && errors.userName && (
                              <Text style={style.errors}>
                                {errors.userName}
                              </Text>
                            )}

                            <AuthTextField
                              label="Email"
                              icon="email"
                              value={values.email}
                              onChangeText={handleChange('email')}
                              onBlur={handleBlur('email')}
                              style={style.input}
                              placeholder="Enter Your Email"
                              usernameStyle={textFieldStyles.usernameStyle}
                              iconDesign={textFieldStyles.iconDesign}
                              inputStyle={textFieldStyles.inputStyle}
                            />

                            {touched.email && errors.email && (
                              <Text style={style.errors}>{errors.email}</Text>
                            )}

                            <AuthTextField
                              label="Phone Number"
                              style={style.input}
                              icon="phone"
                              value={values.phoneNumber}
                              onChangeText={handleChange('phoneNumber')}
                              onBlur={handleBlur('phoneNumber')}
                              placeholder="Enter Your Phone Number"
                              keyboardType="phone-pad"
                              usernameStyle={textFieldStyles.usernameStyle}
                              iconDesign={textFieldStyles.iconDesign}
                              inputStyle={textFieldStyles.inputStyle}
                            />

                            {touched.phoneNumber && errors.phoneNumber && (
                              <Text style={style.errors}>
                                {errors.phoneNumber}
                              </Text>
                            )}
                            <View style={style.moduleContainer}>
                              <Text style={style.moduleLabel}>
                                Select Module
                              </Text>

                              <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                  setModuleDropdown(!moduleDropdown)
                                }
                                style={style.dropdownButton}
                              >
                                <View style={[style.iconCircle]}>
                                  <Icon
                                    name={'account-balance-wallet'}
                                    size={sizeHelper.calHp(32)}
                                    color={colors.primaryGradientStart}
                                  />
                                </View>
                                <Text
                                  style={[
                                    style.dropdownText,
                                    !selectedModule && style.placeholderText,
                                  ]}
                                >
                                  {selectedModule || 'Select Self or Business'}
                                </Text>
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-end',
                                  }}
                                >
                                  <Icon
                                    name={
                                      moduleDropdown
                                        ? 'keyboard-arrow-up'
                                        : 'keyboard-arrow-down'
                                    }
                                    size={sizeHelper.calHp(60)}
                                    color="#555"
                                  />
                                </View>
                              </TouchableOpacity>

                              {moduleDropdown && (
                                <View style={style.dropdownOptions}>
                                  {['Self Expense', 'Business Expense'].map(
                                    item => (
                                      <TouchableOpacity
                                        key={item}
                                        activeOpacity={0.7}
                                        onPress={() => {
                                          myModule(item);
                                          setModuleDropdown(false);
                                        }}
                                        style={style.dropdownItem}
                                      >
                                        <Text style={style.dropdownItemText}>
                                          {item}
                                        </Text>

                                        {selectedModule === item && (
                                          <Icon
                                            name="check"
                                            size={sizeHelper.calHp(50)}
                                            color="#F4B13A"
                                          />
                                        )}
                                      </TouchableOpacity>
                                    ),
                                  )}
                                </View>
                              )}
                            </View>
                            <AuthTextField
                              label="Enter Budget Salary"
                              style={style.input}
                              icon="phone"
                              value={values.salary}
                              onChangeText={handleChange('salary')}
                              onBlur={handleBlur('salary')}
                              placeholder="Enter Your Budget Salary"
                              keyboardType="phone-pad"
                              usernameStyle={textFieldStyles.usernameStyle}
                              iconDesign={textFieldStyles.iconDesign}
                              inputStyle={textFieldStyles.inputStyle}
                              maxLength={7}
                            />

                            {touched.salary && errors.salary && (
                              <Text style={style.errors}>{errors.salary}</Text>
                            )}

                            {/* PASSWORD */}
                            <View style={style.passwordWrapper}>
                              <AuthTextField
                                style={style.input}
                                label="Password"
                                icon="lock"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                placeholder="Enter Your Password"
                                secureTextEntry={!visible1}
                                usernameStyle={textFieldStyles.usernameStyle}
                                iconDesign={textFieldStyles.iconDesign}
                                inputStyle={textFieldStyles.inputStyle}
                              />

                              <TouchableOpacity
                                onPress={() => setVisible1(!visible1)}
                                style={style.passwordIcon}
                              >
                                <Icon
                                  name={
                                    visible1 ? 'visibility' : 'visibility-off'
                                  }
                                  size={sizeHelper.calHp(40)}
                                  color="#171717a9"
                                />
                              </TouchableOpacity>
                            </View>

                            {touched.password && errors.password && (
                              <Text style={style.errors}>
                                {errors.password}
                              </Text>
                            )}

                            {/* CONFIRM PASSWORD */}
                            <View style={style.passwordWrapper}>
                              <AuthTextField
                                style={style.input}
                                label="Confirm Password"
                                icon="lock"
                                value={values.confirmPassword}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                placeholder="Confirm Your Password"
                                secureTextEntry={!visible2}
                                usernameStyle={textFieldStyles.usernameStyle}
                                iconDesign={textFieldStyles.iconDesign}
                                inputStyle={textFieldStyles.inputStyle}
                              />

                              <TouchableOpacity
                                onPress={() => setVisible2(!visible2)}
                                style={style.passwordIcon}
                              >
                                <Icon
                                  name={
                                    visible2 ? 'visibility' : 'visibility-off'
                                  }
                                  size={sizeHelper.calHp(40)}
                                  color="#171717a9"
                                />
                              </TouchableOpacity>
                            </View>

                            {touched.confirmPassword &&
                              errors.confirmPassword && (
                                <Text style={style.errors}>
                                  {errors.confirmPassword}
                                </Text>
                              )}

                            <TouchableOpacity
                              onPress={handleSubmit}
                              activeOpacity={0.9}
                            >
                              <LinearGradient
                                colors={[
                                  colors.primaryGradientStart,
                                  colors.primaryGradientEnd,
                                ]}
                                style={style.optionSelected}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                              >
                                {loading1 ? (
                                  <ActivityIndicator
                                    color={colors.white}
                                    size="small"
                                  />
                                ) : (
                                  <Text style={style.loginText}>Sign Up</Text>
                                )}
                              </LinearGradient>
                            </TouchableOpacity>

                            <View style={style.footer}>
                              <View style={style.line1} />
                              <Text style={style.continueText}>
                                Or continue with
                              </Text>
                              <View style={style.line2} />
                            </View>

                            <View style={style.footerCon}>
                              <TouchableOpacity
                                style={style.footer2}
                                activeOpacity={0.85}
                              >
                                <Image
                                  style={style.img}
                                  source={require('../../assets/image/images.png')}
                                />
                                <Text style={style.google}>Google</Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={style.footer2}
                                activeOpacity={0.85}
                              >
                                <Image
                                  style={style.img}
                                  source={require('../../assets/image/iphone.png')}
                                />
                                <Text style={style.google}>Apple</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )}
                      </Formik>
                      <ErrorModal
                        visible={signupErrorModal}
                        onClose={() => setSignupErrorModal(false)}
                        errorMessage={signupErrorMessage}
                        text="Signup Failed!"
                        setErrorMessage={setSignupErrorMessage}
                        icon="error-outline"
                      />
                    </View>
                  )}
                </ScrollView>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </TouchableNativeFeedback>
    </KeyboardAvoidingView>
  );
};

export default Design;
