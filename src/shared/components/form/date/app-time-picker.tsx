import { FieldError } from '@components/field-error';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { TimePickerProps } from 'antd/lib';
import { Dayjs } from 'dayjs';

export type TProps<T extends FieldValues> = Omit<TimePickerProps, 'onChange' | 'value'> & {
  required?: boolean;
  label?: string;
  name: Path<T>;
  placeholder?: string;
  control: Control<T>;
  suffixLabel?: string;
  onChange?: (time: Dayjs | null) => void;
  value?: Dayjs | null;
};

export function AppTimePicker<T extends FieldValues>(props: TProps<T>) {
  const { required, label, name, placeholder, suffixLabel, control, onChange, value, ...restProps } = props;

  return (
    <div className="flex flex-col gap-0.5 md:gap-1.5 w-full">
      {label && (
        <p className="text-base font-medium text-text-800">
          {label}
          <span className="text-text-400 text-xs font-normal">{suffixLabel && suffixLabel}</span>
          {required && <span className="text-red-500">*</span>}
        </p>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="w-full flex flex-col gap-0.5 md:gap-1.5">
            <TimePicker
              status={error ? 'error' : ''}
              value={value || (field.value ? dayjs(field.value, 'HH:mm:ss') : null)}
              onChange={(time) => {
                field.onChange(time ? time.format('HH:mm:ss') : '');
                onChange?.(time);
              }}
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
