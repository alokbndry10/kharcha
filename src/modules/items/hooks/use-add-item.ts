import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ItemSchema, itemDefaultValues } from '../item.constants';
import { useAddItemsMutation, useDeleteItemsMutation } from '@apis/items/use-items.mutation';
import { notification } from 'antd';
import { ItemForm } from '../items.types';
import { useAddVendorItemMutation } from '@apis/vendor-item/use-vendor-item.mutation';
import { cacheOnAddItem } from '@apis/items/items.cache';

export function useAddItem() {
  const { mutate: createItem, isPending: addItemLoading } = useAddItemsMutation();
  const { mutate: createVendorItem, isPending: vendorItemLoading } = useAddVendorItemMutation();
  const { mutate: deleteItem, isPending: deleteLoading } = useDeleteItemsMutation();

  const formHooks = useForm<ItemForm>({
    defaultValues: itemDefaultValues,
    resolver: zodResolver(ItemSchema),
  });
  const { handleSubmit, reset } = formHooks;

  function submitHandler(values: ItemForm) {
    const { name, description, ...restVendorItem } = values;
    createItem(
      { name, description },
      {
        onSuccess: (createdItem) => {
          if (!createdItem) return;

          createVendorItem(
            { ...restVendorItem, item_id: createdItem.id },
            {
              onSuccess: (vendorItems) => {
                reset(itemDefaultValues);
                notification.success({ message: 'Item added successfully' });
                const cacheItem = {
                  ...createdItem,
                  Vendor_Item: [
                    {
                      Units: vendorItems[0].unit_id,
                      Vendors: vendorItems[0].vendor_id,
                      current_rate: vendorItems[0].current_rate,
                    },
                  ],
                };

                cacheOnAddItem(cacheItem);
              },
              onError: (err) => {
                notification.error({ message: err.message });
                deleteItem(createdItem.id);
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
    isPending: addItemLoading || vendorItemLoading || deleteLoading,
    submitHandler: handleSubmit(submitHandler),
  };
}
