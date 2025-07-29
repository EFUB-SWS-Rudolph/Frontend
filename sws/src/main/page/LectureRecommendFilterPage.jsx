// src/main/pages/LectureRecommendFilterPage.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 필요한 SVG 아이콘 URL 임포트 (LectureSearchFilterPage와 동일)
import IconNextURL from '../../common/assets/icons/icon_next.svg'; 
import IconInitializeURL from '../../common/assets/icons/icon_initialize.svg'; 
import SortGridIconURL from '../../common/assets/icons/sort_list.svg';
import SortListIconURL from '../../common/assets/icons/sort_gallery.svg';

const FilterPageContainer = styled.div`
  width: 100%;
  height: 100%; 
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 1.5rem; 
  gap: 1rem; 
  padding-bottom: 8.5rem;
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
  width: 24.375rem; 
  height:8.5rem;
  background: #FFFFFF;
  position: fixed;
  bottom: 0; 
  left: 50%; 
  transform: translateX(-50%); 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.25rem 2.5rem;
  box-sizing: border-box;
  z-index: 1000; 
  gap: 0.625rem;
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

// 필터 아이템 컴포넌트 - valueComponent prop 추가
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

  // 필터 값 상태 관리
  const [selectedSort, setSelectedSort] = useState('최신순'); // 초기값: 최신순
  const [displayMode, setDisplayMode] = useState('grid'); // 초기값: 갤러리정렬 (grid)

  const handleFilterClick = (filterType) => {
    // 필터 상세 설정 (정렬 기준)을 위한 팝업/모달 등이 연결될 수 있습니다.
    alert(`${filterType} 필터 설정 페이지 (미구현)`);
  };

  const handleResetFilters = () => {
    setSelectedSort('최신순');
    setDisplayMode('grid'); // 초기화 시 갤러리정렬로
    alert('필터가 초기화되었습니다.');
  };

  const handleApplyFilters = () => {
    // 실제 필터 적용 로직: 상위 컴포넌트(LectureRecommendPage)로 선택된 필터값 전달
    alert('필터가 적용되었습니다!');
    navigate(-1); // 이전 페이지로 돌아가기
  };

  // 보기 방식 클릭 시 토글 함수 (그리드/리스트)
  const handleToggleDisplayMode = () => {
    setDisplayMode(prevMode => (prevMode === 'grid' ? 'list' : 'grid'));
  };

  return (
    <FilterPageContainer>
      <FilterItem name="정렬 기준" value={selectedSort} onClick={() => handleFilterClick('정렬 기준')} />
      
      {/* "보기 방식" 필터 아이템 */}
      <FilterItem
        name="보기 방식"
        onClick={handleToggleDisplayMode} // 클릭 시 보기 방식 토글
        valueComponent={ // value 대신 커스텀 컴포넌트 전달
          <ViewModeIcon
            src={displayMode === 'grid' ? SortGridIconURL : SortListIconURL}
            alt={displayMode === 'grid' ?  "목록 정렬" :"그리드 정렬"}
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