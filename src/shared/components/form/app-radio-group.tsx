import { Radio, RadioGroupProps } from 'antd';
import { FieldError } from '@components/field-error';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { AppLabel } from './app-label';

type Props<T extends FieldValues> = RadioGroupProps & {
  required?: boolean;
  label?: string;
  name: Path<T>;
  control: Control<T>;
};

export function AppRadioGroup<T extends FieldValues>(props: Props<T>) {
  const { name, control, label, required, ...restProps } = props;

  return (
    <div className="flex flex-col gap-0.5 md:gap-1.5 w-full">
      <AppLabel required={required}>{label}</AppLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <div className="w-full flex flex-col gap-[6px]">
              <Radio.Group rootClassName="w-full" {...field} {...restProps} />
              <FieldError message={error?.message} />
            </div>
          );
        }}
      />
    </div>
  );
}
