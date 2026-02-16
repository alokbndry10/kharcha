import { AppInput } from '@components/form/input/app-input';
import { useFormContext } from 'react-hook-form';
import { UnitForm as UnitFormType } from '../units.types';
import { useScreenSize } from '@shared/hooks/use-screen';

export function UnitForm() {
  const { isMobile } = useScreenSize();
  const formHooks = useFormContext<UnitFormType>();
  const { control } = formHooks;

  return (
    <div className="space-y-4 max-w-96">
      <AppInput autoFocus={!isMobile} label="Name" control={control} name="name" required placeholder="Example: kg" />
    </div>
  );
}
