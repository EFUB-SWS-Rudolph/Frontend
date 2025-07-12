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
  width: auto; min-width: 36px; height: 36px; display: flex; align-items: center;
  justify-content: center; background-color: #FFFFFF; border-radius: 8px;
  cursor: pointer; flex-shrink: 0; font-size: 14px; color: #555;
`;

// 강의 카드 그리드 (갤러리 정렬) 관련 styled-components (LectureListPage.jsx에서 복사)
const LectureCardsGrid = styled.div`
  display: grid; /* 갤러리 정렬 고정 */
  grid-template-columns: repeat(2, 1fr); /* 2열 고정 */
  gap: 14px; /* 상하좌우 14px 간격 */
  padding: 0 8px;
  justify-content: center;
`;

const LectureCard = ({ lecture }) => {
  return (
    <StyledLectureCard>
      <LectureImage src={lecture.image} alt={lecture.title} />
      <LectureCardInfo>
        <LectureTitleText>{lecture.title}</LectureTitleText>
        <LectureNicknameText>{lecture.nickname}</LectureNicknameText>
        <LectureDateText>{lecture.date}</LectureDateText>
      </LectureCardInfo>
    </StyledLectureCard>
  );
};

const StyledLectureCard = styled.div`
  width: 172px;
  height: 240px;
  border-radius: 16px;
  border: 1px solid #D9D9D9;
  background: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const LectureImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LectureCardInfo = styled.div`
  width: 148px;
  height: 56px;
  position: absolute;
  bottom: 12px;
  left: 12px;
  gap: 4px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const LectureTitleText = styled.span`
  width: 100%;
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

const LectureNicknameText = styled.span`
  width: 100%;
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

const LectureDateText = styled.span`
  width: 100%;
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
  const [showSearchBar, setShowSearchBar] = useState(false); // 검색창 표시 여부 (재활용)

  const handleToggleSearchBar = () => {
    setShowSearchBar(prev => !prev);
  };

  return (
    <RecommendPageContainer>
      {/* 강의 필터 바 [강의 필터 바] */}
      <LectureFilterBar>
        {/* 추천 페이지는 정렬 방식 토글 버튼이 필요 없을 수 있음 (기본 갤러리) */}
        <FilterBarItem>
          <SortListIcon /> {/* 아이콘은 그대로 두되 기능은 비활성화 또는 변경 */}
        </FilterBarItem>
        <FilterBarItem onClick={handleToggleSearchBar}>
          <SortKeywordIcon /> {/* 검색 버튼 */}
        </FilterBarItem>
        <FilterBarItem>
          <SortFilterIcon /> {/* 필터 버튼 */}
        </FilterBarItem>
        <FilterBarItem>
          <SortTypeIcon /> {/* 수강 여부 버튼 */}
        </FilterBarItem>
      </LectureFilterBar>

      {showSearchBar && (
        <SearchFilterSection>
          <SearchBar placeholder="강의를 검색해보세요..." />
          <FilterButton>필터</FilterButton>
        </SearchFilterSection>
      )}

      {/* 추천 강의 목록 영역 (갤러리 정렬 고정) */}
      <LectureListDisplayArea>
        <LectureCardsGrid $displayMode="grid"> {/* 갤러리 정렬 고정 */}
          {recommendedLectureData.map(lecture => (
            <LectureCard key={lecture.id} lecture={lecture} />
          ))}
        </LectureCardsGrid>
      </LectureListDisplayArea>
    </RecommendPageContainer>
  );
}