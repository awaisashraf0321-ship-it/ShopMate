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
import { theme } from '../theme';
import { periodLabel, t } from '../i18n';

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
                color={theme.colors.textMuted}
              />
              <Text style={styles.headerTitle}>{t('period.select')}</Text>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              activeOpacity={0.7}
              onPress={() => setVisible(false)}
            >
              <Icon
                name="close"
                size={sizeHelper.calHp(32)}
                color={theme.colors.textMuted}
              />
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
                  // Gradient as a background layer: padding on LinearGradient
                  // itself renders inset and clipped the row.
                  <View style={styles.optionSelected}>
                    <LinearGradient
                      colors={theme.colors.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.optionFill}
                    />
                    <View style={styles.optionIconSelected}>
                      <Icon
                        name={item.icon}
                        size={sizeHelper.calHp(40)}
                        color={theme.colors.onPrimary}
                      />
                    </View>

                    <View style={styles.optionTextContainer}>
                      <Text style={styles.selectedOptionTitle}>
                        {periodLabel(item.title)}
                      </Text>
                    </View>

                    <View style={styles.checkCircle}>
                      <Icon
                        name="check"
                        size={sizeHelper.calHp(26)}
                        color={theme.colors.primary}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={styles.optionUnselected}>
                    <View style={styles.optionIconUnselected}>
                      <Icon
                        name={item.icon}
                        size={sizeHelper.calHp(40)}
                        color={theme.colors.primary}
                      />
                    </View>

                    <View style={styles.optionTextContainer}>
                      <Text style={styles.optionTitle}>
                        {periodLabel(item.title)}
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
  );
};

export default PeriodFilterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(30),
  },

  dropdownMenu: {
    width: '80%',
    backgroundColor: theme.colors.surface,
    borderRadius: sizeHelper.calHp(32),
    paddingHorizontal: sizeHelper.calWp(24),
    paddingVertical: sizeHelper.calHp(24),
    elevation: 12,
    shadowColor: theme.colors.shadow,
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
    fontFamily: theme.fontFamily.bold,
    fontSize: sizeHelper.calHp(30),
    color: theme.colors.textPrimary,
    fontWeight: '700',
  },

  closeButton: {
    width: sizeHelper.calWp(52),
    height: sizeHelper.calHp(52),
    borderRadius: sizeHelper.calHp(18),
    backgroundColor: theme.colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionWrapper: {
    marginBottom: sizeHelper.calHp(14),
  },

  optionFill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: sizeHelper.calHp(24),
  },

  optionSelected: {
    overflow: 'hidden',
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
    backgroundColor: theme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  optionIconSelected: {
    width: sizeHelper.calWp(62),
    height: sizeHelper.calHp(62),
    borderRadius: sizeHelper.calHp(20),
    backgroundColor: theme.colors.onPrimarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionIconUnselected: {
    width: sizeHelper.calWp(62),
    height: sizeHelper.calHp(62),
    borderRadius: sizeHelper.calHp(20),
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionTextContainer: {
    flex: 1,
    marginLeft: sizeHelper.calWp(18),
  },

  selectedOptionTitle: {
    fontFamily: theme.fontFamily.bold,
    fontSize: sizeHelper.calHp(28),
    color: theme.colors.onPrimary,
    fontWeight: '700',
  },

  optionTitle: {
    fontFamily: theme.fontFamily.semiBold,
    fontSize: sizeHelper.calHp(28),
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },

  checkCircle: {
    width: sizeHelper.calWp(38),
    height: sizeHelper.calHp(38),
    borderRadius: sizeHelper.calHp(19),
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioCircle: {
    width: sizeHelper.calWp(30),
    height: sizeHelper.calHp(30),
    borderRadius: sizeHelper.calHp(15),
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
});
