import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TLoginForm } from './login.types';
import { local_storage, root_route } from '@shared/constants/app.constants';
import { loginDefaultValues, loginSchema } from './login.constants';
import { supabase } from '@/lib/supabase/supabase';
import { notification } from 'antd';
import { useState } from 'react';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const formHooks = useForm<TLoginForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: loginDefaultValues,
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit, control } = formHooks;

  async function submitHandler(data: TLoginForm) {
    setLoading(true);
    const res = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    setLoading(false);
    if (res.error) {
      notification.error({ message: res.error.message || 'Login failed' });
      return;
    }

    const user = res?.data?.user;

    if (user) {
      localStorage.setItem(local_storage.user, JSON.stringify(user));
      notification.success({ message: 'Login Successful' });
      window.location.href = root_route;
    }
  }

  return {
    loading,
    control,
    onSubmit: submitHandler,
    handleSubmit,
    formHooks,
  };
};
