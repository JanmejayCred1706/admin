import { FooterNavProps } from '@ui/UiInterfaces';
import { Layout } from 'antd';
import React from 'react';

const FooterNav = (props: FooterNavProps) => {
  const { Footer } = Layout;
  return (
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
};

export default FooterNav;
