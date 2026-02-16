import { useMutation } from '@tanstack/react-query';
import { UpdateVendorItem } from '@modules/items/items.types';
import { supabase } from '@/lib/supabase/supabase';
import { Tables } from '@/lib/supabase/generated.types';

const addVendorItem = async (values: Omit<Tables<'Vendor_Item'>, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('Vendor_Item').insert(values).select('*, vendor_id(*), unit_id(*)');

  if (error) throw error;
  return data;
};

const updateVendorItem = async (args: { id: number; values: UpdateVendorItem }) => {
  const { id, values } = args;

  const { data, error } = await supabase
    .from('Vendor_Item')
    .update(values)
    .eq('item_id', id)
    .eq('vendor_id', values.vendor_id)
    .select('*, vendor_id(*), unit_id(*)')
    .single();

  if (error) throw error;
  return data;
};

const deleteVendorItem = async (itemId: number) => {
  const { data, error } = await supabase.from('Vendor_Item').delete().eq('item_id', itemId);

  if (error) throw error;
  return data;
};

export const useAddVendorItemMutation = () => useMutation({ mutationFn: addVendorItem });
export const useUpdateVendorItemMutation = () => useMutation({ mutationFn: updateVendorItem });
export const useDeleteVendorItemMutation = () => useMutation({ mutationFn: deleteVendorItem });
