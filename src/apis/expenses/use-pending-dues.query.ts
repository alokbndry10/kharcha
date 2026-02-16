import { Entities } from '@/lib/supabase/Entities';
import { supabase } from '@/lib/supabase/supabase';
import { useQuery } from '@tanstack/react-query';

export type PendingDueExpense = {
  id: number;
  itemName: string;
  vendorName: string;
  quantity: number;
  unitName: string;
  rate: number;
  total_amount: number;
  paid_amount: number;
  pending_amount: number;
  paid_date: string;
  purchased_date: string | null;
  payment_method: string;
  description: string | null;
};

const getPendingDues = async (): Promise<{ data: PendingDueExpense[]; totalPending: number }> => {
  const { data, error } = await supabase
    .from('Expenses')
    .select(
      `
      id,
      total_amount,
      paid_amount,
      quantity,
      rate,
      paid_date,
      purchased_date,
      payment_method,
      description,
      Items!inner(
        name
      ),
      Vendors(
        name
      ),
      Units(
        name
      )
    `,
      { count: 'exact' }
    )
    .order('paid_date', { ascending: false });

  if (error) throw error;

  if (!data || data.length === 0) return { data: [], totalPending: 0 };

  // Filter expenses where total_amount > paid_amount and calculate pending
  const pendingExpenses: PendingDueExpense[] = data
    .map((expense) => {
      const totalAmount = expense.total_amount || 0;
      const paidAmount = expense.paid_amount || 0;
      const pendingAmount = totalAmount - paidAmount;

      return {
        id: expense.id,
        itemName: expense.Items?.name || '',
        vendorName: expense.Vendors?.name || '',
        quantity: expense.quantity,
        unitName: expense.Units?.name || '',
        rate: expense.rate,
        total_amount: totalAmount,
        paid_amount: paidAmount,
        pending_amount: pendingAmount,
        paid_date: expense.paid_date,
        purchased_date: expense.purchased_date,
        payment_method: expense.payment_method,
        description: expense.description,
      };
    })
    .filter((expense) => expense.pending_amount > 0); // Only expenses with pending dues

  const totalPending = pendingExpenses.reduce((sum, expense) => sum + expense.pending_amount, 0);

  return { data: pendingExpenses, totalPending };
};

export const usePendingDuesQuery = () => {
  return useQuery({
    queryKey: [Entities.Expenses, 'pending-dues'],
    queryFn: () => getPendingDues(),
  });
};
