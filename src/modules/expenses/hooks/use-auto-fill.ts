import { useFormContext } from 'react-hook-form';
import { ExpenseForm as ExpenseFormType } from '../expenses.types';
import { useEffect, useState } from 'react';
import { Entities } from '@/lib/supabase/Entities';
import { useQueryClient } from '@tanstack/react-query';
import { GetItem } from '@modules/items/items.types';
import { itemsFilter } from '@modules/items/item.constants';

export function useAutoFill() {
  const queryClient = useQueryClient();

  const [amounts, setAmounts] = useState({
    total: 0,
    due: 0,
  });
  const hasDue = amounts.due > 0;

  const formHooks = useFormContext<ExpenseFormType>();
  const { watch, setValue } = formHooks;
  const itemChanged = watch('item_id');
  const quantityChanged = watch('quantity');
  const rateChanged = watch('rate');
  const paidAmtChanged = watch('paid_amount');
  const items = queryClient.getQueryData([Entities.Items, JSON.stringify(itemsFilter)]) as GetItem[];

  useEffect(
    function prefillFormValues() {
      if (!itemChanged) return;

      const selectedItem = items?.find((item) => item.id === itemChanged);
      const preferredVendor = selectedItem?.Vendor_Item[0]?.Vendors?.id;
      const preferredRate = selectedItem?.Vendor_Item[0]?.current_rate;
      const preferredUnit = selectedItem?.Vendor_Item[0]?.Units?.id;

      if (preferredVendor) setValue('vendor_id', preferredVendor);
      if (preferredUnit) setValue('unit_id', preferredUnit);
      if (preferredRate) setValue('rate', preferredRate);
    },
    [itemChanged]
  );

  useEffect(
    function calculateTotalAndDue() {
      const total = quantityChanged * rateChanged;
      const due = total - paidAmtChanged;

      setValue('total_amount', total);
      setAmounts({
        total,
        due,
      });
    },
    [quantityChanged, rateChanged, paidAmtChanged]
  );

  return { amounts, hasDue };
}
