import { AppInput } from '@components/form/input/app-input';
import { useFormContext } from 'react-hook-form';
import { VendorForm as VendorFormType } from '../vendors.types';
import { tenant_name } from '@shared/constants/app.constants';
import { useScreenSize } from '@shared/hooks/use-screen';

export function VendorForm() {
  const { isMobile } = useScreenSize();
  const formHooks = useFormContext<VendorFormType>();
  const { control } = formHooks;

  return (
    <div className="space-y-4 max-w-96">
      <AppInput
        autoFocus={!isMobile}
        label="Name"
        control={control}
        name="name"
        required
        placeholder={'Example: ' + tenant_name}
      />
    </div>
  );
}
