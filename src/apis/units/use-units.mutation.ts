import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/supabase';
import { UnitForm } from '@modules/units/units.types';

const addUnits = async (values: UnitForm) => {
  const { data, error } = await supabase.from('Units').insert(values).select().single();

  if (error) throw error;
  return data;
};

const updateUnits = async (args: { id: number; values: UnitForm }) => {
  const { id, values } = args;

  const { data, error } = await supabase.from('Units').update(values).eq('id', id);

  if (error) throw error;
  return data;
};

const deleteUnits = async (id: number) => {
  const { data, error } = await supabase.from('Units').delete().eq('id', id);

  if (error) throw error;
  return data;
};

export const useAddUnitsMutation = () => useMutation({ mutationFn: addUnits });
export const useUpdateUnitsMutation = () => useMutation({ mutationFn: updateUnits });
export const useDeleteUnitsMutation = () => useMutation({ mutationFn: deleteUnits });
