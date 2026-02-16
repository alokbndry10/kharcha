import { AppInput } from '@components/form/input/app-input';
import { LoginViewProps } from './login.types';
import { AppPasswordInput } from '@components/form/input/app-password-input';
import { AppPrimaryButton } from '@components/form/button/app-primary-button';
import { AuthFormWrapper } from '../common/auth-form-wrapper';
import { app_name } from '@shared/constants/app.constants';

export function LoginView({ onSubmit, handleSubmit, control, loading }: LoginViewProps) {
  return (
    <AuthFormWrapper tag="LOGIN" titles={[app_name]} subtitle="Please enter your details to login.">
      <div className="space-y-5">
        <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <AppInput name="email" control={control} label="Email" placeholder="Enter your email" autoFocus />
            <div className="flex flex-col gap-2">
              <AppPasswordInput name="password" control={control} label="Password" placeholder="Enter your password" />
            </div>
          </div>
          <AppPrimaryButton htmlType="submit" className="w-full" loading={loading}>
            Login
          </AppPrimaryButton>
        </form>
      </div>
    </AuthFormWrapper>
  );
}
