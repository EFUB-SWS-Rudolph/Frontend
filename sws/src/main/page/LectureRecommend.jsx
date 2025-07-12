// src/main/pages/LectureRecommendPage.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// -----------------------------------------------------------
// 1. 모든 styled-components 정의를 가장 먼저 배치합니다.
//    (LectureListPage.jsx에서 사용된 것들을 재활용)
// -----------------------------------------------------------

const RecommendPageContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// 필터 바 아이콘 관련 styled-components 
const FilterIconBase = styled.div`
  width: 36px; height: 36px; background-color: #D3D3D3; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; font-size: 10px;
  color: #555; flex-shrink: 0;
`;
const SortListIcon = styled(FilterIconBase)``;
const SortKeywordIcon = styled(FilterIconBase)``;
const SortFilterIcon = styled(FilterIconBase)`width: 67px;`;
const SortConditionIcon = styled(FilterIconBase)`
  width: 84px;
`; 
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
  width: auto; min-width: 36px; height: 36px; display: flex; align-items: center;
  justify-content: center; background-color: #FFFFFF; border-radius: 8px;
  cursor: pointer; flex-shrink: 0; font-size: 14px; color: #555;
`;
// 검색창 관련 styled-components 
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

// 강의 카드 그리드 (갤러리 정렬) 관련 styled-components (LectureListPage.jsx에서 복사)
const LectureCardsGrid = styled.div`
  display: grid; /* 갤러리 정렬 고정 */
  grid-template-columns: repeat(2, 1fr); /* 2열 고정 */
  gap: 14px; /* 상하좌우 14px 간격 */
  padding: 0 8px;
  justify-content: center;
`;
import LectureCard from '../../common/components/LectureCard';

const LectureListDisplayArea = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 20px;
`;

// -----------------------------------------------------------
// 2. 추천 강의 데이터 예시 (임시)
// -----------------------------------------------------------
const recommendedLectureData = [
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
// 3. LectureRecommendPage 함수 컴포넌트 정의
// -----------------------------------------------------------
export default function LectureRecommendPage() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  const [filteredLectures, setFilteredLectures] = useState(recommendedLectureData); // 필터링된 강의 목록

  // 검색어 변경 시 강의 목록 필터링
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredLectures(recommendedLectureData); // 검색어가 없으면 전체 목록
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const results = recommendedLectureData.filter(lecture =>
        lecture.title.toLowerCase().includes(lowercasedQuery) ||
        lecture.nickname.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredLectures(results);
    }
  }, [searchQuery]); // searchQuery가 변경될 때마다 실행

  const handleToggleSearchBar = () => {
    setShowSearchBar(prev => !prev);
    setSearchQuery(''); // 검색창 닫을 때 검색어 초기화
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value); // 검색어 업데이트
  };

  return (
    <RecommendPageContainer>
      {/* 강의 필터 바 [강의 필터 바] */}
      <LectureFilterBar>
       
        <FilterBarItem>
          <SortListIcon /> 
        </FilterBarItem>
        <FilterBarItem onClick={handleToggleSearchBar}>
          <SortKeywordIcon /> {/* 검색 버튼 */}
        </FilterBarItem>
        <FilterBarItem>
          <SortFilterIcon /> {/* 필터 버튼 */}
        </FilterBarItem>
        <FilterBarItem>
          <SortConditionIcon /> {/* 정렬기준 버튼 */}
        </FilterBarItem>
      </LectureFilterBar>

      {showSearchBar && (
        <SearchFilterSection>
          <SearchBar
            placeholder="강의명 또는 진행자 닉네임을 검색해보세요..."
            value={searchQuery} // 검색어 상태와 연결
            onChange={handleSearchInputChange} // 검색어 변경 핸들러
          />
          <FilterButton>검색</FilterButton> {/* 필터 버튼을 검색 실행 버튼으로 변경 */}
        </SearchFilterSection>
      )}

      {/* 추천 강의 목록 영역 (갤러리 정렬 고정) */}
      <LectureListDisplayArea>
        <LectureCardsGrid $displayMode="grid">
          {filteredLectures.length > 0 ? (
            filteredLectures.map(lecture => (
              <LectureCard key={lecture.id} lecture={lecture} />
            ))
          ) : (
            <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>
          )}
        </LectureCardsGrid>
      </LectureListDisplayArea>
    </RecommendPageContainer>
  );
}
// -----------------------------------------------------------
// 검색 결과 없음 메시지 스타일 추가
// -----------------------------------------------------------
const NoResultsMessage = styled.div`
  width: 100%;
  text-align: center;
  padding: 50px 0;
  color: #888;
  font-size: 16px;
`;