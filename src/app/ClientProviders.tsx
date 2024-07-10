// app/ClientProviders.tsx
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
import theme from 'src/methods/themeConfig';
import './globals.css';
import Loading from 'src/app/loading';

function ClientProviders({ children }: { children: ReactNode }) {
  // const queryClient = new QueryClient();
  return (
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>
          <StyleProvider>
            <NotificationProvider>
              <BasicLayout>
                {children}
                <Loading />
                <ReactQueryDevtools initialIsOpen={false} />
              </BasicLayout>
            </NotificationProvider>
          </StyleProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </ConfigProvider>
  );
}
export default ClientProviders;
