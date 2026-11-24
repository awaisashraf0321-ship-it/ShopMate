import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors1 from '../theme/myColors';
import sizeHelper from '../helpers/sizeHelper';
import colors from '../theme/colors';

const MonthlySalary = ({
  salary,
  amount,
  handleAmountChange,
  amountTitle,
  setSalaryModalVisible,
  placeholder,
  onUpdate,
  currency = 'Rs.',
  update = false,
  onFocus,
  onBlur,
}) => {
  return (
    <View style={styles.FirstamountContainer}>
      <View style={styles.container}>
        <View style={styles.salaryIcon}>
          <Icon name="savings" size={sizeHelper.calHp(66)} color="#3520C9" />
        </View>

        <View style={styles.salaryInfo}>
          <Text style={styles.title}>{amountTitle}</Text>

          <View style={styles.amountContainer}>
            <Text style={styles.currency}>{currency}</Text>

            <TextInput
              style={styles.amountInput}
              value={amount}
              // onFocus={onFocus}
              // onBlur={onBlur}
              onChangeText={handleAmountChange}
              placeholder={placeholder}
              placeholderTextColor={colors1.textMuted}
              keyboardType="numeric"
            />
          </View>
        </View>

        {update && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.updateButton}
            onPress={() => setSalaryModalVisible(true)}
          >
            <Icon name="edit" size={sizeHelper.calHp(38)} color="#0000009b" />
            <Text style={styles.updateText}>Update</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MonthlySalary;

const styles = StyleSheet.create({
  FirstamountContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '92%',
    minHeight: sizeHelper.calHp(200),
    backgroundColor: colors1.white,
    borderRadius: sizeHelper.calHp(48),
    // marginHorizontal: sizeHelper.calWp(40),
    borderWidth: 1,
    borderColor: colors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(35),
    paddingVertical: sizeHelper.calHp(32),
    marginTop: sizeHelper.calHp(20),
    elevation: 3,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: sizeHelper.calHp(3),
    },
    shadowOpacity: 0.08,
    shadowRadius: sizeHelper.calHp(6),
  },

  salaryIcon: {
    width: sizeHelper.calWp(136),
    height: sizeHelper.calHp(106),
    borderRadius: sizeHelper.calHp(48),
    backgroundColor: colors.IconBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },

  salaryInfo: {
    flex: 1,
    marginLeft: sizeHelper.calWp(32),
  },

  title: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: sizeHelper.calHp(33),
    color: colors1.text,
    marginBottom: sizeHelper.calHp(5),
  },

  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  currency: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: sizeHelper.calHp(35),
    color: colors1.text,
    marginRight: sizeHelper.calWp(12),
  },

  amountInput: {
    flex: 1,
    padding: 0,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: sizeHelper.calHp(35),
    color: colors1.text,
  },

  updateButton: {
    height: sizeHelper.calHp(95),
    borderRadius: sizeHelper.calHp(50),
    backgroundColor: colors.BtnBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: sizeHelper.calWp(33),
    gap: sizeHelper.calWp(20),
  },

  updateText: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: sizeHelper.calHp(30),
    marginBottom: sizeHelper.calHp(10),
    color: colors.textColor,
  },
});
