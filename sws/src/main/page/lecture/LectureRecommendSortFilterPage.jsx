// src/main/pages/LectureRecommendSortFilterPage.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 아이콘 임포트 (경로 확인)
import IconCheckURL from '../../../common/assets/icons/icon_check.svg';

import { useFilter } from '../../../common/contexts/FilterContext'; // useFilter 훅 임포트
const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap:0rem;
  padding: 1rem 0 0 0; /* 푸터바 제거되었으니 padding-bottom 0으로 */
  min-height: 100vh; /* 전체 화면 채우기 */
`;
const FilterOptionsContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 ; /* 필요시 좌우 패딩 추가: padding: 0 1rem; */
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


export default function LectureRecommendSortFilterPage() {
  const navigate = useNavigate();
  const { recommendFilterParams, updateRecommendFilter } = useFilter();

  const sortOptions = [
    { label: '최신 순', value: '최신 순' },
    { label: '인기 순', value: '인기 순' },
  ];
  const getInitialSelectedSort = () => {
    const currentApiValue = recommendFilterParams.sort; 
    switch (currentApiValue) {
      case 'latest': return '최신 순';
      case 'popular': return '인기 순';
      default: return '최신 순'; 
    }
  };

  const [selectedSort, setSelectedSort] = useState(getInitialSelectedSort());

  const handleOptionClick = (value) => {
    setSelectedSort(value);
    updateRecommendFilter('sort', value);

    alert(`필터가 '${value}'(으)로 선택되었습니다.`);
    
  };
  return (
    <PageContainer>

      <FilterOptionsContainer>
        {sortOptions.map(option => (
          <FilterOptionItem
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            $isSelected={selectedSort === option.value}
          >
            <OptionName>{option.label}</OptionName>
            {selectedSort === option.value && <img src={IconCheckURL} alt="선택됨" style={{width: '1.2rem', height: '1.2rem'}} />}
          </FilterOptionItem>
        ))}
      </FilterOptionsContainer>


    </PageContainer>
  );
}