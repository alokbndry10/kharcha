import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { VendorSchema, vendorDefaultValues } from '../vendor.constants';
import { notification } from 'antd';
import { useState } from 'react';
import { VendorForm, VendorTableRow } from '../vendors.types';
import { cacheOnUpdateVendor } from '@apis/vendors/vendors.cache';
import { useUpdateVendorsMutation } from '@apis/vendors/use-vendors.mutation';

export function useUpdateVendor() {
  const [modalData, setModalData] = useState<VendorTableRow | null>(null);

  const { mutate, isPending } = useUpdateVendorsMutation();

  const formHooks = useForm<VendorForm>({
    defaultValues: vendorDefaultValues,
    resolver: zodResolver(VendorSchema),
  });
  const { handleSubmit, reset } = formHooks;

  function setModalDataHandler(values: VendorTableRow | null) {
    if (values) {
      setModalData(values);
      reset({ name: values.name });
    } else {
      setModalData(null);
    }
  }

  function submitHandler(values: VendorForm) {
    if (!modalData?.id) return;

    mutate(
      { id: modalData.id, values },
      {
        onSuccess: () => {
          notification.success({ message: 'Vendor updated successfully' });
          setModalData(null);
          cacheOnUpdateVendor(modalData.id, values);
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
