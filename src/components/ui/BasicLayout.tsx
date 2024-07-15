'use client';
import {
  BreadCrumbNav,
  FooterNav,
  LeftNav,
  TopNav,
} from '@components/Component';
import { LayoutProps } from '@interface/UiInterfaces';
import { Layout, theme } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect } from 'react';

const BasicLayout: React.FC<LayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Content } = Layout;
  const router = useRouter();
  const token = localStorage.getItem('token');

  useLayoutEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

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
          <LeftNav />
          <Layout>
            <TopNav />
            <Content style={{ margin: '1.5rem' }}>
              {/* <BreadCrumbNav /> */}
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

export default BasicLayout;
