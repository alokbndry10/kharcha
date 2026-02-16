import { ReactNode } from 'react';
import { LayoutContextProvider } from './context/layout/layout-context';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';

export default function PrivateProviders({ children }: { children: ReactNode }) {
  return (
    <LayoutContextProvider>
      <ErrorBoundary>{children}</ErrorBoundary>
    </LayoutContextProvider>
  );
}
