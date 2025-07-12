// src/main/pages/LectureList.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LectureCard from '../../common/components/LectureCard';
// useLectureTab 훅 임포트 (Layout.jsx에 정의되어 있음)
import { useLectureTab } from '../../common/styles/Layout'; 

// -----------------------------------------------------------
// 1. 모든 styled-components 정의를 가장 먼저 배치합니다.
// -----------------------------------------------------------

const LectureListContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 20px; 
`;

const SearchFilterSection = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 0 8px;
`;

const SearchBar = styled.input`
  flex-grow: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
`;

const FilterButton = styled.button`
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
`;

// 필터 바 아이콘 관련 styled-components
const FilterIconBase = styled.div`
  width: 36px;
  height: 36px;
  background-color: #D3D3D3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #555;
  flex-shrink: 0;
`;

const SortListIcon = styled(FilterIconBase)``;
const SortKeywordIcon = styled(FilterIconBase)``;
const SortFilterIcon = styled(FilterIconBase)`width: 67px;`;
const SortTypeIcon = styled(FilterIconBase)`width: 84px;`;
const SortRegionIcon = styled(FilterIconBase)`width: 63px;`;
const SortFormatIcon = styled(FilterIconBase)`width: 78px;`;

const LectureFilterBar = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  gap: 8px; /* 간격 8px */
  
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
  align-items: center;
  flex-shrink: 0;
`;

const FilterBarItem = styled.div`
  width: auto;
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
  font-size: 14px;
  color: #555;
  
`;

// 강의 카드 그리드 (갤러리 정렬) 관련 styled-components
const LectureCardsGrid = styled.div`
  display: ${props => props.$displayMode === 'grid' ? 'grid' : 'flex'};
  /* 핵심! 2열 그리드와 14px 간격 */
  grid-template-columns: ${props => props.$displayMode === 'grid' ? 'repeat(2, 1fr)' : 'none'}; /* 2열 고정 */
  gap: 14px; /* 상하좌우 14px 간격 */
  padding: 0 8px; /* 기존 패딩 유지 */
  justify-content: center;
  /* 목록 정렬 시 */
  flex-direction: ${props => props.$displayMode === 'list' ? 'column' : 'none'};
`;




// 강의 목록 아이템 (리스트 정렬) 관련 styled-components
const LectureListItem = ({ lecture }) => {
  return (
    <StyledLectureListItem>
      <LectureListItemImage src={lecture.image} alt={lecture.title} />
      <LectureListItemInfo>
        <LectureListItemInstructor>{lecture.nickname}</LectureListItemInstructor>
        <LectureListItemTitle>{lecture.title}</LectureListItemTitle>
        <LectureListItemDate>{lecture.date}</LectureListItemDate>
      </LectureListItemInfo>
    </StyledLectureListItem>
  );
};

const StyledLectureListItem = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 16px;
  border: 1px solid #D9D9D9;
  display: flex;
  align-items: center;
  padding: 12px;
  box-sizing: border-box;
  gap: 12px;
`;

const LectureListItemImage = styled.img`
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
`;

const LectureListItemInfo = styled.div`
  width: 193px;
  height: 56px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
`;

const LectureListItemInstructor = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0px;
  color: #969696;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LectureListItemTitle = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #222222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LectureListItemDate = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #808080;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LectureListDisplayArea = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
 
`;

const ContentPlaceholder = styled.div`
  
  text-align: center;
  color: #888;
  font-size: 16px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #ccc;
  border-radius: 8px;
  margin: 0 8px;
`;


// -----------------------------------------------------------
// 2. 강의 데이터 예시
// -----------------------------------------------------------
const allLectureData = [
  { id: 1, image: "https://via.placeholder.com/172x240/FF5733/FFFFFF?text=React", title: "React 완전 정복", nickname: "김코딩", type: "재능기부", date: "2024.08.01" },
  { id: 2, image: "https://via.placeholder.com/172x240/33FF57/FFFFFF?text=Design", title: "UI/UX 디자인 실전", nickname: "이디자인", type: "재능교환", date: "2024.08.15" },
  { id: 3, image: "https://via.placeholder.com/172x240/3357FF/FFFFFF?text=3", title: "SQL 고급 활용", nickname: "박데이터", type: "과외", date: "2024.09.01" },
  { id: 4, image: "https://via.placeholder.com/172x240/FF33A1/FFFFFF?text=4", title: "Python 데이터 분석", nickname: "최파이", type: "재능기부", date: "2024.09.10" },
  { id: 5, image: "https://via.placeholder.com/172x240/A133FF/FFFFFF?text=5", title: "Java 백엔드", nickname: "정자바", type: "재능교환", date: "2024.09.25" },
  { id: 6, image: "https://via.placeholder.com/172x240/FF5733/FFFFFF?text=6", title: "React 기초", nickname: "김코딩", type: "과외", date: "2024.08.01" },
  { id: 7, image: "https://via.placeholder.com/172x240/33FF57/FFFFFF?text=7", title: "UX 리서치", nickname: "이디자인", type: "재능기부", date: "2024.08.15" },
  { id: 8, image: "https://via.placeholder.com/172x240/3357FF/FFFFFF?text=8", title: "데이터 모델링", nickname: "박데이터", type: "재능교환", date: "2024.09.01" },
];


// -----------------------------------------------------------
// 3. LectureListPage 함수 컴포넌트 정의
// -----------------------------------------------------------
export default function LectureListPage() {
  const { mainActiveTab, setMainActiveTab } = useLectureTab(); // Context에서 상태 가져오기

  const [subFilter, setSubFilter] = useState('전체');
  const [filteredLectures, setFilteredLectures] = useState([]);
  const [displayMode, setDisplayMode] = useState('grid');
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    // mainActiveTab에 따라 데이터 필터링/로딩 로직
    if (mainActiveTab === '강의 조회') {
      let currentLectures = allLectureData;
      if (subFilter !== '전체') {
        currentLectures = allLectureData.filter(lecture => lecture.type === subFilter);
      }
      setFilteredLectures(currentLectures);
    } else if (mainActiveTab === '강의 추천') {
      setFilteredLectures([]); // TODO: 추천 강의 데이터 로직
    } else if (mainActiveTab === '내 강의') {
      setFilteredLectures([]); // TODO: 내 강의 데이터 로직
    }
  }, [mainActiveTab, subFilter]);

  const handleToggleDisplayMode = () => {
    setDisplayMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  const handleToggleSearchBar = () => {
    setShowSearchBar(prev => !prev);
  };

  return (
    <LectureListContainer>
      {/* 2. 각 탭에 따른 콘텐츠 렌더링 */}
      {mainActiveTab === '강의 조회' && (
        <>
          {/* 강의 필터 바 [강의 필터 바] */}
          <LectureFilterBar>
            <FilterBarItem onClick={handleToggleDisplayMode}>
              <SortListIcon />
            </FilterBarItem>
            <FilterBarItem onClick={handleToggleSearchBar}>
              <SortKeywordIcon />
            </FilterBarItem>
            <FilterBarItem>
              <SortFilterIcon />
            </FilterBarItem>
            <FilterBarItem>
              <SortTypeIcon />
            </FilterBarItem>
            <FilterBarItem>
              <SortRegionIcon />
            </FilterBarItem>
            <FilterBarItem>
              <SortFormatIcon />
            </FilterBarItem>
          </LectureFilterBar>

          {showSearchBar && (
            <SearchFilterSection>
              <SearchBar placeholder="강의를 검색해보세요..." />
              <FilterButton>필터</FilterButton>
            </SearchFilterSection>
          )}

          <LectureListDisplayArea>
            <LectureCardsGrid $displayMode={displayMode}>
              {filteredLectures.map(lecture => (
                displayMode === 'grid' ? (
                  <LectureCard key={lecture.id} lecture={lecture} />
                ) : (
                  <LectureListItem key={lecture.id} lecture={lecture} />
                )
              ))}
            </LectureCardsGrid>
          </LectureListDisplayArea>
        </>
      )}

      {mainActiveTab === '강의 추천' && (
        <ContentPlaceholder>
          <p>추천 강의 목록이 여기에 표시됩니다.</p>
        </ContentPlaceholder>
      )}

      {mainActiveTab === '내 강의' && (
        <ContentPlaceholder>
          <p>내 강의 목록이 여기에 표시됩니다.</p>
        </ContentPlaceholder>
      )}
    </LectureListContainer>
  );
}