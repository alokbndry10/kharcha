import { useDeleteUnitsMutation } from '@apis/units/use-units.mutation';
import { notification } from 'antd';
import { cacheOnDeleteUnit } from '@apis/units/units.cache';
import { useState } from 'react';

export function useDeleteUnit() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { mutate, isPending } = useDeleteUnitsMutation();

  function deleteHandler(id: number) {
    setDeleteId(id);
    mutate(id, {
      onSuccess: () => {
        notification.success({ message: 'Unit updated successfully' });
        cacheOnDeleteUnit(id);
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
