import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/supabase';
import { VendorForm } from '@modules/vendors/vendors.types';

const addVendors = async (values: VendorForm) => {
  const { data, error } = await supabase.from('Vendors').insert(values).select().single();

  if (error) throw error;
  return data;
};

const updateVendors = async (args: { id: number; values: VendorForm }) => {
  const { id, values } = args;

  const { data, error } = await supabase.from('Vendors').update(values).eq('id', id);

  if (error) throw error;
  return data;
};

const deleteVendors = async (id: number) => {
  const { data, error } = await supabase.from('Vendors').delete().eq('id', id);

  if (error) throw error;
  return data;
};

export const useAddVendorsMutation = () => useMutation({ mutationFn: addVendors });
export const useUpdateVendorsMutation = () => useMutation({ mutationFn: updateVendors });
export const useDeleteVendorsMutation = () => useMutation({ mutationFn: deleteVendors });
