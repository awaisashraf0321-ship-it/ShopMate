import { useQuery } from '@tanstack/react-query';
import { GetOutgoingPayments } from '../api/OutgoingPaymentsApi';
import { GetIngoingPayments, GetLookups } from '../api/IngoingPayments';
import { getCustomerById } from '../api/CustomerApi';
import { queryKeys } from './queries';

// Big enough to hold every payment of a small shop in one request. If a
// shop ever has more, the balances will be short: the real fix then is a
// per-customer balance endpoint on the server.
const ALL = { paymentMode: 0, page: 1, pageSize: 5000 };

const readList = async response => {
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.Message || 'Could not load');
  return data?.obj?.data ?? [];
};

/** Customers + every "You gave" and "You got" payment, for balances. */
export const useKhataData = () => {
  const customers = useQuery({
    queryKey: ['getmyLookups'],
    queryFn: () => GetLookups(),
  });
  const gave = useQuery({
    queryKey: queryKeys.outgoing(ALL),
    queryFn: async () =>
      readList(
        await GetOutgoingPayments(ALL.paymentMode, ALL.page, ALL.pageSize),
      ),
  });
  const got = useQuery({
    queryKey: queryKeys.incoming(ALL),
    queryFn: async () =>
      readList(
        await GetIngoingPayments(ALL.paymentMode, ALL.page, ALL.pageSize),
      ),
  });
  return {
    customers: customers.data ?? [],
    gave: gave.data ?? [],
    got: got.data ?? [],
    loading: customers.isLoading || gave.isLoading || got.isLoading,
    error: customers.error || gave.error || got.error,
    refetch: () =>
      Promise.all([customers.refetch(), gave.refetch(), got.refetch()]),
  };
};

/** One customer's saved details (phone, WhatsApp…). */
export const useCustomer = id =>
  useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      const response = await getCustomerById(id);
      const data = await response.json().catch(() => null);
      return data?.obj ?? null;
    },
    enabled: id != null,
  });
