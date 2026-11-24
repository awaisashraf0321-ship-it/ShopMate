import { screenFill } from '../../../theme';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Design from '../EditProfile/design';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { profileImage } from '../../../api/Profile';
import Toast from 'react-native-toast-message';
import { friendlyError, serverMessage } from '../../../helpers/session';
import {
  isPlaceholderEmail,
  placeholderEmail,
} from '../../../helpers/phoneAccount';
import { t } from '../../../i18n';

const EditProfileScreen = ({ navigation, route }) => {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [base64Image, setBase64Image] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoOpenModal, setphotoOpenModal] = useState(false);
  const [removeImage, setRemoveImage] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const scrollRef = useRef();
  const profileData = route?.params?.myProfile;
  const setImageVersion = route?.params?.setImageVersion;
  const imageVersion = route?.params?.imageVersion;
  console.log('imageVersion', setImageVersion);
  const userId = route?.params?.MyUserId;
  console.log('update UserId', userId?.UserId);

  const UpdatingData = async value => {
    try {
      setLoading(true);
      const myData = {
        fullName: value.userName,
        // The API needs an email: keep the account's placeholder if left empty.
        email:
          value.email?.trim() ||
          (isPlaceholderEmail(profileData?.Email)
            ? profileData.Email
            : placeholderEmail(value.phoneNumber)),
        phoneNumber: value.phoneNumber,
        image: base64Image,
        removeImage: removeImage,
      };

      const response = await profileImage(userId?.UserId, myData);

      const data = await response.json().catch(() => ({}));
      console.log('UPDATE RESPONSE:', response.status);

      console.log('Update Profile Response:', data);
      if (response.ok) {
        setImageVersion(prev => prev + 1);
        Toast.show({ type: 'success', text1: t('profile.saved') });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: t('profile.notSaved'),
          text2: serverMessage(data) || t('common.tryAgain'),
        });
      }
    } catch (error) {
      console.log('Update Profile Error:', error);
      Toast.show({
        type: 'error',
        text1: t('profile.notSaved'),
        text2: friendlyError(error),
      });
    } finally {
      setLoading(false);
    }
  };
  console.log('Sending Updating image', profileData?.ImageUrl);

  const pickFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: true,
      },
      async response => {
        if (response.didCancel) return;
        if (response.errorCode) {
          console.log(response.errorMessage);
          return;
        }
        const assets = response.assets?.[0];

        if (assets?.uri && assets?.base64) {
          setImageUri(assets.uri);
          setBase64Image(assets?.base64);
          setRemoveImage(false);
          await AsyncStorage.setItem('galleryImage', assets?.uri);
        }
      },
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token);
    };
  }, []);

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: true,
        includeBase64: true,
      },
      async response => {
        if (response.didCancel) return;

        if (response.errorCode) {
          console.log(response.errorMessage);
          return;
        }

        const assets = response.assets?.[0];
        if (assets?.uri && assets?.base64) {
          setImageUri(assets?.uri);
          setBase64Image(assets?.base64);
          setRemoveImage(false);
          await AsyncStorage.setItem('cameraPhoto', assets?.uri);
        }
      },
    );
  };
  const onDelete = () => {
    setBase64Image(null);
    setImageUri(null);
    setRemoveImage(true);
    setShowPhotoModal(false);
  };
  return (
    <View style={screenFill}>
      <Design
        navigation={navigation}
        profileData={profileData}
        scrollRef={scrollRef}
        pickFromGallery={pickFromGallery}
        openCamera={openCamera}
        showPhotoModal={showPhotoModal}
        setShowPhotoModal={setShowPhotoModal}
        UpdatingData={UpdatingData}
        imageUri={imageUri}
        photoOpenModal={photoOpenModal}
        setphotoOpenModal={setphotoOpenModal}
        loading={loading}
        onDelete={onDelete}
        imageVersion={imageVersion}
        accessToken={accessToken}
      />
    </View>
  );
};

export default EditProfileScreen;
