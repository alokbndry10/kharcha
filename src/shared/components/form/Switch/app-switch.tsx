import { Switch } from 'antd';
import { FieldError } from '@components/field-error';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { SwitchProps } from 'antd/lib';

type Props<T extends FieldValues> = SwitchProps & {
  required?: boolean;
  label?: string;
  name: Path<T>;
  control: Control<T>;
  suffixLabel?: string;
};

export function AppSwitch<T extends FieldValues>(props: Props<T>) {
  const { label, name, control, ...restProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <div className="w-full flex flex-col gap-[6px]">
            <Switch title={label} value={value} onChange={onChange} {...restProps} />
            <FieldError message={error?.message} />
          </div>
        );
      }}
    />
  );
}
