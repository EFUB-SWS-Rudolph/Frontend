import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useChatStore = create(
  devtools((set) => ({
    userId: null,
    name: '',
    profileImageUrl: '',
    setUser: ({ userId, name, profileImageUrl }) => set({ userId, name, profileImageUrl }),
    clearUser: () => set({ userId: null, name: '', profileImageUrl: '' }),
  }))
);
