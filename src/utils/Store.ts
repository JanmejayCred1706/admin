// store.ts
import { create } from 'zustand';

interface AppStoreProps {
  currentState: string | number;
  updateState: (newState: number | string) => void;
}

export const useAppStore = create<AppStoreProps>((set) => ({
  currentState: 'all',
  updateState: (newState) => set({ currentState: newState }),
}));
