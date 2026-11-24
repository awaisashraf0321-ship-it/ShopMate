import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme';
import AppText from './AppText';
import { formatPhone, PHONE_LENGTH } from '../helpers/phoneAccount';

const MASK = '03XX XXXXXXX';

/**
 * Shows a phone number being typed on the NumberPad, in big digits, with the
 * not-yet-typed part greyed out so people can see how many digits are left.
 */
export default function PhoneDisplay({ phone, error, style }) {
  const { colors, spacing, radius, typography, sizes } = useTheme();
  const typed = formatPhone(phone);
  const rest = MASK.slice(typed.length);
  const complete = phone.length === PHONE_LENGTH && !error;

  return (
    <View style={style}>
      <View
        style={[
          styles.box,
          {
            borderRadius: radius.lg,
            borderColor: error
              ? colors.danger
              : complete
              ? colors.primary
              : colors.border,
            backgroundColor: colors.surface,
            paddingHorizontal: spacing.lg,
            gap: spacing.sm,
          },
        ]}
        accessibilityRole="text"
        accessibilityLabel={
          phone ? `Mobile number ${phone.split('').join(' ')}` : 'Mobile number'
        }
      >
        <Icon
          name="phone-iphone"
          size={sizes.icon.lg}
          color={complete ? colors.primary : colors.textMuted}
        />
        <AppText style={[typography.h2, styles.number]} numberOfLines={1}>
          <AppText style={typography.h2}>{typed}</AppText>
          <AppText style={typography.h2} color="borderStrong">
            {rest}
          </AppText>
        </AppText>
        {complete ? (
          <Icon
            name="check-circle"
            size={sizes.icon.lg}
            color={colors.success}
          />
        ) : null}
      </View>
      {error ? (
        <View
          style={[styles.errorRow, { gap: spacing.xs, marginTop: spacing.sm }]}
        >
          <Icon
            name="error-outline"
            size={sizes.icon.md}
            color={colors.danger}
          />
          <AppText variant="bodyStrong" color="danger">
            {error}
          </AppText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    minHeight: 64,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: { flex: 1, letterSpacing: 1 },
  errorRow: { flexDirection: 'row', alignItems: 'center' },
});
