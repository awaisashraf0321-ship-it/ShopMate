import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../theme/colors';
import sizeHelper from '../helpers/sizeHelper';

const NoteInput = ({
  onFocus,
  onBlur,
  note,
  setNote,
  placeholder = 'e.g.invoice#1042,PartialPayment ',
  style,
  myNote = true,
}) => {
  return (
    <View style={styles.container}>
      {myNote && <Text style={styles.label}>Note</Text>}

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={[styles.inputWrapper, style]}>
          <TextInput
            style={styles.input}
            value={note}
            onChangeText={setNote}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            onFocus={onFocus}
            onBlur={onBlur}
          />

          <Icon
            name="edit"
            size={sizeHelper.calHp(36)}
            color={colors.textSecondary}
            style={styles.pencil}
          />
        </View>
      </View>
    </View>
  );
};

export default NoteInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: sizeHelper.calWp(40),
  },

  label: {
    fontSize: sizeHelper.calHp(30),
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: sizeHelper.calHp(20),
  },

  inputWrapper: {
    width: '100%',
    borderRadius: sizeHelper.calHp(35),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColor,
    paddingHorizontal: sizeHelper.calWp(30),
    paddingVertical: sizeHelper.calHp(25),
    flexDirection: 'row',
  },

  input: {
    minHeight: sizeHelper.calHp(120),
    padding: 0,
    width: '90%',
    marginRight: sizeHelper.calWp(15),
    fontSize: sizeHelper.calHp(27),
    color: colors.textPrimary,
    textAlignVertical: 'top',
  },

  pencil: {
    marginTop: sizeHelper.calHp(5),
  },
});
