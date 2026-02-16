import { useDeleteExpensesMutation } from '@apis/expenses/use-expenses.mutation';
import { notification } from 'antd';
import { cacheOnDeleteExpense } from '@apis/expenses/expenses.cache';
import { useState } from 'react';

export function useDeleteExpense() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { mutate: deleteExpense, isPending } = useDeleteExpensesMutation();

  function deleteHandler(expenseId: number) {
    setDeleteId(expenseId);

    deleteExpense(expenseId, {
      onSuccess: () => {
        notification.success({ message: 'Expense deleted successfully' });
        cacheOnDeleteExpense(expenseId);
        setDeleteId(null);
      },
      onError: (err) => {
        notification.error({ message: err.message });
        setDeleteId(null);
      },
    });
  }

  return {
    deleteId,
    deleting: isPending,
    deleteHandler,
  };
}
