import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';

import LeadgerHeader from '../../components/LeadgerHeader';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import { AppText, Button, Card, TextField } from '../../ui';
import styles from './style';
import { t } from '../../i18n';

const validationSchema = Yup.object({
  currentPassword: Yup.string().required(() => t('password.currentRequired')),
  newPassword: Yup.string()
    .required(() => t('password.newRequired'))
    .min(6, () => t('password.min')),
  confirmNewPassword: Yup.string()
    .required(() => t('password.confirmRequired'))
    .oneOf([Yup.ref('newPassword')], () => t('password.match')),
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
      title={t('password.title')}
      subTitle={t('password.subtitle')}
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
                {t('password.rule')}
              </AppText>
              <TextField
                inset={false}
                password
                label={t('password.current')}
                icon="lock-outline"
                placeholder={t('password.currentPlaceholder')}
                value={values.currentPassword}
                onChangeText={handleChange('currentPassword')}
                onBlur={handleBlur('currentPassword')}
                error={fieldError(touched, errors, 'currentPassword')}
              />
              <TextField
                inset={false}
                password
                label={t('password.new')}
                icon="lock-reset"
                placeholder={t('password.newPlaceholder')}
                value={values.newPassword}
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                error={fieldError(touched, errors, 'newPassword')}
              />
              <TextField
                inset={false}
                password
                label={t('password.confirm')}
                icon="lock-reset"
                placeholder={t('password.confirmPlaceholder')}
                value={values.confirmNewPassword}
                onChangeText={handleChange('confirmNewPassword')}
                onBlur={handleBlur('confirmNewPassword')}
                error={fieldError(touched, errors, 'confirmNewPassword')}
              />
            </Card>
            <Button
              title={t('password.title')}
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
