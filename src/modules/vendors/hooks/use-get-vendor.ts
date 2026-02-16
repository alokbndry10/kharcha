import { useGetVendorsQuery } from '@apis/vendors/use-vendors.query';
import { useState } from 'react';
import { VendorTableRow } from '../vendors.types';

export type VendorFilters = {
  name: string;
};

export function useGetVendors() {
  const [filters, setFilters] = useState<VendorFilters>({
    name: '',
  });
  const { data, isPending } = useGetVendorsQuery(JSON.stringify(filters));

  const tableData: VendorTableRow[] =
    data?.map((vendor, i) => ({
      sn: i + 1,
      id: vendor?.id,
      name: vendor?.name,
    })) ?? [];

  return {
    tableData,
    isPending,
    setFilters,
  };
}
