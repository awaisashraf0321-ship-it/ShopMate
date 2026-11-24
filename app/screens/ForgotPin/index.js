import React from 'react';
import { Linking, Pressable, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

import style from '../SignUp/style';
import { useTheme } from '../../theme';
import { AppText, Button } from '../../ui';
import {
  formatPhone,
  isValidPhone,
  normalizePhone,
} from '../../helpers/phoneAccount';
import { SUPPORT_WHATSAPP, whatsappLink } from '../../helpers/support';
import { t } from '../../i18n';

const Step = ({ number, text }) => {
  const { colors, spacing } = useTheme();
  return (
    <View style={[style.row, { gap: spacing.md, alignItems: 'flex-start' }]}>
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AppText variant="bodyStrong" color="onPrimary">
          {number}
        </AppText>
      </View>
      <AppText variant="body" style={style.flex}>
        {text}
      </AppText>
    </View>
  );
};

/**
 * "Forgot PIN?": the server has no self-service reset yet, so this sends the
 * customer to the ShopMate team on WhatsApp with a ready-made message.
 */
const ForgotPinScreen = ({ navigation, route }) => {
  const { colors, spacing, sizes } = useTheme();
  const phone = normalizePhone(route?.params?.phone);
  const hasPhone = isValidPhone(phone);

  const message = `Salam, I forgot my ShopMate PIN.${
    hasPhone ? ` My number is ${formatPhone(phone)}.` : ''
  } Please reset it.`;

  const openWhatsapp = async () => {
    try {
      await Linking.openURL(whatsappLink(SUPPORT_WHATSAPP, message));
    } catch {
      Toast.show({
        type: 'error',
        text1: t('common.whatsappFail'),
        text2: t('common.whatsappInstalled'),
      });
    }
  };

  return (
    <SafeAreaView
      style={[style.root, { backgroundColor: colors.background }]}
      edges={['top', 'bottom']}
    >
      <StatusBar barStyle="dark-content" />
      <View style={[style.topBar, { paddingHorizontal: spacing.lg }]}>
        <Pressable
          onPress={() => navigation.goBack()}
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
      </View>

      <ScrollView
        style={style.flex}
        contentContainerStyle={[style.content, { padding: spacing.lg }]}
      >
        <View style={[style.heading, { gap: spacing.sm }]}>
          <View
            style={[style.stepIcon, { backgroundColor: colors.primarySoft }]}
          >
            <Icon
              name="help-outline"
              size={sizes.icon.xl}
              color={colors.primary}
            />
          </View>
          <AppText variant="h1" align="center">
            {t('forgot.title')}
          </AppText>
          <AppText variant="body" color="textSecondary" align="center">
            {t('forgot.text')}
          </AppText>
        </View>

        <View style={{ marginTop: spacing.xl, gap: spacing.lg }}>
          <Step
            number="1"
            text={
              SUPPORT_WHATSAPP ? t('forgot.step1WhatsApp') : t('forgot.step1')
            }
          />
          <Step number="2" text={t('forgot.step2')} />
          <Step number="3" text={t('forgot.step3')} />
        </View>

        <View style={style.flex} />

        {SUPPORT_WHATSAPP ? (
          <Button
            title={t('forgot.whatsapp')}
            icon="chat"
            size="lg"
            onPress={openWhatsapp}
            style={{ marginTop: spacing.xl }}
          />
        ) : null}
        <Button
          title={t('forgot.remember')}
          variant="ghost"
          onPress={() => navigation.goBack()}
          style={{ marginTop: spacing.sm }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPinScreen;
