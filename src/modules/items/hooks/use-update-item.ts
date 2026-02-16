import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ItemSchema, itemDefaultValues } from '../item.constants';
import { useUpdateItemsMutation } from '@apis/items/use-items.mutation';
import { notification } from 'antd';
import { useState } from 'react';
import { ItemForm, ItemTableRow } from '../items.types';
import { useUpdateVendorItemMutation } from '@apis/vendor-item/use-vendor-item.mutation';
import { cacheOnUpdateItem } from '@apis/items/items.cache';

export function useUpdateItem() {
  const [modalData, setModalData] = useState<ItemTableRow | null>(null);

  const { mutate: updateItem, isPending: updateItemLoading } = useUpdateItemsMutation();
  const { mutate: updateVendorItem, isPending: vendorItemLoading } = useUpdateVendorItemMutation();

  const formHooks = useForm<ItemForm>({
    defaultValues: itemDefaultValues,
    resolver: zodResolver(ItemSchema),
  });
  const { handleSubmit, reset } = formHooks;

  function setModalDataHandler(values: ItemTableRow | null) {
    if (values) {
      const { id: _, ...formData } = values;
      setModalData(values);
      reset({
        name: formData.name,
        description: formData.description || undefined,
        vendor_id: formData.vendor_id,
        unit_id: formData.unit_id,
        current_rate: formData.current_rate,
      });
    } else {
      setModalData(null);
    }
  }

  function submitHandler(values: ItemForm) {
    if (!modalData?.id) return;

    const { name, description, ...restVendorItem } = values;

    updateItem(
      { itemId: modalData.id, values: { name, description } },
      {
        onSuccess: (item) => {
          if (!item) return;

          updateVendorItem(
            { id: modalData.id, values: { ...restVendorItem, item_id: item.id } },
            {
              onSuccess: (vendorItem) => {
                const cacheItem = {
                  ...item,
                  Vendor_Item: [
                    {
                      Units: vendorItem.unit_id,
                      Vendors: vendorItem.vendor_id,
                      current_rate: vendorItem.current_rate,
                    },
                  ],
                };
                notification.success({ message: 'Item updated successfully' });
                cacheOnUpdateItem(item.id, cacheItem);
                setModalData(null);
              },
              onError: (err) => {
                notification.error({ message: err.message });
              },
            }
          );
        },

        onError: (err) => {
          notification.error({ message: err.message });
        },
      }
    );
  }

  return {
    formHooks,
    isPending: updateItemLoading || vendorItemLoading,
    submitHandler: handleSubmit(submitHandler),
    modalData,
    setModalData: setModalDataHandler,
  };
}
