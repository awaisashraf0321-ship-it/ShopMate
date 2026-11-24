import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import sizeHelper from '../helpers/sizeHelper';

const periods = [
  { id: 'Daily', label: 'Daily', icon: 'calendar-outline' },
  { id: 'Weekly', label: 'Weekly', icon: 'stats-chart-outline' },
  { id: 'Monthly', label: 'Monthly', icon: 'calendar-number-outline' },
  { id: 'Yearly', label: 'Yearly', icon: 'calendar-clear-outline' },
];

const PeriodModal = ({ visible, onClose, selectedPeriod, onSelect }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalBox}>
          {periods.map(period => {
            const isSelected = selectedPeriod === period.id;

            return (
              <TouchableOpacity
                key={period.id}
                style={styles.optionWrapper}
                onPress={() => {
                  onSelect(period.id);
                  onClose();
                }}
                activeOpacity={0.8}
              >
                {isSelected ? (
                  <LinearGradient
                    colors={['#8A56FF', '#FF6B9E']}
                    style={styles.optionSelected}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Icon
                      name={period.icon}
                      size={sizeHelper.calHp(18)}
                      color="#FFFFFF"
                    />

                    <Text style={styles.optionLabelSelected}>
                      {period.label}
                    </Text>

                    <Icon
                      name="checkmark"
                      size={sizeHelper.calHp(18)}
                      color="#FFFFFF"
                      style={styles.checkIcon}
                    />
                  </LinearGradient>
                ) : (
                  <View style={styles.optionUnselected}>
                    <Icon
                      name={period.icon}
                      size={sizeHelper.calHp(18)}
                      color="#1A1A1A"
                    />

                    <Text style={styles.optionLabel}>{period.label}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PeriodModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 24, 24, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: sizeHelper.calHp(18),
    padding: sizeHelper.calWp(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: sizeHelper.calHp(8),
    },
    shadowOpacity: 0.15,
    shadowRadius: sizeHelper.calHp(20),
    elevation: 10,
  },

  optionWrapper: {
    marginBottom: sizeHelper.calHp(4),
  },

  optionSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(16),
    paddingVertical: sizeHelper.calHp(14),
    borderRadius: sizeHelper.calHp(12),
    gap: sizeHelper.calWp(12),
  },

  optionUnselected: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(16),
    paddingVertical: sizeHelper.calHp(14),
    borderRadius: sizeHelper.calHp(12),
    gap: sizeHelper.calWp(12),
  },

  optionLabel: {
    flex: 1,
    fontSize: sizeHelper.calHp(14),
    fontWeight: '600',
    color: '#1A1A1A',
  },

  optionLabelSelected: {
    flex: 1,
    fontSize: sizeHelper.calHp(14),
    fontWeight: '700',
    color: '#FFFFFF',
  },

  checkIcon: {
    marginLeft: 'auto',
  },
});
