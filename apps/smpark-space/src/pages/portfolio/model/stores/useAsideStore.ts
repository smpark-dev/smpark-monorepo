import { create } from 'zustand';

interface IAsideStore {
  isToggle: boolean;
  toggleAside: () => void;
}

export const useAsideStore = create<IAsideStore>((set) => ({
  isToggle: false,
  toggleAside: () => set((state) => ({ isToggle: !state.isToggle })),
}));
