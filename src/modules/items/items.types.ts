import z from 'zod';
import { ItemSchema } from './item.constants';
import { Tables } from '@/lib/supabase/generated.types';

export type GetItem = Tables<'Items'> & {
  Vendor_Item: {
    current_rate: number | null;
    Vendors: {
      id: number;
      name: string;
    };
    Units: {
      id: number;
      name: string;
    } | null;
  }[];
};

export type ItemForm = z.infer<typeof ItemSchema>;
export type ItemTableRow = Omit<Tables<'Items'>, 'created_at'> & {
  sn: number;
  current_rate: Tables<'Vendor_Item'>['current_rate'];
  vendor_id: Tables<'Vendor_Item'>['vendor_id'];
  vendorName: Tables<'Vendors'>['name'];
  unit_id: Tables<'Units'>['id'] | undefined;
  unitName: Tables<'Units'>['name'] | undefined;
};

export type SubmitVendorItemForm = {
  item_id: number;
  vendor_id: number;
  current_rate: number | null;
  unit_id: number | null;
};

export type UpdateVendorItem = Pick<Tables<'Vendor_Item'>, 'item_id' | 'vendor_id' | 'unit_id' | 'current_rate'>;
