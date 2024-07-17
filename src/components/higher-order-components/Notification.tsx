// contexts/NotificationContext.tsx
'use client';
import {
  NotificationContextType,
  NotificationType,
} from '@interface/globalInterface';
import { notification } from 'antd';
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
} from 'react';

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

 export const NotificationProvider: React.FC<NotificationProviderProps> = ({
   children,
 }) => {
   const [api, contextHolder] = notification.useNotification();

   const showNotification = useCallback(
     (type: NotificationType, title: string, msg: string) => {
       api[type]({
         message: title,
         description: msg,
         showProgress: true,
         pauseOnHover: true,
       });
     },
     [api]
   );

   return (
     <NotificationContext.Provider value={{ showNotification, contextHolder }}>
       {contextHolder}
       {children}
     </NotificationContext.Provider>
   );
 };
