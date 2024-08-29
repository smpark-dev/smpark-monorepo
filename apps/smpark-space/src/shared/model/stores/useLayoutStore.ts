import { RefObject } from 'react';
import { create } from 'zustand';

interface IUseLayoutStore {
  containerRef: RefObject<HTMLDivElement> | null;
  headerRef: RefObject<HTMLDivElement> | null;
  mainRef: RefObject<HTMLDivElement> | null;
  setContainerRef: (ref: RefObject<HTMLDivElement>) => void;
  setHeaderRef: (ref: RefObject<HTMLDivElement>) => void;
  setMainRef: (ref: RefObject<HTMLDivElement>) => void;
}

export const useLayoutStore = create<IUseLayoutStore>((set) => ({
  containerRef: null,
  mainRef: null,
  headerRef: null,
  setContainerRef: (ref) => set({ containerRef: ref }),
  setHeaderRef: (ref) => set({ headerRef: ref }),
  setMainRef: (ref) => set({ mainRef: ref }),
}));
