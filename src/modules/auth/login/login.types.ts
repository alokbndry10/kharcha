import { Control, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';

export type TLoginForm = {
  email: string;
  password: string;
};
export type LoginViewProps = {
  control: Control<TLoginForm>;
  onSubmit: (data: TLoginForm) => Promise<void>;
  loading: boolean;
  handleSubmit: UseFormHandleSubmit<TLoginForm, TLoginForm>;
  formHooks: UseFormReturn<TLoginForm>;
};
export type LoginVariableTypes = {
  variables: {
    input: {
      recaptchaToken: string;
      email: string;
      password: string;
    };
  };
};
