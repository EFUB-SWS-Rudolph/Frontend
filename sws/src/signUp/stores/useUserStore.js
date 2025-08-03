import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useUserStore = create(
  devtools((set) => ({
    certification: '',
    setCertification: (code) => set({ certification: code }),

    college: '',
    setCollege: (newCollege) => set({ college: newCollege }),

    major: '',
    setMajor: (newMajor) => set({ major: newMajor }),

    studentId: '',
    setStudentId: (newStudentId) => set({ studentId: newStudentId }),

    nickname: '',
    setNickname: (newNickname) => set({ nickname: newNickname }),

    location: '',
    setLocation: (newLocation) => set({ location: newLocation }),

    interests: [],
    addInterests: (interest) =>
      set((state) => {
        if (state.interests.length >= 3) return state;
        return { interests: [...state.interests, interest] };
      }),
    deleteInterests: (item) =>
      set((state) => ({
        interests: state.interests.filter((interest) => interest !== item),
      })),
    resetInterests: () => set({ interests: [] }),

    talents: [],
    addTalents: (talent) =>
      set((state) => {
        if (state.talents.length >= 3) return state;
        return {
          talents: [...state.talents, talent],
        };
      }),
    deleteTalents: (item) =>
      set((state) => ({
        talents: state.talents.filter((talent) => talent !== item),
      })),
    resetTalents: () => set({ talents: [] }),
  }))
);
