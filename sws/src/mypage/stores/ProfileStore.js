import { create } from 'zustand';

export const useProfileStore = create((set) => ({
  profileImg: '',
  college: '',
  department: '',
  studentid: '',
  location: '',
  talentTags: [],
  interestTags: [],
  isEditing: true,
  isOnChoice: true,

  setProfileImg: (img) => set({ profileImg: img }),
  setCollege: (tag) => set({ college: tag }),
  setDepartment: (tag) => set({ department: tag }),
  setStudentid: (tag) => set({ studentid: tag }),
  setLocation: (tag) => set({ location: tag }),
  setInfoTags: (tags) => set({ infoTags: tags }),
  setTalentTags: (tags) => set({ talentTags: tags }),
  setInterestTags: (tags) => set({ interestTags: tags }),
  setIsEditing: (flag) => set({ isEditing: flag }),
  setIsOnChoice: (flag) => set({ isOnChoice: flag }),
  removeTalentTag: (index) => set((state) => ({
    talentTags: state.talentTags.filter((_, i) => i !== index),
  })),
  removeInterestTag: (index) => set((state) => ({
    interestTags: state.interestTags.filter((_, i) => i !== index),
  })),
}));