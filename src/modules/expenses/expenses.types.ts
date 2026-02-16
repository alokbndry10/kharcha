import z from 'zod';
import { ExpenseSchema } from './expenses.constants';
import { Tables } from '@/lib/supabase/generated.types';

export type Expense = Tables<'Expenses'> & {
  Items: {
    id: number;
    name: string;
  };
  Vendors: {
    id: number;
    name: string;
  };
  Units: {
    id: number;
    name: string;
  };
};

export type ExpenseForm = z.infer<typeof ExpenseSchema>;

export type ExpenseTableRow = Omit<Tables<'Expenses'>, 'created_at'> & {
  sn: number;
  itemName: string;
  vendorName: string;
  unitName: string;
};

export type GetExpensesDTO = {
  data: Expense[];
  count: number;
};
