'use client';
import { DateFilter } from '@components/Component';
import { useNotification } from '@components/higher-order-components/Notification';
import { useAppStore } from '@utils/Store';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationState {
  visible: boolean;
  msg: string;
  title: string;
  type: NotificationType;
}
export default function Home() {
  return (
    <>
      <div>
        <h1>Jor se bolo</h1>
        <button>Jai mata di</button>
      </div>
    </>
  );
}
