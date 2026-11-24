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
import sizeHelper from '../helpers/sizeHelper';
import SearchBar from '../components/SearchBar';
import { theme } from '../theme';
import { t } from '../i18n';

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
  placeholder = t('money.chooseCustomer'),
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
            size={theme.sizes.icon.md}
            color={theme.colors.textSecondary}
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
            size={theme.sizes.icon.lg}
            color={theme.colors.textSecondary}
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
                  <Text style={styles.modalTitle}>
                    {t('money.chooseCustomer')}
                  </Text>

                  <TouchableOpacity
                    style={styles.iconBorder}
                    onPress={() => setVisible(false)}
                  >
                    <Icon
                      name="close"
                      size={sizeHelper.calHp(48)}
                      color={theme.colors.textPrimary}
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
                        placeholder={t('common.searchName')}
                        style1={{
                          backgroundColor: theme.colors.surfaceMuted,
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
                            color={theme.colors.primary}
                          />

                          <Text style={styles.CusText}>
                            {t('money.addNewCustomer')}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.cusLen}>
                        <Text style={styles.cusLenText}>
                          ALL CUSTOMERS · {cusLength ?? getNames?.length ?? 0}
                        </Text>
                        {onDelete ? (
                          <Text style={styles.deleteHint}>
                            {t('money.deleteHint')}
                          </Text>
                        ) : null}
                      </View>
                    </View>
                  }
                  ListEmptyComponent={
                    <Text style={styles.emptyText}>
                      {t('customer.noneFound')}
                    </Text>
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
                          // Deleting is a long press, so a quick tap while
                          // choosing someone can never delete them.
                          onLongPress={
                            onDelete ? () => onDelete(item) : undefined
                          }
                          delayLongPress={600}
                          accessibilityHint={
                            onDelete ? 'Press and hold to delete' : undefined
                          }
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
                          {sentTo === item.Name && (
                            <View style={styles.tickBorder}>
                              <Icon
                                name="check"
                                size={sizeHelper.calHp(30)}
                                color={theme.colors.onPrimary}
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
    marginTop: theme.spacing.md,
  },

  cardCon: {
    marginHorizontal: theme.spacing.lg,
  },

  // Same look as ui/Card
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleContainer: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },

  label: {
    ...theme.typography.label,
    color: theme.colors.textPrimary,
    marginHorizontal: theme.spacing.lg,
  },

  // Same look as ui/TextField
  inputWrapper: {
    marginTop: theme.spacing.sm,
    minHeight: 52,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },

  personIcon: {
    marginRight: theme.spacing.sm,
  },

  inputText: {
    flex: 1,
    ...theme.typography.body,
    lineHeight: undefined,
    color: theme.colors.textPrimary,
  },

  placeholder: {
    color: theme.colors.textMuted,
  },

  deleteHint: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },

  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'flex-end',
    width: '100%',
  },

  dropdown: {
    width: '100%',
    backgroundColor: theme.colors.surface,
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
    fontFamily: theme.fontFamily.regular,
    fontWeight: '700',
    marginLeft: sizeHelper.calWp(5),
    color: theme.colors.textPrimary,
  },

  iconBorder: {
    height: sizeHelper.calHp(90),
    width: sizeHelper.calHp(90),
    backgroundColor: theme.colors.surfaceMuted,
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
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    marginLeft: sizeHelper.calWp(40),
    marginRight: sizeHelper.calWp(20),
    fontFamily: theme.fontFamily.regular,
  },

  emptyText: {
    textAlign: 'center',
    paddingVertical: sizeHelper.calHp(50),
    color: theme.colors.textSecondary,
    fontFamily: theme.fontFamily.regular,
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
    borderColor: theme.colors.primary,
  },

  CusText: {
    color: theme.colors.primary,
    fontFamily: theme.fontFamily.regular,
    fontWeight: 'bold',
  },

  iconPlus: {
    marginTop: sizeHelper.calHp(10),
  },

  cusLen: {
    marginTop: sizeHelper.calHp(30),
  },

  cusLenText: {
    color: theme.colors.textMuted,
    fontWeight: 'bold',
    marginBottom: sizeHelper.calHp(20),
    fontFamily: theme.fontFamily.regular,
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
    fontFamily: theme.fontFamily.regular,
  },

  selected: {
    backgroundColor: theme.colors.primarySoft,
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
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizeHelper.calHp(49),
  },

  customerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.colors.primary,
    marginTop: sizeHelper.calHp(20),
    height: sizeHelper.calHp(140),
    borderRadius: sizeHelper.calHp(40),
    justifyContent: 'center',
  },

  selectedText: {
    color: theme.colors.onPrimary,
    fontWeight: 'bold',
  },
});
