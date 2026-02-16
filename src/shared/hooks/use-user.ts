import { supabase } from '@/lib/supabase/supabase';
import { local_storage } from '@shared/constants/app.constants';

export function useUser() {
  const localUser = localStorage.getItem(local_storage.user);

  async function logoutUser() {
    await supabase.auth.signOut();

    localStorage.removeItem(local_storage.user);
    window.location.href = '/login';
  }

  return {
    user: localUser ? JSON.parse(localUser) : null,
    logoutUser,
  };
}
