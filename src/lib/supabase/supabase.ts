import { ENV } from '../env-helpers';
import { createClient } from '@supabase/supabase-js';
import { Database } from './generated.types';

export const supabase = createClient<Database>(ENV.SUPABASE_URL, ENV.SUPABASE_PUBLISHABLE_DEFAULT_KEY);
