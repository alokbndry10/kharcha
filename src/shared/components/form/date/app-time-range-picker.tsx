import { FieldError } from '@components/field-error';
import { TimePicker } from 'antd';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { TimeRangePickerProps } from 'antd/lib';
import dayjs, { Dayjs } from 'dayjs';

export type Props<T extends FieldValues> = Omit<TimeRangePickerProps, 'onChange' | 'value'> & {
  required?: boolean;
  label?: string;
  name: Path<T>;
  placeholder?: string;
  control: Control<T>;
  suffixLabel?: string;
};

export function AppTimeRangePicker<T extends FieldValues>(props: Props<T>) {
  const { required, label, name, suffixLabel, control, ...restProps } = props;

  return (
    <div className="flex flex-col gap-1.5 w-full">
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
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          const dayjsValue =
            value && Array.isArray(value) && value.length === 2
              ? ([dayjs(value[0], 'HH:mm:ss'), dayjs(value[1], 'HH:mm:ss')] as [Dayjs, Dayjs])
              : null;

          return (
            <div className="w-full flex flex-col gap-1.5">
              <TimePicker.RangePicker
                status={error ? 'error' : ''}
                value={dayjsValue}
                onChange={(values) => {
                  if (!values) return onChange(null);
                  onChange([dayjs(values[0]).format('HH:mm:ss'), dayjs(values[1]).format('HH:mm:ss')]);
                }}
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
