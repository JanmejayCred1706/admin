'use client';
import { UserOutlined } from '@ant-design/icons';
import { SelectField } from '@components/Component';
import { states } from '@functions/LayoutFn';
import { TopNavProps } from '@interface/UiInterfaces'; // Ensure this path is correct
import { deleteCookies } from '@utils/cookies';
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
import { redirect, useRouter } from 'next/navigation';
import React from 'react';
import { useAppStore } from 'src/utils/Store';

const TopNav: React.FC<TopNavProps> = () => {
  const router = useRouter();
  const { Header } = Layout;
  const { updateState, currentState } = useAppStore();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleChange = (value: any) => {
    updateState(value);
  };
  const handleLogOut = () => {
    localStorage.removeItem('token');
    deleteCookies('token');
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <p onClick={handleLogOut}>Sign Out</p>,
    },
  ];

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
            Admin
          </Typography>
          <Dropdown
            menu={{ items }}
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
