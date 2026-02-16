import { Button, ConfigProvider } from 'antd';
import { ButtonProps } from 'antd/lib';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
} & ButtonProps;

export function GrayButton({ children, ...restProps }: Props) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: 'var(--color-gray-100)',
            defaultHoverBg: 'var(--color-gray-200)',
            defaultHoverBorderColor: 'var(--color-text-100)',
            defaultHoverColor: 'var(--color-text-800)',
            defaultActiveBorderColor: 'var(--color-gray-800)',
          },
        },
      }}
    >
      <Button {...restProps}>{children}</Button>
    </ConfigProvider>
  );
}
