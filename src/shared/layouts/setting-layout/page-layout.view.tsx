import clsx from 'clsx';
import { ReactNode } from 'react';
import { appContentSpace } from '@shared/constants/app.constants';

export function PageLayout({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('flex flex-col h-full overflow-hidden', className)}>{children}</div>;
}

PageLayout.Header = function PageHeader({ children }: { children: ReactNode }) {
  return <div className={clsx(appContentSpace, 'space-y-4 my-4')}>{children}</div>;
};

PageLayout.Body = function PageBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={clsx(appContentSpace, 'bg-off-white space-y-4 flex-1 flex flex-col overflow-auto', className)}>
      {children}
    </section>
  );
};
