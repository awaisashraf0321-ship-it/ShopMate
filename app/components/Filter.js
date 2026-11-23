import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import { ChipGroup } from '../ui';

/**
 * Payment-method filter (All / Cash / Bank / Credit) used by the list tabs.
 * Same props as before; rendering now comes from the shared ChipGroup.
 *
 * filtering: [{ id, label, PaymentMethodId }]
 */
const Filter = ({ filtering, activeTab, setActiveTab, setPaymentMethodId }) => {
  const options = filtering.map(item => ({
    value: item.id,
    label: item.label,
    paymentMethodId: item.PaymentMethodId,
  }));

  return (
    <View style={styles.container}>
      <ChipGroup
        options={options}
        value={activeTab}
        onChange={(id, option) => {
          setActiveTab(id);
          setPaymentMethodId(option.paymentMethodId);
        }}
      />
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
});
