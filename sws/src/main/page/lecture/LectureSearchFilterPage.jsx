// src/main/pages/LectureSearchFilterPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useFilter } from '../../../common/contexts/FilterContext';
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

const ViewModeIcon = styled.img`
  width: 2rem; 
  height: 2rem; 
  object-fit: contain;
  margin-right:0.5rem;
`;
// 필터 아이템 컴포넌트
const FilterItem = ({ name, value, onClick , valueComponent}) => {
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
export default function LectureSearchFilterPage() {
  const navigate = useNavigate();
  const { searchFilters, updateSearchFilter, displayMode, setDisplayMode } = useFilter(); 
  const handleFilterClick = (filterType) => {
  if (filterType === '강의 방식') { 
    navigate('/lectures/search/filter/format');
  } 
  else if (filterType === '지역') { 
      navigate('/lectures/search/filter/location');
  }
  else if (filterType === '기간') { 
      navigate('/lectures/search/filter/date');
  }
  else if (filterType === '정렬 기준') { 
      navigate('/lectures/search/filter/sort');
  }
  else {
    alert(`${filterType} 필터 설정 페이지 (미구현)`);
  }
};
  const handleResetFilters = () => {
    // 필터 초기화 로직
    updateSearchFilter('format', '전체');
    updateSearchFilter('location', '전체');
    updateSearchFilter('date', '전체');
    updateSearchFilter('sort', '최신 순');
    setDisplayMode('grid'); // 보기 방식 초기화
    alert('필터가 초기화되었습니다.');
  };
  const handleApplyFilters = () => {
    // 필터 적용 로직 (상위 컴포넌트 LectureList로 선택된 필터값 전달 등)
    alert('필터가 적용되었습니다!');
    // 필터 적용 후 이전 페이지로 돌아가기
    navigate(-1); 
  };
  const handleToggleDisplayMode = () => {
    setDisplayMode(prevMode => (prevMode === 'grid' ? 'list' : 'grid'));
  };

  return (
    <FilterPageContainer>
      <FilterItem name="강의 방식" value={searchFilters.format} onClick={() => handleFilterClick('강의 방식')} />
      <FilterItem name="지역" value={searchFilters.location} onClick={() => handleFilterClick('지역')} />
      <FilterItem name="기간" value={searchFilters.date} onClick={() => handleFilterClick('기간')} />
      <FilterItem name="정렬 기준" value={searchFilters.sort} onClick={() => handleFilterClick('정렬 기준')} />
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
                <img src={IconInitializeURL} alt="초기화" style={{width: '1.25rem', height: '1.25rem' }}/>
                초기화
            </ResetButton>
            <ApplyFilterButton onClick={handleApplyFilters}>적용</ApplyFilterButton>    
        </FooterBar>
    </FilterPageContainer>
  );
}