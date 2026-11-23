import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import AmountInput from './AmountInput';
import DatePicker from './DatePicker';
import DropdownStylishBtn from './DropdownStylishBtn';
import Loader from './Loader';
import NoteInput from './NoteInput';
import PaymentMethod from './PaymentMethod';
import SavePayment from './SavePayment';
import SentToInput from './SentToInput';
import { theme } from '../theme';

const { colors, spacing } = theme;

/**
 * Shared layout for the payment forms (New Outgoing Payment, Incoming
 * Payment, Collection). Same structure as the Add Expense form:
 * header row, then Amount → customer → Date → Payment method → Note,
 * with the save button pinned at the bottom.
 *
 *   party:   props for <SentToInput> (customer picker), or omit to hide it
 *   payment: props for <PaymentMethod> (mode, receipt photo handlers…)
 *   date:    { date, setDate, showDate, setShowDate, showTime, setShowTime }
 *   children: extra modals rendered inside the screen (e.g. ConfirmModal)
 */
export default function PaymentForm({
  navigation,
  title,
  subTitle,
  loading,
  scrollRef,
  amount,
  setAmount,
  handleAmountChange,
  amountTitle = 'Amount',
  party,
  payment,
  date,
  note,
  setNote,
  onFieldFocus,
  onSave,
  saveTitle = 'Save Payment',
  children,
}) {
  const focus = value => onFieldFocus?.(value);

  return (
    <View style={styles.screen}>
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={false}
        showBack
        Margin={false}
        showPlus={false}
        title={title}
        subTitle={subTitle}
        back={() => navigation.goBack()}
      />
      <Loader visible={loading} />

      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.screen}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AmountInput
            amount={amount}
            setAmount={setAmount}
            currency="Rs"
            amountTitle={amountTitle}
            placeholder="0"
            handleAmountChange={handleAmountChange}
            onFocus={() => focus(true)}
            onBlur={() => focus(false)}
          />

          {party ? (
            <View style={styles.section}>
              <SentToInput navigation={navigation} {...party} />
            </View>
          ) : null}

          <View style={styles.section}>
            <DatePicker {...date} timePicker={false} />
          </View>

          <View style={styles.section}>
            <PaymentMethod amount={amount} {...payment} />
          </View>

          <View style={styles.section}>
            <NoteInput
              note={note}
              setNote={setNote}
              onFocus={() => {
                focus(true);
                setTimeout(
                  () => scrollRef?.current?.scrollToEnd({ animated: true }),
                  150,
                );
              }}
              onBlur={() => focus(false)}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <SavePayment amount={amount} onPress={onSave} title={saveTitle} />
        </View>
      </KeyboardAvoidingView>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  section: {
    marginTop: spacing.lg,
  },
  footer: {
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});
