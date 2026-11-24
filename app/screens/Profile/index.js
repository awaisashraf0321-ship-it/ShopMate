import { StyleSheet, Text, View } from 'react-native';
import Design from './design';
import { useState, useEffect, useCallback } from 'react';
import Modal from 'react-native-modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logout } from '../../api/AuthApi';
import { profileImage, profileData } from '../../api/Profile';
import { handleDataUpdate } from '../../api/Profile';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [photoOpenModal, setphotoOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profileRecord, setProfileRecord] = useState([]);
  const [profileRecordGet, setProfileRecordGet] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [imageVersion, setImageVersion] = useState(0);

  // useEffect(() => {
  //   const galleryImageSave = async () => {
  //     const save = await AsyncStorage.getItem('galleryImage');
  //     if (save) {
  //       setImageUri(save);
  //     }
  //   };
  //   galleryImageSave();
  // }, []);
  // useEffect(() => {
  //   const cameraSaveFun = async () => {
  //     const save = await AsyncStorage.getItem('cameraPhoto');
  //     if (save) {
  //       setImageUri(save);
  //     }
  //   };
  //   cameraSaveFun();
  // }, []);

  const ModalOpen = () => {
    setLogoutModal(true);
  };
  const handleLogout = async () => {
    try {
      const response = await Logout();
      const data = await response.json();
      console.log('Logout response', data);

      if (response.ok) {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        navigation.replace('Auth');
      } else {
        console.log('Logout Failed', data);
      }
    } catch (error) {
      console.log('Logout error', error.message);
    }
  };

  const handleProfileData = async () => {
    try {
      const response = await profileData();
      const data = await response.json();

      console.log('All Users:', data);

      const user = data?.obj?.data?.[0];

      setProfileRecord(user);

      if (user?.UserId) {
        await handlePersonalDetail(user.UserId);
      }
    } catch (error) {
      console.log('Get Profile API Error:', error);
    }
  };

  const handlePersonalDetail = async userId => {
    try {
      if (!userId) {
        console.log('UserId not found');
        return;
      }

      console.log('Sending UserId:', userId);

      const response = await handleDataUpdate(userId);
      const data = await response.json();

      console.log('Personal Detail Response:', data);

      if (response.ok) {
        setProfileRecordGet(data?.obj);
      } else {
        console.log('Personal Detail API Error:', data);
      }
    } catch (error) {
      console.log('Personal Detail Error:', error);
    }
  };
  // console.log('NEW PROFILE IMAGE:', result.obj.ImageUrl);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);

        try {
          const token = await AsyncStorage.getItem('accessToken');
          setAccessToken(token);

          await handleProfileData();

          setImageVersion(imageVersion);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []),
  );

  return (
    <View>
      <Design
        logoutModal={logoutModal}
        setLogoutModal={setLogoutModal}
        imageUri={imageUri}
        setImageUri={setImageUri}
        navigation={navigation}
        showPhotoModal={showPhotoModal}
        setShowPhotoModal={setShowPhotoModal}
        ModalOpen={ModalOpen}
        handleLogout={handleLogout}
        photoOpenModal={photoOpenModal}
        setPhotoOpenModal={setphotoOpenModal}
        loader={loader}
        profileRecord={profileRecord}
        loading={loading}
        profileRecordGet={profileRecordGet}
        accessToken={accessToken}
        imageVersion={imageVersion}
        setImageVersion={setImageVersion}
      />
    </View>
  );
};

export default ProfileScreen;
