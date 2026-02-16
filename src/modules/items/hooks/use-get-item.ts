import { useGetItemsQuery } from '@apis/items/use-items.query';
import { useState } from 'react';
import { ItemTableRow } from '../items.types';
import { itemsFilter } from '../item.constants';

export type ItemFilters = {
  name: string;
};

export function useGetItems() {
  const [filters, setFilters] = useState<ItemFilters>(itemsFilter);
  const { data, isPending } = useGetItemsQuery(JSON.stringify(filters));

  const tableData: ItemTableRow[] =
    data?.map((item, i) => ({
      sn: i + 1,
      id: item?.id,
      name: item?.name,
      description: item?.description,
      current_rate: item?.Vendor_Item?.[0]?.current_rate,
      vendor_id: item?.Vendor_Item?.[0]?.Vendors?.id,
      vendorName: item?.Vendor_Item?.[0]?.Vendors?.name,
      unit_id: item?.Vendor_Item?.[0]?.Units?.id,
      unitName: item?.Vendor_Item?.[0]?.Units?.name,
    })) ?? [];

  return {
    tableData,
    isPending,
    page: 1,
    pageSize: 10000,
    setFilters,
  };
}
