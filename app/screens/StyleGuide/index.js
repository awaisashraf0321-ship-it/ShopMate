// Dev-only catalogue of design tokens and UI components.
// Registered in MainStack only when __DEV__ is true; open it by
// long-pressing the greeting on the Dashboard.
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme';
import {
  AmountText,
  AppText,
  Button,
  Card,
  ChipGroup,
  EmptyState,
  Screen,
} from '../../ui';
import TransactionDetail from '../../components/TransactionDetail';

const Section = ({ title, children }) => {
  const { spacing } = useTheme();
  return (
    <View style={{ marginTop: spacing.xl }}>
      <AppText
        variant="overline"
        color="textSecondary"
        style={{ marginBottom: spacing.sm }}
      >
        {title}
      </AppText>
      {children}
    </View>
  );
};

export default function StyleGuideScreen({ navigation }) {
  const { colors, typography, spacing, radius, shadows } = useTheme();
  const [method, setMethod] = useState(0);

  return (
    <Screen scroll>
      <View style={[styles.header, { marginTop: spacing.md }]}>
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={12}
        >
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <AppText variant="h1" style={{ marginLeft: spacing.md }}>
          Style guide
        </AppText>
      </View>

      <Section title="Screen previews">
        <AppText
          variant="caption"
          color="textSecondary"
          style={{ marginBottom: spacing.sm }}
        >
          Opens these screens without logging out. Relaunch the app to return.
        </AppText>
        <View style={[styles.row, { gap: spacing.sm }]}>
          <Button
            title="Login"
            variant="secondary"
            size="sm"
            onPress={() => navigation.navigate('Auth')}
            style={styles.flex}
          />
          <Button
            title="Onboarding"
            variant="secondary"
            size="sm"
            onPress={() => navigation.navigate('OnBoarding')}
            style={styles.flex}
          />
        </View>
      </Section>

      <Section title="Colours">
        <View style={[styles.wrap, { gap: spacing.sm }]}>
          {Object.entries(colors)
            .filter(([, v]) => typeof v === 'string')
            .map(([name, value]) => (
              <View key={name} style={styles.swatchItem}>
                <View
                  style={[
                    styles.swatch,
                    {
                      backgroundColor: value,
                      borderRadius: radius.md,
                      borderColor: colors.border,
                    },
                  ]}
                />
                <AppText variant="caption" numberOfLines={1}>
                  {name}
                </AppText>
              </View>
            ))}
        </View>
      </Section>

      <Section title="Typography">
        {Object.keys(typography).map(name => (
          <AppText
            key={name}
            variant={name}
            style={{ marginBottom: spacing.xs }}
          >
            {name} · {typography[name].fontSize}pt
          </AppText>
        ))}
      </Section>

      <Section title="Buttons">
        <View style={{ gap: spacing.md }}>
          <Button title="Primary" icon="check-circle-outline" />
          <Button title="Gradient" variant="gradient" icon="save" />
          <Button title="Secondary" variant="secondary" />
          <Button title="Danger" variant="danger" icon="delete-outline" />
          <Button
            title="Danger outline"
            variant="dangerOutline"
            icon="logout"
          />
          <Button title="Loading" loading />
          <Button title="Disabled" disabled />
          <Button title="Ghost" variant="ghost" />
          <Button title="Small" size="sm" fullWidth={false} />
        </View>
      </Section>

      <Section title="Chips">
        <ChipGroup
          value={method}
          onChange={setMethod}
          options={[
            { value: 0, label: 'All' },
            { value: 1, label: 'Cash' },
            { value: 2, label: 'Bank' },
            { value: 3, label: 'Credit' },
          ]}
        />
      </Section>

      <Section title="Cards & amounts">
        <View style={{ gap: spacing.md }}>
          <Card tone="primary" padding="xl">
            <AppText variant="label" color="primarySoft">
              Net Balance
            </AppText>
            <AmountText value={152340} variant="display" color="onPrimary" />
          </Card>
          <Card>
            <AppText variant="title">Groceries</AppText>
            <AppText variant="caption" color="textSecondary">
              19-Nov-2026 · Cash
            </AppText>
            <View style={[styles.row, { marginTop: spacing.sm }]}>
              <AmountText value={2500} direction="out" />
              <AmountText value={8000} direction="in" />
            </View>
          </Card>
        </View>
      </Section>

      <Section title="Spacing · radius · shadow">
        <View style={[styles.wrap, { gap: spacing.md }]}>
          {Object.entries(spacing)
            .filter(([, v]) => v > 0)
            .map(([name, v]) => (
              <View key={name} style={styles.center}>
                <View
                  style={{
                    width: v,
                    height: v,
                    backgroundColor: colors.accent,
                  }}
                />
                <AppText variant="caption">{name}</AppText>
              </View>
            ))}
        </View>
        <View style={[styles.wrap, { gap: spacing.md, marginTop: spacing.lg }]}>
          {Object.entries(radius).map(([name, r]) => (
            <View key={name} style={styles.center}>
              <View
                style={[
                  styles.radiusBox,
                  shadows.md,
                  {
                    borderRadius: Math.min(r, 28),
                    backgroundColor: colors.surface,
                  },
                ]}
              />
              <AppText variant="caption">{name}</AppText>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Transaction detail (incoming)">
        <View style={{ marginHorizontal: -spacing.lg }}>
          <TransactionDetail
            icon="south-west"
            title="Received from Ali Traders"
            amount="8,000"
            direction="in"
            date="19-Nov-2026"
            method="Bank Transfer"
            rows={[
              { label: 'Account', value: 'Business' },
              { label: 'Reference', value: 'RCPT-1042', icon: 'tag' },
            ]}
            description="Partial payment for invoice #1042"
            onDelete={() => {}}
          />
        </View>
      </Section>

      <Section title="Empty state">
        <Card>
          <EmptyState
            title="No Self Expense Available"
            message="You haven't added any expenses yet. Tap the plus icon above to create one."
            actionLabel="Add expense"
            onAction={() => {}}
          />
        </Card>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center' },
  wrap: { flexDirection: 'row', flexWrap: 'wrap' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  flex: { flex: 1 },
  center: { alignItems: 'center' },
  swatchItem: { width: 76 },
  swatch: { height: 44, borderWidth: StyleSheet.hairlineWidth },
  radiusBox: { width: 56, height: 56 },
});
