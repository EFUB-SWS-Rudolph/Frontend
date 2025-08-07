// src/common/contexts/FilterContext.jsx

import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext(null);

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export const FilterProvider = ({ children }) => {
  const [displayMode, setDisplayMode] = useState('grid'); 
  const [generalFilterParams, setGeneralFilterParams]= useState({
    sort: 'latest',
    courseType: null,
    courseCity: null,
    courseStartDate: null,
    courseEndDate: null,
    keyword: null,
    page: 0,
    size: 20,
    status: 'all', 
  });
const [recommendFilterParams, setRecommendFilterParams] = useState({
    sort: 'latest',
    courseType: null, // 🔴 추가
    courseCity: null,     // 🔴 추가
    courseStartDate: null,// 🔴 추가
    courseEndDate: null,  // 🔴 추가
    keyword: null,        // 🔴 추가
    page: 0,
    size: 20,
  });    const updateGeneralFilter = (apiField, userValue) => {
    let valueToStore; 

    if (apiField === 'sort') {
      if (userValue === '최신 순') valueToStore = 'latest';
      else if (userValue === '인기 순') valueToStore = 'popular';
      else valueToStore = 'latest'
    }
    else if (apiField === 'courseType') {
        if (userValue === '재능 기부') valueToStore = 'DONATION';
        else if (userValue === '재능 교환') valueToStore = 'EXCHANGE';
        else if (userValue === '과외') valueToStore = 'TUTOR';
        else if (userValue === '커피챗') valueToStore = 'COFFEECHAT';
        else if (userValue === '전체') valueToStore = null; 
        else valueToStore = null;
    }
    else if (apiField === 'courseCity') {
      if (userValue === '서울특별시') valueToStore = 'SEOUL';
      else if (userValue === '부산광역시') valueToStore = 'BUSAN';
      else if (userValue === '대구광역시') valueToStore = 'DAEGU';
      else if (userValue === '인천광역시') valueToStore = 'INCHEON';
      else if (userValue === '광주광역시') valueToStore = 'GWANGJU';
      else if (userValue === '대전광역시') valueToStore = 'DAEJEON';
      else if (userValue === '울산광역시') valueToStore = 'ULSAN';
      else if (userValue === '전체') valueToStore = null;
      else valueToStore = null; 
    }else if (apiField === 'courseCategory') { 
      if (userValue === '전체') valueToStore = null;
    }else if (apiField === 'courseStartDate' || apiField === 'courseEndDate') {
      if (userValue === '전체' || userValue === '') {
        valueToStore = null;
      }
    }else if (apiField === 'keyword') {
      if (userValue === '전체' || userValue === '') valueToStore = null;
    }
    else if (apiField === 'status') {
      if (userValue === 'inProgress' || userValue === 'completed' || userValue === 'all') {
          valueToStore = userValue;
      } else { 
          valueToStore = 'all';
      }
    }
    else if (apiField === 'page' || apiField === 'size') {
        valueToStore = userValue;
    }
    else {
      valueToStore = prevParams[apiField]; // 기존 값 유지
    }
    setGeneralFilterParams(prevParams => {
    const newParams = {
      ...prevParams,
      [apiField]: valueToStore
    };
    console.log("➡️ FilterContext: Updating generalFilterParams", JSON.parse(JSON.stringify(newParams)));
    return newParams;
  });
};
const updateRecommendFilter = (apiField, userValue) => {
    let valueToStore = userValue;

    if (apiField === 'sort') {
      if (userValue === '최신 순') valueToStore = 'latest';
      else if (userValue === '인기 순') valueToStore = 'popular';
      else if (userValue === '오래된 순') valueToStore = 'oldest';
      else valueToStore = 'latest';
    }
    // 🔴 generalFilterParams의 updateGeneralFilter 로직을 참고하여 복사/수정.
    //    userValue가 이미 API 친화적인 값이 아니라면 (예: '재능 기부') 변환 로직이 필요합니다.
    else if (apiField === 'courseType') {
      if (userValue === '재능 기부') valueToStore = 'DONATION';
      else if (userValue === '전체') valueToStore = null;
      else valueToStore = userValue; // 임시 또는 기타 값 처리
    }
    else if (apiField === 'courseCity') { /* ... generalFilterParams와 동일한 변환 로직 ... */ }
    else if (apiField === 'courseStartDate' || apiField === 'courseEndDate') { /* ... generalFilterParams와 동일한 변환 로직 ... */ }
    else if (apiField === 'keyword') { /* ... generalFilterParams와 동일한 변환 로직 ... */ }
    else if (apiField === 'page' || apiField === 'size') {
      valueToStore = userValue;
    }
    // 알 수 없는 필드는 기존 값 유지 (prevParams는 여기서는 recommendFilterParams)
    else {
      valueToStore = recommendFilterParams[apiField]; // 기존 값 유지
    }

    setRecommendFilterParams(prevParams => {
      const newParams = {
        ...prevParams,
        [apiField]: valueToStore
      };
      console.log("➡️ FilterContext: Updating recommendFilterParams", JSON.parse(JSON.stringify(newParams)));
      return newParams;
    });
  };    


  const value = {
    displayMode,
    setDisplayMode,
    generalFilterParams,       
    updateGeneralFilter,
    recommendFilterParams,     
    updateRecommendFilter,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};