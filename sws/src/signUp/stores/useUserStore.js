import { create } from 'zustand';

export const useUserStore = create((set) => ({
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
    set((state) => ({
      interests: [...state.interests, interest],
    })),
  deleteInterests: (item) => 
    set((state) => ({
      interests: state.interests.filter((interest) => interest !== item),
    })),

  talents: [],
  addTalents: (talent) =>
    set((state) => ({
      talents: [...state.talents, talent],
    })),
  deleteTalents: (item) =>
    set((state) => ({
      talents: state.talents.filter((talent) => talent !== item),
    })),
}));