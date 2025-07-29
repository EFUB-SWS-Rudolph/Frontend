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
  const [searchFilters, setSearchFilters] = useState({
    format: '전체',     // 강의 방식 (재능기부, 재능교환, 커피챗 등)
    location: '전체',   // 지역
    date: '전체',       // 기간
    sort: '전체',       // 정렬 기준
    view: '전체'        // 보기 방식 (LectureSearchFilterPage의 ViewModeIcon과 별개, 초기화용)
  });

  // searchFilters 객체 내 특정 필터 값만 업데이트하는 헬퍼 함수
  const updateSearchFilter = (filterName, value) => {
    setSearchFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const value = {
    displayMode,
    setDisplayMode,
    searchFilters,        
    setSearchFilters,   
    updateSearchFilter, 
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};