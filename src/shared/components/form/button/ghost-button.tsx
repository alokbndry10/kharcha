import { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';

type Props = {
  children: ReactNode;
} & ButtonProps;

export function GhostButton({ icon, children, ...restProps }: Props) {
  return (
    <Button icon={icon} type="default" size="middle" {...restProps}>
      {children}
    </Button>
  );
}
