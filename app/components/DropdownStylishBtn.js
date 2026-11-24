import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import { useModule } from '../components/ModuleContext';
import sizeHelper from '../helpers/sizeHelper';
import colors from '../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const DropdownStylishBtn = ({
  navigation,
  showDropdown = true,
  showBack = false,
  showPlus = false,
  onPlusPress,
  back,
  title,
  subTitle,
  Margin = true,
}) => {
  const { selectedModule, setSelectedModule } = useModule();
  const [visible, setVisible] = useState(false);

  const options = [
    {
      title: 'Business Expense',
      subtitle: 'Manage your business accounts',
      icon: 'storefront',
    },
    {
      title: 'Self Expense',
      subtitle: 'Track your personal expenses',
      icon: 'person',
    },
  ];

  const handleSelect = item => {
    setSelectedModule(item.title);
    setVisible(false);
  };

  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: Margin ? sizeHelper.calHp(40) : sizeHelper.calHp(20),
        },
      ]}
    >
      {/* BACK, DROPDOWN AND PLUS BUTTONS */}
      <View style={styles.topBar}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={back}
            hitSlop={10}
            activeOpacity={0.7}
          >
            <Icon
              name="chevron-left"
              size={sizeHelper.calHp(68)}
              color={colors.dark}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonPlaceholder} />
        )}

        {showDropdown ? (
          <TouchableOpacity
            style={styles.dropdownButton}
            activeOpacity={0.85}
            onPress={() => setVisible(true)}
          >
            <View style={styles.topIconContainer}>
              <Icon
                name="storefront"
                size={sizeHelper.calHp(30)}
                color="#7438F5"
              />
            </View>

            <Text style={styles.selectedText}>{selectedModule}</Text>

            <Icon
              name="keyboard-arrow-down"
              size={sizeHelper.calHp(52)}
              color={colors.chevronDown}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.dropdownContainer}>
            <Text style={styles.profileTitle}>{title}</Text>
            <Text style={styles.profileSubtitle}>{subTitle}</Text>
          </View>
        )}

        {showPlus ? (
          <TouchableOpacity
            style={styles.plusButton}
            onPress={onPlusPress}
            hitSlop={10}
            activeOpacity={0.7}
          >
            <Icon name="add" size={sizeHelper.calHp(52)} color={colors.white} />
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonPlaceholder} />
        )}
      </View>

      {/* DROPDOWN MODAL */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <Pressable
            style={styles.dropdownMenu}
            onPress={event => event.stopPropagation()}
          >
            <View style={styles.menuHeader}>
              <View style={styles.headerTitleContainer}>
                <Icon
                  name="storefront"
                  size={sizeHelper.calHp(34)}
                  color="#8996B5"
                />

                <Text style={styles.headerTitle}>Select Business Type</Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                activeOpacity={0.7}
                onPress={() => setVisible(false)}
              >
                <Icon
                  name="close"
                  size={sizeHelper.calHp(32)}
                  color="#8490AD"
                />
              </TouchableOpacity>
            </View>

            {options.map(item => {
              const isSelected = selectedModule === item.title;

              return (
                <TouchableOpacity
                  key={item.title}
                  activeOpacity={0.85}
                  style={styles.optionWrapper}
                  onPress={() => handleSelect(item)}
                >
                  {isSelected ? (
                    <LinearGradient
                      colors={['#9148F8', '#C348E8']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.optionSelected}
                    >
                      <View style={styles.optionIconSelected}>
                        <Icon
                          name={item.icon}
                          size={sizeHelper.calHp(40)}
                          color="#FFFFFF"
                        />
                      </View>

                      <View style={styles.optionTextContainer}>
                        <Text style={styles.selectedOptionTitle}>
                          {item.title}
                        </Text>

                        <Text style={styles.selectedSubtitle}>
                          {item.subtitle}
                        </Text>
                      </View>

                      <View style={styles.checkCircle}>
                        <Icon
                          name="check"
                          size={sizeHelper.calHp(26)}
                          color="#9C48ED"
                        />
                      </View>
                    </LinearGradient>
                  ) : (
                    <View style={styles.optionUnselected}>
                      <View style={styles.optionIconUnselected}>
                        <Icon
                          name={item.icon}
                          size={sizeHelper.calHp(40)}
                          color="#843CF2"
                        />
                      </View>

                      <View style={styles.optionTextContainer}>
                        <Text style={styles.optionTitle}>{item.title}</Text>

                        <Text style={styles.optionSubtitle}>
                          {item.subtitle}
                        </Text>
                      </View>

                      <View style={styles.radioCircle} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default DropdownStylishBtn;

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    elevation: 20,
    marginTop: sizeHelper.calHp(130),
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: sizeHelper.calHp(40),
    marginHorizontal: sizeHelper.calWp(30),
    minHeight: sizeHelper.calHp(110),
  },

  buttonPlaceholder: {
    width: sizeHelper.calWp(105),
    height: sizeHelper.calHp(105),
  },

  backButton: {
    width: sizeHelper.calHp(100),
    height: sizeHelper.calHp(100),
    borderRadius: sizeHelper.calHp(64),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,
  },

  plusButton: {
    width: sizeHelper.calHp(100),
    height: sizeHelper.calHp(100),
    borderRadius: sizeHelper.calHp(34),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    zIndex: 10,
  },

  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: sizeHelper.calWp(16),
    paddingVertical: sizeHelper.calHp(14),
    paddingHorizontal: sizeHelper.calWp(50),
    borderRadius: sizeHelper.calHp(60),
    borderWidth: sizeHelper.calWp(1),
    borderColor: colors.border,
    backgroundColor: colors.white,
    elevation: 1,
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.18,
    shadowRadius: sizeHelper.calHp(12),
    shadowOffset: {
      width: sizeHelper.calWp(0),
      height: sizeHelper.calHp(4),
    },
  },

  topIconContainer: {
    width: sizeHelper.calWp(62),
    height: sizeHelper.calHp(50),
    borderRadius: sizeHelper.calHp(15),
    backgroundColor: colors.dropdownStylishButton,
    borderWidth: sizeHelper.calWp(1),
    borderColor: colors.borderDropdown,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedText: {
    fontSize: sizeHelper.calHp(35),
    fontWeight: '699',
    fontFamily: 'PlusJakartaSans-Bold',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: sizeHelper.calHp(160),
  },

  dropdownMenu: {
    width: '92%',
    marginTop: sizeHelper.calHp(36),
    maxWidth: sizeHelper.calWp(650),
    backgroundColor: colors.white,
    borderRadius: sizeHelper.calHp(30),
    paddingHorizontal: sizeHelper.calWp(20),
    paddingTop: sizeHelper.calHp(22),
    paddingBottom: sizeHelper.calHp(20),
    borderWidth: sizeHelper.calWp(1),
    borderColor: colors.myBorderColor,
    elevation: 18,
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.22,
    shadowRadius: sizeHelper.calHp(24),
    shadowOffset: {
      width: sizeHelper.calWp(0),
      height: sizeHelper.calHp(10),
    },
  },

  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: sizeHelper.calHp(18),
    paddingHorizontal: sizeHelper.calWp(8),
  },

  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizeHelper.calWp(14),
    flex: 1,
  },

  headerTitle: {
    fontSize: sizeHelper.calHp(30),
    fontWeight: '600',
    color: colors.headerTitle,
  },

  closeButton: {
    width: sizeHelper.calWp(50),
    height: sizeHelper.calHp(50),
    borderRadius: sizeHelper.calHp(30),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionWrapper: {
    marginBottom: sizeHelper.calHp(14),
    borderRadius: sizeHelper.calHp(26),
    overflow: 'hidden',
  },

  optionSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: sizeHelper.calHp(125),
    paddingHorizontal: sizeHelper.calWp(20),
    paddingVertical: sizeHelper.calHp(18),
    borderRadius: sizeHelper.calHp(26),
  },

  optionIconSelected: {
    width: sizeHelper.calWp(76),
    height: sizeHelper.calHp(76),
    borderRadius: sizeHelper.calHp(40),
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: sizeHelper.calWp(1.5),
    borderColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionTextContainer: {
    flex: 1,
    marginLeft: sizeHelper.calWp(18),
    justifyContent: 'center',
  },

  selectedOptionTitle: {
    fontSize: sizeHelper.calHp(30),
    fontWeight: '700',
    color: colors.white,
    marginBottom: sizeHelper.calHp(6),
  },

  selectedSubtitle: {
    fontSize: sizeHelper.calHp(22),
    fontWeight: '400',
    color: colors.selectedSubtitle,
    lineHeight: sizeHelper.calHp(24),
  },

  checkCircle: {
    width: sizeHelper.calWp(38),
    height: sizeHelper.calHp(38),
    borderRadius: sizeHelper.calHp(25),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: sizeHelper.calWp(10),
  },

  optionUnselected: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: sizeHelper.calHp(125),
    paddingHorizontal: sizeHelper.calWp(20),
    paddingVertical: sizeHelper.calHp(18),
    backgroundColor: colors.white,
    borderRadius: sizeHelper.calHp(26),
  },

  optionIconUnselected: {
    width: sizeHelper.calWp(76),
    height: sizeHelper.calHp(76),
    borderRadius: sizeHelper.calHp(40),
    backgroundColor: '#F0E5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionTitle: {
    fontSize: sizeHelper.calHp(30),
    fontWeight: '700',
    color: '#142957',
    marginBottom: sizeHelper.calHp(6),
  },

  optionSubtitle: {
    fontSize: sizeHelper.calHp(22),
    color: colors.headerTitle,
    transform: [{ translateX: sizeHelper.calHp(-20) }],
    lineHeight: sizeHelper.calHp(24),
  },

  radioCircle: {
    width: sizeHelper.calWp(38),
    height: sizeHelper.calHp(38),
    borderRadius: sizeHelper.calHp(25),
    borderWidth: sizeHelper.calWp(2.5),
    borderColor: colors.radioCircle,
    marginLeft: sizeHelper.calWp(10),
  },

  dropdownContainer: {
    paddingHorizontal: sizeHelper.calWp(40),
    paddingTop: sizeHelper.calHp(25),
  },

  profileTitle: {
    fontSize: sizeHelper.calHp(60),
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontWeight: 'bold',
    color: colors.dark,
  },

  profileSubtitle: {
    fontSize: sizeHelper.calHp(27),
    fontFamily: 'PlusJakartaSans-Regular',
    color: colors.headerSubtitle,
    marginBottom: sizeHelper.calHp(30),
    marginTop: sizeHelper.calHp(4),
    transform: [{ translateX: sizeHelper.calHp(0) }],
  },
});
