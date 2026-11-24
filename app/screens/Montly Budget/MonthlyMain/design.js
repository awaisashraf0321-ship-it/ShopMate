import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import colors1 from '../../../theme/myColors';
import sizeHelper from '../../../helpers/sizeHelper';
import DropdownStylishBtn from '../../../components/DropdownStylishBtn';
import Loader from '../../../components/Loader';
import colors from '../../../theme/colors';
import styles from '../MonthlyMain/style';
import ConfirmModal from '../../../components/ConfirmModal';
const Design = ({
  navigation,
  handleMonthlyGetById,
  idResponse,
  loader,
  formatDate,
  formatAmount,
  deleteModal2,
  SetDeleteModal2,
  selectedPaymentId2,
  setSelectedPaymentId2,
  handleDelete,
}) => {
  const getCategoryStyle = Category => {
    if (Category === 'Bill Expense') {
      return {
        icon: 'receipt-long',
        color: '#FCE8E8',
        iconColor: colors.dot,
      };
    }

    if (Category === 'Education & Learning') {
      return {
        icon: 'school',
        color: '#EDE7F6',
        iconColor: '#7E57C2',
      };
    }

    if (Category === 'Entertainment & Leisure') {
      return {
        icon: 'movie',
        color: '#FCE4EC',
        iconColor: '#D81B60',
      };
    }

    if (Category === 'Family & Personal Care') {
      return {
        icon: 'people',
        color: '#E0F2F1',
        iconColor: '#00897B',
      };
    }

    if (Category === 'Food & Groceries') {
      return {
        icon: 'restaurant',
        color: '#FFF3E0',
        iconColor: '#EF6C00',
      };
    }

    if (Category === 'Health & Medical') {
      return {
        icon: 'medical-services',
        color: '#FCE8E8',
        iconColor: '#E53935',
      };
    }

    if (Category === 'Home Expense') {
      return {
        icon: 'home',
        color: '#ECF5D9',
        iconColor: colors.categoryTravel,
      };
    }

    if (Category === 'Mobile & Internet') {
      return {
        icon: 'phone-iphone',
        color: '#E3F2FD',
        iconColor: '#1976D2',
      };
    }

    if (Category === 'Other') {
      return {
        icon: 'category',
        color: '#ECEFF1',
        iconColor: '#546E7A',
      };
    }

    if (Category === 'Saving & Investments') {
      return {
        icon: 'savings',
        color: '#E8F5E9',
        iconColor: '#388E3C',
      };
    }

    if (Category === 'Shopping & Clothing') {
      return {
        icon: 'shopping-bag',
        color: '#F3E5F5',
        iconColor: '#8E24AA',
      };
    }

    if (Category === 'Transportation') {
      return {
        icon: 'directions-car',
        color: '#E8F0FE',
        iconColor: '#3F51B5',
      };
    }

    return {
      icon: 'apps',
      color: '#E8F0FE',
      iconColor: colors.categoryClothing,
    };
  };

  const matching = getCategoryStyle(idResponse?.ExpenseCategory);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors1.background} barStyle="dark-content" />
      <DropdownStylishBtn
        navigation={navigation}
        showDropdown={false}
        showBack={true}
        showPlus={false}
        title="Expense Detail"
        subTitle=" Manage your  expenses details"
        showIcon={true}
        back={() => navigation.goBack()}
      />
      <Loader visible={loader} />
      <View style={styles.scrollContent}>
        {/* Header */}

        {/* Expense Main Card */}
        <View style={styles.mainCard}>
          <View style={styles.expenseHeader}>
            <View
              style={[styles.categoryIcon, { backgroundColor: matching.color }]}
            >
              <Icon
                name={matching.icon}
                size={sizeHelper.calHp(60)}
                color={matching.iconColor}
              />
            </View>

            <View style={styles.categoryInfo}>
              <Text style={styles.categoryTitle}>
                {idResponse?.ExpenseCategory}
              </Text>

              <View style={styles.dateRow}>
                <Icon
                  name="calendar-month"
                  size={sizeHelper.calHp(40)}
                  color={colors1.textSecondary}
                />
                <Text style={styles.dateText}>
                  {formatDate?.(idResponse?.Date)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>
              Rs. {formatAmount(idResponse?.Amount)}
            </Text>
          </View>
        </View>

        {/* Expense Information */}

        {/* Expense Information */}
        <View style={styles.detailsCard}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Expense Information</Text>
          </View>

          {/* Date */}
          <View style={styles.detailRow}>
            <View
              style={[
                styles.detailIcon,
                { backgroundColor: colors1.accentLight },
              ]}
            >
              <Icon name="calendar-month" size={23} color={colors1.accent} />
            </View>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>
              {formatDate(idResponse?.Date)}
            </Text>
          </View>

          {/* Category */}
          <View style={styles.detailRow}>
            <View
              style={[
                styles.detailIcon,
                { backgroundColor: colors1.successLight },
              ]}
            >
              <Icon name="sell" size={23} color={colors1.success} />
            </View>
            <Text style={styles.detailLabel}>Category</Text>
            <Text style={styles.detailValue}>
              {idResponse?.ExpenseCategory}
            </Text>
          </View>

          {/* Amount */}
          <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
            <View
              style={[
                styles.detailIcon,
                { backgroundColor: colors1.accentLight },
              ]}
            >
              <Icon name="payments" size={23} color={colors1.accent} />
            </View>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.detailValue}>
              Rs. {formatAmount(idResponse?.Amount)}
            </Text>
          </View>
        </View>

        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          activeOpacity={0.8}
          onPress={() => {
            SetDeleteModal2(true);
            setSelectedPaymentId2(idResponse?.Id);
          }}
        >
          <Icon
            name="delete-outline"
            size={sizeHelper.calHp(60)}
            color={colors1.danger}
          />
          <Text style={styles.deleteButtonText}>Delete Expense</Text>
        </TouchableOpacity>
        <ConfirmModal
          visible={deleteModal2}
          icon="delete"
          style={{ backgroundColor: colors.lightDot }}
          iconColor={colors.redColor}
          title="Are You Sure?"
          deleteText="Delete"
          subTitle1="This payment will be permanently deleted."
          subTitle2="Do you want to continue?"
          onClose={() => SetDeleteModal2(false)}
          btnStyle={{ backgroundColor: colors.redColor }}
          onOk={() => {
            handleDelete.mutate(selectedPaymentId2);
            SetDeleteModal2(false);
          }}
        />
      </View>
    </View>
  );
};

export default Design;
