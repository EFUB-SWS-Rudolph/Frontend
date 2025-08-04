// src/main/pages/LectureRecommendPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LectureCard from '../../../common/components/LectureCard';

import SortGridIconURL from '../../../common/assets/icons/FilterIcon_SortGrid.svg';
import SortListIconURL from '../../../common/assets/icons/FilterIcon_SortList.svg';
import SortKeywordIconURL from '../../../common/assets/icons/FilterIcon_SortKeyword.svg';
import SortFilterIconURL from '../../../common/assets/icons/FilterIcon_SortFilter.svg';
import IconDownURL from '../../../common/assets/icons/icon_down.svg';
import IconBackURL from '../../../common/assets/icons/icon_back.svg'; 
//강의 이미지 예시 (임시)
import LectureImageExample from '../../../common/assets/images/weave_img_ex1.svg';
const RecommendPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem; 
  padding:1rem;
`;

// 필터 바 아이콘 관련 styled-components 
const FilterIconBase = styled.div`
  font-family: Pretendard Variable;
  background: #F8F8F8;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
  color: var(--Black, #222)
  flex-shrink: 0;
  font-weight: 500;
  gap: 0.25rem; 
`;
const SortListIcon = styled(FilterIconBase)`
  width: 2.25rem;
  height: 2.25rem;
  & > img { width: 100%; height: 100%; }
`;
const SortKeywordIcon = styled(FilterIconBase)`
  width: 2.25rem;
  height: 2.25rem;
  background: ${props => props.$isActive ? '#E0FCEF' : '#F8F8F8;'}; 
  color: ${props => props.$isActive ? '#00664F' : '#222222'};
  & > img { width: 100%; height: 100%; }
`;
const SortFilterIcon = styled(FilterIconBase)`
  background: ${props => props.$isActive ? '#E0FCEF' : '#F8F8F8;'}; 
  color: ${props => props.$isActive ? '#00664F' : '#222222'};
  width: 4.1875rem; height: 2.25rem;flex-shrink: 0; display: flex; 
`;
const SortRecentIcon = styled(FilterIconBase)`
  background: ${props => props.$isActive ? '#E0FCEF' : '#F8F8F8;'}; 
  color: ${props => props.$isActive ? '#00664F' : '#222222'};
  width: 5rem;height: 2.25rem;flex-shrink: 0; display: flex; 
`;
const LectureFilterBar = styled.div`
  width: 100%;
  height: 2.25rem;
  display: flex;
  gap: 8px; 
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
  min-width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  border-radius: 0.5rem;
  cursor: pointer;
  flex-shrink: 0;
  font-size: 0.8125rem;
  color: #555;
`;
// 검색창 관련 styled-components 
const SearchFilterSection = styled.div`
  display: flex;
  height: 2.25rem;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  width: 100%; 
  box-sizing: border-box;
  border-radius: 0.75rem;
  background: var(--Gray-100, #F5F5F5);
`;

const SearchBar = styled.input`
  display: inline-flex;
  padding-left: 0.9375rem;
  justify-content: flex-end;
  align-items: center;
  border-radius: 0.75rem;
  background: var(--Gray-100, #F5F5F5);
  flex-grow: 1; 
  height: 100%; 
  color: #AAA;
  border-color:transparent;
  outline:none;
  font-family: "Pretendard Variable";
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.01031rem;
`;

const FilterButton = styled.button`
 width: 2.5rem;
  height: 2.5rem;
  border-radius: 1rem;
  background: transparent; 
  border: none;
  cursor: pointer;
  display: flex; 
  align-items: center;
  justify-content: center;
  flex-shrink: 0; 
`;
const FilterButtonIcon=styled.div`
   width: 1rem;
  height: 1rem;
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
  
  justify-content: ${props => props.$displayMode === 'grid' ? 'center' : 'flex-start'};
  flex-direction: ${props => props.$displayMode === 'list' ? 'column' : 'none'}; 
`;

const LectureListDisplayArea = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NoResultsMessage = styled.div`
   width: 100%; text-align: center; padding: 4rem;  color: #888; font-size: 1rem;
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
  display: flex;
  height: 5rem;
  padding: 0.75rem 4.8125rem 0.75rem 0.75rem;
  align-items: flex-start;
  gap: 0.75rem;
  align-self: stretch;
  border-radius: 1rem;
  border: 1px solid var(--Gray-300, #D9D9D9);
  box-sizing: border-box;
`;

const LectureListItemImage = styled.img`
   width: 3.5rem;
  height: 3.5rem;
  object-fit: cover;
  border-radius: 0.75rem;
  background: url(<path-to-image>) lightgray -2.352px -0.049px / 177.72% 100% no-repeat;
  flex-shrink: 0;
`;

const LectureListItemInfo = styled.div`
  width: 12rem;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: center;
`;

const LectureListItemInstructor = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
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
  font-size: 1rem;
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
  font-size: 0.75rem;
  line-height: 150%;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #808080;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const FilterModalOverlay = styled.div`
    position: fixed; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); 
    display: flex;
    align-items: flex-end; 
    justify-content: center;
    z-index: 10000; 
`;

const FilterModalContainer = styled.div`
    width: 24.375rem; 
    max-height: 23.75rem; 
    min-height: 18rem;
    border-radius: 1.25rem 1.25rem 0 0;
    background: var(--White, #FFF);
    box-sizing: border-box;
    position: relative; 
    transform: translateY(${props => props.$isVisible ? '0' : '100%'});
    transition: transform 0.3s ease-out;
    display: flex; 
    flex-direction: column;
    overflow-y: auto; 
    -webkit-overflow-scrolling: touch; 
`;

const ModalTitle = styled.h3`
    font-family: Pretendard Variable;
    font-weight: 600;
    font-size: 1.25rem;
    color: #222222;
    text-align: center;
    margin-bottom: 1.25rem;
    margin-top:1.65rem;
`;

const ModalCloseButton = styled.button`
    position: absolute;
    top: 1.563rem;
    left: 1rem;
    border: none;
    font-size: 1.75rem;
    cursor: pointer;
    background: none;
    color:#222222;
`;
const ModalComponentButton=styled.button`
 background:#FFFFFF;
  border: none;
  cursor: pointer;
  width:100%;
  heignt:3.75rem;
  margin-left:0rem;
`;
const ModalComponentButtonText=styled.div`
  idth:flex;
  heignt:1.375rem;
  margin-top:1.188rem;
  margin-left:4rem;
  margin-bottom:1.188rem;
  font-size: 1rem;
  font-weight:500;
  color:#000000;
  display: flex;
  justify-content: flex-start; 
  align-items: center; 
`;
//  추천 강의 데이터 예시 (임시)
const recommendedLectureData = [
  { id: 1, image: LectureImageExample, title: "React 완전 정복", nickname: "김코딩", type: "재능기부", date: "2024.08.01" },
  { id: 2, image: LectureImageExample, title: "UI/UX 디자인 실전", nickname: "이디자인", type: "재능교환", date: "2024.08.15" },
  { id: 3, image: LectureImageExample, title: "SQL 고급 활용", nickname: "박데이터", type: "과외", date: "2024.09.01" },
  { id: 4, image: LectureImageExample, title: "Python 데이터 분석", nickname: "최파이", type: "재능기부", date: "2024.09.10" },
  { id: 5, image: LectureImageExample, title: "Java 백엔드", nickname: "정자바", type: "재능교환", date: "2024.09.25" },
  { id: 6, image: LectureImageExample, title: "React 기초", nickname: "김코딩", type: "과외", date: "2024.08.01" },
  { id: 7, image: LectureImageExample, title: "UX 리서치", nickname: "이디자인", type: "재능기부", date: "2024.08.15" },
  { id: 8, image: LectureImageExample, title: "데이터 모델링", nickname: "박데이터", type: "재능교환", date: "2024.09.01" },
];

// LectureRecommendPage 함수 컴포넌트 정의
export default function LectureRecommendPage() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredLectures, setFilteredLectures] = useState(recommendedLectureData); 
  const [displayMode, setDisplayMode] = useState('grid');
  const navigate = useNavigate();
  const [showSortRecentPopup, setShowSortRecentPopup] = useState(false); 
  const [isSortRecentActive, setIsSortRecentActive] = useState(false);
 
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredLectures(recommendedLectureData); 
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const results = recommendedLectureData.filter(lecture =>
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
    navigate('/lectures/recommend/filter'); 
  };
  const handleRecentFilterClick=()=>{
    navigate('/lectures/search/filter/sort');
  };
  const handleToggleSortRecentPopup = () => {
    setShowSortRecentPopup(prev => !prev);
    setIsSortRecentActive(prev => !prev); // 팝업이 열릴 때 아이콘 활성화
  };

  return (
    <RecommendPageContainer>
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
        <FilterBarItem onClick={handleRecentFilterClick}>
          <SortRecentIcon $isActive={isSortRecentActive}>
            최신 순
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
      {showSortRecentPopup && (
              <FilterModalOverlay onClick={() => handleToggleSortRecentPopup()}> 
                <FilterModalContainer $isVisible={showSortRecentPopup} onClick={e => e.stopPropagation()}> 
                  <ModalCloseButton  onClick={() => handleToggleSortRecentPopup()}><img src={IconBackURL}/></ModalCloseButton>
                  <ModalTitle>강의 형태</ModalTitle>
                  <ModalComponentButton><ModalComponentButtonText>최신 순</ModalComponentButtonText></ModalComponentButton>
                  <ModalComponentButton><ModalComponentButtonText>오래된 순</ModalComponentButtonText></ModalComponentButton>
                 
                </FilterModalContainer>
              </FilterModalOverlay>
            )}
      
      

      {/* 추천 강의 목록 영역 (갤러리 정렬 고정) */}
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
    </RecommendPageContainer>
  );
}
