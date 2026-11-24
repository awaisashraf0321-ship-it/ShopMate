import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import { useTheme } from '../../theme';
import { AppText, Button, Card } from '../../ui';
import { useCustomer, useKhataData } from '../../hooks/useKhata';
import { useRefreshOnFocus } from '../../hooks/queries';
import {
  balanceLabel,
  customerBalances,
  customerHistory,
  customerWhatsapp,
  reminderMessage,
} from '../../helpers/khata';
import { GAVE, GOT } from '../../helpers/moneyWords';
import { whatsappLink } from '../../helpers/support';
import { t } from '../../i18n';

const MONTHS = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
const shortDate = value => {
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? ''
    : `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

const HistoryRow = ({ entry }) => {
  const { colors, spacing, sizes } = useTheme();
  const words = entry.kind === 'gave' ? GAVE : GOT;
  return (
    <View
      style={[
        styles.historyRow,
        { gap: spacing.md, paddingVertical: spacing.md },
      ]}
    >
      <View
        style={[
          styles.historyIcon,
          {
            backgroundColor:
              entry.kind === 'gave' ? colors.dangerSoft : colors.successSoft,
          },
        ]}
      >
        <Icon
          name={words.icon}
          size={sizes.icon.md}
          color={colors[words.color]}
        />
      </View>
      <View style={styles.flex}>
        <AppText variant="bodyStrong">{words.label}</AppText>
        <AppText variant="caption" color="textSecondary" numberOfLines={1}>
          {[shortDate(entry.ReceiptDate), entry.Description]
            .filter(Boolean)
            .join(' · ')}
        </AppText>
      </View>
      <AppText variant="bodyStrong" color={words.color}>
        Rs {Number(entry.Amount || 0).toLocaleString()}
      </AppText>
    </View>
  );
};

/** One customer's khata page: balance, gave/got buttons, history, reminder. */
const CustomerDetailScreen = ({ navigation, route }) => {
  const { colors, spacing } = useTheme();
  const customerId = route?.params?.customerId;
  const { customers, gave, got, loading, refetch } = useKhataData();
  const { data: details } = useCustomer(customerId);
  const [refreshing, setRefreshing] = useState(false);
  useRefreshOnFocus(refetch);

  const customer = useMemo(
    () =>
      customers.find(c => String(c.Id) === String(customerId)) ?? {
        Id: customerId,
        Name: route?.params?.name,
      },
    [customers, customerId, route?.params?.name],
  );
  const row = useMemo(
    () => customerBalances({ customers: [customer], gave, got })[0],
    [customer, gave, got],
  );
  const history = useMemo(
    () => customerHistory({ customer, gave, got }),
    [customer, gave, got],
  );
  const label = balanceLabel(row?.balance ?? 0);
  const whatsapp = customerWhatsapp(details);
  const name = customer.Name || t('khata.customer');

  const record = screen =>
    navigation.navigate(screen, { customerId, customerName: name });

  const sendReminder = async () => {
    try {
      await Linking.openURL(
        whatsappLink(whatsapp, reminderMessage({ name, balance: row.balance })),
      );
    } catch {
      Toast.show({
        type: 'error',
        text1: t('common.whatsappFail'),
        text2: t('common.whatsappInstalled'),
      });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch().finally(() => setRefreshing(false));
  };

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={false}
        showBack
        Margin={false}
        showPlus={false}
        title={name}
        subTitle={t('khata.customer')}
        back={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={{
          padding: spacing.lg,
          paddingBottom: spacing.xxxl * 3,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Card padding="xl">
          <AppText variant="label" color="textSecondary" align="center">
            {t('khata.balance')}
          </AppText>
          {loading ? (
            <ActivityIndicator
              color={colors.primary}
              style={{ marginTop: spacing.md }}
            />
          ) : (
            <AppText
              variant="h1"
              color={label.color}
              align="center"
              style={{ marginTop: spacing.xs }}
            >
              {label.text}
            </AppText>
          )}
          {!loading && row ? (
            <AppText
              variant="caption"
              color="textSecondary"
              align="center"
              style={{ marginTop: spacing.sm }}
            >
              {t('khata.summary', {
                gave: row.gave.toLocaleString(),
                got: row.got.toLocaleString(),
              })}
            </AppText>
          ) : null}

          {!loading && row?.balance > 0 && whatsapp ? (
            <Button
              title={t('khata.remind')}
              icon="chat"
              variant="secondary"
              onPress={sendReminder}
              style={{ marginTop: spacing.lg }}
            />
          ) : null}
        </Card>

        <AppText variant="title" style={{ marginTop: spacing.xl }}>
          {t('khata.history')}
        </AppText>
        {history.length ? (
          history.map(entry => (
            <View
              key={`${entry.kind}-${entry.Id}`}
              style={{
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: colors.divider,
              }}
            >
              <HistoryRow entry={entry} />
            </View>
          ))
        ) : (
          <AppText
            variant="body"
            color="textSecondary"
            style={{ marginTop: spacing.md }}
          >
            {loading ? 'Loading…' : t('khata.nothingYet', { name })}
          </AppText>
        )}
      </ScrollView>

      {/* The two things you do with a customer, always in reach */}
      <View
        style={[
          styles.actions,
          {
            gap: spacing.md,
            padding: spacing.lg,
            backgroundColor: colors.background,
          },
        ]}
      >
        <Button
          title={GAVE.label}
          icon={GAVE.icon}
          variant="danger"
          size="lg"
          onPress={() => record('Loan')}
          style={styles.flex}
        />
        <Button
          title={GOT.label}
          icon={GOT.icon}
          size="lg"
          onPress={() => record('InComing')}
          style={styles.flex}
        />
      </View>
    </View>
  );
};

export default CustomerDetailScreen;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  historyRow: { flexDirection: 'row', alignItems: 'center' },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
});
