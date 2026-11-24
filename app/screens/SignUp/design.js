import React from 'react';
import { Pressable, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import style from './style';
import { useTheme } from '../../theme';
import { AppText, Button, NumberPad, PhoneDisplay, PinDots } from '../../ui';
import { formatPhone, PIN_LENGTH } from '../../helpers/phoneAccount';
import { t } from '../../i18n';

// Three steps as the person sees them (PIN + "PIN again" count as one).
const PROGRESS = { phone: 1, pin: 2, confirm: 2, purpose: 3 };
const TOTAL_STEPS = 3;

const getCopy = () => ({
  phone: {
    icon: 'phone-iphone',
    title: t('phone.title'),
    text: t('phone.text'),
  },
  pin: {
    icon: 'lock-outline',
    title: t('pin.make'),
    text: t('pin.makeText'),
  },
  confirm: {
    icon: 'lock-outline',
    title: t('pin.again'),
    text: t('pin.againText'),
  },
  purpose: {
    icon: 'touch-app',
    title: t('signup.purposeTitle'),
    text: t('signup.purposeText'),
  },
});

const getPurposes = () => [
  {
    value: 'Self Expense',
    icon: 'home',
    title: t('signup.home'),
    text: t('signup.homeText'),
  },
  {
    value: 'Business Expense',
    icon: 'storefront',
    title: t('signup.shop'),
    text: t('signup.shopText'),
  },
];

const ProgressBar = ({ current }) => {
  const { colors, spacing, radius } = useTheme();
  return (
    <View style={[style.progress, { gap: spacing.xs }]}>
      {Array.from({ length: TOTAL_STEPS }, (_, i) => (
        <View
          key={i}
          style={[
            style.progressSegment,
            {
              borderRadius: radius.pill,
              backgroundColor: i < current ? colors.primary : colors.border,
            },
          ]}
        />
      ))}
    </View>
  );
};

const PurposeCard = ({ option, selected, onPress }) => {
  const { colors, spacing, radius, sizes } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${option.title}. ${option.text}`}
      style={({ pressed }) => [
        style.purposeCard,
        {
          borderRadius: radius.lg,
          padding: spacing.lg,
          gap: spacing.lg,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: selected
            ? colors.primarySoft
            : pressed
            ? colors.surfaceMuted
            : colors.surface,
        },
      ]}
    >
      <View
        style={[
          style.purposeIcon,
          {
            backgroundColor: selected ? colors.primary : colors.surfaceMuted,
          },
        ]}
      >
        <Icon
          name={option.icon}
          size={sizes.icon.xl}
          color={selected ? colors.onPrimary : colors.primary}
        />
      </View>
      <View style={style.flex}>
        <AppText variant="title">{option.title}</AppText>
        <AppText variant="body" color="textSecondary">
          {option.text}
        </AppText>
      </View>
      <Icon
        name={selected ? 'radio-button-checked' : 'radio-button-unchecked'}
        size={sizes.icon.lg}
        color={selected ? colors.primary : colors.borderStrong}
      />
    </Pressable>
  );
};

const Design = ({
  stepName,
  phone,
  phoneError,
  phoneValid,
  pin,
  confirmPin,
  mismatchCount,
  purpose,
  setPurpose,
  submitting,
  error,
  onBack,
  onDigit,
  onBackspace,
  onPhoneNext,
  onCreateAccount,
  onLogInInstead,
}) => {
  const { colors, spacing, sizes } = useTheme();
  const copy = getCopy()[stepName];
  const isPinStep = stepName === 'pin' || stepName === 'confirm';
  const usesKeypad = stepName === 'phone' || isPinStep;

  return (
    <SafeAreaView
      style={[style.root, { backgroundColor: colors.background }]}
      edges={['top', 'bottom']}
    >
      <StatusBar barStyle="dark-content" />

      {/* Top bar: back + progress */}
      <View
        style={[
          style.topBar,
          { paddingHorizontal: spacing.lg, gap: spacing.md },
        ]}
      >
        <Pressable
          onPress={onBack}
          disabled={submitting}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={t('common.goBack')}
          style={[style.backButton, { backgroundColor: colors.surface }]}
        >
          <Icon
            name="arrow-back"
            size={sizes.icon.lg}
            color={colors.textPrimary}
          />
        </Pressable>
        <View style={style.flex}>
          <AppText variant="label" color="textSecondary">
            {t('common.stepOf', {
              n: PROGRESS[stepName],
              total: TOTAL_STEPS,
            })}
          </AppText>
          <ProgressBar current={PROGRESS[stepName]} />
        </View>
      </View>

      <ScrollView
        style={style.flex}
        contentContainerStyle={[
          style.content,
          { padding: spacing.lg, paddingBottom: spacing.xl },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Heading */}
        <View style={[style.heading, { gap: spacing.sm }]}>
          <View
            style={[style.stepIcon, { backgroundColor: colors.primarySoft }]}
          >
            <Icon
              name={copy.icon}
              size={sizes.icon.xl}
              color={colors.primary}
            />
          </View>
          <AppText variant="h1" align="center">
            {copy.title}
          </AppText>
          <AppText variant="body" color="textSecondary" align="center">
            {copy.text}
          </AppText>
          {isPinStep ? (
            <View
              style={[
                style.phoneChip,
                { backgroundColor: colors.surface, gap: spacing.xs },
              ]}
            >
              <Icon
                name="phone-iphone"
                size={sizes.icon.sm}
                color={colors.textSecondary}
              />
              <AppText variant="label" color="textSecondary">
                {formatPhone(phone)}
              </AppText>
            </View>
          ) : null}
        </View>

        {/* Step body */}
        <View style={[style.body, { marginTop: spacing.xl }]}>
          {stepName === 'phone' ? (
            <>
              <PhoneDisplay phone={phone} error={phoneError} />
              {!phoneError ? (
                <AppText
                  variant="caption"
                  color="textMuted"
                  align="center"
                  style={{ marginTop: spacing.sm }}
                >
                  {t('phone.example')}
                </AppText>
              ) : null}
            </>
          ) : null}

          {isPinStep ? (
            <>
              <PinDots
                length={PIN_LENGTH}
                filled={stepName === 'pin' ? pin.length : confirmPin.length}
                errorKey={stepName === 'pin' ? mismatchCount : 0}
              />
              {stepName === 'pin' && mismatchCount > 0 && !pin ? (
                <AppText
                  variant="bodyStrong"
                  color="danger"
                  align="center"
                  style={{ marginTop: spacing.lg }}
                >
                  {t('pin.different')}
                </AppText>
              ) : null}
            </>
          ) : null}

          {stepName === 'purpose' ? (
            <View style={{ gap: spacing.md }}>
              {getPurposes().map(option => (
                <PurposeCard
                  key={option.value}
                  option={option}
                  selected={purpose === option.value}
                  onPress={() => setPurpose(option.value)}
                />
              ))}

              {error ? (
                <View
                  style={[
                    style.errorBox,
                    {
                      backgroundColor: colors.dangerSoft,
                      padding: spacing.lg,
                      gap: spacing.md,
                    },
                  ]}
                >
                  <View style={[style.row, { gap: spacing.sm }]}>
                    <Icon
                      name="error-outline"
                      size={sizes.icon.lg}
                      color={colors.danger}
                    />
                    <AppText
                      variant="bodyStrong"
                      color="danger"
                      style={style.flex}
                    >
                      {error.message}
                    </AppText>
                  </View>
                  {error.alreadyRegistered ? (
                    <Button
                      title={t('signup.loginWithNumber')}
                      icon="login"
                      variant="secondary"
                      onPress={onLogInInstead}
                    />
                  ) : null}
                </View>
              ) : null}
            </View>
          ) : null}
        </View>

        <View style={style.flex} />

        {/* Bottom: keypad and main button */}
        {usesKeypad ? (
          <NumberPad
            onDigit={onDigit}
            onBackspace={onBackspace}
            style={{ marginTop: spacing.xl }}
          />
        ) : null}

        {stepName === 'phone' ? (
          <Button
            title={t('common.next')}
            icon="arrow-forward"
            size="lg"
            disabled={!phoneValid}
            onPress={onPhoneNext}
            style={{ marginTop: spacing.lg }}
          />
        ) : null}

        {stepName === 'purpose' ? (
          <Button
            title={t('signup.create')}
            icon="check-circle-outline"
            size="lg"
            disabled={!purpose}
            loading={submitting}
            onPress={onCreateAccount}
            style={{ marginTop: spacing.xl }}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Design;
