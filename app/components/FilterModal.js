import React from 'react';
import {
  Modal,
  Pressable,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import sizeHelper from '../helpers/sizeHelper';

const PeriodFilterModal = ({
  visible,
  setVisible,
  selectedPeriod,
  setSelectedPeriod,
  periodOptions,
}) => {
  const handleSelect = item => {
    setSelectedPeriod(item.title);
    setVisible(false);
  };

  return (
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
                name="calendar-month"
                size={sizeHelper.calHp(34)}
                color="#8996B5"
              />
              <Text style={styles.headerTitle}>Select Period</Text>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              activeOpacity={0.7}
              onPress={() => setVisible(false)}
            >
              <Icon name="close" size={sizeHelper.calHp(32)} color="#8490AD" />
            </TouchableOpacity>
          </View>

          {periodOptions.map(item => {
            const isSelected = selectedPeriod === item.title;

            return (
              <TouchableOpacity
                key={item.id}
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
  );
};

export default PeriodFilterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 20, 40, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(30),
  },

  dropdownMenu: {
    width: '80%',
    backgroundColor: '#FFFEFF',
    borderRadius: sizeHelper.calHp(32),
    paddingHorizontal: sizeHelper.calWp(24),
    paddingVertical: sizeHelper.calHp(24),
    elevation: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: sizeHelper.calHp(8),
    },
    shadowOpacity: 0.18,
    shadowRadius: 16,
  },

  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: sizeHelper.calHp(24),
    paddingHorizontal: sizeHelper.calWp(6),
  },

  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizeHelper.calWp(12),
  },

  headerTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: sizeHelper.calHp(30),
    color: '#252B43',
    fontWeight: '700',
  },

  closeButton: {
    width: sizeHelper.calWp(52),
    height: sizeHelper.calHp(52),
    borderRadius: sizeHelper.calHp(18),
    backgroundColor: '#F1F2F8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionWrapper: {
    marginBottom: sizeHelper.calHp(14),
  },

  optionSelected: {
    minHeight: sizeHelper.calHp(100),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(18),
    paddingVertical: sizeHelper.calHp(14),
    borderRadius: sizeHelper.calHp(24),
  },

  optionUnselected: {
    minHeight: sizeHelper.calHp(100),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(18),
    paddingVertical: sizeHelper.calHp(14),
    borderRadius: sizeHelper.calHp(24),
    backgroundColor: '#F8F7FC',
    borderWidth: 1,
    borderColor: '#ECE8F6',
  },

  optionIconSelected: {
    width: sizeHelper.calWp(62),
    height: sizeHelper.calHp(62),
    borderRadius: sizeHelper.calHp(20),
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionIconUnselected: {
    width: sizeHelper.calWp(62),
    height: sizeHelper.calHp(62),
    borderRadius: sizeHelper.calHp(20),
    backgroundColor: '#EEE5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionTextContainer: {
    flex: 1,
    marginLeft: sizeHelper.calWp(18),
  },

  selectedOptionTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: sizeHelper.calHp(28),
    color: '#FFFFFF',
    fontWeight: '700',
  },

  optionTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: sizeHelper.calHp(28),
    color: '#292D43',
    fontWeight: '600',
  },

  checkCircle: {
    width: sizeHelper.calWp(38),
    height: sizeHelper.calHp(38),
    borderRadius: sizeHelper.calHp(19),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioCircle: {
    width: sizeHelper.calWp(30),
    height: sizeHelper.calHp(30),
    borderRadius: sizeHelper.calHp(15),
    borderWidth: 2,
    borderColor: '#C9BEDD',
  },
});
