import { supabase } from '@/lib/supabase/supabase';
import { local_storage } from '@shared/constants/app.constants';
import { useEffect, useState } from 'react';

export function useGetUserProfile() {
  const [userLoading, setUserLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function setSupabaseUserToLocalStorage() {
    supabase.auth
      .getUser()
      .then(({ data: { user } }) => {
        localStorage.setItem(local_storage.user, JSON.stringify(user));
        setIsLoggedIn(!!user);
      })
      .finally(() => setUserLoading(false));
  }

  useEffect(setSupabaseUserToLocalStorage, []);

  return { isLoggedIn, userLoading };
}
