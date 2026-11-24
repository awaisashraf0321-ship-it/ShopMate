import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import colors1 from '../theme/myColors';
import sizeHelper from '../helpers/sizeHelper';

const PaymentMethod = ({
  paymentMode,
  setPaymentMode,
  amount,
  pickFromGallery,
  openCamera,
  imageUri,
  imageRemove,
  screenType,
  condition = false,
}) => {
  const paymentMethods = [
    { label: 'Cash', value: 1, icon: 'payments' },
    { label: 'Bank', value: 2, icon: 'account-balance' },
    { label: 'Credit', value: 3, icon: 'credit-card' },
  ];

  const filterMethod = paymentMethods.filter(method => {
    if (screenType === 'Loan' || screenType === 'InComing') {
      return true;
    }

    return method.value !== 3;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Payment Method</Text>

      {/* Payment Methods */}
      <View style={styles.options}>
        {filterMethod.map(method => {
          const isSelected = paymentMode === method.value;

          return (
            <TouchableOpacity
              key={method.value}
              style={[styles.option, isSelected && styles.selectedOption]}
              onPress={() => setPaymentMode(method.value)}
              activeOpacity={0.7}
            >
              {isSelected && (
                <View style={styles.checkIcon}>
                  <Icon
                    name="check"
                    size={sizeHelper.calHp(36)}
                    color={colors1.white}
                  />
                </View>
              )}

              <View
                style={[
                  styles.iconContainer,
                  isSelected && styles.selectedIconContainer,
                ]}
              >
                <Icon
                  name={method.icon}
                  size={sizeHelper.calHp(48)}
                  color={isSelected ? colors1.primary : colors1.textSecondary}
                />
              </View>

              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.selectedOptionText,
                ]}
              >
                {method.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Bank Receipt Upload Section */}
      {paymentMode === 2 && condition && (
        <View style={styles.uploadContainer}>
          <View style={styles.uploadHeader}>
            <View style={styles.cameraIcon}>
              <Icon
                name="cloud-upload"
                size={sizeHelper.calHp(45)}
                color={colors1.primary}
              />
            </View>

            <View style={styles.headerText}>
              <Text style={styles.uploadTitle}>Upload Bank Receipt</Text>

              <Text style={styles.uploadSubtitle}>
                Upload your payment proof
              </Text>
            </View>
          </View>

          {/* Image Preview */}
          {imageUri ? (
            <View style={styles.imagePreview}>
              <Image
                source={{ uri: imageUri }}
                style={styles.previewImage}
                resizeMode="cover"
              />

              <TouchableOpacity
                style={styles.removeButton}
                onPress={imageRemove}
              >
                <Icon
                  name="close"
                  size={sizeHelper.calHp(50)}
                  color={colors1.white}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyUpload}>
              <Icon
                name="receipt-long"
                size={sizeHelper.calHp(65)}
                color={colors1.primary}
              />

              <Text style={styles.emptyTitle}>No Receipt Selected</Text>

              <Text style={styles.emptySubtitle}>
                Choose an image from gallery or camera
              </Text>
            </View>
          )}

          {/* Upload Buttons */}
          <View style={styles.uploadButtons}>
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={pickFromGallery}
              activeOpacity={0.7}
            >
              <Icon
                name="photo-library"
                size={sizeHelper.calHp(53)}
                color={colors1.primary}
              />

              <Text style={styles.galleryText}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={openCamera}
              activeOpacity={0.7}
            >
              <Icon
                name="camera-alt"
                size={sizeHelper.calHp(53)}
                color={colors1.white}
              />

              <Text style={styles.cameraText}>Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    // marginTop: sizeHelper.calHp(25),
    marginHorizontal: sizeHelper.calWp(40),
  },

  label: {
    fontSize: sizeHelper.calHp(30),
    fontWeight: '700',
    color: colors1.text,
    marginBottom: sizeHelper.calHp(20),
  },

  options: {
    flexDirection: 'row',
    gap: sizeHelper.calWp(15),
  },

  option: {
    flex: 1,
    height: sizeHelper.calHp(165),
    borderRadius: sizeHelper.calHp(25),
    borderWidth: 1.5,
    borderColor: colors1.border,
    backgroundColor: colors1.white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizeHelper.calHp(12),
    position: 'relative',
  },

  selectedOption: {
    backgroundColor: colors1.primaryLight,
    borderColor: colors1.primary,
    borderWidth: 2,
  },

  iconContainer: {
    width: sizeHelper.calWp(75),
    height: sizeHelper.calHp(75),
    borderRadius: sizeHelper.calHp(40),
    backgroundColor: colors1.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedIconContainer: {
    backgroundColor: colors1.white,
  },

  optionText: {
    fontSize: sizeHelper.calHp(25),
    fontWeight: '600',
    color: colors1.textSecondary,
  },

  selectedOptionText: {
    color: colors1.primary,
  },

  checkIcon: {
    position: 'absolute',
    top: sizeHelper.calHp(8),
    right: sizeHelper.calWp(8),
    width: sizeHelper.calHp(63),
    height: sizeHelper.calHp(63),
    borderRadius: sizeHelper.calHp(35),
    backgroundColor: colors1.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadContainer: {
    marginTop: sizeHelper.calHp(30),
    backgroundColor: colors1.white,
    borderRadius: sizeHelper.calHp(25),
    borderWidth: 1.5,
    borderColor: colors1.primary,
    borderStyle: 'dashed',
    paddingHorizontal: sizeHelper.calWp(25),
    paddingVertical: sizeHelper.calHp(25),
  },

  uploadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(25),
    gap: sizeHelper.calWp(18),
  },

  cameraIcon: {
    width: sizeHelper.calWp(80),
    height: sizeHelper.calHp(80),
    borderRadius: sizeHelper.calHp(40),
    backgroundColor: colors1.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    flex: 1,
  },

  uploadTitle: {
    fontSize: sizeHelper.calHp(27),
    fontWeight: '700',
    color: colors1.text,
  },

  uploadSubtitle: {
    fontSize: sizeHelper.calHp(22),
    color: colors1.textSecondary,
    marginTop: sizeHelper.calHp(12),
  },

  emptyUpload: {
    minHeight: sizeHelper.calHp(190),
    borderRadius: sizeHelper.calHp(20),
    backgroundColor: colors1.Backgroundcolor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: sizeHelper.calHp(20),
  },

  emptyTitle: {
    fontSize: sizeHelper.calHp(25),
    fontWeight: '700',
    color: colors1.text,
    marginTop: sizeHelper.calHp(20),
  },

  emptySubtitle: {
    fontSize: sizeHelper.calHp(21),
    color: colors1.textSecondary,
    marginTop: sizeHelper.calHp(12),
    textAlign: 'center',
  },

  imagePreview: {
    height: sizeHelper.calHp(260),
    borderRadius: sizeHelper.calHp(18),
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors1.surface,
  },

  previewImage: {
    width: '100%',
    height: '100%',
  },

  removeButton: {
    position: 'absolute',
    top: sizeHelper.calHp(20),
    right: sizeHelper.calWp(10),
    backgroundColor: colors1.danger,
    width: sizeHelper.calHp(70),
    height: sizeHelper.calHp(70),
    borderRadius: sizeHelper.calHp(60),
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadButtons: {
    flexDirection: 'row',
    gap: sizeHelper.calWp(15),
    marginTop: sizeHelper.calHp(25),
  },

  galleryButton: {
    flex: 1,
    height: sizeHelper.calHp(85),
    borderWidth: 1.5,
    borderColor: colors1.primary,
    borderRadius: sizeHelper.calHp(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizeHelper.calWp(17),
  },

  galleryText: {
    color: colors1.primary,
    fontSize: sizeHelper.calHp(22),
    fontWeight: '700',
  },

  cameraButton: {
    flex: 1,
    height: sizeHelper.calHp(85),
    backgroundColor: colors1.primary,
    borderRadius: sizeHelper.calHp(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizeHelper.calWp(18),
  },

  cameraText: {
    color: colors1.white,
    fontSize: sizeHelper.calHp(22),
    fontWeight: '700',
  },
});
