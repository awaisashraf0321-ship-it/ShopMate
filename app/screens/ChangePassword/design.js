import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import LeadgerHeader from '../../components/LeadgerHeader';
import styles from '../ChangePassword/style';
import AuthTextField from '../../components/AuthTextField';
import sizeHelper from '../../helpers/sizeHelper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as Yup from 'yup';
import { Formik } from 'formik';
import colors from '../../theme/colors';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
const Design = ({
  navigation,
  handlePassword,
  loading,
  setLoading,
  visible,
  setVisible,
  visible1,
  setVisible1,
  visible2,
  setVisible2,
}) => {
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
  const handleValidation = Yup.object({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmNewPassword: Yup.string()
      .required('Confirm new password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
    >
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={false}
        showBack={true}
        showPlus={false}
        title="Change Password"
        subTitle="Update your account password"
        back={() => navigation.goBack()}
      />
      <LeadgerHeader gaping={false} btn={false} navigation={navigation} />
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        onSubmit={handlePassword}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={handleValidation}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={styles.passwordWrapper}>
                <AuthTextField
                  style={styles.input}
                  label={'Current Password'}
                  icon={'lock-outline'}
                  value={values.currentPassword}
                  onChangeText={handleChange('currentPassword')}
                  onBlur={handleBlur('currentPassword')}
                  secureTextEntry={!visible}
                  placeholder="Enter Your Current Password"
                  usernameStyle={textFieldStyles.usernameStyle}
                  iconDesign={textFieldStyles.iconDesign}
                  inputStyle={textFieldStyles.inputStyle}
                />
                <TouchableOpacity
                  onPress={() => setVisible(!visible)}
                  style={styles.passwordIcon1}
                >
                  <Icon
                    name={visible ? 'visibility' : 'visibility-off'}
                    size={sizeHelper.calHp(40)}
                    color="#171717a9"
                  />
                </TouchableOpacity>
              </View>

              {touched.currentPassword && errors.currentPassword && (
                <Text style={styles.errors}>{errors.currentPassword}</Text>
              )}
              <View style={styles.passwordWrapper}>
                <AuthTextField
                  style={styles.input}
                  label={'New Password'}
                  icon={'lock-outline'}
                  value={values.newPassword}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  secureTextEntry={!visible1}
                  placeholder="Enter Your New Password"
                  usernameStyle={textFieldStyles.usernameStyle}
                  iconDesign={textFieldStyles.iconDesign}
                  inputStyle={textFieldStyles.inputStyle}
                />
                <TouchableOpacity
                  onPress={() => setVisible1(!visible1)}
                  style={styles.passwordIcon}
                >
                  <Icon
                    name={visible1 ? 'visibility' : 'visibility-off'}
                    size={sizeHelper.calHp(40)}
                    color={colors.dark}
                  />
                </TouchableOpacity>
              </View>

              {touched.newPassword && errors.newPassword && (
                <Text style={styles.errors}>{errors.newPassword}</Text>
              )}
              <View style={styles.passwordWrapper}>
                <AuthTextField
                  style={styles.input}
                  label={'Confirm New Password'}
                  icon={'lock-outline'}
                  value={values.confirmNewPassword}
                  onChangeText={handleChange('confirmNewPassword')}
                  onBlur={handleBlur('confirmNewPassword')}
                  secureTextEntry={!visible2}
                  placeholder="Enter Your Confirm New Password"
                  usernameStyle={textFieldStyles.usernameStyle}
                  iconDesign={textFieldStyles.iconDesign}
                  inputStyle={textFieldStyles.inputStyle}
                />
                <TouchableOpacity
                  onPress={() => setVisible2(!visible2)}
                  style={styles.passwordIcon2}
                >
                  <Icon
                    name={visible2 ? 'visibility' : 'visibility-off'}
                    size={sizeHelper.calHp(40)}
                    color="#171717a9"
                  />
                </TouchableOpacity>
              </View>

              {touched.confirmNewPassword && errors.confirmNewPassword && (
                <Text style={styles.errors}>{errors.confirmNewPassword}</Text>
              )}
              <View style={styles.btnCon}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  {loading ? (
                    <ActivityIndicator color={colors.white} size={'small'} />
                  ) : (
                    <Text style={styles.buttonText}>Change Password</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default Design;
