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
import { ReactNode, useEffect, useState } from 'react';
import theme from 'src/methods/themeConfig';
import './globals.css';
import Loading from 'src/app/loading';
import { useRouter } from 'next/navigation';
import { getCookiesFrom } from '@utils/cookies';

function ClientProviders({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const data = await getCookiesFrom('token');
        setToken(data);
      } catch (err) {
        console.error('Error fetching token:', err);
      } finally {
        setLoading(false); // Update loading state once token fetching is done
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  if (loading) {
    return <Loading />; // Render loading indicator while fetching token
  }

  if (token === null) {
    // Render nothing if token is null
    return null;
  }

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
