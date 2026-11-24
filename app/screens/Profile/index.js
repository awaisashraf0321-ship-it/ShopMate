import { StyleSheet, View } from 'react-native';
import Design from './design';
import { useEffect, useState } from 'react';
import { getLoginMethod } from '../../helpers/session';
import { useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logout } from '../../api/AuthApi';
import { useProfile, useRefreshOnFocus } from '../../hooks/queries';

const ProfileScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [photoOpenModal, setphotoOpenModal] = useState(false);
  const [loader] = useState(false);
  const [imageVersion, setImageVersion] = useState(0);
  const queryClient = useQueryClient();
  // PIN accounts change their PIN; others change their password.
  const [isPinAccount, setIsPinAccount] = useState(false);
  useEffect(() => {
    getLoginMethod().then(method => setIsPinAccount(method === 'pin'));
  }, []);

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
        // Drop cached data so the next user never sees this account's data.
        queryClient.clear();
        navigation.replace('Auth');
      } else {
        console.log('Logout Failed', data);
      }
    } catch (error) {
      console.log('Logout error', error.message);
    }
  };

  const { data: profile, isLoading: loading, refetch } = useProfile();
  useRefreshOnFocus(refetch);

  const profileRecord = profile?.user ?? [];
  const profileRecordGet = profile?.details ?? [];
  const accessToken = profile?.accessToken ?? null;

  return (
    <View style={styles.root}>
      <Design
        isPinAccount={isPinAccount}
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

const styles = StyleSheet.create({ root: { flex: 1 } });
