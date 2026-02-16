import { queryClient } from '@/setup/app.providers';

import { UnitTableRow, UnitForm } from '@modules/units/units.types';
import { Entities } from '@/lib/supabase/Entities';
import { Tables } from '@/lib/supabase/generated.types';

export function cacheOnAddUnit(newData: Omit<UnitTableRow, 'sn'>) {
  const cache = queryClient.getQueryCache();

  const queries = cache.findAll({
    queryKey: [Entities.Units],
  });

  queries.forEach((query) => {
    queryClient.setQueryData(query.queryKey, (data: UnitTableRow[] | undefined) => {
      if (!data) return data;

      return [newData, ...data];
    });
  });
}

export function cacheOnUpdateUnit(id: Tables<'Units'>['id'], values: UnitForm) {
  const cache = queryClient.getQueryCache();

  const queries = cache.findAll({
    queryKey: [Entities.Units],
  });

  queries.forEach((query) => {
    queryClient.setQueryData(query.queryKey, (data: UnitTableRow[] | undefined) => {
      if (!data) return data;

      return data.map((unit) => {
        if (unit.id === id) {
          return {
            ...unit,
            ...values,
          };
        } else return unit;
      });
    });
  });
}

export function cacheOnDeleteUnit(id: UnitTableRow['id']) {
  const cache = queryClient.getQueryCache();

  const queries = cache.findAll({
    queryKey: [Entities.Units],
  });

  queries.forEach((query) => {
    queryClient.setQueryData(query.queryKey, (data: UnitTableRow[] | undefined) => {
      if (!data) return data;

      return data.filter((unit) => unit.id !== id);
    });
  });
}
