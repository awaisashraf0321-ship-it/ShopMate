import React from 'react';
import { StyleSheet, View, Pressable, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';
import { AppText, Button, FormField } from '../ui';
import { t } from '../i18n';

const { colors, spacing, radius, sizes } = theme;

const METHODS = [
  {
    get label() {
      return t('money.cash');
    },
    value: 1,
    icon: 'payments',
  },
  {
    get label() {
      return t('money.bank');
    },
    value: 2,
    icon: 'account-balance',
  },
  // "Card", not "Credit": shopkeepers read "credit" as udhaar.
  {
    get label() {
      return t('money.card');
    },
    value: 3,
    icon: 'credit-card',
  },
];

/**
 * Payment-method picker (Cash / Bank, plus Card on Loan & InComing).
 * With `condition`, choosing Bank shows a receipt upload area.
 */
const PaymentMethod = ({
  paymentMode,
  setPaymentMode,
  pickFromGallery,
  openCamera,
  imageUri,
  imageRemove,
  screenType,
  condition = false,
}) => {
  const methods =
    screenType === 'Loan' || screenType === 'InComing'
      ? METHODS
      : METHODS.filter(method => method.value !== 3);

  return (
    <FormField label={t('money.paymentMethod')}>
      <View style={styles.options} accessibilityRole="radiogroup">
        {methods.map(method => {
          const selected = paymentMode === method.value;
          return (
            <Pressable
              key={method.value}
              style={({ pressed }) => [
                styles.option,
                selected && styles.optionSelected,
                pressed && styles.pressed,
              ]}
              onPress={() => setPaymentMode(method.value)}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={method.label}
            >
              {selected && (
                <View style={styles.check}>
                  <Icon name="check" size={12} color={colors.onPrimary} />
                </View>
              )}
              <View
                style={[styles.optionIcon, selected && styles.optionIconOn]}
              >
                <Icon
                  name={method.icon}
                  size={sizes.icon.md + 2}
                  color={selected ? colors.primary : colors.textSecondary}
                />
              </View>
              <AppText
                variant="label"
                color={selected ? 'primary' : 'textSecondary'}
              >
                {method.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      {paymentMode === 2 && condition && (
        <View style={styles.upload}>
          <View style={styles.uploadHeader}>
            <View style={styles.uploadIcon}>
              <Icon
                name="cloud-upload"
                size={sizes.icon.md}
                color={colors.primary}
              />
            </View>
            <View style={styles.flex}>
              <AppText variant="bodyStrong">{t('receipt.upload')}</AppText>
              <AppText variant="caption" color="textSecondary">
                {t('receipt.proof')}
              </AppText>
            </View>
          </View>

          {imageUri ? (
            <View style={styles.preview}>
              <Image
                source={{ uri: imageUri }}
                style={styles.previewImage}
                resizeMode="cover"
                accessibilityLabel="Selected receipt"
              />
              <Pressable
                style={styles.remove}
                onPress={imageRemove}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Remove receipt"
              >
                <Icon
                  name="close"
                  size={sizes.icon.md}
                  color={colors.onPrimary}
                />
              </Pressable>
            </View>
          ) : (
            <View style={styles.emptyUpload}>
              <Icon
                name="receipt-long"
                size={sizes.icon.xl}
                color={colors.accent}
              />
              <AppText variant="bodyStrong" style={styles.emptyTitle}>
                {t('receipt.none')}
              </AppText>
              <AppText variant="caption" color="textSecondary" align="center">
                {t('receipt.choose')}
              </AppText>
            </View>
          )}

          <View style={styles.uploadButtons}>
            <Button
              title={t('photo.gallery')}
              icon="photo-library"
              variant="secondary"
              size="sm"
              onPress={pickFromGallery}
              style={styles.flex}
            />
            <Button
              title={t('photo.camera')}
              icon="camera-alt"
              size="sm"
              onPress={openCamera}
              style={styles.flex}
            />
          </View>
        </View>
      )}
    </FormField>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  pressed: { opacity: 0.8 },
  options: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  option: {
    flex: 1,
    height: 76,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  optionSelected: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  optionIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIconOn: {
    backgroundColor: colors.surface,
  },
  check: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    width: 18,
    height: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upload: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  uploadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  uploadIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyUpload: {
    minHeight: 96,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    marginTop: spacing.sm,
  },
  preview: {
    height: 120,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  remove: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
});
