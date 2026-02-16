import { FieldError } from '@components/field-error';
import { Input } from 'antd';
import { OTPProps } from 'antd/es/input/OTP';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type OTPInputProps<T extends FieldValues> = OTPProps & {
  required?: boolean;
  label?: string;
  name: Path<T>;
  control: Control<T>;
  suffixLabel?: string;
};

export function AppOtpInput<T extends FieldValues>(props: OTPInputProps<T>) {
  const { required, label, name, suffixLabel, control, ...otpProps } = props;

  return (
    <div className="flex flex-col gap-0.5 md:gap-1.5 w-full">
      <p className="text-base font-medium text-text-800">
        {label}
        <span className="text-gray-400 text-xs font-normal">{suffixLabel && suffixLabel}</span> {required && '*'}
      </p>

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className="w-full flex flex-col gap-0.5 md:gap-1.5">
            <Input.OTP
              length={6}
              type="number"
              autoFocus
              value={value}
              onInput={(vals) => onChange(vals.join(''))}
              status={error ? 'error' : undefined}
              className="h-20"
              {...otpProps}
            />
            <FieldError message={error?.message} />
          </div>
        )}
      />
    </div>
  );
}
