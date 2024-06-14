// app/ClientProviders.tsx
'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are reset
import { ReactNode } from 'react';
import theme from 'src/methods/themeConfig';
import './globals.css';
import { BasicLayout } from '@components/Component';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <AntdRegistry>
        <StyleProvider>
          {/* <BasicLayout> */}
          {children}
          {/* </BasicLayout> */}
        </StyleProvider>
      </AntdRegistry>
    </ConfigProvider>
  );
}
