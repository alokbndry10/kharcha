import { queryClient } from '@/setup/app.providers';

import { Entities } from '@/lib/supabase/Entities';
import { Tables } from '@/lib/supabase/generated.types';
import { GetItem } from '@modules/items/items.types';

export function cacheOnAddItem(newData: Omit<Tables<'Items'>, 'created_at'>) {
  const cache = queryClient.getQueryCache();

  const queries = cache.findAll({
    queryKey: [Entities.Items],
  });

  queries.forEach((query) => {
    queryClient.setQueryData(query.queryKey, (data: GetItem[] | undefined) => {
      if (!data) return data;

      return [newData, ...data];
    });
  });
}

export function cacheOnUpdateItem(id: Tables<'Items'>['id'], values: GetItem) {
  const cache = queryClient.getQueryCache();

  const queries = cache.findAll({
    queryKey: [Entities.Items],
  });

  queries.forEach((query) => {
    queryClient.setQueryData(query.queryKey, (data: GetItem[] | undefined) => {
      if (!data) return data;

      return data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...values,
          };
        } else return item;
      });
    });
  });
}

export function cacheOnDeleteItem(itemId: Tables<'Items'>['id'], vendorId: number) {
  const cache = queryClient.getQueryCache();

  const queries = cache.findAll({
    queryKey: [Entities.Items],
  });

  queries.forEach((query) => {
    queryClient.setQueryData(query.queryKey, (data: GetItem[] | undefined) => {
      if (!data) return data;

      //return data.filter((item) => item.id !== itemId && item.Vendor_Item[0].Vendors.id !== vendorId);
      return data.filter((item) => !(item.id === itemId && item.Vendor_Item[0].Vendors.id === vendorId));
    });
  });
}
