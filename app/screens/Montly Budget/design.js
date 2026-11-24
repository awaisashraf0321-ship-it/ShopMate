import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import React from 'react';
import DropdownStylishBtn from '../../components/DropdownStylishBtn';
import AmountInput from '../../components/AmountInput';
import CategorySelector from '../../components/CategorySelector';
import styles from '../Montly Budget/style';
import colors from '../../theme/colors';
import BudgetAmountInput from '../../components/BudgetAmountInput';
import sizeHelper from '../../helpers/sizeHelper';
import SavePayment from '../../components/SavePayment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PaymentCard from '../../components/PaymentCard';
import Loader from '../../components/Loader';
import ConfirmModal from '../../components/ConfirmModal';
import LinearGradient from 'react-native-linear-gradient';
import colors1 from '../../theme/myColors';
import DatePicker from '../../components/DatePicker';
import EditExpenseModal from '../../components/EditExpenseModal';
import UpdateSalaryModal from '../../components/UpdateSalaryModal';

const Design = ({
  navigation,
  amount,
  setAmount,
  Changed,
  date,
  setDate,
  showDate,
  setShowDate,
  showTime,
  setShowTime,
  category,
  setCategory,
  visible,
  setVisible,
  categories,
  selectedCategories,
  expenseAmount,
  setExepnseAmount,
  scrollRef,
  handleMonthly,
  getMonthlyBudget,
  isPending,
  formatAmount,
  formatDate,
  deleteBudget,
  budgetDeleteModal,
  setBudgetdeleteModal,
  selectedPaymentId2,
  setSelectedPaymentId2,
  loader,
  isFetching,
  refreshing,
  onRefresh,
  handleBudgetUpdate,
  updatedApi,
  handleAmountChange,
  editModalVisible,
  setEditModalVisible,
  selectedIcon,
  salaryModalVisible,
  setSalaryModalVisible,
  salary,
  setSalary,
  categoryVisible,
  setCategoryVisible,
  monthlyDashboard,
}) => {
  const percentage = monthlyDashboard?.BudgetUsedPercentage;

  const progress = Math.min(Math.max(percentage, 0), 100);

  const isOverBudger = percentage > 100;

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

  return (
    <View style={styles.top}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      >
        <DropdownStylishBtn
          navigation={navigation}
          showDropdown={false}
          showBack={true}
          showPlus={false}
          title="Monthly Budget"
          subTitle=" Manage your monthly expenses"
          showIcon={true}
          back={() => navigation.goBack()}
        />

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: sizeHelper.calHp(1200),
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {<Loader visible={isFetching || loader} />}
          <LinearGradient
            colors={['#E4F9D5', '#D5F4C5', '#E9FBD9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.overviewCard}
          >
            <Text style={styles.overviewTitle}>Monthly Budget Overview</Text>

            <View style={styles.overviewGrid}>
              {/* Monthly Budget */}
              <View style={styles.overviewItem}>
                <View
                  style={[styles.overviewIcon, { backgroundColor: '#DDF0FF' }]}
                >
                  <Icon
                    name="account-balance-wallet"
                    size={sizeHelper.calHp(48)}
                    color="#2478E8"
                  />
                </View>

                <View style={styles.overviewInfo}>
                  <Text style={styles.overviewLabel}>Monthly Budget</Text>
                  <Text style={styles.overviewAmount}>
                    Rs.
                    {formatAmount(Math.floor(monthlyDashboard?.MonthlySalary))}
                  </Text>
                </View>
              </View>

              {/* Total Expenses */}
              <View style={styles.overviewItem}>
                <View
                  style={[styles.overviewIcon, { backgroundColor: '#FFE5EA' }]}
                >
                  <Icon
                    name="shopping-cart"
                    size={sizeHelper.calHp(48)}
                    color="#F04469"
                  />
                </View>

                <View style={styles.overviewInfo}>
                  <Text style={styles.overviewLabel}>Total Expenses</Text>
                  <Text style={styles.overviewAmount}>
                    Rs.
                    {formatAmount(
                      Math.floor(monthlyDashboard?.TotalAllocatedBudget),
                    )}
                  </Text>
                </View>
              </View>

              {/* Remaining Budget */}
              <View style={styles.overviewItem}>
                <View
                  style={[styles.overviewIcon, { backgroundColor: '#DDF7E4' }]}
                >
                  <Icon
                    name="check-circle"
                    size={sizeHelper.calHp(48)}
                    color="#16B85B"
                  />
                </View>

                <View style={styles.overviewInfo}>
                  <Text style={styles.overviewLabel}>Remaining Budget</Text>
                  <Text style={styles.overviewAmount}>
                    Rs.{' '}
                    {formatAmount(
                      Math.floor(monthlyDashboard?.RemainingBudget),
                    )}
                  </Text>
                </View>
              </View>

              {/* Over Budget */}
              <View
                style={[
                  styles.overviewItem,
                  {
                    backgroundColor: isOverBudger
                      ? colors.redColor
                      : colors1.white,
                  },
                ]}
              >
                <View
                  style={[styles.overviewIcon, { backgroundColor: '#FFE5E5' }]}
                >
                  <Icon
                    name="warning"
                    size={sizeHelper.calHp(46)}
                    color="#F04444"
                  />
                </View>

                <View style={[styles.overviewInfo]}>
                  <Text
                    style={[
                      styles.overviewLabel,
                      { color: isOverBudger ? colors1.white : '#16BD59' },
                    ]}
                  >
                    Over Budget
                  </Text>
                  <Text
                    style={[
                      styles.overviewAmount,
                      { color: isOverBudger ? colors1.white : '#16BD59' },
                    ]}
                  >
                    Rs. {formatAmount(Math.floor(monthlyDashboard?.OverBudget))}
                  </Text>
                </View>
              </View>
            </View>

            {/* Budget Used */}
            <View style={styles.budgetUsedHeader}>
              <Text style={styles.budgetUsedTitle}>Budget Used</Text>

              <Text
                style={[
                  styles.budgetUsedPercentage,
                  { color: isOverBudger ? colors1.danger : '#16BD59' },
                ]}
              >
                {percentage}%
              </Text>
            </View>

            <View style={styles.overviewProgressBackground}>
              <View
                style={[
                  styles.overviewProgressFill,
                  {
                    width: `${progress}%`,
                    backgroundColor: isOverBudger ? colors1.danger : '#16BD59',
                  },
                ]}
              />
            </View>
          </LinearGradient>
          <EditExpenseModal
            visible={editModalVisible}
            onClose={() => setEditModalVisible(false)}
            categories={categories || []}
            category={category}
            setCategory={setCategory}
            selectedIcon={selectedIcon}
            categoryVisible={categoryVisible}
            setCategoryVisible={setCategoryVisible}
            expenseAmount={expenseAmount}
            Changed={Changed}
            date={date}
            setDate={setDate}
            showDate={showDate}
            setShowDate={setShowDate}
            onUpdate={updatedApi}
            loading={loader}
          />

          <UpdateSalaryModal
            visible={salaryModalVisible}
            onClose={() => setSalaryModalVisible(false)}
            salary={salary}
            setSalary={setSalary}
          />
          {/* <AmountInput
            amount={amount}
            setAmount={setAmount}
            amountTitle={' Enter Salary'}
            placeholder={'Enter Salary'}
            update={true}
            setSalaryModalVisible={setSalaryModalVisible}
            currency="Rs"
            handleAmountChange={handleAmountChange}
          /> */}
          <View style={styles.main}>
            <View style={styles.expenseFormCard}>
              <View style={styles.expenseFormHeader}>
                <View style={styles.expenseFormIcon}>
                  <Icon
                    name="add"
                    size={sizeHelper.calHp(45)}
                    color={colors1.white}
                  />
                </View>

                <Text style={styles.expenseFormTitle}>Add Monthly Expense</Text>
              </View>

              <View style={styles.expenseFieldsRow}>
                <View style={[styles.expenseField, { flex: 1.2 }]}>
                  <Text style={styles.expenseFieldLabel}>Category</Text>

                  <CategorySelector
                    categories={categories || []}
                    category={category}
                    setCategory={setCategory}
                    selectedIcon={getCategoryStyle}
                    myOverlay={true}
                    visible={visible}
                    setVisible={setVisible}
                    compact={true}
                    title="Select Category"
                  />
                </View>

                <View style={styles.expenseField}>
                  <Text style={styles.expenseFieldLabel}>Amount</Text>

                  <BudgetAmountInput
                    expenseAmount={expenseAmount}
                    setExepnseAmount={setExepnseAmount}
                    Changed={Changed}
                    compact={true}
                  />
                </View>

                <View style={[styles.expenseField, { flex: 1.2 }]}>
                  <Text style={styles.expenseFieldLabel}>Date</Text>

                  <DatePicker
                    date={date}
                    setDate={setDate}
                    showDate={showDate}
                    setShowDate={setShowDate}
                    showTime={showTime}
                    setShowTime={setShowTime}
                    timePicker={false}
                    compact={true}
                  />
                </View>
              </View>

              <SavePayment
                amount={amount}
                onPress={handleMonthly}
                compact={true}
                title="Save Expense"
              />
            </View>

            <View style={styles.expensesCon}>
              <Text style={styles.expenseText}>Expense History</Text>
              <View style={styles.paymentCon}>
                {getMonthlyBudget?.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    {/* Empty State Illustration */}
                    <View style={styles.illustrationContainer}>
                      <View style={styles.illustrationCircle}>
                        <Icon
                          name="receipt-long"
                          size={sizeHelper.calHp(100)}
                          color="#8B5CF6"
                        />

                        <View style={styles.storeIcon}>
                          <Icon
                            name="storefront"
                            size={sizeHelper.calHp(35)}
                            color="#8B5CF6"
                          />
                        </View>
                      </View>

                      {/* Decorative Icons */}
                      <Icon
                        name="auto-awesome"
                        size={sizeHelper.calHp(18)}
                        color="#A78BFA"
                        style={styles.sparkleOne}
                      />

                      <Icon
                        name="auto-awesome"
                        size={sizeHelper.calHp(14)}
                        color="#A78BFA"
                        style={styles.sparkleTwo}
                      />

                      <Icon
                        name="auto-awesome"
                        size={sizeHelper.calHp(16)}
                        color="#A78BFA"
                        style={styles.sparkleThree}
                      />
                    </View>

                    {/* Empty State Text */}
                    <Text style={styles.emptyTitle}>
                      No Monthly Expenses Added Yet
                    </Text>

                    <Text style={styles.emptySubtitle}>
                      You haven't added any monthly expenses yet. Start adding
                      expenses to track your spending and manage your monthly
                      budget more effectively.
                    </Text>
                  </View>
                ) : (
                  getMonthlyBudget?.map(item => (
                    <React.Fragment key={item.Id}>
                      <PaymentCard
                        id={item.Id}
                        sentTo={item.expenceCategory}
                        receiptDate={'30-Oct-2026'}
                        amount={item.Amount}
                        editModalVisible={editModalVisible}
                        setEditModalVisible={setEditModalVisible}
                        selectedIcon={getCategoryStyle}
                        editDisabled={selectedCategories.some(
                          Selected => Selected.budgetId === item.Id,
                        )}
                        handleBudgetUpdate={() => {
                          handleBudgetUpdate(item);
                        }}
                        editBtn={true}
                        formatAmount={formatAmount}
                        date={item.Date}
                        navigation={navigation}
                        formatDate={formatDate}
                        onPress={() =>
                          navigation.navigate('MonthlyDetail', {
                            id: item.Id,
                          })
                        }
                        onDelete={() => {
                          setSelectedPaymentId2(item.Id);
                          setBudgetdeleteModal(true);
                        }}
                      />
                    </React.Fragment>
                  ))
                )}
                <ConfirmModal
                  visible={budgetDeleteModal}
                  icon="delete"
                  style={{ backgroundColor: colors.lightDot }}
                  iconColor={colors.redColor}
                  title="Are You Sure?"
                  deleteText="Delete"
                  subTitle1="This payment will be permanently deleted."
                  subTitle2="Do you want to continue?"
                  onClose={() => setBudgetdeleteModal(false)}
                  btnStyle={{ backgroundColor: colors.redColor }}
                  onOk={() => {
                    deleteBudget.mutate(selectedPaymentId2);
                    setBudgetdeleteModal(false);
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Design;
