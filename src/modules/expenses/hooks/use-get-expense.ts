import { useGetExpensesQuery } from '@apis/expenses/use-expenses.query';
import { useState } from 'react';
import { ExpenseTableRow } from '../expenses.types';
import { expensesFilter } from '../expenses.constants';

export type ExpenseFilters = {
  search: string;
  fromDate: string | null;
  toDate: string | null;
  page: number;
  pageSize: number;
};

export function useGetExpenses() {
  const [filters, setFilters] = useState<ExpenseFilters>(expensesFilter);
  const { data, isPending } = useGetExpensesQuery(JSON.stringify(filters));

  const tableData: ExpenseTableRow[] =
    data?.data?.map((expense, i) => ({
      sn: (filters.page - 1) * filters.pageSize + (i + 1),
      id: expense?.id,
      description: expense?.description,
      item_id: expense?.item_id,
      vendor_id: expense?.vendor_id,
      quantity: expense?.quantity,
      payment_method: expense?.payment_method,
      rate: expense?.rate,
      paid_amount: expense?.paid_amount,
      total_amount: expense?.total_amount,
      purchased_date: expense?.purchased_date,
      paid_date: expense?.paid_date,
      unit_id: expense?.unit_id,
      itemName: expense?.Items?.name,
      vendorName: expense?.Vendors?.name,
      unitName: expense?.Units?.name,
    })) ?? [];

  return {
    tableData,
    total: data?.count ?? 0,
    isPending,
    page: filters.page,
    pageSize: filters.pageSize,
    setFilters,
  };
}
