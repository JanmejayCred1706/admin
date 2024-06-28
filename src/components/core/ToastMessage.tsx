import { Button, Space, notification } from 'antd';
import React from 'react';

interface ToastMessageProps {}

const ToastMessage: React.FC<ToastMessageProps> = ({}) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (pauseOnHover: boolean) => () => {
    api.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      showProgress: true,
      pauseOnHover,
    });
  };
  return (
    <div>
      <>
        {contextHolder}
        <Space>
          <Button type="primary" onClick={openNotification(true)}>
            Pause on hover
          </Button>
          <Button type="primary" onClick={openNotification(false)}>
            Don&apos;t pause on hover
          </Button>
        </Space>
      </>
    </div>
  );
};

export default ToastMessage;
