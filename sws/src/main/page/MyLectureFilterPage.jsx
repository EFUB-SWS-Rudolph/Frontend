// src/main/pages/MyLectureFilterPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  padding: 0 24px; 
  gap: 16px; 
  padding-bottom: 136px; 
`;
const FilterItemContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee; 
  cursor: pointer;
`;
const FilterName = styled.span`
  font-family: Pretendard Variable;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #222222;
`;
const FilterValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; 
`;
const FilterValue = styled.span`
  font-family: Pretendard Variable;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #808080;
`;
const NextIcon = styled.div`
  width: 5px;
  height: 10px; 
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const ViewModeIcon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  margin-right: 8px;
`;
const FooterBar = styled.div`
  width: 390px; 
  height: 136px;
  background: #FFFFFF;
  position: fixed;
  bottom: 0; 
  left: 50%; 
  transform: translateX(-50%); 
  display: flex; 
  align-items: center;
  justify-content: center; 
  padding: 0 20px ; 
  box-sizing: border-box;
  z-index: 1000; 
  gap: 10px; 
`;
const ResetButton = styled.button`
  width: 54px; 
  height: 48px;
  border-radius: 8px;
  background: #F5F5F5; 
  color: #222222;
  font-family: Pretendard Variable;
  font-weight: 500;
  font-size: 10px; 
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  gap: 4px; 
  flex-shrink: 0; 
`;
const ApplyFilterButton = styled.button`
  width: 276px; 
  height: 56px; 
  border-radius: 12px;
  background: #00664F; 
  color: white;
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 18px;
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

export default function MyLectureFilterPage() {
  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] = useState('수강중'); 
  const [displayMode, setDisplayMode] = useState('grid'); 
  const handleFilterClick = (filterType) => {
    if (filterType === '정렬 기준') {
        setSelectedStatus(prevStatus => (prevStatus === '수강중' ? '수강종료' : '수강중'));
    } else {
        alert(`${filterType} 필터 설정 페이지 (미구현)`);
    }
  };
  const handleResetFilters = () => {
    setSelectedStatus('수강중');
    setDisplayMode('grid'); // 초기화 시 갤러리정렬로
    alert('필터가 초기화되었습니다.');
  };
  const handleApplyFilters = () => {
    // 실제 필터 적용 로직
    alert('필터가 적용되었습니다!');
    navigate(-1); // 이전 페이지로 돌아가기
  };
  // 보기 방식 클릭 시 토글 함수 (그리드/리스트)
  const handleToggleDisplayMode = () => {
    setDisplayMode(prevMode => (prevMode === 'grid' ? 'list' : 'grid'));
  };
  return (
    <FilterPageContainer>
      <FilterItem name="정렬 기준" value={selectedStatus} onClick={() => handleFilterClick('정렬 기준')} />
      <FilterItem
        name="보기 방식"
        onClick={handleToggleDisplayMode} 
        valueComponent={ 
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