import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import colors1 from '../../../theme/myColors';
import DropdownStylishBtn from '../../../components/DropdownStylishBtn';
import sizeHelper from '../../../helpers/sizeHelper';
import Loader from '../../../components/Loader';
import ImagePhotoOpen from '../../../components/ImagePhotoOpen';

const Design = ({
  navigation,
  profileData,
  profileImage,
  profileRecord,
  loading,
  personalDetail,
  accessToken,
  photoOpenModal,
  setphotoOpenModal,
  imageVersion,
}) => {
  return (
    <View style={styles.container}>
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={false}
        showBack={true}
        showPlus={false}
        title="Personal Details"
        subTitle="View your personal information"
        back={() => navigation.goBack()}
      />
      <Loader visible={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Image */}
        <View style={styles.profileSection}>
          <TouchableOpacity
            onPress={() => setphotoOpenModal(true)}
            style={styles.avatar}
          >
            {personalDetail?.HasImage && personalDetail?.ImageUrl ? (
              <Image
                style={styles.profileImage}
                source={{
                  uri: `https://api.app.shopmate.squarecod.com${personalDetail?.ImageUrl}?v=${imageVersion}`,
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }}
              />
            ) : (
              <Icon
                name="person"
                size={sizeHelper.calHp(205)}
                color="#68452A"
              />
            )}
          </TouchableOpacity>

          <Text style={styles.profileText}>Personal Information</Text>
        </View>

        {/* Personal Details */}
        <View style={styles.detailCard}>
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}>
              <Icon
                name="person"
                size={sizeHelper.calHp(55)}
                color={colors1.text}
              />
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Full Name</Text>
              <Text style={styles.detailValue}>
                {personalDetail?.FullName || 'N/A'}
              </Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailIcon}>
              <Icon
                name="email"
                size={sizeHelper.calHp(55)}
                color={colors1.text}
              />
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Email Address</Text>
              <Text style={styles.detailValue}>
                {personalDetail?.Email || 'N/A'}
              </Text>
            </View>
          </View>

          <View style={[styles.detailItem, styles.lastItem]}>
            <View style={styles.detailIcon}>
              <Icon
                name="phone"
                size={sizeHelper.calHp(55)}
                color={colors1.text}
              />
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Phone Number</Text>
              <Text style={styles.detailValue}>
                {personalDetail?.PhoneNumber || 'N/A'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <ImagePhotoOpen
        visible={photoOpenModal}
        imageUri={`https://api.app.shopmate.squarecod.com${personalDetail?.ImageUrl}?v=${imageVersion}`}
        onClose={() => setphotoOpenModal(false)}
      />
    </View>
  );
};

export default Design;
