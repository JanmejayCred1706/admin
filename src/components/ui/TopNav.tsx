'use client';
import { UserOutlined } from '@ant-design/icons';
import { states } from '@functions/LayoutFn';
import { TopNavProps } from '@interface/UiInterfaces';
import { deleteCookies, getCookiesFrom } from '@utils/cookies';
import {
  Avatar,
  Dropdown,
  Layout,
  MenuProps,
  Select,
  Space,
  Typography,
  theme,
} from 'antd';
import { useRouter } from 'next/navigation';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useAppStore } from 'src/utils/Store';

const TopNav: React.FC<TopNavProps> = () => {
  console.log('>>>top');
  const { Header } = Layout;
  const router = useRouter();
  const { updateState } = useAppStore();
  const [userName, setUserName] = useState<string>('');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleChange = useCallback(
    (value: any) => {
      updateState(value);
    },
    [updateState]
  );

  const handleLogOut = useCallback(() => {
    deleteCookies('token');
  }, [router]);

  const menuItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: <p onClick={handleLogOut}>Sign Out</p>,
      },
    ],
    [handleLogOut]
  );

  const selectOptions = useMemo(
    () =>
      states?.map((cur) => (
        <Select.Option value={cur?.id} key={cur?.id}>
          {cur?.name}
        </Select.Option>
      )),
    [states]
  );
  const getUserName = async () => {
    try {
      const name = await getCookiesFrom('userName');
      setUserName(name?.value || '');
    } catch (err) {
    } finally {
    }
  };
  useLayoutEffect(() => {
    getUserName();
  }, []);

  return (
    <Header
      style={{
        padding: 0,
        backgroundColor: '#3C63FC',
        display: 'flex',
        justifyContent: 'space-between',
        height: '5rem',
      }}
    >
      <div
        style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          marginRight: '1rem',
        }}
      >
        <Space size={16}>
          <Select
            placeholder="Select State"
            defaultOpen={false}
            style={{
              width: 192,
              textAlign: 'center',
              borderRadius: '6px',
            }}
            // allowClear
            onChange={handleChange}
            showSearch
            filterOption={(input, options) => {
              return options?.buildingName
                ?.toLowerCase()
                ?.includes(input?.toLowerCase());
            }}
          >
            {states?.map((cur, index, key) => (
              <Select.Option
                stateName={cur?.name}
                value={cur?.id}
                key={cur?.id}
              >
                {cur?.name}
              </Select.Option>
            ))}
          </Select>
          <Typography style={{ fontSize: '1.5rem', color: '#fff' }}>
            {userName}
          </Typography>
          <Dropdown
            menu={{ items: menuItems }}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
          >
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
};

export default TopNav;
