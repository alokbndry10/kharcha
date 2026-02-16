import { FieldError } from '@components/field-error';
import { InputNumber } from 'antd';
import { InputNumberProps } from 'antd/lib';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { AppLabel } from '../app-label';

type Props<T extends FieldValues> = InputNumberProps & {
  required?: boolean;
  label?: string;
  name: Path<T>;
  placeholder?: string;
  control: Control<T>;
};

export function AppInputNumber<T extends FieldValues>(props: Props<T>) {
  const { required, label, name, placeholder, control, ...restProps } = props;

  return (
    <div className="flex flex-col gap-0.5 md:gap-1.5 w-full">
      <AppLabel required={required}>{label}</AppLabel>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              status={error && 'error'}
              title={label}
              placeholder={placeholder}
              {...field}
              {...restProps}
            />
            <FieldError message={error?.message} />
          </div>
        )}
      />
    </div>
  );
}
