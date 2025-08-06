// src/main/pages/LectureDateFilterPage.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import IconCheckURL from '../../../common/assets/icons/icon_check.svg';

import { useFilter } from '../../../common/contexts/FilterContext';
const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap:0rem;
  padding: 1rem 0 0 0;
  min-height: 100vh;
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
  color: ${props => props.$isSelected ? 'var(--primary-color, #00664F)' : '#222222'};
  font-weight: ${props => props.$isSelected ? '600' : '400'};
`;
const OptionName = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #222222;
`;
export default function LectureDateFilterPage() {
  const navigate = useNavigate();
  const { generalFilterParams, updateGeneralFilter } = useFilter();

  const dateOptions = [
    { label: '전체', value: '전체' },
    { label: '1주 이내', value: '1week' },
    { label: '1개월 이내', value: '1month' },
    { label: '3개월 이내', value: '3month' },
    { label: '6개월 이내', value: '6month' },
    { label: '기간 무제한', value: 'unlimited' },
  ];

  const calculateDates = (optionValue) => {
    const today = new Date();
    let startDate = null;
    let endDate = null;

    const pad = (num) => num < 10 ? '0' + num : num;
    const formatDate = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

    if (optionValue === 'all' || optionValue === 'unlimited') {
      startDate = null;
      endDate = null;
    } else if (optionValue === '1week') {
      endDate = new Date(today);
      endDate.setDate(today.getDate() + 7);
      startDate = today;
    } else if (optionValue === '1month') {
      endDate = new Date(today);
      endDate.setMonth(today.getMonth() + 1);
      startDate = today;
    } else if (optionValue === '3month') {
      endDate = new Date(today);
      endDate.setMonth(today.getMonth() + 3);
      startDate = today;
    } else if (optionValue === '6month') {
      endDate = new Date(today);
      endDate.setMonth(today.getMonth() + 6);
      startDate = today;
    }
    return {
      startDate: startDate ? formatDate(startDate) : null,
      endDate: endDate ? formatDate(endDate) : null,
    };
  };

  const getInitialSelectedOption = () => {
    if (!generalFilterParams.courseStartDate && !generalFilterParams.courseEndDate) {
      return 'all';
    }
    return 'unlimited'; 
  };
  const [selectedOption, setSelectedOption] = useState(getInitialSelectedOption());
  const handleOptionClick = (value) => {
    setSelectedOption(value); 
    const { startDate, endDate } = calculateDates(value);
    updateGeneralFilter('courseStartDate', startDate);
    updateGeneralFilter('courseEndDate', endDate);

    alert(`필터가 '${value}'(으)로 선택되었습니다.`); 
    navigate(-1); 
  };

  return (
    <PageContainer>

      <FilterOptionsContainer>
        {dateOptions.map(option => (
          <FilterOptionItem 
            key={option.value} 
            onClick={() => handleOptionClick(option.value)}
            $isSelected={selectedOption === option.value}
          >
            <OptionName>{option.label}</OptionName>
            {selectedOption === option.value && <img src={IconCheckURL} alt="선택됨" style={{width: '1.2rem', height: '1.2rem'}} />}
            
          </FilterOptionItem>
        ))}
      </FilterOptionsContainer>
    </PageContainer>
  );
}