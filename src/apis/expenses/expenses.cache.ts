import { queryClient } from '@/setup/app.providers';
import { Entities } from '@/lib/supabase/Entities';
import { Tables } from '@/lib/supabase/generated.types';
import { Expense, GetExpensesDTO } from '@modules/expenses/expenses.types';

export function cacheOnAddExpense(newData: Expense) {
  const cache = queryClient.getQueryCache();

  const queries = cache.findAll({
    queryKey: [Entities.Expenses],
  });

  queries.forEach((query) => {
    queryClient.setQueryData(query.queryKey, (data: GetExpensesDTO | undefined) => {
      if (!data) return data;

      return {
        data: [newData, ...data.data],
        count: data?.count + 1,
      };
    });
  });
}

export function cacheOnUpdateExpense(id: Tables<'Expenses'>['id'], values: Expense) {
  const cache = queryClient.getQueryCache();

  const queries = cache.findAll({
    queryKey: [Entities.Expenses],
  });

  queries.forEach((query) => {
    queryClient.setQueryData(query.queryKey, (data: GetExpensesDTO | undefined) => {
      if (!data) return data;

      return {
        ...data,
        data: data?.data?.map((expense) => {
          if (expense.id === id) {
            return {
              ...expense,
              ...values,
            };
          } else return expense;
        }),
      };
    });
  });
}

export function cacheOnDeleteExpense(id: Tables<'Expenses'>['id']) {
  const cache = queryClient.getQueryCache();

  const queries = cache.findAll({
    queryKey: [Entities.Expenses],
  });

  queries.forEach((query) => {
    queryClient.setQueryData(query.queryKey, (data: GetExpensesDTO | undefined) => {
      if (!data) return data;

      return {
        data: data.data.filter((expense) => expense.id !== id),
        count: data.count - 1,
      };
    });
  });
}
