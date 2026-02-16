import { Button, Divider, Skeleton } from 'antd';
import { ButtonProps } from 'antd/lib';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onCancle?: VoidFunction;
  onSubmit: VoidFunction;
  loading: boolean;
  initialLoading?: boolean;
  submitProps?: ButtonProps;
  cancelProps?: ButtonProps;
  submitTitle?: string;
};

const Loader = (
  <div className="my-4 p-6 space-y-6 border border-gray-600 rounded-lg">
    <div>
      <Skeleton active />
    </div>
    <Divider />
    <div>
      <Skeleton active />
    </div>
    <Divider />
    <div>
      <Skeleton active />
    </div>
  </div>
);

export function FormPageLayout(props: Props) {
  const {
    children,
    onCancle,
    onSubmit,
    loading,
    initialLoading,
    submitProps = {},
    cancelProps = {},
    submitTitle = 'Create',
  } = props;

  return (
    <form
      className="space-y-6 flex flex-col h-full"
      onSubmit={(e) => {
        e?.preventDefault();
        onSubmit();
      }}
    >
      <div className="grow overflow-auto">{initialLoading ? Loader : children}</div>
      <footer className="flex gap-x-4 justify-end items-center border-t border-gray-800 pt-4">
        <Button
          hidden={!onCancle}
          type="default"
          disabled={loading}
          {...cancelProps}
          onClick={(e) => {
            e?.stopPropagation();
            onCancle?.();
          }}
        >
          Cancel
        </Button>
        <Button htmlType="submit" type="primary" loading={loading} {...submitProps}>
          {submitTitle}
        </Button>
      </footer>
    </form>
  );
}
