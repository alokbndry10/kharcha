import z from 'zod';

export const PAYMENT_METHODS = {
  credit: 'Credit',
  cash: 'Cash',
  bank: 'Bank',
} as const;

export type PaymentMethod = keyof typeof PAYMENT_METHODS;

export const ExpenseSchema = z.object({
  description: z.string().optional(),
  item_id: z.number({ invalid_type_error: 'Item is required' }).min(1, 'Item is required'),
  vendor_id: z.number({ invalid_type_error: 'Vendor is required' }).min(1, 'Vendor is required'),
  unit_id: z.number({ invalid_type_error: 'Unit is required' }).min(1, 'Unit is required'),
  quantity: z.number({ invalid_type_error: 'Quantity is required' }).min(0.01, 'Quantity must be greater than 0'),
  payment_method: z.enum(['credit', 'cash', 'bank'], { invalid_type_error: 'Payment method is required' }),
  rate: z.number({ invalid_type_error: 'Rate is required' }).min(0.1, 'Rate must be greater than 0.1 per unit'),
  paid_amount: z
    .number({ invalid_type_error: 'Paid amount is required' })
    .min(0, 'Paid amount must be greater than or equal to 0'),
  total_amount: z
    .number({ invalid_type_error: 'Total amount is required' })
    .min(1, 'Total amount must be greater than or equal to 0'),
  purchased_date: z.preprocess(emptyToNull, z.string().optional().nullable()),
  paid_date: z.string({ invalid_type_error: 'Paid date is required' }).min(1, 'Paid date is required'),
});

export const expenseDefaultValues = {
  description: '',
  item_id: undefined,
  vendor_id: undefined,
  unit_id: undefined,
  quantity: 1,
  payment_method: 'cash' as PaymentMethod,
  rate: 0,
  paid_amount: 0,
  total_amount: 0,
  purchased_date: new Date().toISOString().split('T')[0],
  paid_date: new Date().toISOString().split('T')[0],
};

export const expensesFilter = {
  search: '',
  fromDate: null,
  toDate: null,
  page: 1,
  pageSize: 20,
};

// Helper function to convert empty strings to null
function emptyToNull(value: unknown) {
  if (typeof value === 'string' && value.trim() === '') {
    return null;
  }
  return value;
}
