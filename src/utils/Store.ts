// store.ts
import {
  DateFilterProps,
  pageKeyInterfaceProps,
} from '@interface/globalInterface';
import { create } from 'zustand';

interface AppStoreProps {
  currentState: string | number;
  dateFilters: { [key in pageKeyInterfaceProps]?: DateFilterProps };
  updateState: (newState: number | string) => void;
  setDateFilter: (key: string, startDate: string, endDate: string) => void;
  isApiLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isModelOpen: boolean;
  setModelOpen: (loading: boolean) => void;
}

export const useAppStore = create<AppStoreProps>((set) => ({
  currentState: 'all',
  updateState: (newState) => set({ currentState: newState }),
  dateFilters: {},
  setDateFilter: (key, startDate, endDate) =>
    set((state) => ({
      dateFilters: {
        ...state.dateFilters,
        [key]: { startDate, endDate },
      },
    })),
  isApiLoading: false,
  setIsLoading: (loading) => set({ isApiLoading: loading }),
  isModelOpen: false,
  setModelOpen: (value) => set({ isModelOpen: value }),
}));
