import axios from 'axios';
import { ENV } from '../env-helpers';

export const baseInstance = axios.create({
  baseURL: ENV.SUPABASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
