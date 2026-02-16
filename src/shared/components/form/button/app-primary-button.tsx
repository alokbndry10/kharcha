import { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';
import { Button, ButtonProps } from 'antd';

export type AppPrimaryButtonProps = {
  children: ReactNode;
} & ButtonProps;

export type AppPrimaryButtonHandle = {
  click: () => void;
};

export const AppPrimaryButton = forwardRef<AppPrimaryButtonHandle, AppPrimaryButtonProps>(
  ({ children, ...props }, ref) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => ({
      click: () => btnRef?.current?.click(),
    }));
    return (
      <Button {...props} ref={btnRef} type="primary">
        {children}
      </Button>
    );
  }
);
