import { FieldError } from '@components/field-error';
import { Checkbox, CheckboxProps } from 'antd';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type ICheckboxProps<T extends FieldValues> = CheckboxProps & {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  required?: boolean;
};

export function AppCheckbox<T extends FieldValues>({
  label,
  name,
  control,
  required,
  ...restProps
}: ICheckboxProps<T>) {
  return (
    <div className="flex flex-col gap-[6px] w-full">
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className="flex flex-col gap-[6px]">
            <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} {...restProps}>
              {label} {required && <span className="text-red-500">*</span>}
            </Checkbox>
            <FieldError message={error?.message} />
          </div>
        )}
      />
    </div>
  );
}
