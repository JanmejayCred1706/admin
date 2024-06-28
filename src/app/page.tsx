'use client';
import { DateFilter } from '@components/Component';
import { useNotification } from '@components/higher-order-components/Notification';
import { useAppStore } from '@utils/Store';
import { getCookies } from '@utils/cookies';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationState {
  visible: boolean;
  msg: string;
  title: string;
  type: NotificationType;
}
export default function Home() {
  const token = getCookies('token');
  const { showNotification } = useNotification();
  const { dateFilters } = useAppStore();

  const handleClick = () => {
    showNotification('success', 'Success', 'This is a success message!');
    showNotification('error', 'Success', 'This is a success message!');
  };

  return (
    <>
      <div>
        <h1>Another Component</h1>
        <button onClick={handleClick}>Show Notification</button>
      </div>
    </>
  );
}
