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
import colors from '../../theme/colors';
import PhotoModal from '../../components/PhotoModal';
import ConfirmModal from '../../components/ConfirmModal';
import ImagePhotoOpen from '../../components/ImagePhotoOpen';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import Loader from '../../components/Loader';

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
        title="My Profile"
        subTitle=" Manage your personal information"
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
                    <Image
                      source={require('../../assets/image/img.jpg')}
                      style={{
                        width: sizeHelper.calHp(200),
                        height: sizeHelper.calHp(200),
                        borderRadius: sizeHelper.calHp(100),
                      }}
                    />
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
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
              <Loader visible={loading} />
              <View style={styles.userInfo}>
                <Text style={styles.name} numberOfLines={1}>
                  {profileRecordGet?.FullName}
                </Text>

                <View style={styles.infoRow}>
                  <Icon
                    name="email"
                    size={sizeHelper.calHp(22)}
                    color={colors.white}
                  />
                  <Text style={styles.infoText} numberOfLines={1}>
                    {profileRecordGet?.Email}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Icon
                    name="phone"
                    size={sizeHelper.calHp(22)}
                    color={colors.white}
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
                  color={colors.white}
                />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>

            {/* Account Info */}
            <View style={styles.accountInfo}>
              <View style={styles.accountItem}>
                <View style={styles.accountIcon}>
                  <Icon
                    name="person"
                    size={sizeHelper.calHp(35)}
                    color={colors.primaryGradientStart}
                  />
                </View>
                <Text style={styles.accountTitle}>
                  {profileRecordGet?.Roles?.[0]}
                </Text>
                <Text style={styles.accountSubTitle}>Account Type</Text>
              </View>

              <View style={styles.accountDivider} />

              <View style={styles.accountItem}>
                <View style={styles.accountIcon}>
                  <Icon
                    name="calendar-month"
                    size={sizeHelper.calHp(35)}
                    color={colors.primaryGradientStart}
                  />
                </View>
                <Text style={styles.accountTitle}>Since</Text>
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
                    color={colors.primaryGradientStart}
                  />
                </View>
                <Text style={styles.accountTitle}>
                  {profileRecordGet?.AccountStatus}
                </Text>
                <Text style={styles.accountSubTitle}>Account Status</Text>
              </View>
            </View>
          </View>

          {/* ================= ACCOUNT SECTION ================= */}

          <Text style={styles.sectionHeading}>ACCOUNT</Text>
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
                  color={colors.iconPrimary}
                />
              </View>

              <View style={styles.rowContent}>
                <Text style={styles.rowText}>Personal details</Text>
                <Text style={styles.rowSubText}>Name, email and phone</Text>
              </View>

              <Icon
                name="chevron-right"
                size={sizeHelper.calHp(40)}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}
              style={styles.row}
              activeOpacity={0.8}
            >
              <View style={styles.rowIcon}>
                <Icon
                  name="lock-outline"
                  size={sizeHelper.calHp(40)}
                  color={colors.iconPrimary}
                />
              </View>

              <View style={styles.rowContent}>
                <Text style={styles.rowText}>Change password</Text>
                <Text style={styles.rowSubText}>Keep your account secure</Text>
              </View>

              <Icon
                name="chevron-right"
                size={sizeHelper.calHp(40)}
                color={colors.textSecondary}
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
                  color={colors.iconPrimary}
                />
              </View>

              <View style={styles.rowContent}>
                <Text style={styles.rowText}>Notifications</Text>
                <Text style={styles.rowSubText}>
                  Payment alerts and reminders
                </Text>
              </View>

              <Icon
                name="chevron-right"
                size={sizeHelper.calHp(40)}
                color={colors.textSecondary}
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
                  color={colors.iconPrimary}
                />
              </View>

              <View style={styles.rowContent}>
                <Text style={styles.rowText}>Language</Text>
                <Text style={styles.rowSubText}>App display language</Text>
              </View>

              <Icon
                name="chevron-right"
                size={sizeHelper.calHp(40)}
                color={colors.textSecondary}
              />
            </TouchableOpacity> */}
          {/* </View> */}

          <TouchableOpacity
            onPress={() => ModalOpen()}
            style={styles.logout}
            activeOpacity={0.85}
          >
            <Icon
              name="logout"
              size={sizeHelper.calHp(40)}
              color={colors.redColor}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <ConfirmModal
            visible={logoutModal}
            loader={loader}
            icon="logout"
            style={{ backgroundColor: colors.lightPrimaryGradientStart }}
            title={'Are You Sure?'}
            iconColor={colors.primaryGradientStart}
            deleteText="Logout"
            subTitle1={'you will be logged out from your account.'}
            subTitle2={'Do you want to continue?'}
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
