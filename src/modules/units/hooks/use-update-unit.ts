import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UnitSchema, unitDefaultValues } from '../unit.constants';
import { useUpdateUnitsMutation } from '@apis/units/use-units.mutation';
import { notification } from 'antd';
import { useState } from 'react';
import { UnitTableRow, UnitForm } from '../units.types';
import { cacheOnUpdateUnit } from '@apis/units/units.cache';

export function useUpdateUnit() {
  const [modalData, setModalData] = useState<UnitTableRow | null>(null);

  const { mutate, isPending } = useUpdateUnitsMutation();

  const formHooks = useForm<UnitForm>({
    defaultValues: unitDefaultValues,
    resolver: zodResolver(UnitSchema),
  });
  const { handleSubmit, reset } = formHooks;

  function setModalDataHandler(values: UnitTableRow | null) {
    if (values) {
      const { id: _, ...formData } = values;
      setModalData(values);
      reset(formData);
    } else {
      setModalData(null);
    }
  }

  function submitHandler(values: UnitForm) {
    if (!modalData?.id) return;

    mutate(
      { id: modalData.id, values },
      {
        onSuccess: () => {
          notification.success({ message: 'Unit updated successfully' });
          setModalData(null);
          cacheOnUpdateUnit(modalData.id, values);
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
