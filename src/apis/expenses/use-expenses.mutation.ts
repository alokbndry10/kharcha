import { useMutation } from '@tanstack/react-query';
import { ExpenseForm } from '@modules/expenses/expenses.types';
import { supabase } from '@/lib/supabase/supabase';

const selectQuery = `
      *,
      Items!inner(
        id,
        name
      ),
      Vendors(
        id,
        name
      ),
      Units(
        id,
        name
      )
    `;

const addExpense = async (values: ExpenseForm) => {
  const { data, error } = await supabase.from('Expenses').insert(values).select(selectQuery).single();

  if (error) throw error;
  return data;
};

const updateExpense = async (args: { expenseId: number; values: ExpenseForm }) => {
  const { expenseId, values } = args;

  const { data, error } = await supabase
    .from('Expenses')
    .update(values)
    .eq('id', expenseId)
    .select(selectQuery)
    .single();

  if (error) throw error;
  return data;
};

const deleteExpense = async (expenseId: number) => {
  const { data, error } = await supabase.from('Expenses').delete().eq('id', expenseId);

  if (error) throw error;
  return data;
};

export const useAddExpensesMutation = () => useMutation({ mutationFn: addExpense });
export const useUpdateExpensesMutation = () => useMutation({ mutationFn: updateExpense });
export const useDeleteExpensesMutation = () => useMutation({ mutationFn: deleteExpense });
