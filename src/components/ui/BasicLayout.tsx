'use client';
import { LayoutProps } from '@interface/UiInterfaces';
import React, { useState } from 'react';

import {
  DesktopOutlined,
  FileOutlined,
  IssuesCloseOutlined,
  MenuOutlined,
  MoneyCollectOutlined,
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { BreadCrumbNav, FooterNav, TopNav } from '@components/Component';
import { Layout, Menu, MenuProps, theme } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem('Dashboard', '1', <PieChartOutlined />, [
    getItem('Home', '/admin/dashboard'),
  ]),
  // getItem('Plans', '2', <DesktopOutlined />, [
  //   getItem('All Plans', '/admin/plans/all-plans'),
  //   getItem('Cancelled Plans', '/admin/plans/cancel-plans'),
  // ]),
  getItem('Retailers', '3', <UserOutlined />, [
    getItem('Active Retailers', '/admin/retailers/active-retailers'),
    getItem('All Retailers', '/admin/retailers/all-retailers'),
  ]),
  getItem('Service Centers', '4', <TeamOutlined />, [
    getItem('All Service Centers', '/admin/service-center/all-service-center'),
  ]),
  getItem('Finance', '5', <MoneyCollectOutlined />, [
    getItem('Billing Report', '/admin/finance/billing-report'),
    getItem('Waterfall Report', '/admin/finance/waterfall-report'),
    getItem('Franchise', '/admin/finance/franchise'),
    getItem('Invoice', '/admin/finance/invoice'),
  ]),
  getItem('Claims', '6', <IssuesCloseOutlined />, [
    getItem('All Claims', '/admin/claims/all-claims'),
  ]),
  getItem('Settings', '7', <SettingOutlined />, [
    getItem('Users', '71'),
    getItem('Config', '72'),
    getItem('Roles', '73'),
  ]),
];
const BasicLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Content, Sider } = Layout;
  const router = useRouter();
  const redirection = (path: string) => {
    // navigate(path);
    router.push(path, { scroll: false });
  };
  const token = localStorage.getItem('token');

  React.useEffect(() => {
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
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div
              className={`demo-logo-vertical m-4 flex  ${collapsed ? 'display-center' : 'justify-between'}`}
            >
              {!collapsed && (
                <Image
                  src="/logo.png"
                  height={120}
                  width={120}
                  alt="logo"
                  priority
                />
              )}
              <MenuOutlined
                onClick={() => setCollapsed(!collapsed)}
                className={`${!collapsed} && display-center `}
              />
            </div>
            <Menu
              // theme="dark"
              defaultSelectedKeys={['1']}
              mode="inline"
              items={items}
              onClick={({ key }) => redirection(key)}
            />
          </Sider>
          <Layout>
            <TopNav />
            <Content style={{ margin: '0 16px' }}>
              <BreadCrumbNav />
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
