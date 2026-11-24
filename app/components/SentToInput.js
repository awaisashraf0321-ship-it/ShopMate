import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../theme/colors';
import sizeHelper from '../helpers/sizeHelper';
import SearchBar from '../components/SearchBar';

const SentToInput = ({
  search,
  navigation,
  setSearch,
  sentTo,
  text,
  setSentTo,
  getNames,
  setSelectedCustomerId,
  visible,
  setVisible,
  cusLength,
  onDelete,
  SetDeleteModal4,
  placeholder = 'Choose a Customer',
}) => {
  const insets = useSafeAreaInsets();

  const handleSelect = item => {
    setSentTo(item.Name);
    setSelectedCustomerId(item.Id);
    setVisible(false);
  };

  const avatarColors = [
    '#FFEBD5',
    '#DCEAFF',
    '#DDF5E8',
    '#EDE7FF',
    '#FFE0E3',
    '#D9F5F2',
    '#F9E4D4',
    '#E5E7EB',
  ];

  const avatarTextColors = [
    '#9A3412',
    '#1E40AF',
    '#166534',
    '#6B21A8',
    '#9F1239',
    '#115E59',
    '#92400E',
    '#374151',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{text}</Text>

      <View style={styles.cardCon}>
        <View style={styles.header}></View>

        <TouchableOpacity
          style={styles.inputWrapper}
          activeOpacity={0.7}
          onPress={() => setVisible(true)}
        >
          <Icon
            name="person-outline"
            size={sizeHelper.calHp(38)}
            color={colors.textSecondary}
            style={styles.personIcon}
          />

          <Text
            style={[styles.inputText, !sentTo && styles.placeholder]}
            numberOfLines={1}
          >
            {sentTo || placeholder}
          </Text>

          <Icon
            name="keyboard-arrow-down"
            size={sizeHelper.calHp(42)}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={{ flex: 1, marginBottom: insets.bottom }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
          >
            <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
              <Pressable
                style={styles.dropdown}
                onPress={event => event.stopPropagation()}
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Choose Customer</Text>

                  <TouchableOpacity
                    style={styles.iconBorder}
                    onPress={() => setVisible(false)}
                  >
                    <Icon
                      name="close"
                      size={sizeHelper.calHp(48)}
                      color="#333"
                    />
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={getNames || []}
                  keyExtractor={item => item.Id.toString()}
                  initialNumToRender={40}
                  windowSize={5}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={
                    <View>
                      <SearchBar
                        search={search}
                        setSearch={setSearch}
                        placeholder="Search by name"
                        style1={{
                          backgroundColor: '#e8f0fe9d',
                          width: '100%',
                          marginHorizontal: sizeHelper.calWp(0),
                        }}
                      />

                      <View style={styles.addCusCon}>
                        <TouchableOpacity
                          onPress={() => navigation.navigate('AddCustomer')}
                          style={styles.addCus}
                        >
                          <Icon
                            style={styles.iconPlus}
                            name="add"
                            size={sizeHelper.calHp(40)}
                            color={colors.primary}
                          />

                          <Text style={styles.CusText}>Add new Customer</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.cusLen}>
                        <Text style={styles.cusLenText}>
                          ALL CUSTOMERS .{cusLength}
                        </Text>
                      </View>
                    </View>
                  }
                  ListEmptyComponent={
                    <Text style={styles.emptyText}>No customers found</Text>
                  }
                  renderItem={({ item }) => {
                    const name = String(item.Name || 'Unknown').toUpperCase();

                    const initials = name
                      .trim()
                      .split(/\s+/)
                      .slice(0, 2)
                      .map(part => part.charAt(0))
                      .join('')
                      .toUpperCase();

                    const firstInitials = initials.charAt(0).toUpperCase();
                    const alaphabetIndex = firstInitials.charCodeAt(0) - 65;

                    const myAvatar =
                      avatarColors[
                        (alaphabetIndex >= 0 && alaphabetIndex <= 25
                          ? alaphabetIndex
                          : 0) % avatarColors.length
                      ];

                    const myAvatarText =
                      avatarTextColors[
                        (alaphabetIndex >= 0 && alaphabetIndex <= 25
                          ? alaphabetIndex
                          : 0) % avatarTextColors.length
                      ];

                    return (
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.option,
                            sentTo === item.Name && styles.selected,
                          ]}
                          onPress={() => handleSelect(item)}
                        >
                          <View
                            style={[
                              styles.avatar,
                              sentTo === item.Name && styles.myAvatar,
                              { backgroundColor: myAvatar },
                            ]}
                          >
                            <Text
                              style={[styles.initials, { color: myAvatarText }]}
                            >
                              {initials}
                            </Text>
                          </View>

                          <Text style={styles.optionText}>{item.Name}</Text>
                          <TouchableOpacity onPress={() => onDelete(item)}>
                            <Icon
                              name="delete"
                              size={sizeHelper.calHp(60)}
                              color="red"
                            />
                          </TouchableOpacity>
                          {sentTo === item.Name && (
                            <View style={styles.tickBorder}>
                              <Icon
                                name="check"
                                size={sizeHelper.calHp(30)}
                                color={colors.white}
                              />
                            </View>
                          )}
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </Pressable>
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

export default SentToInput;

const styles = StyleSheet.create({
  container: {
    marginTop: sizeHelper.calHp(15),
  },

  cardCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: sizeHelper.calHp(35),
    marginHorizontal: sizeHelper.calWp(29),
    width: '94%',
    paddingVertical: sizeHelper.calHp(28),
    elevation: 3,
    shadowColor: colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: sizeHelper.calHp(4),
    },
    shadowOpacity: 0.07,
    shadowRadius: sizeHelper.calHp(12),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconCircle: {
    width: sizeHelper.calWp(78),
    height: sizeHelper.calHp(78),
    borderRadius: sizeHelper.calHp(50),
    backgroundColor: colors.primaryGradientStart,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleContainer: {
    marginLeft: sizeHelper.calWp(22),
    flex: 1,
  },

  label: {
    fontSize: sizeHelper.calHp(30),
    marginHorizontal: sizeHelper.calWp(40),
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: '700',
    color: colors.textPrimary,
  },

  inputWrapper: {
    marginTop: sizeHelper.calHp(22),
    minHeight: sizeHelper.calHp(125),
    borderRadius: sizeHelper.calHp(25),
    backgroundColor: colors.white,
    width: '94%',
    borderWidth: 1,
    borderColor: colors.borderColor,
    paddingHorizontal: sizeHelper.calWp(22),
    flexDirection: 'row',
    alignItems: 'center',
  },

  personIcon: {
    marginRight: sizeHelper.calWp(20),
    marginLeft: sizeHelper.calWp(10),
  },

  inputText: {
    flex: 1,
    fontSize: sizeHelper.calHp(30),
    fontWeight: '400',
    fontFamily: 'PlusJakartaSans-Regular',
    color: colors.textPrimary,
  },

  placeholder: {
    color: colors.textSecondary,
    fontWeight: '400',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
    width: '100%',
  },

  dropdown: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: sizeHelper.calHp(46),
    borderTopRightRadius: sizeHelper.calHp(46),
    maxHeight: '75%',
    minWidth: '100%',
    paddingHorizontal: sizeHelper.calWp(48),
    paddingTop: sizeHelper.calHp(35),
    paddingBottom: sizeHelper.calHp(19),
    elevation: 8,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: sizeHelper.calHp(12),
  },

  modalTitle: {
    fontSize: sizeHelper.calHp(43),
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: '700',
    marginLeft: sizeHelper.calWp(5),
    color: colors.textPrimary,
  },

  iconBorder: {
    height: sizeHelper.calHp(90),
    width: sizeHelper.calHp(90),
    backgroundColor: '#E8F0FE',
    borderRadius: sizeHelper.calHp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },

  option: {
    minHeight: sizeHelper.calHp(52),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: sizeHelper.calHp(12),
  },

  optionText: {
    flex: 1,
    fontSize: sizeHelper.calHp(35),
    color: colors.dark,
    fontWeight: 'bold',
    marginLeft: sizeHelper.calWp(40),
    marginRight: sizeHelper.calWp(20),
    fontFamily: 'PlusJakartaSans-Regular',
  },

  emptyText: {
    textAlign: 'center',
    paddingVertical: sizeHelper.calHp(50),
    color: colors.textSecondary,
    fontFamily: 'PlusJakartaSans-Regular',
  },

  addCusCon: {
    marginTop: sizeHelper.calHp(10),
  },

  addCus: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: sizeHelper.calHp(120),
    borderRadius: sizeHelper.calHp(30),
    borderWidth: 1,
    gap: sizeHelper.calWp(20),
    borderStyle: 'dotted',
    borderColor: colors.primary,
  },

  CusText: {
    color: colors.primary,
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: 'bold',
  },

  iconPlus: {
    marginTop: sizeHelper.calHp(10),
  },

  cusLen: {
    marginTop: sizeHelper.calHp(30),
  },

  cusLenText: {
    color: '#808080',
    fontWeight: 'bold',
    marginBottom: sizeHelper.calHp(20),
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: sizeHelper.calHp(30),
  },

  avatar: {
    height: sizeHelper.calHp(110),
    width: sizeHelper.calHp(110),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizeHelper.calHp(30),
  },

  initials: {
    fontSize: sizeHelper.calHp(30),
    fontFamily: 'PlusJakartaSans-Regular',
  },

  selected: {
    backgroundColor: '#DCEAFF',
    borderRadius: sizeHelper.calHp(40),
    height: sizeHelper.calHp(160),
  },

  myAvatar: {
    height: sizeHelper.calHp(0),
  },

  tickBorder: {
    height: sizeHelper.calHp(70),
    marginRight: sizeHelper.calWp(26),
    width: sizeHelper.calWp(70),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizeHelper.calHp(49),
  },

  customerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.primary,
    marginTop: sizeHelper.calHp(20),
    height: sizeHelper.calHp(140),
    borderRadius: sizeHelper.calHp(40),
    justifyContent: 'center',
  },

  selectedText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
