// store.ts
import { create } from 'zustand';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationState {
  visible: boolean;
  msg: string;
  title: string;
  type: NotificationType;
}

interface AppStoreProps {
  cart: number;
  currentState: string | number;
  notificationState: NotificationState;
  updateState: (newState: number | string) => void;
  updateNotificationState: (notification: Partial<NotificationState>) => void;
}

export const useAppStore = create<AppStoreProps>((set) => ({
  cart: 0,
  currentState: 'all',
  notificationState: {
    visible: false,
    msg: '',
    title: '',
    type: 'success',
  },
  updateState: (newState) => set({ currentState: newState }),
  updateNotificationState: (notification) =>
    set((state) => ({
      notificationState: { ...state.notificationState, ...notification },
    })),
}));
