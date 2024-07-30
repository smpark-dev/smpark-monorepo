import { create } from 'zustand';

interface PortfolioStore {
  containerRef: React.RefObject<HTMLDivElement> | null;
  articleRef: React.RefObject<HTMLDivElement> | null;
  setContainerRef: (ref: React.RefObject<HTMLDivElement>) => void;
  setArticleRef: (ref: React.RefObject<HTMLDivElement>) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  containerRef: null,
  articleRef: null,
  setContainerRef: (ref) => set({ containerRef: ref }),
  setArticleRef: (ref) => set({ articleRef: ref }),
}));
