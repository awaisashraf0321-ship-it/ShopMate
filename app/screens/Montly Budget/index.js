import { View } from 'react-native';
import React from 'react';
import Design from '../Montly Budget/design';
import { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetCategories } from '../../api/ExpenseApi';
import { GetBudget, budgetDelete, updateBudget } from '../../api/MontlyApi';
import { useRef } from 'react';
import { budget } from '../../api/MontlyApi';
import ErrorModal from '../../components/ErrorModal';
import {
  useMonthlyBudgetSummary,
  usePullToRefresh,
  useRefreshOnFocus,
} from '../../hooks/queries';
const MonthlyBudgetScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [category, setCategory] = useState(null);
  const [visible, setVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expenseAmount, setExepnseAmount] = useState('');
  const [description, setDescription] = useState('');
  const scrollRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [budgetDeleteModal, setBudgetdeleteModal] = useState(false);
  const [selectedPaymentId2, setSelectedPaymentId2] = useState(null);
  const [loader, setLoader] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [salaryModalVisible, setSalaryModalVisible] = useState(false);
  const [salary, setSalary] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const swipeRef = React.useRef(null);
  const handleMonthly = async () => {
    try {
      if (!category || !expenseAmount) {
        setErrorMessage('Please select category and enter expense amount.');
        setShowErrorModal(true);
        return;
      }
      setLoader(true);
      const myData = {
        date:
          date.getFullYear() +
          '-' +
          String(date.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(date.getDate()).padStart(2, '0'),
        expenceCategory: category,
        amount: Number(expenseAmount),
      };

      console.log('Monthly Budget Payload:', myData);
      console.log('montly category', category);

      const response = await budget(myData);
      const data = await response.json();
      console.log('Monthly Api Budget response', data);
      if (response.ok) {
        await Promise.all([refetch(), refetchSummary()]);
      }
    } catch (error) {
      console.log('get api error', error);
    } finally {
      setLoader(false);
    }
  };

  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const {
    data: monthlyDashboard = null,
    isLoading: summaryLoading,
    refetch: refetchSummary,
  } = useMonthlyBudgetSummary(month, year);

  const {
    data: getMonthlyBudget,
    isLoading: getMonthlyBudgetLoading,
    refetch,
  } = useQuery({
    queryKey: ['getBudget'],
    queryFn: () => GetBudget(),
  });
  const { data: categories, refetch: refetchCategories } = useQuery({
    queryKey: ['Expense Categories', 1],
    queryFn: () => GetCategories(1),
  });
  useRefreshOnFocus(refetch);
  useRefreshOnFocus(refetchSummary);

  const queryClient = useQueryClient();
  const deleteBudget = useMutation({
    mutationFn: id => budgetDelete(id),
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: ['getBudget'] });
      const previousData = queryClient.getQueryData(['getBudget']);
      queryClient.setQueryData(['getBudget'], oldData =>
        oldData?.filter(item => item.Id !== id),
      );
      return { previousData };
    },
    onError: (error, id, context) => {
      queryClient.setQueryData(['getBudget'], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getBudget'] });
      queryClient.invalidateQueries({ queryKey: ['monthlyBudgetSummary'] });
    },
  });

  const refetchAll = useCallback(
    () => Promise.all([refetch(), refetchSummary(), refetchCategories()]),
    [refetch, refetchSummary, refetchCategories],
  );
  const { refreshing, onRefresh } = usePullToRefresh(refetchAll);
  const handleBudgetUpdate = item => {
    setSelectedBudget(item);

    setCategory(Number(item.ExpenceCategory));
    setExepnseAmount(String(item.Amount));
    setDate(new Date(item.Date));

    setEditModalVisible(true);
  };
  const updatedApi = async () => {
    if (!selectedBudget) return;

    try {
      setLoader(true);

      const payload = {
        date:
          date.getFullYear() +
          '-' +
          String(date.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(date.getDate()).padStart(2, '0'),

        expenceCategory: Number(category),
        amount: Number(expenseAmount),
      };

      console.log('Update Budget Payload:', payload);

      const response = await updateBudget(selectedBudget.Id, payload);
      const data = await response.json();

      console.log('Update Budget Response:', data);

      if (response.ok) {
        setEditModalVisible(false);
        setSelectedBudget(null);

        await queryClient.invalidateQueries({
          queryKey: ['getBudget'],
        });
        await queryClient.invalidateQueries({
          queryKey: ['monthlyBudgetSummary'],
        });
      }
    } catch (error) {
      console.log('Update API Error:', error);
    } finally {
      setLoader(false);
    }
  };
  const handleAmountChange = value => {
    const cleanedValue = value.replace(/[^0-9]/g, '');
    const parts = cleanedValue.split('.');
    if (parts[0].length > 7) return;
    setAmount(cleanedValue);
  };
  const Changed = value => {
    const cleanedValue = value.replace(/[^0-9]/g, '');
    const parts = cleanedValue.split('.');
    if (parts[0].length > 7) return;
    setExepnseAmount(cleanedValue);
  };
  const formatAmount = amount => {
    return (Number(amount) || 0).toLocaleString('en-US');
  };
  // Accepts '2026-11-23' or a full timestamp like '2026-11-23T00:00:00'.
  const formatDate = date => {
    if (!date) return '';
    const [year, month, day] = String(date).slice(0, 10).split('-');

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return `${day}-${monthNames[Number(month) - 1]}-${year}`;
  };

  return (
    <View>
      <ErrorModal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        text={'Monthly Budget Failed!'}
        errorMessage={errorMessage}
      />
      <Design
        navigation={navigation}
        amount={amount}
        setAmount={setAmount}
        handleAmountChange={handleAmountChange}
        date={date}
        setDate={setDate}
        showDate={showDate}
        setShowDate={setShowDate}
        showTime={showTime}
        setShowTime={setShowTime}
        category={category}
        setCategory={setCategory}
        visible={visible}
        setVisible={setVisible}
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        expenseAmount={expenseAmount}
        setExepnseAmount={setExepnseAmount}
        description={description}
        setDescription={setDescription}
        scrollRef={scrollRef}
        handleMonthly={handleMonthly}
        openModal={openModal}
        setOpenModal={setOpenModal}
        getMonthlyBudget={getMonthlyBudget}
        formatAmount={formatAmount}
        formatDate={formatDate}
        deleteBudget={deleteBudget}
        budgetDeleteModal={budgetDeleteModal}
        setBudgetdeleteModal={setBudgetdeleteModal}
        selectedPaymentId2={selectedPaymentId2}
        setSelectedPaymentId2={setSelectedPaymentId2}
        loader={loader || summaryLoading}
        listLoading={getMonthlyBudgetLoading}
        refreshing={refreshing}
        onRefresh={onRefresh}
        handleBudgetUpdate={handleBudgetUpdate}
        updatedApi={updatedApi}
        swipeRef={swipeRef}
        Changed={Changed}
        editModalVisible={editModalVisible}
        setEditModalVisible={setEditModalVisible}
        selectedBudget={selectedBudget}
        salaryModalVisible={salaryModalVisible}
        setSalaryModalVisible={setSalaryModalVisible}
        salary={salary}
        setSalary={setSalary}
        loading={getMonthlyBudgetLoading}
        categoryVisible={categoryVisible}
        setCategoryVisible={setCategoryVisible}
        monthlyDashboard={monthlyDashboard}
        showErrorModal={showErrorModal}
        setShowErrorModal={setShowErrorModal}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </View>
  );
};

export default MonthlyBudgetScreen;
