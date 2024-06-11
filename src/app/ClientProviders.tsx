// app/ClientProviders.tsx
'use client';

import { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are reset
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import theme from 'src/methods/themeConfig';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <AntdRegistry>
        <StyleProvider>{children}</StyleProvider>
      </AntdRegistry>
    </ConfigProvider>
  );
}
