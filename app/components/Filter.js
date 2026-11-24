import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import sizeHelper from '../helpers/sizeHelper';
import colors from '../theme/colors';

const Filter = ({ filtering, activeTab, setActiveTab, setPaymentMethodId }) => {
  return (
    <View style={styles.container}>
      {filtering.map(item => (
        <TouchableOpacity
          onPress={() => {
            setActiveTab(item.id);
            setPaymentMethodId(item.PaymentMethodId);
          }}
          key={item.id}
          style={[
            styles.borderCon,
            {
              backgroundColor:
                activeTab === item.id ? colors.dark : colors.white,
            },
          ]}
        >
          <Text
            style={[
              styles.filterText,
              { color: activeTab === item.id ? colors.white : colors.dark },
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: sizeHelper.calWp(10),
    flexDirection: 'row',
    gap: sizeHelper.calWp(50),
    marginTop: sizeHelper.calHp(20),
    marginBottom: sizeHelper.calHp(30),
  },

  borderCon: {
    height: sizeHelper.calHp(90),
    width: sizeHelper.calWp(175),
    borderRadius: sizeHelper.calHp(70),
    backgroundColor: colors.dark,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterText: {
    color: colors.white,
  },
});
