import { FieldError } from '@components/field-error';
import { Input, InputProps } from 'antd';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { AppLabel } from '../app-label';

type Props<T extends FieldValues> = InputProps & {
  required?: boolean;
  label?: string;
  name: Path<T>;
  placeholder?: string;
  control: Control<T>;
};

export function AppInput<T extends FieldValues>(props: Props<T>) {
  const { required, label, name, placeholder, control, ...restProps } = props;

  return (
    <div className="flex flex-col gap-0.5 md:gap-1.5 w-full">
      <AppLabel required={required}>{label}</AppLabel>

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className="w-full flex flex-col gap-0.5 md:gap-1.5">
            <Input
              status={error && 'error'}
              title={label}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              {...restProps}
            />
            <FieldError message={error?.message} />
          </div>
        )}
      />
    </div>
  );
}
