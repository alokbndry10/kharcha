import { useDeleteItemsMutation } from '@apis/items/use-items.mutation';
import { notification } from 'antd';
import { cacheOnDeleteItem } from '@apis/items/items.cache';
import { useState } from 'react';
import { useDeleteVendorItemMutation } from '@apis/vendor-item/use-vendor-item.mutation';

export function useDeleteItem() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { mutate: deleteItem, isPending: deleteItemPending } = useDeleteItemsMutation();
  const { mutate: deleteVendorItem, isPending: deleteVendorItemPending } = useDeleteVendorItemMutation();

  function deleteHandler(itemId: number, vendorId: number) {
    setDeleteId(`${itemId}-${vendorId}`);

    deleteVendorItem(itemId, {
      onSuccess: () => {
        deleteItem(itemId, {
          onSuccess: () => {
            notification.success({ message: 'Item updated successfully' });
            cacheOnDeleteItem(itemId, vendorId);
          },
          onError: (err) => {
            notification.error({ message: err.message });
          },
        });
      },
      onError: (err) => {
        notification.error({ message: err.message });
      },
    });
  }

  return {
    deleteId,
    deleting: deleteItemPending || deleteVendorItemPending,
    deleteHandler,
  };
}
