import z from 'zod';
import { VendorSchema } from './vendor.constants';
import { Prettify } from '@supabase/supabase-js';
import { Tables } from '@/lib/supabase/generated.types';

export type VendorForm = z.infer<typeof VendorSchema>;

export type VendorTableRow = Prettify<Omit<Tables<'Vendors'>, 'created_at'> & { sn: number }>;
