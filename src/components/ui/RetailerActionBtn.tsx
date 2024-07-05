import { RetailerActionBtnInterface } from '@interface/activeRetailersInterface';
import { Button, Space } from 'antd';
import React from 'react';

const RetailerActionBtn: React.FC<RetailerActionBtnInterface> = ({
  handleDocument,
  handleInactive,
  handleResetPassword,
  //   data,
}) => {
  return (
    <Space>
      <Button type="primary" onClick={handleDocument}>
        Add Document
      </Button>
      <Button type="primary" onClick={handleInactive}>
        Make Inactive
      </Button>
      <Button type="primary" danger onClick={handleResetPassword}>
        Reset Password
      </Button>
    </Space>
  );
};

export default RetailerActionBtn;
