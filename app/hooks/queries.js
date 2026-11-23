// Server-state hooks built on React Query.
//
// Screens read data through these hooks instead of keeping their own
// useState + fetch functions. React Query handles caching, loading flags,
// de-duplication and refetching; screens only hold UI state.
import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GetExpenses, SelfGetById, expensesDashboard } from '../api/ExpenseApi';
import {
  GetOutgoingPayments,
  GetByIdOutgoingPayments,
  getOutInDashboard,
} from '../api/OutgoingPaymentsApi';
import {
  GetIngoingPayments,
  GetByIdIngoingPayments,
} from '../api/IngoingPayments';
import { dashboardApi, DashboardGraph } from '../api/DashboardApi';
import { monthlyGetById, monthlybudgetDashboard } from '../api/MontlyApi';
import { profileData, handleDataUpdate } from '../api/Profile';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Parse a fetch Response as JSON and throw on HTTP errors. */
const readJson = async response => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.Message || `Request failed (${response.status})`);
  }
  return data;
};

/** 'Self Expense' -> 1, anything else (Business) -> 2. */
export const moduleIdFor = selectedModule =>
  selectedModule === 'Self Expense' ? 1 : 2;

/** UI period label -> API period id. */
export const periodIdFor = label => {
  switch (label) {
    case 'Today':
      return 1;
    case 'This Week':
      return 2;
    case 'This Month':
      return 3;
    default:
      return 4;
  }
};

// ---------------------------------------------------------------------------
// Query keys (one place, so invalidation always matches)
// ---------------------------------------------------------------------------

export const queryKeys = {
  expensesAll: ['expenses'],
  expenses: params => ['expenses', params],
  expenseDashboard: (moduleId, period) => [
    'expenseDashboard',
    moduleId,
    period,
  ],
  expense: id => ['expense', id],

  outgoingAll: ['outgoingPayments'],
  outgoing: params => ['outgoingPayments', params],
  outgoingPayment: id => ['outgoingPayment', id],

  incomingAll: ['incomingPayments'],
  incoming: params => ['incomingPayments', params],
  incomingPayment: id => ['incomingPayment', id],

  paymentDashboard: (moduleId, period) => [
    'paymentDashboard',
    moduleId,
    period,
  ],

  balanceSummary: (moduleId, fromDate, toDate) => [
    'balanceSummary',
    moduleId,
    fromDate,
    toDate,
  ],
  spendingGraph: (moduleId, period) => ['spendingGraph', moduleId, period],

  monthlyBudget: id => ['monthlyBudget', id],
  monthlyBudgetSummary: (month, year) => ['monthlyBudgetSummary', month, year],

  profile: ['profile'],
};

// ---------------------------------------------------------------------------
// Generic hooks
// ---------------------------------------------------------------------------

/**
 * Refetch when the screen regains focus (skips the first focus, where the
 * query has just fetched on mount). Keeps lists fresh after the user adds
 * or edits something on another screen.
 */
export function useRefreshOnFocus(refetch) {
  const firstFocus = useRef(true);
  useFocusEffect(
    useCallback(() => {
      if (firstFocus.current) {
        firstFocus.current = false;
        return;
      }
      refetch();
    }, [refetch]),
  );
}

/** Pull-to-refresh state for one or more refetch functions. */
export function usePullToRefresh(refetchAll) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetchAll();
    } finally {
      setRefreshing(false);
    }
  }, [refetchAll]);
  return { refreshing, onRefresh };
}

/**
 * Delete mutation that removes the row from a cached list immediately,
 * rolls back on error, and re-syncs the given queries afterwards.
 */
export function useOptimisticDelete({ mutationFn, listKey, invalidateKeys }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: listKey });
      const previous = queryClient.getQueryData(listKey);
      queryClient.setQueryData(listKey, old =>
        Array.isArray(old) ? old.filter(item => item.Id !== id) : old,
      );
      return { previous };
    },
    onError: (_error, _id, context) => {
      queryClient.setQueryData(listKey, context?.previous);
    },
    onSettled: () => {
      invalidateKeys.forEach(queryKey =>
        queryClient.invalidateQueries({ queryKey }),
      );
    },
  });
}

// ---------------------------------------------------------------------------
// Expenses
// ---------------------------------------------------------------------------

export const useExpenses = ({ expenseType, paymentMethodId, page, pageSize }) =>
  useQuery({
    queryKey: queryKeys.expenses({
      expenseType,
      paymentMethodId,
      page,
      pageSize,
    }),
    queryFn: async () => {
      const data = await readJson(
        await GetExpenses(expenseType, paymentMethodId, page, pageSize),
      );
      return data?.obj?.data ?? [];
    },
  });

export const useExpenseDashboard = (moduleId, period) =>
  useQuery({
    queryKey: queryKeys.expenseDashboard(moduleId, period),
    queryFn: async () => {
      const data = await readJson(await expensesDashboard(moduleId, period));
      return data?.obj ?? null;
    },
  });

export const useExpenseById = id =>
  useQuery({
    queryKey: queryKeys.expense(id),
    queryFn: async () => {
      const data = await readJson(await SelfGetById(id));
      return data?.obj ?? null;
    },
    enabled: id != null,
  });

// ---------------------------------------------------------------------------
// Outgoing / incoming payments
// ---------------------------------------------------------------------------

export const useOutgoingPayments = ({ paymentMode, page, pageSize }) =>
  useQuery({
    queryKey: queryKeys.outgoing({ paymentMode, page, pageSize }),
    queryFn: async () => {
      const data = await readJson(
        await GetOutgoingPayments(paymentMode, page, pageSize),
      );
      return data?.obj?.data ?? [];
    },
  });

export const useOutgoingPaymentById = id =>
  useQuery({
    queryKey: queryKeys.outgoingPayment(id),
    queryFn: async () => {
      const data = await readJson(await GetByIdOutgoingPayments(id));
      return data?.obj ?? null;
    },
    enabled: id != null,
  });

export const useIncomingPayments = ({ paymentMode, page, pageSize }) =>
  useQuery({
    queryKey: queryKeys.incoming({ paymentMode, page, pageSize }),
    queryFn: async () => {
      const data = await readJson(
        await GetIngoingPayments(paymentMode, page, pageSize),
      );
      return data?.obj?.data ?? [];
    },
  });

export const useIncomingPaymentById = id =>
  useQuery({
    queryKey: queryKeys.incomingPayment(id),
    queryFn: async () => {
      const data = await readJson(await GetByIdIngoingPayments(id));
      return data?.obj ?? null;
    },
    enabled: id != null,
  });

export const usePaymentDashboard = (moduleId, period) =>
  useQuery({
    queryKey: queryKeys.paymentDashboard(moduleId, period),
    queryFn: async () => {
      const data = await readJson(await getOutInDashboard(moduleId, period));
      return data?.obj ?? null;
    },
  });

// ---------------------------------------------------------------------------
// Home dashboard
// ---------------------------------------------------------------------------

export const useBalanceSummary = (moduleId, fromDate, toDate) =>
  useQuery({
    queryKey: queryKeys.balanceSummary(moduleId, fromDate, toDate),
    queryFn: async () => {
      const data = await readJson(
        await dashboardApi(moduleId, fromDate, toDate),
      );
      return data?.obj ?? null;
    },
  });

export const useSpendingGraph = (moduleId, period) =>
  useQuery({
    queryKey: queryKeys.spendingGraph(moduleId, period),
    queryFn: async () => {
      const data = await readJson(await DashboardGraph(moduleId, period));
      return data?.obj ?? [];
    },
  });

// ---------------------------------------------------------------------------
// Monthly budget
// ---------------------------------------------------------------------------

export const useMonthlyBudgetById = id =>
  useQuery({
    queryKey: queryKeys.monthlyBudget(id),
    queryFn: async () => {
      const data = await readJson(await monthlyGetById(id));
      return data?.obj ?? null;
    },
    enabled: id != null,
  });

export const useMonthlyBudgetSummary = (month, year) =>
  useQuery({
    queryKey: queryKeys.monthlyBudgetSummary(month, year),
    queryFn: async () => {
      const data = await readJson(await monthlybudgetDashboard(month, year));
      return data?.obj ?? null;
    },
  });

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

/** Current user's list record, full profile details, and access token. */
export const useProfile = () =>
  useQuery({
    queryKey: queryKeys.profile,
    queryFn: async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const list = await readJson(await profileData());
      const user = list?.obj?.data?.[0] ?? null;
      let details = null;
      if (user?.UserId) {
        const detail = await readJson(await handleDataUpdate(user.UserId));
        details = detail?.obj ?? null;
      }
      return { user, details, accessToken };
    },
  });
