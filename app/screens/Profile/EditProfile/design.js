import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Formik } from 'formik';
import * as Yup from 'yup';

import styles from './style';
import DropdownStylishBtn from '../../../components/DropdownStylishBtn';
import PhotoModal from '../../../components/PhotoModal';
import ImagePhotoOpen from '../../../components/ImagePhotoOpen';
import Loader from '../../../components/Loader';
import { useTheme } from '../../../theme';
import { Button, Card, TextField } from '../../../ui';

const API_BASE = 'https://api.app.shopmate.squarecod.com';

const editScheme = Yup.object({
  userName: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^03[0-9]{9}$/, 'Enter a valid phone number')
    .required('Phone number is required'),
});

const fieldError = (touched, errors, name) =>
  touched[name] && errors[name] ? errors[name] : undefined;

const Design = ({
  navigation,
  profileData,
  scrollRef,
  pickFromGallery,
  openCamera,
  showPhotoModal,
  setShowPhotoModal,
  UpdatingData,
  imageUri,
  loading,
  photoOpenModal,
  setphotoOpenModal,
  onDelete,
  imageVersion,
  accessToken,
}) => {
  const { colors, sizes } = useTheme();

  // A freshly picked local photo wins over the saved one on the server.
  const serverUri =
    profileData?.HasImage && profileData?.ImageUrl
      ? `${API_BASE}${profileData.ImageUrl}?v=${imageVersion}`
      : null;
  const avatarSource = imageUri
    ? { uri: imageUri }
    : serverUri
    ? { uri: serverUri, headers: { Authorization: `Bearer ${accessToken}` } }
    : null;

  const scrollToEnd = () =>
    setTimeout(() => scrollRef?.current?.scrollToEnd({ animated: true }), 100);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Loader visible={loading} />
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={false}
        showBack
        showPlus={false}
        title="Edit Profile"
        subTitle="Update your personal information"
        back={() => navigation.goBack()}
      />
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileSection}>
          <View>
            <Pressable
              onPress={() => avatarSource && setphotoOpenModal(true)}
              style={styles.avatar}
              accessibilityRole="imagebutton"
              accessibilityLabel="View profile photo"
            >
              {avatarSource ? (
                <Image
                  source={avatarSource}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              ) : (
                <Icon name="person" size={64} color={colors.primary} />
              )}
            </Pressable>
            <Pressable
              style={styles.cameraButton}
              onPress={() => setShowPhotoModal(true)}
              accessibilityRole="button"
              accessibilityLabel="Change photo"
              hitSlop={8}
            >
              <Icon
                name="photo-camera"
                size={sizes.icon.md}
                color={colors.onPrimary}
              />
            </Pressable>
          </View>
          <Button
            title="Change photo"
            icon="image"
            variant="ghost"
            size="sm"
            fullWidth={false}
            onPress={() => setShowPhotoModal(true)}
            style={styles.changePhoto}
          />
        </View>

        <Formik
          initialValues={{
            userName: profileData?.FullName || '',
            email: profileData?.Email || '',
            phoneNumber: profileData?.PhoneNumber || '',
          }}
          validationSchema={editScheme}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={UpdatingData}
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
              <Card padding="lg">
                <TextField
                  inset={false}
                  label="Full name"
                  icon="person-outline"
                  placeholder="Enter full name"
                  autoCapitalize="words"
                  value={values.userName}
                  onChangeText={handleChange('userName')}
                  onBlur={handleBlur('userName')}
                  error={fieldError(touched, errors, 'userName')}
                />
                <TextField
                  inset={false}
                  label="Email address"
                  icon="mail-outline"
                  placeholder="you@example.com"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  onFocus={scrollToEnd}
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
                  onFocus={scrollToEnd}
                  error={fieldError(touched, errors, 'phoneNumber')}
                />
              </Card>
              <Button
                title="Save changes"
                icon="check-circle-outline"
                onPress={handleSubmit}
                style={styles.save}
              />
            </>
          )}
        </Formik>
      </ScrollView>

      <PhotoModal
        visible={showPhotoModal}
        onDelete={onDelete}
        onClose={() => setShowPhotoModal(false)}
        onGallery={() => {
          setShowPhotoModal(false);
          pickFromGallery();
        }}
        onCamera={() => {
          setShowPhotoModal(false);
          openCamera();
        }}
      />
      <ImagePhotoOpen
        visible={photoOpenModal}
        accessToken={accessToken}
        imageUri={imageUri || serverUri}
        onClose={() => setphotoOpenModal(false)}
      />
    </KeyboardAvoidingView>
  );
};

export default Design;
