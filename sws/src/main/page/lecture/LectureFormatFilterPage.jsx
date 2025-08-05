// src/main/pages/LectureFormatFilterPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useFilter } from '../../../common/contexts/FilterContext'; 
import IconBackURL from '../../../common/assets/icons/icon_back.svg';
import IconInitializeURL from '../../../common/assets/icons/icon_initialize.svg';

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 8.5rem;
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
// [푸터 바]
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
  height: 3rem;
  width:3.375rem;
  border-radius: 0.5rem;
  background: #F5F5F5; 
  color: #222222;
  font-family: Pretendard Variable;
  font-weight: 500;
  font-size: 0.625rem;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  gap: 0.25rem; 
  flex-shrink: 0;
`;
const ApplyFilterButton = styled.button`
  width:17.25rem; 
  height: 3.5rem; 
  border-radius: 0.75rem;
  background: #00664F; 
  color: white;
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 1.125rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; 
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
  };

  const handleResetFilters = () => {
    updateGeneralFilter('courseType', '전체');
    navigate(-1);
  };

  const handleApply = () => {
    updateGeneralFilter('courseType', '전체');
    alert('필터가 적용되었습니다.');
    navigate(-1);
  };

  return (
    <PageContainer>
      <HeaderWrapper>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon src={IconBackURL} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>강의 방식</HeaderTitle>
      </HeaderWrapper>

      <FilterOptionsContainer>
        {formatOptions.map(option => (
          <FilterOptionItem
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            $isSelected={selectedFormat === option.value}
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