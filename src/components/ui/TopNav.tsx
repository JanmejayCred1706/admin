import { UserOutlined } from '@ant-design/icons';
import { TopNavProps } from '@ui/UiInterfaces'; // Ensure this path is correct
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
import React from 'react';

const TopNav: React.FC<TopNavProps> = () => {
  const { Header } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const states = [
    { id: 12, name: 'Gujarat', code: 'GJ', category: 'gj' },
    { id: 14, name: 'Himachal Pradesh', code: 'HP', category: 'hp' },
    { id: 33, name: 'Uttar Pradesh', code: 'UP', category: 'up' },
    { id: 29, name: 'Rajasthan', code: 'RJ', category: 'rj' },
    { id: 20, name: 'Madhya Pradesh', code: 'MP', category: 'mp' },
  ];
  const handleChange = (value: any) => {
    console.log(value);
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          // href="https://www.antgroup.com"
        >
          Sign-out
        </a>
      ),
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
            allowClear
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
