import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { fromDateStartTime, toDateEndTime } from '@shared/utils/dayjs';
import { supabase } from '@/lib/supabase/supabase';
import { Entities } from '@/lib/supabase/Entities';

dayjs.extend(isoWeek);

export type WeeklyExpenseReport = {
  weekStart: string; // ISO date string for Monday of the week
  weekEnd: string; // ISO date string for Sunday of the week
  weekLabel: string; // Display label like "Week 1, Jan 2024"
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  expenseCount: number;
  expenses: Array<{
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
    payment_method: string;
  }>;
};

const getWeeklyExpenses = async (fromDate?: string | null, toDate?: string | null): Promise<WeeklyExpenseReport[]> => {
  let query = supabase
    .from('Expenses')
    .select(
      `
      id,
      paid_date,
      total_amount,
      paid_amount,
      quantity,
      rate,
      payment_method,
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
    .order('created_at', { ascending: false });

  if (fromDate) {
    query = query.gte('created_at', fromDateStartTime(fromDate));
  }

  if (toDate) {
    query = query.lt('created_at', toDateEndTime(toDate));
  }

  const { data, error } = await query;

  if (error) throw error;

  if (!data || data.length === 0) return [];

  // Group expenses by week
  const weeklyMap = new Map<string, WeeklyExpenseReport>();

  data.forEach((expense) => {
    const paidDate = dayjs(expense.paid_date);
    const weekStart = paidDate.startOf('isoWeek'); // Monday
    const weekEnd = paidDate.endOf('isoWeek'); // Sunday
    const weekKey = weekStart.format('YYYY-MM-DD');

    if (!weeklyMap.has(weekKey)) {
      weeklyMap.set(weekKey, {
        weekStart: weekStart.format('YYYY-MM-DD'),
        weekEnd: weekEnd.format('YYYY-MM-DD'),
        weekLabel: `Week ${weekStart.isoWeek()}, ${weekStart.format('MMM YYYY')}`,
        totalAmount: 0,
        paidAmount: 0,
        pendingAmount: 0,
        expenseCount: 0,
        expenses: [],
      });
    }

    const weekData = weeklyMap.get(weekKey)!;
    const totalAmount = Number(expense.total_amount) || 0;
    const paidAmount = Number(expense.paid_amount) || 0;
    const pendingAmount = Math.max(0, totalAmount - paidAmount); // Ensure non-negative

    weekData.totalAmount += totalAmount;
    weekData.paidAmount += paidAmount;
    weekData.pendingAmount += pendingAmount;
    weekData.expenseCount += 1;
    weekData.expenses.push({
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
      payment_method: expense.payment_method,
    });
  });

  // Convert map to array and sort by week start date (newest first)
  return Array.from(weeklyMap.values()).sort((a, b) => {
    return dayjs(b.weekStart).valueOf() - dayjs(a.weekStart).valueOf();
  });
};

export const useWeeklyExpensesQuery = (fromDate?: string | null, toDate?: string | null) => {
  return useQuery({
    queryKey: [Entities.Expenses, 'weekly', fromDate, toDate],
    queryFn: () => getWeeklyExpenses(fromDate, toDate),
  });
};
