// src/main/pages/LectureLocationFilterPage.jsx
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
export default function LectureLocationFilterPage() {
  const navigate = useNavigate();
  const { generalFilterParams, updateGeneralFilter } = useFilter();
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
    { label: '세종특별자치시', value: '세종특별자치시' },
    { label: '경기도', value: '경기도' },
    { label: '강원특별자치도', value: '강원특별자치도' },
    { label: '충청북도', value: '충청북도' },
    { label: '충청남도', value: '충청남도' },
    { label: '전북특별자치도', value: '전북특별자치도' },
    { label: '전라남도', value: '전라남도' },
    { label: '경상북도', value: '경상북도' },
    { label: '경상남도', value: '경상남도' },
    { label: '제주특별자치도', value: '제주특별자치도' },
  ];
  const getInitialSelectedLocation = () => {
      const currentApiValue = generalFilterParams.courseCity; 
      const matchingOption = locationOptions.find(opt => {
          switch (opt.value) {
              case '서울특별시': return currentApiValue === 'SEOUL';
              case '부산광역시': return currentApiValue === 'BUSAN';
              case '대구광역시': return currentApiValue === 'DAEGU';
              case '인천광역시': return currentApiValue === 'INCHEON';
              case '광주광역시': return currentApiValue === 'GWANGJU';
              case '대전광역시': return currentApiValue === 'DAEJEON';
              case '울산광역시': return currentApiValue === 'ULSAN';
              case '세종특별자치시': return currentApiValue === 'SEJONG';
              case '경기도': return currentApiValue === 'GYEONGGI';
              case '강원특별자치도': return currentApiValue === 'GANGWON';
              case '충청북도': return currentApiValue === 'CHUNGBUK';
              case '충청남도': return currentApiValue === 'CHUNGNAM';
              case '전북특별자치도': return currentApiValue === 'JEONBUK';
              case '전라남도': return currentApiValue === 'JEONNAM';
              case '경상북도': return currentApiValue === 'GYEONGBUK';
              case '경상남도': return currentApiValue === 'GYEONGNAM';
              case '제주특별자치도': return currentApiValue === 'JEJU';
              case '전체': return currentApiValue === null;
              default: return false;
          }
      });
      return matchingOption ? matchingOption.value : '전체';
  };

  const [selectedLocation, setSelectedLocation] = useState(getInitialSelectedLocation());
  const handleOptionClick = (value) => {
    setSelectedLocation(value); 
    updateGeneralFilter('courseCity', value);
    alert(`필터가 '${value}'(으)로 선택되었습니다.`); 

  };

  return (
    <PageContainer>

      <FilterOptionsContainer>
        {locationOptions.map(option => (
          <FilterOptionItem
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            $isSelected={selectedLocation === option.value}
          >
            <OptionName>{option.label}</OptionName>
            {selectedLocation === option.value && <img src={IconCheckURL} alt="선택됨" style={{width: '1.2rem', height: '1.2rem'}} />}
          </FilterOptionItem>
        ))}
      </FilterOptionsContainer>
    </PageContainer>
  ); }