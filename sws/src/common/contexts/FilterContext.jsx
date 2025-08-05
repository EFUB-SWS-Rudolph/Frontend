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
    courseEndDate: null,       
    keyword: null,   
    status: null,   
  });
  const [recommendFilterParams, setRecommendFilterParams]= useState({
    sort: 'latest',
  });
    const updateGeneralFilter = (apiField, userValue) => {
    let valueToStore = userValue; 

    if (apiField === 'sort') {
      if (userValue === '최신 순') valueToStore = 'latest';
      else if (userValue === '인기 순') valueToStore = 'popular';
    }
    if (apiField === 'courseType') {
        if (userValue === '재능 기부') valueToStore = 'DONATION';
        else if (userValue === '재능 교환') valueToStore = 'EXCHANGE';
        else if (userValue === '과외') valueToStore = 'TUTOR';
        else if (userValue === '커피챗') valueToStore = 'COFFEECHAT';
        else if (userValue === '전체') valueToStore = null; 
    }
    if (apiField === 'status') {
      if (userValue === '수강 중') valueToStore = 'inProgress'; 
      else if (userValue === '수강 종료') valueToStore = 'completed'; 
      else if (userValue === 'all') valueToStore = null; 
    }
    if (userValue === '전체') {
      valueToStore = null;
    }

    setGeneralFilterParams(prevParams => ({
      ...prevParams,
      [apiField]: valueToStore
    }));
  };
  const updateRecommendFilter = (apiField, userValue) => {
    let valueToStore = userValue;
    if (apiField === 'sort') { 
        if (userValue === '최신순') valueToStore = 'latest';
    }
    setRecommendFilterParams(prevParams => ({
        ...prevParams,
        [apiField]: valueToStore
    }));
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