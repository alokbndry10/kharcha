import { useGetUnitsQuery } from '@apis/units/use-units.query';
import { useState } from 'react';
import { UnitTableRow } from '../units.types';

export type UnitFilters = {
  name: string;
};

export function useGetUnits() {
  const [filters, setFilters] = useState<UnitFilters>({
    name: '',
  });
  const { data, isPending } = useGetUnitsQuery(JSON.stringify(filters));

  const tableData: UnitTableRow[] =
    data?.map((unit, i) => ({
      sn: i + 1,
      id: unit?.id,
      name: unit?.name,
    })) ?? [];

  return {
    tableData,
    isPending,
    setFilters,
  };
}
