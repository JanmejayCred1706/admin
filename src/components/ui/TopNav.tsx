import { UserOutlined } from '@ant-design/icons';
import { TopNavProps } from '@ui/UiInterfaces'; // Ensure this path is correct
import { Avatar, Layout, Space, Typography, theme } from 'antd';
import React from 'react';

const TopNav: React.FC<TopNavProps> = () => {
  const { Header } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: 0,
        backgroundColor: '#3C63FC',
        display: 'flex',
        justifyContent: 'space-between',
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
          <Typography style={{ fontSize: '1.5rem' }}>Admin</Typography>
          <Avatar size="large" icon={<UserOutlined />} />
        </Space>
      </div>
    </Header>
  );
};

export default TopNav;
