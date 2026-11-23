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
import sizeHelper from '../../../helpers/sizeHelper';
import DropdownStylishBtn from '../../../components/DropdownStylishBtn';
import Loader from '../../../components/Loader';
import styles from '../MonthlyMain/style';
import ConfirmModal from '../../../components/ConfirmModal';
import { theme, categoryStyle } from '../../../theme';
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
  const getCategoryStyle = categoryStyle;

  const matching = getCategoryStyle(idResponse?.ExpenseCategory);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle="dark-content"
      />
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
                  color={theme.colors.textSecondary}
                />
                <Text style={styles.dateText}>
                  {formatDate?.(idResponse?.Date)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>
              Rs {formatAmount(idResponse?.Amount)}
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
                { backgroundColor: theme.colors.warningSoft },
              ]}
            >
              <Icon
                name="calendar-month"
                size={23}
                color={theme.colors.warning}
              />
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
                { backgroundColor: theme.colors.successSoft },
              ]}
            >
              <Icon name="sell" size={23} color={theme.colors.success} />
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
                { backgroundColor: theme.colors.warningSoft },
              ]}
            >
              <Icon name="payments" size={23} color={theme.colors.warning} />
            </View>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.detailValue}>
              Rs {formatAmount(idResponse?.Amount)}
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
            color={theme.colors.danger}
          />
          <Text style={styles.deleteButtonText}>Delete Expense</Text>
        </TouchableOpacity>
        <ConfirmModal
          visible={deleteModal2}
          icon="delete"
          tone="danger"
          title="Are You Sure?"
          deleteText="Delete"
          subTitle1="This payment will be permanently deleted."
          subTitle2="Do you want to continue?"
          onClose={() => SetDeleteModal2(false)}
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
