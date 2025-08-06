// src/main/pages/LectureRecommendFilterPage.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useFilter } from '../../../common/contexts/FilterContext';

// 필요한 SVG 아이콘 URL 임포트 
import IconNextURL from '../../../common/assets/icons/icon_next.svg'; 
import IconInitializeURL from '../../../common/assets/icons/icon_initialize.svg'; 
import SortGridIconURL from '../../../common/assets/icons/sort_list.svg';
import SortListIconURL from '../../../common/assets/icons/sort_gallery.svg';

const FilterPageContainer = styled.div`
  width: 100%;
  height: 100%; 
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 2rem; 
`;
// [필터 컴포넌트 프레임] 
const FilterItemContainer = styled.div`
  width: 100%;
  height:4.375rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
// [필터컴포넌트-필터이름]
const FilterName = styled.span`
  font-family: Pretendard Variable;
  font-weight: 500;
  font-size: 1rem;
  line-height: 100%;
  letter-spacing: 0rem;
  color: #222222;
`;
// [필터 컴포넌트-필터범위(버튼)]
const FilterValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap:0.5rem; 
`;
const FilterValue = styled.span`
  font-family: Pretendard Variable;
  font-weight: 500;
  font-size: 1rem;
  line-height: 100%;
  letter-spacing: 0rem;
  color: #808080;
`;
// <IconNext>
const NextIcon = styled.div`
  width: 0.313rem;
  height: 0.625rem; 
  align-items: center;
  display: flex;
  justify-content: center;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const ViewModeIcon = styled.img`
  width: 2rem; 
  height: 2rem; 
  object-fit: contain;
  margin-right:0.5rem;
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

// 필터 아이템 컴포넌트 
const FilterItem = ({ name, value, onClick, valueComponent }) => {
  return (
    <FilterItemContainer onClick={onClick}>
      <FilterName>{name}</FilterName>
      <FilterValueContainer>
        {valueComponent ? valueComponent : <FilterValue>{value}</FilterValue>}
        {!valueComponent && <NextIcon><img src={IconNextURL} alt="다음" /></NextIcon>}
      </FilterValueContainer>
    </FilterItemContainer>
  );
};

export default function LectureRecommendFilterPage() {
  const navigate = useNavigate();
  const { recommendFilterParams, updateRecommendFilter, displayMode, setDisplayMode } = useFilter();

  const getDisplayValue = (filterName) => {
    switch (filterName) {
      case '정렬 기준':
        // recommendFilterParams.sort (API 친화적 값: latest, popular 등)
        switch (recommendFilterParams.sort) {
          case 'latest': return '최신 순';
          case 'popular': return '인기 순';
          // TODO: '오래된 순'이 있다면 여기에 추가
          default: return '최신 순'; // 기본값
        }
      // TODO: 다른 필터 (강의 형태, 지역 등)도 추천 강의 필터에 포함된다면 여기에 추가
      default: return '전체';
    }
  };

  const handleFilterClick = (filterType) => {
    if (filterType === '정렬 기준') {
      navigate('/lectures/search/filter/sort'); 
    }
    else {
      alert(`${filterType} 필터 설정 페이지 (미구현)`);
    }
  };
  const handleResetFilters = () => {
    updateRecommendFilter('sort', '최신 순'); // '최신 순'은 Context 내부에서 'latest'로 변환됨
    // TODO: 다른 필터도 초기화 (예: courseType: null, courseCity: null)
    setDisplayMode('grid'); // 보기 방식 초기화
    alert('필터가 초기화되었습니다.');
  };

  const handleApplyFilters = () => {
    alert('필터가 적용되었습니다.');
    navigate(-1);
  };

  // 보기 방식 클릭 시 토글 함수 (그리드/리스트)
  const handleToggleDisplayMode = () => {
    setDisplayMode(prevMode => (prevMode === 'grid' ? 'list' : 'grid'));
  };

  return (
    <FilterPageContainer>
      <FilterItem name="정렬 기준" value={getDisplayValue('정렬 기준')} onClick={() => handleFilterClick('정렬 기준')} />
      
      <FilterItem
        name="보기 방식"
        onClick={handleToggleDisplayMode} // 클릭 시 보기 방식 토글
        valueComponent={ // value 대신 커스텀 컴포넌트 전달
          <ViewModeIcon
            src={displayMode === 'grid' ? SortGridIconURL : SortListIconURL}
            alt={displayMode === 'grid' ? "그리드 정렬" : "목록 정렬"}
          />
        }
      />

      <FooterBar>
        <ResetButton onClick={handleResetFilters}>
          <img src={IconInitializeURL} alt="초기화" style={{ width: '20px', height: '20px' }}/>
          초기화
        </ResetButton>
        <ApplyFilterButton onClick={handleApplyFilters}>적용</ApplyFilterButton>    
      </FooterBar>
    </FilterPageContainer>
  );
}