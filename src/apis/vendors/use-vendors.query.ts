import { useQuery } from '@tanstack/react-query';
import { VendorFilters } from '@modules/vendors/hooks/use-get-vendor';
import { supabase } from '@/lib/supabase/supabase';
import { Entities } from '@/lib/supabase/Entities';

const getVendors = async (filters: VendorFilters) => {
  const vendors = await supabase
    .from('Vendors')
    .select('*', { count: 'exact' })
    .ilike('name', `%${filters.name}%`)
    .order('created_at', { ascending: false })
    .range(0, 100);

  const { data, error } = vendors;

  if (error) throw error;
  return data;
};

export const useGetVendorsQuery = (filters: string) => {
  return useQuery({
    queryKey: [Entities.Vendors, filters],
    queryFn: () => getVendors(JSON.parse(filters)),
  });
};
