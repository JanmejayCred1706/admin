import { create } from 'zustand';

type currentStateProps = {
  stateCode: number | string;
};

type appStoreProps = {
  cart: number;
  currentState: string | number;
  add: () => void;
  remove: () => void;
  removeAll: () => void;
  updateState: (newState: number | string) => void;
};

export const useAppStore = create<appStoreProps>((set) => ({
  cart: 0,
  currentState: 'all',
  add: () => set((state) => ({ cart: state.cart + 1 })),
  remove: () => set((state) => ({ cart: state.cart - 1 })),
  removeAll: () => set({ cart: 0 }),
  updateState: (newState) => set({ currentState: newState }),
}));
