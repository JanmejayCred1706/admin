import { FooterNavProps } from '@ui/UiInterfaces';
import { Layout } from 'antd';
import React from 'react';

const FooterNav = (props: FooterNavProps) => {
  const { Footer } = Layout;
  return (
    <Footer
      style={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#F8F9FE',
        height: '5rem',
      }}
    >
      <div>©{new Date().getFullYear()} Garantie</div>
      <div>About us</div>
    </Footer>
  );
};

export default FooterNav;
