import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import { useTheme } from '../../theme';
import { AppText, Button, Card, TextField } from '../../ui';
import { useKhataData } from '../../hooks/useKhata';
import { useRefreshOnFocus } from '../../hooks/queries';
import {
  balanceLabel,
  customerBalances,
  khataTotals,
} from '../../helpers/khata';
import { t } from '../../i18n';

const initials = name =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0])
    .join('')
    .toUpperCase() || '#';

const CustomerRow = ({ row, onPress }) => {
  const { colors, spacing } = useTheme();
  const label = balanceLabel(row.balance);
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${row.name}. ${label.text}`}
      style={({ pressed }) => [
        styles.row,
        {
          gap: spacing.md,
          paddingHorizontal: spacing.lg,
          backgroundColor: pressed ? colors.primarySoft : colors.surface,
        },
      ]}
    >
      <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
        <AppText variant="bodyStrong" color="primary">
          {initials(row.name)}
        </AppText>
      </View>
      <View style={styles.flex}>
        <AppText variant="bodyStrong" numberOfLines={1}>
          {row.name}
        </AppText>
        <AppText variant="label" color={label.color}>
          {label.text}
        </AppText>
      </View>
      <Icon name="chevron-right" size={26} color={colors.textMuted} />
    </Pressable>
  );
};

const Separator = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.separator, { backgroundColor: colors.divider }]} />
  );
};

/** Everyone you give money to or get money from, with their balance. */
const CustomersScreen = ({ navigation }) => {
  const { colors, spacing } = useTheme();
  const { customers, gave, got, loading, error, refetch } = useKhataData();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  useRefreshOnFocus(refetch);

  const rows = useMemo(
    () => customerBalances({ customers, gave, got }),
    [customers, gave, got],
  );
  const totals = useMemo(() => khataTotals(rows), [rows]);
  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? rows.filter(r => r.name.toLowerCase().includes(q)) : rows;
  }, [rows, search]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch().finally(() => setRefreshing(false));
  };

  const header = (
    <>
      <View style={[styles.totals, { gap: spacing.md, padding: spacing.lg }]}>
        <Card padding="lg" style={styles.flex}>
          <AppText variant="label" color="textSecondary">
            {t('customers.willGet')}
          </AppText>
          <AppText
            variant="h2"
            color="moneyIn"
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            Rs {Math.round(totals.youWillGet).toLocaleString()}
          </AppText>
        </Card>
        <Card padding="lg" style={styles.flex}>
          <AppText variant="label" color="textSecondary">
            {t('customers.willGive')}
          </AppText>
          <AppText
            variant="h2"
            color="moneyOut"
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            Rs {Math.round(totals.youWillGive).toLocaleString()}
          </AppText>
        </Card>
      </View>
      <TextField
        icon="search"
        placeholder={t('common.searchName')}
        value={search}
        onChangeText={setSearch}
        autoCapitalize="words"
      />
    </>
  );

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={false}
        showBack
        Margin={false}
        showPlus={false}
        title={t('customers.title')}
        subTitle={t('customers.subtitle')}
        back={() => navigation.goBack()}
      />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={shown}
          keyExtractor={row => String(row.id)}
          ListHeaderComponent={header}
          renderItem={({ item }) => (
            <CustomerRow
              row={item}
              onPress={() =>
                navigation.navigate('CustomerDetail', {
                  customerId: item.id,
                  name: item.name,
                })
              }
            />
          )}
          ItemSeparatorComponent={Separator}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <AppText
              variant="body"
              color="textSecondary"
              align="center"
              style={{ padding: spacing.xl }}
            >
              {error
                ? t('customers.loadFailed')
                : rows.length
                ? t('customers.noMatch')
                : t('customers.none')}
            </AppText>
          }
          contentContainerStyle={{ paddingBottom: spacing.xxxl * 2 }}
        />
      )}

      <View
        style={[
          styles.footer,
          { padding: spacing.lg, backgroundColor: colors.background },
        ]}
      >
        <Button
          title={t('customers.add')}
          icon="person-add-alt"
          size="lg"
          onPress={() => navigation.navigate('AddCustomer')}
        />
      </View>
    </View>
  );
};

export default CustomersScreen;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  totals: { flexDirection: 'row' },
  row: { minHeight: 72, flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: { height: StyleSheet.hairlineWidth, marginLeft: 72 },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0 },
});
