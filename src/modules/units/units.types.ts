import z from 'zod';
import { UnitSchema } from './unit.constants';
import { Prettify } from '@supabase/supabase-js';
import { Tables } from '@/lib/supabase/generated.types';

export type UnitForm = z.infer<typeof UnitSchema>;
export type UnitTableRow = Prettify<Omit<Tables<'Units'>, 'created_at'> & { sn: number }>;
