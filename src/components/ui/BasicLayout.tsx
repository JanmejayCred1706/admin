'use client';
import { LayoutProps } from '@ui/UiInterfaces';
import React, { useState } from 'react';

import {
  DesktopOutlined,
  FileOutlined,
  MenuOutlined,
  PieChartOutlined,
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
    getItem('Home', '/dashboard'),
  ]),
  getItem('Plans', '2', <DesktopOutlined />, [
    getItem('All Plans', '/'),
    getItem('Cancelled Plans', '22'),
  ]),
  getItem('Retailers', '3', <UserOutlined />, [
    getItem('Active Retailers', '31'),
    getItem('All Retailers', '32'),
  ]),
  getItem('Service Centers', '4', <TeamOutlined />, [
    getItem('All Service Centers', '41'),
  ]),
  getItem('Report', '5', <FileOutlined />, [
    getItem('Billing Report', '51'),
    getItem('Waterfall Report', '52'),
  ]),
  getItem('Claims', '6', <FileOutlined />, [getItem('All Claims', '61')]),
  getItem('Settings', '7', <FileOutlined />, [
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
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical m-4 flex justify-between">
          {!collapsed && (
            <Image src="/logo.png" height={120} width={120} alt="logo" />
          )}
          <MenuOutlined onClick={() => setCollapsed(!collapsed)} />
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
            }}
          >
            {children}
          </div>
        </Content>
        <FooterNav />
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
