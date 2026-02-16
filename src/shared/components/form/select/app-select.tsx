import { FieldError } from '@components/field-error';
import { Select, SelectProps } from 'antd';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { AppLabel } from '../app-label';

type AppSelectProps<T extends FieldValues> = SelectProps & {
  required?: boolean;
  label?: string;
  name: Path<T>;
  placeholder?: string;
  control: Control<T>;
};

export function AppSelect<T extends FieldValues>(props: AppSelectProps<T>) {
  const { required, label, name, placeholder, control, ...restProps } = props;
  const _placeholder = placeholder || '- ' + 'Select' + '-';

  return (
    <div className="flex flex-col gap-[6px] w-full">
      <AppLabel required={required}>{label}</AppLabel>

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <div className="w-full flex flex-col gap-[6px]">
              <Select
                status={error && 'error'}
                title={label}
                value={value}
                onChange={onChange}
                placeholder={_placeholder}
                {...restProps}
              />
              <FieldError message={error?.message} />
            </div>
          );
        }}
      />
    </div>
  );
}
