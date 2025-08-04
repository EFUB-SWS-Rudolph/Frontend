// src/main/pages/LectureList.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLectureTab } from '../../../common/styles/Layout'; 
import { useNavigate } from 'react-router-dom';
import { FilterProvider, useFilter } from '../../../common/contexts/FilterContext';
import { getLectureList, getRecommendedLectures, getMyCourses } from '../../../api/course';

import SortGridIconURL from '../../../common/assets/icons/FilterIcon_SortGrid.svg';
import SortListIconURL from '../../../common/assets/icons/FilterIcon_SortList.svg';
import SortKeywordIconURL from '../../../common/assets/icons/FilterIcon_SortKeyword.svg';
import SortFilterIconURL from '../../../common/assets/icons/FilterIcon_SortFilter.svg';
import IconDownURL from '../../../common/assets/icons/icon_down.svg';
import IconBackURL from '../../../common/assets/icons/icon_back.svg'; 
import LectureCard from '../../../common/components/LectureCard';
//강의 이미지 예시 (임시)
import LectureImageExample from '../../../common/assets/images/weave_img_ex1.svg';
const LectureListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem; 
  padding:1rem;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); 
  gap: 1rem; 
  justify-content: center;
  ${props => props.$displayMode === 'list' && css`
    display: flex; 
    flex-direction: column; 
    gap: 0.5rem;
    grid-template-columns: unset; 
    justify-content: unset; 
    & > * {
      width: 100%; 
    }
`}
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
const CourseListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); // 반응형 그리드 예시
  gap: 1rem;
  justify-content: center; // 중앙 정렬
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

//LectureListPage 함수 컴포넌트 정의
function LectureListContent() {
  const { mainActiveTab, setMainActiveTab } = useLectureTab(); 
  const navigate = useNavigate();
  const [subFilter, setSubFilter] = useState('전체');
  const [displayMode, setDisplayMode] = useState('grid');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiParams, setApiParams] = useState({
    page: 0,
    size: 20,
    sort: 'latest', 
    courseType: undefined, 
    keyword: undefined, 
  });
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      setError(null); 
      setLectures([]);
      let apiCallFunction; 
      let params = {}; 
      if (mainActiveTab === '강의 조회') {
        apiCallFunction = getLectureList;
        if (subFilter !== '전체') {
          params.courseType = subFilter;
        }
        if (searchQuery.trim() !== '') {
          params.keyword = searchQuery.trim();
        }
        params.sort = 'latest'; 
        params.page = 0; 
        params.size = 20; 
      } else if (mainActiveTab === '강의 추천') {
        apiCallFunction = getRecommendedLectures;
        params.size = 20; 
      } else if (mainActiveTab === '내 강의') {
        apiCallFunction = getMyCourses;
        params = {}; 

      } else {
        setLoading(false);
        return;
      }

      try {
        const response = await apiCallFunction(params); 
        if (response.isSuccess) {
          if (mainActiveTab === '내 강의') {
            const combinedMyCourses = [
              ...(response.payload?.teachingCourses || []),
              ...(response.payload?.enrolledCourses || [])
            ];
            setLectures(combinedMyCourses);
          } else {
            setLectures(response.payload?.courses || []);
          }
        } else {
          setError(new Error(response.message || "강의 목록을 불러오지 못했습니다."));
        }

      } catch (err) {
        console.error(`[${mainActiveTab}] 강의 목록 로드 중 오류 발생:`, err);
        setError(err); 
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 
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
    navigate('/lectures/search/filter'); 
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
          {loading && <div>강의 목록 불러오는 중...</div>} 
          {error && <div>오류 발생: {error.message}</div>}    
          {!loading && !error && lectures.length === 0 ? (  
            <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage> 
          ) : (
      <LectureListDisplayArea>
              <LectureCardsGrid $displayMode={displayMode}>
                {lectures.map(lecture => ( 
                  displayMode === 'grid' ? (
                    <LectureCard
                      key={lecture.courseId || lecture.id}
                      lecture={ { 
                        id: lecture.courseId || lecture.id,
                        title: lecture.courseTitle || lecture.title,
                        instructor: lecture.teacherNickname,
                        location: lecture.courseCity,
                        period: { start: lecture.courseStartDate, end: lecture.courseEndDate },
                        thumbnailUrl: lecture.thumbnailUrl,
                        category: lecture.courseCategory,
                        bookmarkCount: lecture.bookmarkCount,
                      } }
                    />
              ) : (
                <LectureListItem
                      key={lecture.courseId || lecture.id}
                      lecture={ {
                        id: lecture.courseId || lecture.id,
                        title: lecture.courseTitle || lecture.title,
                        instructor: lecture.teacherNickname,
                        location: lecture.courseCity,
                        period: { start: lecture.courseStartDate, end: lecture.courseEndDate },
                        thumbnailUrl: lecture.thumbnailUrl,
                        category: lecture.courseCategory,
                        bookmarkCount: lecture.bookmarkCount,
                      } }
                    />
                  )
                ))}
              </LectureCardsGrid>
            </LectureListDisplayArea>
          
              )}</>)}
      
       {mainActiveTab === '강의 조회' && (
        <>
          {showSearchBar && (
            <SearchFilterSection>
              <SearchBar placeholder="강의명 또는 키워드 입력" value={searchQuery} onChange={handleSearchInputChange} />
            </SearchFilterSection>
          )}
        </>
      )}

      {loading && <div>강의 목록 불러오는 중...</div>}
      {error && <div>오류 발생: {error.message}</div>}
      {!loading && !error && lectures.length === 0 ? (
        <div>{mainActiveTab} 탭에 표시할 강의가 없습니다.</div>
      ) : (
        <CourseListGrid>
          {lectures.map(lecture => (
            <LectureCard
              key={lecture.courseId || lecture.id}
              lecture={{
                id: lecture.courseId || lecture.id,
                title: lecture.courseTitle || lecture.title,
                instructor: lecture.teacherNickname,
                location: lecture.courseCity,
                period: { start: lecture.courseStartDate, end: lecture.courseEndDate }, 
                thumbnailUrl: lecture.thumbnailUrl,
                category: lecture.courseCategory,
                bookmarkCount: lecture.bookmarkCount,
              }}
            />
          ))}
        </CourseListGrid>
      )}
    </LectureListContainer>
  )};
export default LectureListContent; 