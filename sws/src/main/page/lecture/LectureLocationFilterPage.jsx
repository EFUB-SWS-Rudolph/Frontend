// src/main/pages/LectureLocationFilterPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import IconBackURL from '../../../common/assets/icons/icon_back.svg'; 
import IconInitializeURL from '../../../common/assets/icons/icon_initialize.svg'; 

import { useFilter } from '../../../common/contexts/FilterContext';
const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 8.5rem;
  margin-top: -1rem;
  gap:0rem;
  min-height: 100vh;
`;
const HeaderWrapper = styled.div`
  width: 100%;
  height: 3.5rem; 
  background: #FFFFFF;
  flex-shrink: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center; 
  justify-content: center; 
  padding: 0rem 1.5rem; 
  position: relative; 
`;
const BackButton = styled.button`
  position: absolute; 
  left: 0rem; 
  top: 50%;
  transform: translateY(-50%); 
  width: 2.75rem; /* 44px */
  height: 2.75rem; /* 44px */
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BackIcon = styled.img`
  width: 1rem; 
  height: 1rem; 
  object-fit: contain;
`;
const HeaderTitle = styled.h2`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  font-style: normal;
  line-height: normal;
  color: #222222;
  margin: 0rem; /* 마진 초기화 */
  text-align: center; /* 텍스트 정렬 */
`;
const FilterOptionsContainer = styled.div`
  flex-grow: 1; 
  overflow-y: auto; 
  padding: 0 ;
  display: flex;
  flex-direction: column;
  gap: 0.75rem ;
`;
const FilterOptionItem = styled.div`
  display: flex;
  width:100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem  2.7rem;
  cursor: pointer;
  background-color: ${props => props.$isSelected ? '#E0FCEF' : 'transparent'};
`;
const OptionName = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #222222;
`;
const FooterBar = styled.div`
  width:100% ; 
  height: 5.19rem;
  background: #FFFFFF;
  box-shadow: 0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.25);
  position: fixed;
  left:50%;
  bottom: 0; 
  padding:1rem;
  gap:1.2rem;
  transform: translateX(-50%); 
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  z-index: 1000; 
`;
const ResetButton = styled.button`
  width: 3.375rem; /* 54px */
  height: 3rem; /* 48px */
  border-radius: 0.5rem; /* 8px */
  background: #F5F5F5; 
  color: #222222;
  font-family: Pretendard Variable;
  font-weight: 500;
  font-size: 0.625rem; /* 10px */
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column; /* 아이콘과 텍스트를 세로로 배치 */
  align-items: center; 
  justify-content: center; 
  gap: 0.25rem; /* 4px */
  flex-shrink: 0; 
`;
const ApplyFilterButton = styled.button`
  flex-grow: 1;
  width: 17.25rem; /* 276px */
  height: 3.5rem; /* 56px */
  border-radius: 0.75rem; /* 12px */
  background: #00664F;
  color: white;
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 1.125rem; /* 18px */
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
export default function LectureLocationFilterPage() {
  const navigate = useNavigate();
  const { searchFilters, updateSearchFilter } = useFilter();
  // 지역 옵션들
  const locationOptions = [
    { label: '전체', value: '전체' },
    { label: '서울특별시', value: '서울특별시' },
    { label: '부산광역시', value: '부산광역시' },
    { label: '대구광역시', value: '대구광역시' },
    { label: '인천광역시', value: '인천광역시' },
    { label: '광주광역시', value: '광주광역시' },
    { label: '대전광역시', value: '대전광역시' },
    { label: '울산광역시', value: '울산광역시' },
  ];

  const handleOptionClick = (value) => {
    updateSearchFilter('location', value); // 'location' 필드만 업데이트
  };
  
  const handleResetFilters = () => {
      updateSearchFilter('location', '전체'); // Context의 location을 '전체'로 초기화
      alert('필터가 초기화되었습니다.');
  };
  
  const handleApply = () => {
    alert(`선택된 지역: ${searchFilters.location}`); 
    navigate(-1); // 이전 페이지(LectureSearchFilterPage)로 
  };

  return (
    <PageContainer>
      <HeaderWrapper>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon src={IconBackURL} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>지역</HeaderTitle>
      </HeaderWrapper>

      <FilterOptionsContainer>
        {locationOptions.map(option => (
          <FilterOptionItem 
            key={option.value} 
            onClick={() => handleOptionClick(option.value)}
            // Context의 searchFilters.location과 비교하여 $isSelected 설정
            $isSelected={searchFilters.location === option.value} 
          >
            <OptionName>{option.label}</OptionName>
          </FilterOptionItem>
        ))}
      </FilterOptionsContainer>

      <FooterBar>
        <ResetButton onClick={handleResetFilters}>
          <img src={IconInitializeURL} alt="초기화" style={{ width: '1.25rem', height: '1.25rem' }}/>
          초기화
        </ResetButton>
        <ApplyFilterButton onClick={handleApply}>적용</ApplyFilterButton>
      </FooterBar>

    </PageContainer>
  );
}