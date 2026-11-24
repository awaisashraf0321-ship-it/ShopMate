import React from 'react';
import {
  ActivityIndicator,
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
import LanguageChips from '../../components/LanguageChips';
import { useTheme } from '../../theme';
import {
  AppText,
  Button,
  NumberPad,
  PhoneDisplay,
  PinDots,
  TextField,
} from '../../ui';
import { formatPhone, PIN_LENGTH } from '../../helpers/phoneAccount';
import { t } from '../../i18n';

const passwordSchema = Yup.object({
  username: Yup.string().required(() => t('login.usernameRequired')),
  password: Yup.string().required(() => t('login.passwordRequired')),
});

/** Shows a Formik error only once the field has been touched. */
const fieldError = (touched, errors, name) =>
  touched[name] && errors[name] ? errors[name] : undefined;

const PhoneLogin = ({
  phoneStep,
  phone,
  phoneError,
  phoneValid,
  pin,
  pinError,
  wrongCount,
  loading,
  onDigit,
  onBackspace,
  onPhoneNext,
  onChangeNumber,
  onForgotPin,
}) => {
  const { colors, spacing, sizes } = useTheme();

  if (phoneStep === 'number') {
    return (
      <>
        <AppText variant="title" align="center">
          {t('phone.title')}
        </AppText>
        <PhoneDisplay
          phone={phone}
          error={phoneError}
          style={{ marginTop: spacing.lg }}
        />
        <NumberPad
          onDigit={onDigit}
          onBackspace={onBackspace}
          style={{ marginTop: spacing.xl }}
        />
        <Button
          title={t('common.next')}
          icon="arrow-forward"
          size="lg"
          disabled={!phoneValid}
          onPress={onPhoneNext}
          style={{ marginTop: spacing.lg }}
        />
      </>
    );
  }

  return (
    <>
      <Pressable
        onPress={onChangeNumber}
        disabled={loading}
        accessibilityRole="button"
        accessibilityLabel={`Number ${formatPhone(
          phone,
        )}. Tap to change number`}
        style={[
          style.phoneChip,
          { backgroundColor: colors.surfaceMuted, gap: spacing.sm },
        ]}
      >
        <Icon
          name="phone-iphone"
          size={sizes.icon.md}
          color={colors.textSecondary}
        />
        <AppText variant="bodyStrong">{formatPhone(phone)}</AppText>
        <AppText variant="label" color="primary">
          {t('common.change')}
        </AppText>
      </Pressable>

      <AppText
        variant="title"
        align="center"
        style={{ marginTop: spacing.lg, marginBottom: spacing.lg }}
      >
        {t('pin.type')}
      </AppText>
      <PinDots length={PIN_LENGTH} filled={pin.length} errorKey={wrongCount} />

      <View style={[style.statusLine, { marginTop: spacing.md }]}>
        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : pinError ? (
          <AppText variant="bodyStrong" color="danger" align="center">
            {pinError}
          </AppText>
        ) : null}
      </View>

      <NumberPad
        onDigit={onDigit}
        onBackspace={onBackspace}
        disabled={loading}
        style={{ marginTop: spacing.md }}
      />

      <Pressable
        onPress={onForgotPin}
        disabled={loading}
        accessibilityRole="button"
        hitSlop={8}
        style={[style.forgot, { marginTop: spacing.lg }]}
      >
        <AppText variant="bodyStrong" color="primary">
          {t('pin.forgot')}
        </AppText>
      </Pressable>
    </>
  );
};

const PasswordLogin = ({
  username,
  rememberPassword,
  setRememberPassword,
  handlePasswordLogin,
  loading,
}) => {
  const { colors, spacing } = useTheme();
  return (
    <Formik
      enableReinitialize
      initialValues={{ username, password: '' }}
      validationSchema={passwordSchema}
      onSubmit={handlePasswordLogin}
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
            label={t('login.username')}
            icon="person-outline"
            placeholder={t('login.username')}
            value={values.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            error={fieldError(touched, errors, 'username')}
          />
          <TextField
            inset={false}
            password
            label={t('login.password')}
            icon="lock-outline"
            placeholder={t('login.password')}
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
              name={rememberPassword ? 'check-box' : 'check-box-outline-blank'}
              size={22}
              color={rememberPassword ? colors.primary : colors.textMuted}
            />
            <AppText variant="body">{t('login.remember')}</AppText>
          </Pressable>
          <Button
            title={t('login.button')}
            size="lg"
            onPress={handleSubmit}
            loading={loading}
            style={{ marginTop: spacing.xl }}
          />
        </>
      )}
    </Formik>
  );
};

const Design = props => {
  const {
    mode,
    setMode,
    onCreateAccount,
    loading,
    errorModal,
    setErrorModal,
    errorMessage,
    setErrorMessage,
  } = props;
  const { colors, spacing } = useTheme();
  const isPhone = mode === 'phone';

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
              <AppText variant="h1" color="onPrimary" style={style.center}>
                {t('login.welcome')}
              </AppText>
              <AppText
                variant="body"
                color="onPrimaryMuted"
                style={[style.center, { marginTop: spacing.xs }]}
              >
                {t('login.subtitle')}
              </AppText>
              <LanguageChips onDark style={{ marginTop: spacing.lg }} />
            </SafeAreaView>
          </View>

          {/* Form sheet, pulled up over the header */}
          <View style={[style.sheet, { backgroundColor: colors.surface }]}>
            {isPhone ? <PhoneLogin {...props} /> : <PasswordLogin {...props} />}
          </View>

          {/* New users + other way to log in */}
          <View style={[style.footer, { gap: spacing.md }]}>
            <AppText variant="body" color="textSecondary" align="center">
              {t('login.new')}
            </AppText>
            <Button
              title={t('login.createAccount')}
              icon="person-add-alt"
              variant="secondary"
              size="lg"
              disabled={loading}
              onPress={onCreateAccount}
            />
            <Button
              title={isPhone ? t('login.withPassword') : t('login.withPhone')}
              variant="ghost"
              size="sm"
              disabled={loading}
              onPress={() => setMode(isPhone ? 'password' : 'phone')}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ErrorModal
        visible={errorModal}
        onClose={() => setErrorModal(false)}
        errorMessage={errorMessage}
        text={t('login.failed')}
        setErrorMessage={setErrorMessage}
        icon="error-outline"
      />
    </View>
  );
};

export default Design;
