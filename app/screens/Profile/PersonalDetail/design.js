import React from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './style';
import DropdownStylishBtn from '../../../components/DropdownStylishBtn';
import Loader from '../../../components/Loader';
import ImagePhotoOpen from '../../../components/ImagePhotoOpen';
import { useTheme } from '../../../theme';
import { AppText, Card } from '../../../ui';

const API_BASE = 'https://api.app.shopmate.squarecod.com';

const DetailRow = ({ icon, label, value, last }) => {
  const { colors, sizes } = useTheme();
  return (
    <View style={[styles.row, !last && styles.rowDivider]}>
      <View style={styles.rowIcon}>
        <Icon name={icon} size={sizes.icon.md} color={colors.primary} />
      </View>
      <View style={styles.rowContent}>
        <AppText variant="caption" color="textSecondary">
          {label}
        </AppText>
        <AppText variant="bodyStrong" numberOfLines={1}>
          {value || 'Not added'}
        </AppText>
      </View>
    </View>
  );
};

const Design = ({
  navigation,
  loading,
  personalDetail,
  accessToken,
  photoOpenModal,
  setphotoOpenModal,
  imageVersion,
}) => {
  const { colors } = useTheme();
  const hasImage = personalDetail?.HasImage && personalDetail?.ImageUrl;
  const imageUri = `${API_BASE}${personalDetail?.ImageUrl}?v=${imageVersion}`;

  return (
    <View style={styles.container}>
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={false}
        showBack
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
        <View style={styles.profileSection}>
          <Pressable
            onPress={() => hasImage && setphotoOpenModal(true)}
            style={styles.avatar}
            accessibilityRole="imagebutton"
            accessibilityLabel="Profile photo"
          >
            {hasImage ? (
              <Image
                style={styles.profileImage}
                source={{
                  uri: imageUri,
                  headers: { Authorization: `Bearer ${accessToken}` },
                }}
              />
            ) : (
              <Icon name="person" size={64} color={colors.primary} />
            )}
          </Pressable>
          <AppText variant="h2" style={styles.name} numberOfLines={1}>
            {personalDetail?.FullName || 'Personal information'}
          </AppText>
        </View>

        <Card padding="none">
          <DetailRow
            icon="person-outline"
            label="Full name"
            value={personalDetail?.FullName}
          />
          <DetailRow
            icon="mail-outline"
            label="Email address"
            value={personalDetail?.Email}
          />
          <DetailRow
            icon="phone-iphone"
            label="Phone number"
            value={personalDetail?.PhoneNumber}
            last
          />
        </Card>
      </ScrollView>
      <ImagePhotoOpen
        visible={photoOpenModal}
        imageUri={imageUri}
        onClose={() => setphotoOpenModal(false)}
      />
    </View>
  );
};

export default Design;
