import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { VendorSchema, vendorDefaultValues } from '../vendor.constants';
import { notification } from 'antd';
import { VendorForm } from '../vendors.types';
import { cacheOnAddVendor } from '@apis/vendors/vendors.cache';
import { useAddVendorsMutation } from '@apis/vendors/use-vendors.mutation';

export function useAddVendor() {
  const { mutate, isPending } = useAddVendorsMutation();

  const formHooks = useForm<VendorForm>({
    defaultValues: vendorDefaultValues,
    resolver: zodResolver(VendorSchema),
  });
  const { handleSubmit, reset } = formHooks;

  function submitHandler(values: VendorForm) {
    mutate(values, {
      onSuccess: (data) => {
        notification.success({ message: 'Vendor added successfully' });
        reset(vendorDefaultValues);
        cacheOnAddVendor(data);
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
