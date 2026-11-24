import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../EditProfile/style';
import colors1 from '../../../theme/myColors';
import DropdownStylishBtn from '../../../components/DropdownStylishBtn';
import sizeHelper from '../../../helpers/sizeHelper';
import { Formik } from 'formik';
import PhotoModal from '../../../components/PhotoModal';
import ImagePhotoOpen from '../../../components/ImagePhotoOpen';

import * as Yup from 'yup';
import { handleDataUpdate } from '../../../api/Profile';
import Loader from '../../../components/Loader';

const editScheme = Yup.object({
  userName: Yup.string().required('Name is required'),

  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),

  phoneNumber: Yup.string()
    .matches(/^03[0-9]{9}$/, 'Enter a valid phone number')
    .required('Phone number is required'),
});

const Design = ({
  onBack,
  onSave,
  onChangePhoto,
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
  const initialValues = {
    userName: profileData?.FullName || '',
    email: profileData?.Email || '',
    phoneNumber: profileData?.PhoneNumber || '',
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      style={styles.container}
    >
      <Loader visible={loading} />
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <DropdownStylishBtn
          navigation={navigation}
          showDropdown={false}
          showBack={true}
          showPlus={false}
          title="Edit Profile"
          subTitle="Update your personal information."
          back={() => navigation.goBack()}
        />

        {/* Profile Image */}

        <View style={styles.profileSection}>
          {imageUri ? (
            <View style={styles.avatarContainer}>
              <TouchableOpacity
                onPress={() => setphotoOpenModal(true)}
                style={styles.avatar}
              >
                <Image
                  source={{ uri: imageUri }}
                  style={{
                    width: sizeHelper.calHp(320),
                    height: sizeHelper.calHp(320),
                    borderRadius: sizeHelper.calHp(200),
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => setShowPhotoModal(true)}
              >
                <Icon
                  name="camera-alt"
                  size={sizeHelper.calHp(47)}
                  color={colors1.text}
                />
              </TouchableOpacity>
            </View>
          ) : profileData?.HasImage && profileData?.ImageUrl ? (
            <View style={styles.avatarContainer}>
              <TouchableOpacity
                onPress={() => setphotoOpenModal(true)}
                style={styles.avatar}
              >
                <Image
                  source={{
                    uri: `https://api.app.shopmate.squarecod.com${profileData?.ImageUrl}?v=${imageVersion}`,
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }}
                  style={{
                    width: sizeHelper.calHp(320),
                    height: sizeHelper.calHp(320),
                    borderRadius: sizeHelper.calHp(200),
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => setShowPhotoModal(true)}
              >
                <Icon
                  name="camera-alt"
                  size={sizeHelper.calHp(47)}
                  color={colors1.text}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Icon
                  name="person"
                  size={sizeHelper.calHp(205)}
                  color="#68452A"
                />
              </View>

              <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => setShowPhotoModal(true)}
              >
                <Icon
                  name="camera-alt"
                  size={sizeHelper.calHp(47)}
                  color={colors1.text}
                />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={() => setShowPhotoModal(true)}
          >
            <Icon name="image" size={26} color={colors1.text} />
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Formik */}
        <Formik
          initialValues={initialValues}
          validationSchema={editScheme}
          enableReinitialize={true}
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
            <View>
              {/* Full Name */}
              <View style={styles.inputCard}>
                <View style={styles.inputIcon}>
                  <Icon
                    name="person"
                    size={sizeHelper.calHp(63)}
                    color={colors1.text}
                  />
                </View>

                <View style={styles.inputContent}>
                  <Text style={styles.inputLabel}>Full Name</Text>

                  <TextInput
                    value={values.userName}
                    onChangeText={handleChange('userName')}
                    onBlur={handleBlur('userName')}
                    style={styles.input}
                    placeholder="Enter full name"
                  />
                </View>
              </View>
              {touched.userName && errors.userName && (
                <Text style={styles.errors}>{errors.userName}</Text>
              )}
              {/* Email */}
              <View style={styles.inputCard}>
                <View style={styles.inputIcon}>
                  <Icon
                    name="email"
                    size={sizeHelper.calHp(63)}
                    color={colors1.text}
                  />
                </View>

                <View style={styles.inputContent}>
                  <Text style={styles.inputLabel}>Email Address</Text>

                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    style={styles.input}
                    onFocus={() =>
                      setTimeout(() => {
                        scrollRef?.current.scrollToEnd({
                          animated: true,
                        });
                      }, 100)
                    }
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
              {touched.email && errors.email && (
                <Text style={styles.errors}>{errors.email}</Text>
              )}

              {/* Phone Number */}
              <View style={styles.inputCard}>
                <View style={styles.inputIcon}>
                  <Icon
                    name="phone"
                    size={sizeHelper.calHp(63)}
                    color={colors1.text}
                  />
                </View>

                <View style={styles.inputContent}>
                  <Text style={styles.inputLabel}>Phone Number</Text>

                  <TextInput
                    value={values.phoneNumber}
                    onChangeText={handleChange('phoneNumber')}
                    // onBlur={handleBlur('phoneNumber')}
                    style={styles.input}
                    onFocus={() =>
                      setTimeout(() => {
                        scrollRef?.current.scrollToEnd({
                          animated: true,
                        });
                      }, 100)
                    }
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.errors}>{errors.phoneNumber}</Text>
              )}

              {/* Save Button */}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSubmit}
                activeOpacity={0.8}
              >
                <Icon
                  name="save"
                  size={sizeHelper.calHp(55)}
                  color={colors1.text}
                />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
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
      {imageUri ? (
        <ImagePhotoOpen
          visible={photoOpenModal}
          imageUri={imageUri}
          accessToken={accessToken}
          onClose={() => setphotoOpenModal(false)}
        />
      ) : (
        <ImagePhotoOpen
          visible={photoOpenModal}
          accessToken={accessToken}
          imageUri={`https://api.app.shopmate.squarecod.com${profileData?.ImageUrl}?v=${imageVersion}`}
          onClose={() => setphotoOpenModal(false)}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default Design;
