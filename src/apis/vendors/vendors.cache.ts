import { queryClient } from '@/setup/app.providers';

import { VendorForm, VendorTableRow } from '@modules/vendors/vendors.types';
import { Entities } from '@/lib/supabase/Entities';
import { Tables } from '@/lib/supabase/generated.types';

export function cacheOnAddVendor(newData: Omit<VendorTableRow, 'sn'>) {
  const cache = queryClient.getQueryCache();

  const queries = cache.findAll({
    queryKey: [Entities.Vendors],
  });

  queries.forEach((query) => {
    queryClient.setQueryData(query.queryKey, (data: VendorTableRow[] | undefined) => {
      if (!data) return data;

      return [newData, ...data];
    });
  });
}

export function cacheOnUpdateVendor(id: Tables<'Vendors'>['id'], values: VendorForm) {
  const cache = queryClient.getQueryCache();

  const queries = cache.findAll({
    queryKey: [Entities.Vendors],
  });

  queries.forEach((query) => {
    queryClient.setQueryData(query.queryKey, (data: VendorTableRow[] | undefined) => {
      if (!data) return data;

      return data.map((vendor) => {
        if (vendor.id === id) {
          return {
            ...vendor,
            ...values,
          };
        } else return vendor;
      });
    });
  });
}

export function cacheOnDeleteVendor(id: Tables<'Vendors'>['id']) {
  const cache = queryClient.getQueryCache();

  const queries = cache.findAll({
    queryKey: [Entities.Vendors],
  });

  queries.forEach((query) => {
    queryClient.setQueryData(query.queryKey, (data: VendorTableRow[] | undefined) => {
      if (!data) return data;

      return data.filter((vendor) => vendor.id !== id);
    });
  });
}
