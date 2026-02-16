import { Entities } from '@/lib/supabase/Entities';
import { supabase } from '@/lib/supabase/supabase';
import { useQuery } from '@tanstack/react-query';

export type ExpenseFilters = {
  search: string;
  fromDate: string | null;
  toDate: string | null;
  page: number;
  pageSize: number;
};

const getExpenses = async (filters: ExpenseFilters) => {
  let query = supabase.from('Expenses').select(
    `
      *,
      Items!inner(
        id,
        name
      ),
      Vendors(
        id,
        name
      ),
      Units(
        id,
        name
      )
    `,
    { count: 'exact' }
  );

  // Search (by item name OR vendor name)
  // Note: PostgREST `or()` does NOT support embedded dotted fields (e.g. `Items.name`),
  // so we translate the search into IDs and apply `or(item_id.in(...),vendor_id.in(...))`.
  const search = (filters.search ?? '').trim();
  if (search) {
    const pattern = `%${search}%`;
    const [{ data: items, error: itemsError }, { data: vendors, error: vendorsError }] = await Promise.all([
      supabase.from('Items').select('id').ilike('name', pattern).range(0, 200),
      supabase.from('Vendors').select('id').ilike('name', pattern).range(0, 200),
    ]);

    if (itemsError) throw itemsError;
    if (vendorsError) throw vendorsError;

    const itemIds = (items ?? []).map((r) => r.id).filter((id): id is number => typeof id === 'number');
    const vendorIds = (vendors ?? []).map((r) => r.id).filter((id): id is number => typeof id === 'number');

    if (itemIds.length === 0 && vendorIds.length === 0) return { data: [], count: 0 };

    const parts: string[] = [];
    if (itemIds.length) parts.push(`item_id.in.(${itemIds.join(',')})`);
    if (vendorIds.length) parts.push(`vendor_id.in.(${vendorIds.join(',')})`);
    query = query.or(parts.join(','));
  }

  // Paid date range filter (inclusive)
  if (filters.fromDate) query = query.gte('paid_date', filters.fromDate);
  if (filters.toDate) query = query.lte('paid_date', filters.toDate);

  const page = Math.max(1, Number(filters.page || 1));
  const pageSize = Math.min(100, Math.max(1, Number(filters.pageSize || 10)));
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query.order('created_at', { ascending: false }).range(from, to);

  if (error) throw error;
  return { data: data ?? [], count: count ?? 0 };
};

export const useGetExpensesQuery = (filters: string) => {
  return useQuery({
    queryKey: [Entities.Expenses, filters],
    queryFn: () => getExpenses(JSON.parse(filters)),
  });
};
