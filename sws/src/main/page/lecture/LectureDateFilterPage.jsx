// src/main/pages/LectureDateFilterPage.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 필요한 아이콘 URL 임포트
import IconBackURL from '../../../common/assets/icons/icon_back.svg'; // 뒤로가기 아이콘
import IconInitializeURL from '../../../common/assets/icons/icon_initialize.svg'; // 초기화 아이콘 (푸터바용)

// 핵심! useFilter 훅 임포트 (Context 사용)
import { useFilter } from '../../../common/contexts/FilterContext';
const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 8.5rem;
  gap:0rem;
  padding:1rem 0  8.5rem 0;
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
  width: 24.375rem; 
  height: 8.5rem; 
  background: #FFFFFF;
  box-shadow: 0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.25);
  position: fixed;
  bottom: 0rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0rem 1.25rem; /* 0 20px */
  box-sizing: border-box;
  z-index: 1000;
  gap: 0.625rem; /* 10px */
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
export default function LectureDateFilterPage() {
  const navigate = useNavigate();
  const { searchFilters, updateSearchFilter } = useFilter();

  const dateOptions = [
    { label: '전체', value: '전체' },
    { label: '1주 이내', value: '1week' },
    { label: '1개월 이내', value: '1month' },
    { label: '3개월 이내', value: '3month' },
    { label: '6개월 이내', value: '6month' },
    { label: '기간 무제한', value: 'unlimited' },
    // 필요에 따라 더 많은 기간 옵션 추가
  ];
  const handleOptionClick = (value) => {
    updateSearchFilter('date', value); 
  };
  
  // 초기화 버튼 핸들러
  const handleResetFilters = () => {
      updateSearchFilter('date', '전체'); 
      alert('필터가 초기화되었습니다.');
  };
  
  // 적용 버튼 핸들러
  const handleApply = () => {
    alert(`선택된 기간: ${searchFilters.date}`); 
    navigate(-1); 
  };

  return (
    <PageContainer>
      <HeaderWrapper>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon src={IconBackURL} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>기간</HeaderTitle>
      </HeaderWrapper>

      <FilterOptionsContainer>
        {dateOptions.map(option => (
          <FilterOptionItem 
            key={option.value} 
            onClick={() => handleOptionClick(option.value)}
            $isSelected={searchFilters.date === option.value} 
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