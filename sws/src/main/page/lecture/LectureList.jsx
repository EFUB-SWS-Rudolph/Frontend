// src/main/pages/LectureList.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LectureCard from '../../../common/components/LectureCard';
import { useLectureTab } from '../../../common/styles/Layout'; 
import { useNavigate } from 'react-router-dom';
import { FilterProvider, useFilter } from '../../../common/contexts/FilterContext';

import SortGridIconURL from '../../../common/assets/icons/FilterIcon_SortGrid.svg';
import SortListIconURL from '../../../common/assets/icons/FilterIcon_SortList.svg';
import SortKeywordIconURL from '../../../common/assets/icons/FilterIcon_SortKeyword.svg';
import SortFilterIconURL from '../../../common/assets/icons/FilterIcon_SortFilter.svg';
import IconDownURL from '../../../common/assets/icons/icon_down.svg';
import IconBackURL from '../../../common/assets/icons/icon_back.svg'; 
//강의 이미지 예시 (임시)
import LectureImageExample from '../../../common/assets/images/weave_img_ex1.svg';
const LectureListContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem; 
`;

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
const SortTypeIcon = styled(FilterIconBase)`
  background: ${props => props.$isActive ? '#E0FCEF' : '#F8F8F8;'}; 
  color: ${props => props.$isActive ? '#00664F' : '#222222'};
 width: 5.25rem;height: 2.25rem;flex-shrink: 0; display: flex; 
`;
const SortRegionIcon = styled(FilterIconBase)`
  background: ${props => props.$isActive ? '#E0FCEF' : '#F8F8F8;'}; 
  color: ${props => props.$isActive ? '#00664F' : '#222222'};
  width: 3.875rem;height: 2.25rem;flex-shrink: 0; display: flex; 
`;
const SortDateIcon = styled(FilterIconBase)`
  background: ${props => props.$isActive ? '#E0FCEF' : '#F8F8F8;'}; 
  color: ${props => props.$isActive ? '#00664F' : '#222222'};
  width: 3.875rem;height: 2.25rem;flex-shrink: 0; display: flex;  
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

// 강의 카드 그리드 (갤러리 정렬) 관련 styled-components
const LectureCardsGrid = styled.div`
  display: ${props => props.$displayMode === 'grid' ? 'grid' : 'flex'};
  grid-template-columns: ${props => props.$displayMode === 'grid' ? 'repeat(2, 1fr)' : 'none'}; /* 2열 고정 */
  gap: 0.88rem;
  
  justify-content: center;
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
  display: flex;
  height: 5rem;
  width:100%;
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
const ContentPlaceholder = styled.div`
  text-align: center;
  color: #888;
  font-size: 1rem;
  min-height: 12.5 rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #ccc;
  border-radius: 0.5rem;
  
`;
//강의 데이터 예시
const allLectureData = [
  { id: 1, image: LectureImageExample, title: "React 완전 정복", nickname: "김코딩", type: "재능기부", date: "2024.08.01" },
  { id: 2, image: LectureImageExample, title: "UI/UX 디자인 실전", nickname: "이디자인", type: "재능교환", date: "2024.08.15" },
  { id: 3, image: LectureImageExample, title: "SQL 고급 활용", nickname: "박데이터", type: "과외", date: "2024.09.01" },
  { id: 4, image: LectureImageExample, title: "Python 데이터 분석", nickname: "최파이", type: "재능기부", date: "2024.09.10" },
  { id: 5, image: LectureImageExample, title: "Java 백엔드", nickname: "정자바", type: "재능교환", date: "2024.09.25" },
  { id: 6, image: LectureImageExample, title: "React 기초", nickname: "김코딩", type: "과외", date: "2024.08.01" },
  { id: 7, image: LectureImageExample, title: "UX 리서치", nickname: "이디자인", type: "재능기부", date: "2024.08.15" },
  { id: 8, image: LectureImageExample, title: "데이터 모델링", nickname: "박데이터", type: "재능교환", date: "2024.09.01" },
];

//LectureListPage 함수 컴포넌트 정의
function LectureListContent() {
  const { mainActiveTab, setMainActiveTab } = useLectureTab(); 
  const navigate = useNavigate();
  const [subFilter, setSubFilter] = useState('전체');
  const [filteredLectures, setFilteredLectures] = useState([]);
  const [displayMode, setDisplayMode] = useState('grid');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (mainActiveTab === '강의 조회') {
      let currentLectures = allLectureData;
      if (subFilter !== '전체') {
        currentLectures = currentLectures.filter(lecture => lecture.type === subFilter);
      }
      if (searchQuery.trim() !== '') {
        const lowercasedQuery = searchQuery.toLowerCase();
        currentLectures = currentLectures.filter(lecture =>
          lecture.title.toLowerCase().includes(lowercasedQuery) ||
          lecture.nickname.toLowerCase().includes(lowercasedQuery)
        );
      }
      setFilteredLectures(currentLectures);
    } else if (mainActiveTab === '강의 추천') {
      setFilteredLectures([]); 
    } else if (mainActiveTab === '내 강의') {
      setFilteredLectures([]); 
    }
  }, [mainActiveTab, subFilter, searchQuery]);
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleToggleDisplayMode = () => {
    setDisplayMode(prev => prev === 'grid' ? 'list' : 'grid');
  };
  const handleToggleSearchBar = () => {
    setShowSearchBar(prev => !prev);
     setSearchQuery('');
  };
  const handleFilterClick = () => {
    navigate('/lectures/search/filter'); // 필터 설정 페이지로 이동
  };
  const handleFormatFilterClick=()=>{
    navigate('/lectures/search/filter/format');
  };
  const handleRegionFilterClick=()=>{
    navigate('/lectures/search/filter/location');
  };
  const handleDateFilterClick=()=>{
    navigate('/lectures/search/filter/date');
  };
  const handleRecentFilterClick=()=>{
    navigate('/lectures/search/filter/sort');
  };
  return (
    <LectureListContainer>
      {mainActiveTab === '강의 조회' && (
        <>
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
              <SortKeywordIcon >
                <img src={SortKeywordIconURL}style={{ width: '40%', height: '40%' }}/>
              </SortKeywordIcon>
            </FilterBarItem>
            <FilterBarItem onClick={handleFilterClick}>
              <SortFilterIcon>
                필터
                <img src={SortFilterIconURL}style={{ width: '30%', height: '30%' }}/>
              </SortFilterIcon>
            </FilterBarItem>
            <FilterBarItem > 
              <SortTypeIcon onClick={handleFormatFilterClick}> 
                강의 형태
                <img src={IconDownURL} style={{margin:'3px'}}/>
              </SortTypeIcon>
            </FilterBarItem>
            <FilterBarItem >
              <SortRegionIcon onClick={handleRegionFilterClick}>
                지역
                <img src={IconDownURL} style={{margin:'3px'}}/>
              </SortRegionIcon>
            </FilterBarItem>
            <FilterBarItem >
              <SortDateIcon onClick={handleDateFilterClick}>
                기간
                <img src={IconDownURL} style={{margin:'3px'}}/>
              </SortDateIcon>
            </FilterBarItem>
             <FilterBarItem >
              <SortRecentIcon onClick={handleRecentFilterClick} >
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
export default LectureListContent;