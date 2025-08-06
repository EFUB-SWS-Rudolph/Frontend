// src/main/pages/LectureMyStatusFilterPage.jsx
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
  padding: 1rem 0 0 0; /* 푸터바 없으므로 padding-bottom 0으로 */
  min-height: 100vh; /* 전체 화면 채우기 */
`;
const FilterOptionsContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 ; /* 필요시 좌우 패딩 추가 */
  display: flex;
  flex-direction: column;
  gap: 0.75rem ;
`;
const FilterOptionItem = styled.div`
  display: flex;
  width:100%;
  align-items: center;
  justify-content: space-between; /* 체크 아이콘 오른쪽에 두기 위함 */
  padding: 0.75rem  2.7rem;
  cursor: pointer;
  color: ${props => props.$isSelected ? 'var(--primary-color, #00664F)' : '#222222'}; /* 선택 시 글자색 변경 */
  font-weight: ${props => props.$isSelected ? '600' : '400'}; /* 선택 시 글자 두께 변경 */
`;
const OptionName = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #222222;
`;

export default function LectureStatusFilterPage() {
  const navigate = useNavigate();
  const { generalFilterParams, updateGeneralFilter } = useFilter();
  const statusOptions = [
    { label: '전체', value: 'all' },
    { label: '수강 중', value: 'inProgress' },
    { label: '수강 종료', value: 'completed' },
  ];

  const getInitialSelectedStatus = () => {
    const currentApiValue = generalFilterParams.status; 
    const matchingOption = statusOptions.find(opt => opt.value === currentApiValue);
    return matchingOption ? matchingOption.value : 'all'; 
  };
  const [selectedStatus, setSelectedStatus] = useState(getInitialSelectedStatus());

  const handleOptionClick = (value) => {
    setSelectedStatus(value); 
console.log("📍 MyLectureFilterPage: generalFilterParams current value", JSON.parse(JSON.stringify(generalFilterParams)));    updateGeneralFilter('status', value);
    alert(`필터가 '${value}'(으)로 선택되었습니다.`); 
  };


  return (
    <PageContainer>
      <FilterOptionsContainer>
        {statusOptions.map(option => (
          <FilterOptionItem
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            $isSelected={selectedStatus === option.value}
          >
            <OptionName>{option.label}</OptionName>
            {selectedStatus === option.value && <img src={IconCheckURL} alt="선택됨" style={{width: '1.2rem', height: '1.2rem'}} />}
          </FilterOptionItem>
        ))}
      </FilterOptionsContainer>

    </PageContainer>
  );
}