import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ExpenseSchema, PaymentMethod, expenseDefaultValues } from '../expenses.constants';
import { useUpdateExpensesMutation } from '@apis/expenses/use-expenses.mutation';
import { notification } from 'antd';
import { useState } from 'react';
import { ExpenseForm, ExpenseTableRow } from '../expenses.types';
import { cacheOnUpdateExpense } from '@apis/expenses/expenses.cache';

export function useUpdateExpense() {
  const [modalData, setModalData] = useState<ExpenseTableRow | null>(null);

  const { mutate: updateExpense, isPending } = useUpdateExpensesMutation();

  const formHooks = useForm<ExpenseForm>({
    defaultValues: expenseDefaultValues,
    resolver: zodResolver(ExpenseSchema),
  });
  const { handleSubmit, reset } = formHooks;

  function setModalDataHandler(values: ExpenseTableRow | null) {
    if (values) {
      setModalData(values);
      reset({
        description: values.description || undefined,
        item_id: values.item_id,
        vendor_id: values.vendor_id,
        quantity: values.quantity,
        payment_method: values.payment_method as PaymentMethod,
        rate: values.rate,
        paid_amount: values.paid_amount,
        total_amount: values.total_amount,
        purchased_date: values.purchased_date ?? undefined,
        paid_date: values.paid_date,
        unit_id: values.unit_id,
      });
    } else {
      setModalData(null);
    }
  }

  function submitHandler(values: ExpenseForm) {
    if (!modalData?.id) return;

    updateExpense(
      { expenseId: modalData.id, values },
      {
        onSuccess: (updatedExpense) => {
          if (!updatedExpense) return;

          notification.success({ message: 'Expense updated successfully' });
          cacheOnUpdateExpense(updatedExpense.id, updatedExpense);
          setModalData(null);
        },

        onError: (err) => {
          notification.error({ message: err.message });
        },
      }
    );
  }

  return {
    formHooks,
    isPending,
    submitHandler: handleSubmit(submitHandler),
    modalData,
    setModalData: setModalDataHandler,
  };
}
