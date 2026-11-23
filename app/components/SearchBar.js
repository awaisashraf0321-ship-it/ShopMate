import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import sizeHelper from '../helpers/sizeHelper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { string } from 'yup';
import { theme } from '../theme';

const SearchBar = ({ style1, search, setSearch, placeholder, onFocus }) => {
  return (
    <View style={styles.wrapper}>
      <Icon
        style={styles.search}
        name="search"
        size={sizeHelper.calHp(53)}
        color={theme.colors.textMuted}
      />
      <TextInput
        style={[styles.input, style1]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        value={search}
        onFocus={onFocus}
        onChangeText={setSearch}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  input: {
    marginTop: sizeHelper.calHp(20),
    borderWidth: 1,
    fontSize: sizeHelper.calHp(31),
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: sizeHelper.calHp(3),
    },
    shadowRadius: sizeHelper.calHp(8),
    marginBottom: sizeHelper.calHp(12),
    // elevation: 1,
    shadowOpacity: 0.09,
    fontFamily: theme.fontFamily.medium,
    paddingLeft: sizeHelper.calWp(100),
    borderRadius: sizeHelper.calHp(30),
    width: '97%',
    height: sizeHelper.calHp(120),
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary,
    marginHorizontal: sizeHelper.calWp(10),
  },

  wrapper: {
    position: 'relative',
  },

  search: {
    position: 'absolute',
    zIndex: 1,
    left: sizeHelper.calWp(30),
    top: sizeHelper.calHp(55),
  },
});
