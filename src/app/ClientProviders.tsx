'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import BasicLayout from '@components/ui/BasicLayout';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from '@utils/queryClient';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are reset
import { ReactNode } from 'react';
import ErrorBoundary from 'src/app/ErrorBoundary';
import ErrorComponent from 'src/app/error';
import Loading from 'src/app/loading';
import theme from 'src/methods/themeConfig';
import './globals.css';
import { NotificationProvider } from '@components/higher-order-components/Notification';

function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>
          <StyleProvider>
            <NotificationProvider>
              <BasicLayout>
                <ErrorBoundary fallback={ErrorComponent}>
                  {children}
                  <Loading />
                  <ReactQueryDevtools initialIsOpen={false} />
                </ErrorBoundary>
              </BasicLayout>
            </NotificationProvider>
          </StyleProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default ClientProviders;
