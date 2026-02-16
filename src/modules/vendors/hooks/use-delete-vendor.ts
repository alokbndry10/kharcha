import { notification } from 'antd';
import { cacheOnDeleteVendor } from '@apis/vendors/vendors.cache';
import { useState } from 'react';
import { useDeleteVendorsMutation } from '@apis/vendors/use-vendors.mutation';

export function useDeleteVendor() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { mutate, isPending } = useDeleteVendorsMutation();

  function deleteHandler(id: number) {
    setDeleteId(id);
    mutate(id, {
      onSuccess: () => {
        notification.success({ message: 'Vendor updated successfully' });
        cacheOnDeleteVendor(id);
      },
      onError: (err) => {
        notification.error({ message: err.message });
      },
    });
  }

  return {
    deleteId,
    deleting: isPending,
    deleteHandler,
  };
}
