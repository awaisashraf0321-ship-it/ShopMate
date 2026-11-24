import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LeadgerHeader from '../../components/LeadgerHeader';
import sizeHelper from '../../helpers/sizeHelper';
import styles from '../Profile/style';
import PhotoModal from '../../components/PhotoModal';
import ConfirmModal from '../../components/ConfirmModal';
import ImagePhotoOpen from '../../components/ImagePhotoOpen';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import Loader from '../../components/Loader';
import { Button } from '../../ui';
import { theme } from '../../theme';
import { isPlaceholderEmail } from '../../helpers/phoneAccount';
import LanguageChips from '../../components/LanguageChips';
import { t } from '../../i18n';

const Design = ({
  photoOpenModal,
  setPhotoOpenModal,
  showPhotoModal,
  setShowPhotoModal,
  imageUri,
  setImageUri,
  navigation,
  pickFromGallery,
  openCamera,
  ModalOpen,
  logoutModal,
  setLogoutModal,
  handleLogout,
  loader,
  loading,
  profileRecord,
  profileRecordGet,
  isPinAccount,
  accessToken,
  imageVersion,
  setImageVersion,
}) => {
  return (
    <View style={styles.container}>
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={false}
        showBack={true}
        showPlus={false}
        title={t('profile.title')}
        subTitle={t('profile.subtitle')}
        back={() => navigation.goBack()}
      />
      <LeadgerHeader gaping={false} btn={false} navigation={navigation} />

      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* ================= PROFILE CARD ================= */}
          <View style={styles.profileCard}>
            {/* Decorative blobs */}
            <View style={styles.blob1} />
            <View style={styles.blob2} />
            <View style={styles.blob3} />

            <View style={styles.profileTop}>
              <View style={styles.imageContainer}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('EditProfile', {
                      myProfile: profileRecordGet,
                      MyUserId: profileRecord,
                      imageVersion: imageVersion,
                      setImageVersion: setImageVersion,
                    })
                  }
                  style={styles.imgBorder}
                >
                  {profileRecordGet?.ImageUrl ? (
                    <Image
                      style={styles.profileImage}
                      source={{
                        uri: `https://api.app.shopmate.squarecod.com${profileRecordGet?.ImageUrl}?v=${imageVersion}`,
                        headers: {
                          Authorization: `Bearer ${accessToken}`,
                        },
                      }}
                    />
                  ) : (
                    <View style={styles.avatarFallback}>
                      <Icon
                        name="person"
                        size={64}
                        color={theme.colors.primary}
                      />
                    </View>
                  )}
                </Pressable>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditProfile', {
                      myProfile: profileRecordGet,
                      MyUserId: profileRecord,
                      imageVersion: imageVersion,
                      setImageVersion: setImageVersion,
                    })
                  }
                  style={styles.camera}
                  activeOpacity={0.8}
                >
                  <Icon
                    name="camera-alt"
                    size={sizeHelper.calHp(26)}
                    color={theme.colors.onPrimary}
                  />
                </TouchableOpacity>
              </View>
              <Loader visible={loading} />
              <View style={styles.userInfo}>
                <Text style={styles.name} numberOfLines={1}>
                  {profileRecordGet?.FullName}
                </Text>

                {profileRecordGet?.Email &&
                !isPlaceholderEmail(profileRecordGet.Email) ? (
                  <View style={styles.infoRow}>
                    <Icon
                      name="email"
                      size={sizeHelper.calHp(22)}
                      color={theme.colors.onPrimary}
                    />
                    <Text style={styles.infoText} numberOfLines={1}>
                      {profileRecordGet?.Email}
                    </Text>
                  </View>
                ) : null}

                <View style={styles.infoRow}>
                  <Icon
                    name="phone"
                    size={sizeHelper.calHp(22)}
                    color={theme.colors.onPrimary}
                  />
                  <Text style={styles.infoText} numberOfLines={1}>
                    {profileRecord?.PhoneNumber}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate('EditProfile', {
                    myProfile: profileRecordGet,
                    MyUserId: profileRecord,
                    imageVersion: imageVersion,
                    setImageVersion: setImageVersion,
                  })
                }
                activeOpacity={0.8}
              >
                <Icon
                  name="edit"
                  size={sizeHelper.calHp(20)}
                  color={theme.colors.onPrimary}
                />
                <Text style={styles.editButtonText}>{t('common.edit')}</Text>
              </TouchableOpacity>
            </View>

            {/* Account Info */}
            <View style={styles.accountInfo}>
              <View style={styles.accountItem}>
                <View style={styles.accountIcon}>
                  <Icon
                    name="person"
                    size={sizeHelper.calHp(35)}
                    color={theme.colors.accent}
                  />
                </View>
                <Text style={styles.accountTitle}>
                  {profileRecordGet?.Roles?.[0]}
                </Text>
                <Text style={styles.accountSubTitle}>
                  {t('profile.accountType')}
                </Text>
              </View>

              <View style={styles.accountDivider} />

              <View style={styles.accountItem}>
                <View style={styles.accountIcon}>
                  <Icon
                    name="calendar-month"
                    size={sizeHelper.calHp(35)}
                    color={theme.colors.accent}
                  />
                </View>
                <Text style={styles.accountTitle}>{t('profile.since')}</Text>
                <Text style={styles.accountSubTitle}>
                  {profileRecordGet?.MemberSinceLabel}
                </Text>
              </View>

              <View style={styles.accountDivider} />

              <View style={styles.accountItem}>
                <View style={styles.accountIcon}>
                  <Icon
                    name="verified"
                    size={sizeHelper.calHp(26)}
                    color={theme.colors.accent}
                  />
                </View>
                <Text style={styles.accountTitle}>
                  {profileRecordGet?.AccountStatus}
                </Text>
                <Text style={styles.accountSubTitle}>
                  {t('profile.status')}
                </Text>
              </View>
            </View>
          </View>

          {/* ================= LANGUAGE ================= */}
          <Text style={styles.sectionHeading}>
            {t('language.title').toUpperCase()}
          </Text>
          <View
            style={[styles.sectionCard, { paddingVertical: theme.spacing.md }]}
          >
            <LanguageChips />
          </View>

          {/* ================= ACCOUNT SECTION ================= */}

          <Text style={styles.sectionHeading}>{t('profile.account')}</Text>
          <View style={styles.sectionCard}>
            <TouchableOpacity
              style={[styles.row, styles.rowDivider]}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('PersonalDetail', {
                  profileRecordGet: profileRecordGet,
                  imageVersion: imageVersion,
                  setImageVersion: setImageVersion,
                })
              }
            >
              <View style={styles.rowIcon}>
                <Icon
                  name="person-outline"
                  size={sizeHelper.calHp(40)}
                  color={theme.colors.primary}
                />
              </View>

              <View style={styles.rowContent}>
                <Text style={styles.rowText}>{t('profile.personal')}</Text>
                <Text style={styles.rowSubText}>
                  {t('profile.personalSub')}
                </Text>
              </View>

              <Icon
                name="chevron-right"
                size={sizeHelper.calHp(40)}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                isPinAccount
                  ? navigation.navigate('ChangePin')
                  : navigation.navigate('ChangePassword')
              }
              style={styles.row}
              activeOpacity={0.8}
            >
              <View style={styles.rowIcon}>
                <Icon
                  name="lock-outline"
                  size={sizeHelper.calHp(40)}
                  color={theme.colors.primary}
                />
              </View>

              <View style={styles.rowContent}>
                <Text style={styles.rowText}>
                  {isPinAccount
                    ? t('profile.changePin')
                    : t('profile.changePassword')}
                </Text>
                <Text style={styles.rowSubText}>{t('profile.secure')}</Text>
              </View>

              <Icon
                name="chevron-right"
                size={sizeHelper.calHp(40)}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          {/* <Text style={styles.sectionHeading}>APP</Text> */}

          {/* <View style={styles.sectionCard}> */}
          {/* Notifications */}
          {/* <TouchableOpacity
              style={[styles.row, styles.rowDivider]}
              activeOpacity={0.8}
              onPress={() => {}}
            >
              <View style={styles.rowIcon}>
                <Icon
                  name="notifications-none"
                  size={sizeHelper.calHp(40)}
                  color={theme.colors.primary}
                />
              </View>

              <View style={styles.rowContent}>
                <Text style={styles.rowText}>{t('profile.notifications')}</Text>
                <Text style={styles.rowSubText}>
                  {t('profile.notificationsSub')}
                </Text>
              </View>

              <Icon
                name="chevron-right"
                size={sizeHelper.calHp(40)}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity> */}

          {/* Language
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.8}
              onPress={() => {}}
            >
              <View style={styles.rowIcon}>
                <Icon
                  name="language"
                  size={sizeHelper.calHp(40)}
                  color={theme.colors.primary}
                />
              </View>

              <View style={styles.rowContent}>
                <Text style={styles.rowText}>{t('language.title')}</Text>
                <Text style={styles.rowSubText}>{t('profile.languageSub')}</Text>
              </View>

              <Icon
                name="chevron-right"
                size={sizeHelper.calHp(40)}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity> */}
          {/* </View> */}

          <Button
            title={t('profile.logout')}
            icon="logout"
            variant="dangerOutline"
            size="lg"
            onPress={() => ModalOpen()}
            style={styles.logout}
          />

          <ConfirmModal
            visible={logoutModal}
            loader={loader}
            icon="logout"
            title={t('profile.logoutTitle')}
            deleteText={t('profile.logout')}
            subTitle1={t('profile.logoutText')}
            onClose={() => setLogoutModal(false)}
            onOk={() => handleLogout()}
          />
        </ScrollView>
      </SafeAreaView>

      <ImagePhotoOpen
        visible={photoOpenModal}
        imageUri={imageUri}
        onClose={() => setPhotoOpenModal(false)}
      />
    </View>
  );
};

export default Design;
