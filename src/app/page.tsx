'use client';
import { BasicLayout } from '@components/Component';
import NotificationComponent from '@components/core/Notification';
import ToastMessage from '@components/core/ToastMessage';
import { useAppStore } from '@utils/Store';
import { getCookies } from '@utils/cookies';
import { Button, Space, notification } from 'antd';
import { useState } from 'react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationState {
  visible: boolean;
  msg: string;
  title: string;
  type: NotificationType;
}
export default function Home() {
  const token = getCookies('token');
  const { notificationState, updateNotificationState } = useAppStore();
  console.log(notificationState, '...');
  const triggerNotification = (
    type: NotificationType,
    msg: string,
    title: string
  ) => {
    updateNotificationState({
      visible: true,
      msg: 'Success',
      title: 'ok',
      type: 'success',
    });
  };

  return (
    <>
      <div>
        <h1>Another Component</h1>
        <Button
          type="primary"
          onClick={() =>
            triggerNotification('success', 'Success message', 'Success')
          }
        >
          Show Success Notification
        </Button>
        <Button
          type="primary"
          onClick={() => triggerNotification('error', 'Error message', 'Error')}
        >
          Show Error Notification
        </Button>
        <Button
          type="primary"
          onClick={() => triggerNotification('info', 'Info message', 'Info')}
        >
          Show Info Notification
        </Button>
        <Button
          type="primary"
          onClick={() =>
            triggerNotification('warning', 'Warning message', 'Warning')
          }
        >
          Show Warning Notification
        </Button>
      </div>
    </>
  );
}
