import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Design from '../PersonalDetail/design';
import { useState, useEffect } from 'react';
import { profileData } from '../../../api/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalDetailScreen = ({ navigation, route }) => {
  const personalDetail = route?.params.profileRecordGet;
  const galleryFun = route.params.pickFromGallery;
  console.log('My Gallery Fun', galleryFun);
  const imageVersion = route?.params?.imageVersion;
  // console.log('Profile Record Id', personalDetail);
  const [profileRecord, setProfileRecord] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [photoOpenModal, setphotoOpenModal] = useState(false);

  const handleProfileData = async () => {
    try {
      // setLoading(true);
      const response = await profileData();
      const data = await response.json();
      setProfileRecord(data?.obj.data[0]);
      console.log('Profile Api Resposne', data);
    } catch (error) {
      console.log('handle profile error', error);
    } finally {
      // setLoading(false);
    }
  };
  console.log(' personal Profile Image', personalDetail?.ImageUrl);
  useEffect(() => {
    const handleData = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token);
      handleProfileData();
    };
    handleData();
  }, []);
  return (
    <View>
      <Design
        navigation={navigation}
        personalDetail={personalDetail}
        accessToken={accessToken}
        photoOpenModal={photoOpenModal}
        setphotoOpenModal={setphotoOpenModal}
        imageVersion={imageVersion}
      />
    </View>
  );
};

export default PersonalDetailScreen;
