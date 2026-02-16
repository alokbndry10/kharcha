import { useQuery } from '@tanstack/react-query';
import { UnitFilters } from '@modules/units/hooks/use-get-unit';
import { supabase } from '@/lib/supabase/supabase';
import { Entities } from '@/lib/supabase/Entities';

const getUnits = async (filters: UnitFilters) => {
  const { data, error } = await supabase
    .from('Units')
    .select('*', { count: 'exact' })
    .ilike('name', `%${filters.name}%`)
    .order('created_at', { ascending: false })
    .range(0, 100);

  if (error) throw error;
  return data;
};

export const useGetUnitsQuery = (filters: string) => {
  return useQuery({
    queryKey: [Entities.Units, filters],
    queryFn: () => getUnits(JSON.parse(filters)),
  });
};
