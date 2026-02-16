import { Layout } from 'antd';
import { ReactNode, Suspense } from 'react';

interface Props {
  children: ReactNode;
}

export function PublicLayout({ children }: Props) {
  return (
    <Layout hasSider>
      <Suspense>
        <Layout className="overflow-auto h-dvh">
          <div className="bg-off-white grid place-items-center overflow-auto h-full">{children}</div>
        </Layout>
      </Suspense>
    </Layout>
  );
}
