// src/main/page/LectureMy.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import SortGridIconURL from '../../common/assets/icons/FilterIcon_SortGrid.svg';
import SortListIconURL from '../../common/assets/icons/FilterIcon_SortList.svg';
import SortKeywordIconURL from '../../common/assets/icons/FilterIcon_SortKeyword.svg';
import SortFilterIconURL from '../../common/assets/icons/FilterIcon_SortFilter.svg';
import IconDownURL from '../../common/assets/icons/icon_down.svg';
import LectureCard from '../../common/components/LectureCard';
//강의 이미지 예시 (임시)
import LectureImageExample from '../../common/assets/images/weave_img_ex1.svg';
const MyLecturePageContainer = styled.div` /* RecommendPageContainer와 동일 */
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// 필터 바 아이콘 관련 styled-components
const FilterIconBase = styled.div`
  font-family: Pretendard Variable;
  width: 36px;
  height: 36px;
  background: #F5F5F5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #222222;
  flex-shrink: 0;
  font-weight: 500;
`;
const SortListIcon = styled(FilterIconBase)`
  & > img { width: 100%; height: 100%; }
`;
const SortKeywordIcon = styled(FilterIconBase)`
  background: ${props => props.$isActive ? '#E0FCEF' : '#F5F5F5'}; 
  color: ${props => props.$isActive ? '#00664F' : '#222222'};
  & > img { width: 100%; height: 100%; }
`;
const SortFilterIcon = styled(FilterIconBase)`
  width: 67px; display: flex; gap: 4px; 
`;
const SortRecentIcon = styled(FilterIconBase)`
  width: 75px; display: flex; gap: 4px;  
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

// 검색창 관련 styled-components
const SearchFilterSection = styled.div`
  width: 100%; 
  height: 40px;
  border-radius: 12px;
  background: #F5F5F5;
  display: flex; 
  align-items: center;
  gap: 8px; 
  padding: 0 10px; 
  box-sizing: border-box; 
`;

const SearchBar = styled.input`
  flex-grow: 1; 
  height: 100%; 
  padding: 0; 
  border: none; 
  background: transparent; 
  font-size: 13px;
  outline: none; 
   &::placeholder {
    color: #AAAAAA; 
  }
`;

const FilterButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: transparent; 
  border: none;
  cursor: pointer;
  display: flex; 
  align-items: center;
  justify-content: center;
  flex-shrink: 0; 
`;
const FilterButtonIcon=styled.div`
  width: 15px;
  height: 15px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain; 
  }
`;

// 강의 카드 그리드 (갤러리 정렬) 관련 styled-components
const LectureCardsGrid = styled.div`
  display: ${props => props.$displayMode === 'grid' ? 'grid' : 'flex'};
  grid-template-columns: ${props => props.$displayMode === 'grid' ? 'repeat(2, 1fr)' : 'none'};
  gap: 14px;
  padding: 0 8px;
  justify-content: ${props => props.$displayMode === 'grid' ? 'center' : 'flex-start'};
  flex-direction: ${props => props.$displayMode === 'list' ? 'column' : 'none'};
`;

const LectureListDisplayArea = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NoResultsMessage = styled.div`
  width: 100%; text-align: center; padding: 50px 0; color: #888; font-size: 16px;
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

// 내 강의 데이터 예시 (임시)
const myLectureData = [
  { id: 1, image: LectureImageExample, title: "React 완전 정복", nickname: "김코딩", type: "재능기부", date: "2024.08.01" },
  { id: 2, image: LectureImageExample, title: "UI/UX 디자인 실전", nickname: "이디자인", type: "재능교환", date: "2024.08.15" },
  { id: 3, image: LectureImageExample, title: "SQL 고급 활용", nickname: "박데이터", type: "과외", date: "2024.09.01" },
  { id: 4, image: LectureImageExample, title: "Python 데이터 분석", nickname: "최파이", type: "재능기부", date: "2024.09.10" },
  { id: 5, image: LectureImageExample, title: "Java 백엔드", nickname: "정자바", type: "재능교환", date: "2024.09.25" },
  { id: 6, image: LectureImageExample, title: "React 기초", nickname: "김코딩", type: "과외", date: "2024.08.01" },
  { id: 7, image: LectureImageExample, title: "UX 리서치", nickname: "이디자인", type: "재능기부", date: "2024.08.15" },
  { id: 8, image: LectureImageExample, title: "데이터 모델링", nickname: "박데이터", type: "재능교환", date: "2024.09.01" },
];

//  MyLecturePage 함수 컴포넌트 정의
export default function MyLecturePage() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLectures, setFilteredLectures] = useState(myLectureData);
  const [displayMode, setDisplayMode] = useState('grid');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredLectures(myLectureData);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const results = myLectureData.filter(lecture =>
        lecture.title.toLowerCase().includes(lowercasedQuery) ||
        lecture.nickname.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredLectures(results);
    }
  }, [searchQuery]);

  const handleToggleSearchBar = () => {
    setShowSearchBar(prev => !prev);
    setSearchQuery('');
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleToggleDisplayMode = () => {
    setDisplayMode(prev => prev === 'grid' ? 'list' : 'grid');
  };
  const handleFilterClick = () => {
    navigate('/lectures/my/filter'); 
  };

  return (
    <MyLecturePageContainer>
      {/* 강의 필터 바 [강의 필터 바] */}
      <LectureFilterBar>
        <FilterBarItem onClick={handleToggleDisplayMode}>
            <SortListIcon>
                <img 
                  src={displayMode === 'grid' ? SortListIconURL : SortGridIconURL} 
                  alt={displayMode === 'grid' ? "목록 정렬" : "갤러리 정렬"} 
                  style={{ width: '50%', height: '50%' }}
                />
             </SortListIcon>
        </FilterBarItem>
        <FilterBarItem onClick={handleToggleSearchBar}>
          <SortKeywordIcon $isActive={showSearchBar}>
            <img src={SortKeywordIconURL}style={{ width: '40%', height: '40%' }}/>
          </SortKeywordIcon>
        </FilterBarItem>
        <FilterBarItem onClick={handleFilterClick}>
          <SortFilterIcon>
              필터
                <img src={SortFilterIconURL}style={{ width: '30%', height: '30%' }}/>
          </SortFilterIcon>
        </FilterBarItem>
        <FilterBarItem>
          <SortRecentIcon>
            수강 중
            <img src={IconDownURL} style={{margin:'3px'}}/>
          </SortRecentIcon>
        </FilterBarItem>
      </LectureFilterBar>

      {showSearchBar && (
        <SearchFilterSection>
          <SearchBar placeholder="강의명 또는 키워드 입력" value={searchQuery} onChange={handleSearchInputChange} /> 
            <FilterButton>
              <FilterButtonIcon>
                <img src={SortKeywordIconURL}/>
              </FilterButtonIcon>
            </FilterButton>
        </SearchFilterSection>
     )}
      <LectureListDisplayArea>
        <LectureCardsGrid $displayMode={displayMode}>
          {filteredLectures.length > 0 ? (
            filteredLectures.map(lecture => (
              displayMode === 'grid' ? (
                <LectureCard key={lecture.id} lecture={lecture} />
              ) : (
                <LectureListItem key={lecture.id} lecture={lecture} />
              )
            ))
          ) : (
            <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>
          )}
        </LectureCardsGrid>
      </LectureListDisplayArea>
    </MyLecturePageContainer>
  );
}