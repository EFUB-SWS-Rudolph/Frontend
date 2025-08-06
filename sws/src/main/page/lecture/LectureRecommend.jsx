// src/main/pages/LectureRecommendPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled , { css } from 'styled-components';
import { getRecommendedLectures } from '../../../api/course';
import { useFilter } from '../../../common/contexts/FilterContext';

import LectureCard from '../../../common/components/LectureCard';

import SortGridIconURL from '../../../common/assets/icons/FilterIcon_SortGrid.svg';
import SortListIconURL from '../../../common/assets/icons/FilterIcon_SortList.svg';
import SortKeywordIconURL from '../../../common/assets/icons/FilterIcon_SortKeyword.svg';
import SortFilterIconURL from '../../../common/assets/icons/FilterIcon_SortFilter.svg';
import IconDownURL from '../../../common/assets/icons/icon_down.svg';
import IconCheckURL from '../../../common/assets/icons/icon_check.svg';

const RecommendPageContainer = styled.div`
  width: 100%;
  height: auto;
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
  border-color:transparent;
  outline:none;
  font-family: "Pretendard Variable";
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.01031rem;
  &::placeholder { /
    color:  var(--Black, #222222); 
    opacity: 1; 
  }
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
  min-width: fit-content; 
  height: 2.25rem; 
  font-family: Pretendard Variable;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
  flex-shrink: 0;
  font-weight: 500;
  gap: 0.25rem;
  padding: 0 0.75rem; 
  transition: background 0.2s ease, color 0.2s ease; 
`;

const FilterBarItem = styled.div`
   min-width: fit-content;
  border-radius: 0.5rem;
  background: transparent; /* 배경색은 이제 내부 아이콘이 가집니다 */
  display: flex;
  align-items: center;
  color: #222; /* 글자색은 이제 내부 아이콘이 가집니다 */
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0; /* 내부 아이콘에 패딩이 있으므로 여기는 0 */
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

const SortListIcon = styled(FilterIconBase)`
  width: 2.25rem;
  height: 2.25rem;
  background: ${props => props.$isActive ? 'var(--primary-color-light, #E0FCEF)' : 'var(--Gray-100, #F5F5F5)'};
  & > img { width: 100%; height: 100%; }
`;
const SortKeywordIcon = styled(FilterIconBase)`
  width: 2.25rem; /* 🔴 이 아이콘도 고정 너비일 가능성이 높아 일단 유지 */
  height: 2.25rem;
  background: ${props => props.$isActive ? 'var(--primary-color-light, #E0FCEF)' : 'var(--Gray-100, #F5F5F5)'};
  color: ${props => props.$isActive ? 'var(--primary-color, #00664F)' : 'var(--Black, #222)'};
  & > img { width: 100%; height: 100%; }
`;
const SortFilterIcon = styled(FilterIconBase)`
  /* width: 4.1875rem; 🔴 width 제거 */
  height: 2.25rem;
  background: ${props => props.$isActive ? 'var(--primary-color-light, #E0FCEF)' : 'var(--Gray-100, #F5F5F5)'};
  color: ${props => props.$isActive ? 'var(--primary-color, #00664F)' : 'var(--Black, #222)'};
`;
const SortRecentIcon = styled(FilterIconBase)`
  height: 2.25rem;
  background: ${props => props.$isActive ? 'var(--primary-color-light, #E0FCEF)' : 'var(--Gray-100, #F5F5F5)'};
  color: ${props => props.$isActive ? 'var(--primary-color, #00664F)' : 'var(--Black, #222)'};
`;
const GridDisplayWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); /* <- .ePDKNU 내용 복사 */
  gap: 1rem;
  justify-content: center;
`;

const ListDisplayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* <- .LectureCardsGrid의 'list' 스타일 복사 */
`;

// 강의 목록 아이템 (리스트 정렬) 관련 styled-components
const LectureListItem = ({ lecture }) => {
  return (
    <StyledLectureListItem>
      <LectureListItemImage src={lecture.thumbnailUrl} alt={lecture.title} />
      <LectureListItemInfo>
        <LectureListItemInstructor>{lecture.instructor}</LectureListItemInstructor>
        <LectureListItemTitle>{lecture.title}</LectureListItemTitle>
        <LectureListItemDate>{lecture.period.start} ~ {lecture.period.end}</LectureListItemDate>
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
// LectureRecommendPage 함수 컴포넌트 정의
export default function LectureRecommendPage() {
  const navigate = useNavigate();

 const { recommendFilterParams, updateRecommendFilter, displayMode, setDisplayMode } = useFilter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [lectures, setLectures] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDisplayValueForFilterBar = (filterName) => {
    let result='';
   switch (filterName) {
      case '정렬 기준':
       switch (recommendFilterParams.sort) {
          case 'latest': result = '최신 순'; break;
          case 'popular': result = '인기 순'; break;
          default: result = '정렬 기준'; break;
        }
        break; 
      default: result = '전체'; break;
    }
    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setLectures([]);

      let params = { ...recommendFilterParams };
      delete params.status; 

      if (searchQuery.trim() !== '') {
        params.keyword = searchQuery.trim();
      }

      try {
        const response = await getRecommendedLectures(params); 
        if (response.isSuccess) {
          setLectures(response.payload?.courses || []); 
        } else {
          setError(new Error(response.message || "추천 강의 목록을 불러오지 못했습니다."));
        }
      } catch (err) {
        console.error(`[추천 강의] 목록 로드 중 오류 발생:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [recommendFilterParams, searchQuery]);

  const handleSearchInputChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery); // 로컬 상태 업데이트
     updateRecommendFilter('keyword', newSearchQuery); // Context의 keyword도 업데이트
  };
  // 🔴 이벤트 핸들러: displayMode 토글은 Context의 setDisplayMode 사용
  const handleToggleDisplayMode = () => {
    setDisplayMode(prevMode => prevMode === 'grid' ? 'list' : 'grid');
  };
  const handleToggleSearchBar = () => {
    setShowSearchBar(prev => !prev);
    const newSearchQuery = '';
    setSearchQuery(newSearchQuery);
    updateRecommendFilter('keyword', newSearchQuery); 
  };
  const handleFilterClick = () => {
    navigate('/lectures/recommend/filter'); 
  };
  const handleSortFilterClick=()=>{
    navigate('/lectures/recommend/filter/sort');
  };
  return (
    <RecommendPageContainer>
                <LectureFilterBar>
              <FilterBarItem onClick={handleToggleDisplayMode}>
                  <SortListIcon $isActive={displayMode === 'list'}> 
                      <img
                        src={displayMode === 'grid' ? SortListIconURL : SortGridIconURL}
                        alt={displayMode === 'grid' ? "목록 정렬" : "갤러리 정렬"}
                        style={{ width: '1rem', height: '1rem' }}
                      />
                  </SortListIcon>
              </FilterBarItem>
              <FilterBarItem onClick={handleToggleSearchBar}>
                <SortKeywordIcon $isActive={showSearchBar}> 
                  <img src={SortKeywordIconURL}style={{ width: '1rem', height: '1rem' }}/>
                </SortKeywordIcon>
              </FilterBarItem>
              <FilterBarItem onClick={handleFilterClick}>
                <SortFilterIcon $isActive={
                    recommendFilterParams.courseType !== null ||
                    recommendFilterParams.courseCity !== null ||
                    recommendFilterParams.courseStartDate !== null ||
                    recommendFilterParams.courseEndDate !== null ||
                    recommendFilterParams.sort !== 'latest' ||
                    (recommendFilterParams.keyword && recommendFilterParams.keyword.trim() !== '') 
                }>
                  필터
                  <img src={SortFilterIconURL} style={{ width: '0.8rem', height: '0.8rem', marginLeft: '0.25rem' }}/>
                </SortFilterIcon>
              </FilterBarItem>
                <FilterBarItem onClick={handleSortFilterClick}>
            <SortRecentIcon $isActive={recommendFilterParams.sort !== 'latest'}>
              {getDisplayValueForFilterBar('정렬 기준')}
              {recommendFilterParams.sort !== 'latest' && <img src={IconCheckURL} alt="선택됨" style={{ width: '0.8rem', height: '0.8rem', marginLeft: '0.25rem'}} />}
              {recommendFilterParams.sort === 'latest' && <img src={IconDownURL} style={{ width: '0.8rem', height: '0.8rem', marginLeft: '0.25rem'}}/>}
            </SortRecentIcon>
          </FilterBarItem>
                </LectureFilterBar>

      {showSearchBar && (
          <SearchFilterSection>
            <SearchBar placeholder="강의명 또는 키워드 입력" value={searchQuery} onChange={handleSearchInputChange} />
            <FilterButton>
              <FilterButtonIcon>
                <img src={SortKeywordIconURL} />
              </FilterButtonIcon>
            </FilterButton>
          </SearchFilterSection>
        )}
      {loading && <div>추천 강의 불러오는 중...</div>}
        {error && <div>오류 발생: {error.message}</div>}    
        {!loading && !error && lectures.length === 0 ? (  
          <NoResultsMessage>추천 강의가 없습니다.</NoResultsMessage> 
        ) : (
        <LectureListDisplayArea>
                      {displayMode === 'grid' ? ( 
              <GridDisplayWrapper> 
                {lectures.map(lecture => (
                  <LectureCard 
                    key={lecture.courseId}
                      lecture={ { 
                        id: lecture.courseId || lecture.id,
                        courseId: lecture.courseId,
                        title: lecture.courseTitle || lecture.title,
                        instructor: lecture.teacherNickname,
                        location: lecture.courseCity,
                        period: { start: lecture.courseStartDate, end: lecture.courseEndDate },
                        thumbnailUrl: lecture.thumbnailUrl,
                        category: lecture.courseCategory,
                        bookmarkCount: lecture.bookmarkCount,
                      } }
                    />
                    ))}
              </GridDisplayWrapper>
              ) : (
                 <ListDisplayWrapper> 
                {lectures.map(lecture => (
                  <LectureListItem 
                    key={lecture.courseId}
                      lecture={ {
                        id: lecture.courseId || lecture.id,
                        courseId: lecture.courseId,
                        title: lecture.courseTitle || lecture.title,
                        instructor: lecture.teacherNickname,
                        location: lecture.courseCity,
                        period: { start: lecture.courseStartDate, end: lecture.courseEndDate },
                        thumbnailUrl: lecture.thumbnailUrl,
                        category: lecture.courseCategory,
                        bookmarkCount: lecture.bookmarkCount,
                      } }
                    />
                 ))}
              </ListDisplayWrapper>
            )}
          </LectureListDisplayArea>
        )}
    </RecommendPageContainer>
  );
}
