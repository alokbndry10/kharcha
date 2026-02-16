import { useMutation } from '@tanstack/react-query';
import { ItemForm } from '@modules/items/items.types';
import { supabase } from '@/lib/supabase/supabase';

const addItems = async (values: Pick<ItemForm, 'name' | 'description'>) => {
  const { data, error } = await supabase.from('Items').insert(values).select().single();

  if (error) throw error;
  return data;
};

const updateItems = async (args: { itemId: number; values: Pick<ItemForm, 'name' | 'description'> }) => {
  const { itemId, values } = args;

  const { data, error } = await supabase.from('Items').update(values).eq('id', itemId).select().single();

  if (error) throw error;
  return data;
};

const deleteItems = async (itemId: number) => {
  const { data, error } = await supabase.from('Items').delete().eq('id', itemId);

  if (error) throw error;
  return data;
};

export const useAddItemsMutation = () => useMutation({ mutationFn: addItems });
export const useUpdateItemsMutation = () => useMutation({ mutationFn: updateItems });
export const useDeleteItemsMutation = () => useMutation({ mutationFn: deleteItems });
