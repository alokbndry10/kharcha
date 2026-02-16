import { ConfigProvider } from 'antd';
import { theme } from '@/lib/antd/antd-theme';
import { JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { dayjsExtend } from '@shared/utils/dayjs.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

dayjsExtend();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Data is always considered "fresh"
      gcTime: Infinity, // Query data is never garbage collected
      retry: 3,
    },
  },
});

export default function AppProviders({ children }: { children: JSX.Element }) {
  return (
    <BrowserRouter>
      <ConfigProvider theme={theme}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}
