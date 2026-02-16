import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UnitSchema, unitDefaultValues } from '../unit.constants';
import { useAddUnitsMutation } from '@apis/units/use-units.mutation';
import { notification } from 'antd';
import { UnitForm } from '../units.types';
import { cacheOnAddUnit } from '@apis/units/units.cache';

export function useAddUnit() {
  const { mutate, isPending } = useAddUnitsMutation();

  const formHooks = useForm<UnitForm>({
    defaultValues: unitDefaultValues,
    resolver: zodResolver(UnitSchema),
  });
  const { handleSubmit, reset } = formHooks;

  function submitHandler(values: UnitForm) {
    mutate(values, {
      onSuccess: (data) => {
        notification.success({ message: 'Unit added successfully' });
        reset(unitDefaultValues);
        cacheOnAddUnit(data);
      },
      onError: (err) => {
        notification.error({ message: err.message });
      },
    });
  }

  return {
    formHooks,
    isPending,
    submitHandler: handleSubmit(submitHandler),
  };
}
