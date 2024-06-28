// components/NotificationComponent.tsx
import React, { useEffect } from 'react';
import { notification } from 'antd';
import { useAppStore } from '@utils/Store';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

const NotificationComponent: React.FC = () => {
  const { notificationState, updateNotificationState } = useAppStore();

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (notificationState.visible) {
      api[notificationState.type]({
        message: notificationState.title,
        description: notificationState.msg,
        showProgress: true,
        pauseOnHover: true,
      });

      const timer = setTimeout(() => {
        updateNotificationState({
          visible: false,
        });
      }, 3000); // Duration in milliseconds

      return () => clearTimeout(timer); // Cleanup timer on unmount or state change
    }
  }, [notificationState, api, updateNotificationState]);

  return <>{contextHolder}</>;
};

export default NotificationComponent;
