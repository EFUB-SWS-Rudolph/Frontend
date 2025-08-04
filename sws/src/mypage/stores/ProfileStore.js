import { create } from 'zustand';

export const useProfileStore = create((set) => ({
  nickname: '',
  setNickname: (name) => set({ nickname: name }),

  profileImg: '',
  setProfileImg: (img) => set({ profileImg: img }),

  college: '엘텍공과대학',
  setCollege: (tag) => set({ college: tag }),

  department: '서양화과',
  setDepartment: (tag) => set({ department: tag }),

  studentid: '24',
  setStudentid: (tag) => set({ studentid: tag }),

  location: '서울시 강동구',
  setLocation: (tag) => set({ location: tag }),

  talentTags: [],
  setTalentTags: (tags) => set({ talentTags: tags }),
  addTalentTag: (tag) => 
    set((state) => ({
      talentTags: [...state.talentTags, { id: Date.now() + Math.random(), tag }],
  })),
  removeTalentTag: (id) => set((state) => ({
    talentTags: state.talentTags.filter((i) => i.id !== id),
  })),
  resetTalentTags: () => set({ talentTags: [] }),

  interestTags: [],
  setInterestTags: (tags) => set({ interestTags: tags }),
  addInterestTag: (tag) => 
    set((state) => ({
      interestTags: [...state.interestTags, { id: Date.now() + Math.random(), tag }],
  })),
  removeInterestTag: (id) => set((state) => ({
    interestTags: state.interestTags.filter((i) => i.id !== id),
  })),
  resetInterestTags: () => set({ interestTags: [] }),

  isExchange: false,
  setIsExchange: (flag) => set({ isExchange: flag }),

  isDonation: false,
  setIsDonation: (flag) => set({ isDonation: flag }),

  isCoffeeChat: false,
  setIsCoffeeChat: (flag) => set({ isCoffeeChat: flag }),

  isEditing: false,
  setIsEditing: (flag) => set({ isEditing: flag }),

  isOnChoice: false,
  setIsOnChoice: (flag) => set({ isOnChoice: flag }),

  category: '',
  setCategory: (newCategory) => set({ category: newCategory }),

  tag: '',
  setTag: (newTag) => set({ tag: newTag}),

  previousImg: '',
  setPreviousImg: (image) => set({ previousImg: image }),

  imageURL: '',
  setImageURL: (url) => set({ imageURL: url }),
}));