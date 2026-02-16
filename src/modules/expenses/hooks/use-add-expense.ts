import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ExpenseSchema, expenseDefaultValues } from '../expenses.constants';
import { useAddExpensesMutation } from '@apis/expenses/use-expenses.mutation';
import { notification } from 'antd';
import { ExpenseForm } from '../expenses.types';
import { cacheOnAddExpense } from '@apis/expenses/expenses.cache';

export function useAddExpense() {
  const { mutate: createExpense, isPending } = useAddExpensesMutation();

  const formHooks = useForm<ExpenseForm>({
    defaultValues: expenseDefaultValues,
    resolver: zodResolver(ExpenseSchema),
  });
  const { handleSubmit, reset } = formHooks;

  function submitHandler(values: ExpenseForm) {
    createExpense(values, {
      onSuccess: (createdExpense) => {
        if (!createdExpense) return;

        reset(expenseDefaultValues);
        notification.success({ message: 'Expense added successfully' });
        cacheOnAddExpense(createdExpense);
      },
      onError: (err) => {
        notification.error({ message: err.message });
      },
    });
  }

  return {
    formHooks,
    isPending,
    submitHandler: handleSubmit(submitHandler),
  };
}
