'use client';
import { MenuOutlined } from '@ant-design/icons';
import { allowedLabelsFor, navMenuItem } from '@functions/LayoutFn';
import { leftNavProps } from '@interface/UiInterfaces';
import { Layout, Menu } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';

const LeftNav = (props: leftNavProps) => {
  console.log('>>>left');
  const [label, setLabel] = useState<string[]>([]);
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { Sider } = Layout;

  useLayoutEffect(() => {
    const getRole = async () => {
      try {
        const role = await allowedLabelsFor();
        setLabel(role || []);
      } catch (err) {
        console.error(err);
      }
    };
    getRole();
  }, []);

  const items = useMemo(() => navMenuItem(label), [label]);

  const redirection = useCallback(
    (path: string) => {
      router.push(path, { scroll: false });
    },
    [router]
  );

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        className={`demo-logo-vertical m-4 flex ${collapsed ? 'display-center' : 'justify-between'}`}
      >
        {!collapsed && (
          <Image src="/logo.png" height={120} width={120} alt="logo" priority />
        )}
        <MenuOutlined
          onClick={() => setCollapsed(!collapsed)}
          className={`${!collapsed && 'display-center'}`}
        />
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
        onClick={({ key }) => redirection(key)}
      />
    </Sider>
  );
};

export default LeftNav;
