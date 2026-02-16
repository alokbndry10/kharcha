import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import React, { HTMLAttributes } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { AppLabel } from '../app-label';

type AppTextAreaProps<T extends FieldValues> = TextAreaProps & {
  required?: boolean;
  label?: string;
  name: Path<T>;
  placeholder?: string;
  control: Control<T>;
  suffixLabel?: React.JSX.Element;
  labelProps?: HTMLAttributes<HTMLDivElement>;
};

type LabelProps = HTMLAttributes<HTMLParagraphElement> & {
  suffixLabel?: React.JSX.Element;
  required?: boolean;
};

export const FormFieldGroup = (props: HTMLAttributes<HTMLDivElement>) => {
  const { children, ...restProps } = props;
  return (
    <div className="flex flex-col gap-[6px] w-full" {...restProps}>
      {children}
    </div>
  );
};

export const Label = (props: LabelProps) => {
  const { children, ...restProps } = props;
  return (
    <p className="text-base font-medium text-text-800" {...restProps}>
      {children} {props.suffixLabel && <span className="text-text-400 text-xs font-normal">{props.suffixLabel}</span>}
      {props.required && <span className="text-red-500">*</span>}
    </p>
  );
};

type FormFieldErrorProps = HTMLAttributes<HTMLParagraphElement> & {
  message?: string | null;
};

export const FormFieldError = (props: FormFieldErrorProps) => {
  const { ...restProps } = props;
  if (props?.message) {
    return (
      <p className="text-sm font-normal !text-red-500" {...restProps}>
        {props.message}
      </p>
    );
  }
};

export function AppTextArea<T extends FieldValues>(props: AppTextAreaProps<T>) {
  const { required, label, name, placeholder, control, labelProps, ...restProps } = props;
  const { TextArea } = Input;

  return (
    <FormFieldGroup>
      <AppLabel required={required} {...labelProps}>
        {label}
      </AppLabel>

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className="w-full flex flex-col gap-[6px]">
            <TextArea
              status={error && 'error'}
              title={label}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              {...restProps}
            />
            <FormFieldError message={error?.message} />
          </div>
        )}
      />
    </FormFieldGroup>
  );
}
