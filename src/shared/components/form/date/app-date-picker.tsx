import { FieldError } from '@components/field-error';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { DatePickerProps } from 'antd';
import { Dayjs } from 'dayjs';
import { AppLabel } from '../app-label';
import { show_date_format } from '@shared/constants/app.constants';

export type DProps<T extends FieldValues> = Omit<DatePickerProps, 'onChange' | 'value'> & {
  required?: boolean;
  label?: string;
  name: Path<T>;
  placeholder?: string;
  control: Control<T>;
  onChange?: (date: Dayjs | null) => void;
  value?: Dayjs | null;
};

export function AppDatePicker<T extends FieldValues>(props: DProps<T>) {
  const { required, label, name, placeholder, control, onChange, value, ...restProps } = props;

  return (
    <div className="flex flex-col gap-0.5 md:gap-1.5 w-full">
      <AppLabel required={required}>{label}</AppLabel>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="w-full flex flex-col gap-0.5 md:gap-1.5">
            <DatePicker
              format={show_date_format}
              status={error ? 'error' : ''}
              placeholder={placeholder}
              value={value || (field.value ? dayjs(field.value) : null)}
              onChange={(date) => {
                field.onChange(date ? date.format('YYYY-MM-DD') : '');
                onChange?.(date);
              }}
              {...restProps}
            />
            <FieldError message={error?.message} />
          </div>
        )}
      />
    </div>
  );
}
