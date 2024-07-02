'use client';
import { MenuOutlined } from '@ant-design/icons';
import { allowedLabels, navMenuItem } from '@functions/LayoutFn';
import { leftNavProps } from '@interface/UiInterfaces';
import { Layout, Menu } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LeftNav = (props: leftNavProps) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { Sider } = Layout;
  const items = navMenuItem(allowedLabels);
  const redirection = (path: string) => {
    router.push(path, { scroll: false });
  };
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        className={`demo-logo-vertical m-4 flex  ${collapsed ? 'display-center' : 'justify-between'}`}
      >
        {!collapsed && (
          <Image src="/logo.png" height={120} width={120} alt="logo" priority />
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
  );
};

export default LeftNav;
