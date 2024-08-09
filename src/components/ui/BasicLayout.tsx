'use client';

import React, { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import { usePathname } from 'next/navigation';
import FooterNav from '@components/ui/FooterNav';
import LeftNav from '@components/ui/LeftNav';
import TopNav from '@components/ui/TopNav';
import { LayoutProps } from '@interface/UiInterfaces';
import { getCookiesFrom } from '@utils/cookies';
import Loading from 'src/app/loading';

const { Content } = Layout;

const BasicLayout: React.FC<LayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathname = usePathname();
  const [token, setToken] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getToken = async () => {
    setIsLoading(true);
    try {
      const token = await getCookiesFrom('token');
      setToken(token?.value);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, [pathname]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {token ? (
        <Layout
          style={{
            minHeight: '40rem',
            minWidth: '60rem',
            maxWidth: '150rem',
            maxHeight: '120rem',
          }}
        >
          <MemoizedLeftNav />
          <Layout>
            <MemoizedTopNav />
            <Content style={{ margin: '1.5rem' }}>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                  height: 'calc(100vh - 14rem)',
                  overflow: 'scroll',
                }}
              >
                {children}
              </div>
            </Content>
            <FooterNav />
          </Layout>
        </Layout>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

const areEqualLeftNav = (prevProps: any, nextProps: any) => {
  // Custom comparison logic if needed
  return true;
};

const areEqualTopNav = (prevProps: any, nextProps: any) => {
  // Custom comparison logic if needed
  return true;
};

const MemoizedLeftNav = React.memo(LeftNav, areEqualLeftNav);
const MemoizedTopNav = React.memo(TopNav, areEqualTopNav);

export default React.memo(BasicLayout);
