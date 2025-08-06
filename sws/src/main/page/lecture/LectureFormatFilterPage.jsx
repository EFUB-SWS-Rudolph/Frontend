// src/main/pages/LectureFormatFilterPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useFilter } from '../../../common/contexts/FilterContext'; 
import IconCheckURL from '../../../common/assets/icons/icon_check.svg';

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap:0rem;
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
export default function LectureFormatFilterPage() {
  const navigate = useNavigate();
  const { generalFilterParams, updateGeneralFilter } = useFilter();

   const formatOptions = [
    { label: '전체', value: '전체' },
    { label: '재능기부', value: '재능기부' },
    { label: '재능교환', value: '재능교환' },
    { label: '과외', value: '과외' }, 
    { label: '커피챗', value: '커피챗' },
  ];
  const getInitialSelectedFormat = () => {
      const currentApiValue = generalFilterParams.courseType; 
      const matchingOption = formatOptions.find(opt => {
          switch (opt.value) {
              case '재능기부': return currentApiValue === 'DONATION';
              case '재능교환': return currentApiValue === 'EXCHANGE';
              case '과외': return currentApiValue === 'TUTOR';
              case '커피챗': return currentApiValue === 'COFFEECHAT';
              case '전체': return currentApiValue === null;
              default: return false;
          }
      });
      return matchingOption ? matchingOption.value : '전체'; 
  };
  const [selectedFormat, setSelectedFormat] = useState(getInitialSelectedFormat());
  
  const handleOptionClick = (value) => {
    setSelectedFormat(value); 
    updateGeneralFilter('courseType', value); 
    alert(`필터가 '${value}'(으)로 선택되었습니다.`); 
  };

  return (
    <PageContainer>
      <FilterOptionsContainer>
        {formatOptions.map(option => (
          <FilterOptionItem
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            $isSelected={selectedFormat === option.value}
          >
            <OptionName>{option.label}</OptionName>
            {selectedFormat === option.value && <img src={IconCheckURL} alt="선택됨" style={{width: '1.2rem', height: '1.2rem'}} />}
          </FilterOptionItem>
        ))}
      </FilterOptionsContainer>
    </PageContainer>
  );
}