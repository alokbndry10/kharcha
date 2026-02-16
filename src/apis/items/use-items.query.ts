import { useQuery } from '@tanstack/react-query';
import { ItemFilters } from '@modules/items/hooks/use-get-item';
import { supabase } from '@/lib/supabase/supabase';
import { Entities } from '@/lib/supabase/Entities';

const getItems = async (filters: ItemFilters) => {
  const { data, error } = await supabase
    .from('Items')
    .select(
      `
      *,
      Vendor_Item!inner(
        current_rate,
        Vendors(
          id,
          name
        ),
        Units(
          id,
          name
        )
      )
    `,
      { count: 'exact' }
    )
    .ilike('name', `%${filters.name}%`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const useGetItemsQuery = (filters: string) => {
  return useQuery({
    queryKey: [Entities.Items, filters],
    queryFn: () => getItems(JSON.parse(filters)),
  });
};
