import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  exchange: '전체',
  setExchange: (type) => set({ exchange: type }),

  major: '전체',
  setMajor: (major) => set({ major }),

  period: '최신순',
  setPeriod: (period) => set({ period }),

  isgallery: true,
  setIsGallery: (isgallery) => set({ isgallery }),

  isfilter: false,
  setIsFilter: (isfilter) => set({ isfilter }),

  dept: '',
  setDept: (newDept) => set({ dept: newDept }),
}));