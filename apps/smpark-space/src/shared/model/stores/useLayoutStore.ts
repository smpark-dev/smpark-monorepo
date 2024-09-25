import { RefObject } from 'react';
import { create } from 'zustand';

interface IUseLayoutStore {
  headerRef: RefObject<HTMLDivElement> | null;
  mainRef: RefObject<HTMLDivElement> | null;
  setHeaderRef: (ref: RefObject<HTMLDivElement>) => void;
  setMainRef: (ref: RefObject<HTMLDivElement>) => void;
}

export const useLayoutStore = create<IUseLayoutStore>((set) => ({
  mainRef: null,
  headerRef: null,
  setHeaderRef: (ref) => set({ headerRef: ref }),
  setMainRef: (ref) => set({ mainRef: ref }),
}));
