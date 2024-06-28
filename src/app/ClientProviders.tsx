// app/ClientProviders.tsx
'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are reset
import { ReactNode } from 'react';
import theme from 'src/methods/themeConfig';
import './globals.css';
import queryClient from '@utils/queryClient';
import { BasicLayout } from '@components/Component';
import ToastMessage from '@components/core/ToastMessage';
import NotificationComponent from '@components/core/Notification';

export default function ClientProviders({ children }: { children: ReactNode }) {
  // const queryClient = new QueryClient();
  return (
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>
          <StyleProvider>
            <BasicLayout>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
              <NotificationComponent />
            </BasicLayout>
          </StyleProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </ConfigProvider>
  );
}
