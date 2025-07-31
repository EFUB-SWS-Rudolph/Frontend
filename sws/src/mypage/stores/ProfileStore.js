import { create } from 'zustand';

export const useProfileStore = create((set) => ({
  nickname: '',
  profileImg: '',
  college: '엘텍공과대학',
  department: '서양화과',
  studentid: '24',
  location: '서울시 강동구',
  talentTags: ['바이올린', '운동', '그림'],
  interestTags: ['코딩', '뜨개질'],
  isEditing: false,
  isOnChoice: false,

  setNickname: (name) => set({ nickname: name }),
  setProfileImg: (img) => set({ profileImg: img }),
  setCollege: (tag) => set({ college: tag }),
  setDepartment: (tag) => set({ department: tag }),
  setStudentid: (tag) => set({ studentid: tag }),
  setLocation: (tag) => set({ location: tag }),

  setTalentTags: (tags) => set({ talentTags: tags }),
  setInterestTags: (tags) => set({ interestTags: tags }),
  
  addTalentTag: (tag) => 
    set((state) => ({
      talentTags: [...state.talentTags, { id: Date.now() + Math.random(), tag }],
  })),
  addInterestTag: (tag) => 
    set((state) => ({
      interestTags: [...state.interestTags, { id: Date.now() + Math.random(), tag }],
  })),

  setIsEditing: (flag) => set({ isEditing: flag }),
  setIsOnChoice: (flag) => set({ isOnChoice: flag }),

  removeTalentTag: (id) => set((state) => ({
    talentTags: state.talentTags.filter((i) => i.id !== id),
  })),
  removeInterestTag: (id) => set((state) => ({
    interestTags: state.interestTags.filter((i) => i.id !== id),
  })),

  resetInterestTags: () => set({ interestTags: [] }),
  resetTalentTags: () => set({ talentTags: [] }),
}));