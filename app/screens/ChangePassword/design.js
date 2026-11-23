import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';

import LeadgerHeader from '../../components/LeadgerHeader';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import { AppText, Button, Card, TextField } from '../../ui';
import styles from './style';

const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmNewPassword: Yup.string()
    .required('Confirm new password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});

const fieldError = (touched, errors, name) =>
  touched[name] && errors[name] ? errors[name] : undefined;

const Design = ({ navigation, handlePassword, loading }) => (
  <View style={styles.root}>
    <DropdownStylishBtn
      navigation={navigation}
      showDropdown={false}
      showBack
      showPlus={false}
      title="Change Password"
      subTitle="Update your account password"
      back={() => navigation.goBack()}
    />
    <LeadgerHeader gaping={false} btn={false} navigation={navigation} />

    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        onSubmit={handlePassword}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.content}
          >
            <Card padding="lg">
              <AppText
                variant="caption"
                color="textSecondary"
                style={styles.intro}
              >
                Your new password must be at least 6 characters.
              </AppText>
              <TextField
                inset={false}
                password
                label="Current password"
                icon="lock-outline"
                placeholder="Enter your current password"
                value={values.currentPassword}
                onChangeText={handleChange('currentPassword')}
                onBlur={handleBlur('currentPassword')}
                error={fieldError(touched, errors, 'currentPassword')}
              />
              <TextField
                inset={false}
                password
                label="New password"
                icon="lock-reset"
                placeholder="Enter a new password"
                value={values.newPassword}
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                error={fieldError(touched, errors, 'newPassword')}
              />
              <TextField
                inset={false}
                password
                label="Confirm new password"
                icon="lock-reset"
                placeholder="Re-enter the new password"
                value={values.confirmNewPassword}
                onChangeText={handleChange('confirmNewPassword')}
                onBlur={handleBlur('confirmNewPassword')}
                error={fieldError(touched, errors, 'confirmNewPassword')}
              />
            </Card>
            <Button
              title="Change password"
              icon="check-circle-outline"
              onPress={handleSubmit}
              loading={loading}
              style={styles.submit}
            />
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  </View>
);

export default Design;
