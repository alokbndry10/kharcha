import { useState } from 'react';
import { useWeeklyExpensesQuery } from '@apis/expenses/use-weekly-expenses.query';
import dayjs from 'dayjs';

export function useWeeklyExpenseReport() {
  const [fromDate, setFromDate] = useState<string | null>(() => {
    // Default to last 4 weeks
    return dayjs().subtract(7, 'days').format('YYYY-MM-DD');
  });
  const [toDate, setToDate] = useState<string | null>(dayjs().format('YYYY-MM-DD'));

  const { data: weeklyReports, isPending } = useWeeklyExpensesQuery(fromDate, toDate);

  // Calculate totals across all weeks
  const totals = weeklyReports?.reduce(
    (acc, week) => ({
      totalAmount: acc.totalAmount + week.totalAmount,
      paidAmount: acc.paidAmount + week.paidAmount,
      pendingAmount: acc.pendingAmount + week.pendingAmount,
      expenseCount: acc.expenseCount + week.expenseCount,
    }),
    { totalAmount: 0, paidAmount: 0, pendingAmount: 0, expenseCount: 0 }
  ) || { totalAmount: 0, paidAmount: 0, pendingAmount: 0, expenseCount: 0 };

  return {
    weeklyReports: weeklyReports || [],
    totals,
    isPending,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
  };
}
