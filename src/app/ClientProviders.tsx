'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { BasicLayout } from '@components/Component';
import { NotificationProvider } from '@components/higher-order-components/Notification';
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

function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>
          <StyleProvider>
            <NotificationProvider>
              <ErrorBoundary fallback={<ErrorComponent />}>
                <BasicLayout>
                  {children}
                  <Loading />
                  <ReactQueryDevtools initialIsOpen={false} />
                </BasicLayout>
              </ErrorBoundary>
            </NotificationProvider>
          </StyleProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default ClientProviders;
