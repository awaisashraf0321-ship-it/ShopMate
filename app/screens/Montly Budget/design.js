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
import BudgetAmountInput from '../../components/BudgetAmountInput';
import sizeHelper from '../../helpers/sizeHelper';
import SavePayment from '../../components/SavePayment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PaymentCard from '../../components/PaymentCard';
import Loader from '../../components/Loader';
import ConfirmModal from '../../components/ConfirmModal';
import DatePicker from '../../components/DatePicker';
import EditExpenseModal from '../../components/EditExpenseModal';
import UpdateSalaryModal from '../../components/UpdateSalaryModal';
import { EmptyState } from '../../ui';
import BudgetOverviewCard from '../../components/BudgetOverviewCard';
import { theme, categoryStyle } from '../../theme';

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
  listLoading,
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
  const getCategoryStyle = categoryStyle;

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
          {/* Full-screen spinner only on first load or while saving;
              background refreshes keep the list on screen. */}
          <Loader visible={listLoading || loader} />
          <BudgetOverviewCard
            summary={monthlyDashboard}
            formatAmount={formatAmount}
          />
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
                    size={theme.sizes.icon.lg}
                    color={theme.colors.primary}
                  />
                </View>

                <Text style={styles.expenseFormTitle}>Add Monthly Expense</Text>
              </View>

              <View style={styles.expenseFieldBlock}>
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

              <View style={styles.expenseFieldsRow}>
                <View style={styles.expenseField}>
                  <Text style={styles.expenseFieldLabel}>Amount</Text>

                  <BudgetAmountInput
                    expenseAmount={expenseAmount}
                    setExepnseAmount={setExepnseAmount}
                    Changed={Changed}
                    compact={true}
                  />
                </View>

                <View style={styles.expenseField}>
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
                  <EmptyState
                    title="No Monthly Expenses Added Yet"
                    message="You haven't added any monthly expenses yet. Start adding expenses to track your spending and manage your monthly budget more effectively."
                  />
                ) : (
                  getMonthlyBudget?.map(item => (
                    <React.Fragment key={item.Id}>
                      <PaymentCard
                        id={item.Id}
                        sentTo={item.expenceCategory}
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
                  tone="danger"
                  title="Are You Sure?"
                  deleteText="Delete"
                  subTitle1="This payment will be permanently deleted."
                  subTitle2="Do you want to continue?"
                  onClose={() => setBudgetdeleteModal(false)}
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
