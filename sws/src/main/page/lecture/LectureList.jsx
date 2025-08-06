// src/main/pages/LectureList.jsx
import React, { useState, useEffect } from 'react';
import styled , { css } from 'styled-components';
import { useLectureTab } from '../../../common/styles/Layout'; 
import { useNavigate } from 'react-router-dom';
import { getLectureList, getRecommendedLectures, getMyCourses } from '../../../api/course';
import { useFilter } from '../../../common/contexts/FilterContext';

import SortGridIconURL from '../../../common/assets/icons/FilterIcon_SortGrid.svg';
import SortListIconURL from '../../../common/assets/icons/FilterIcon_SortList.svg';
import SortKeywordIconURL from '../../../common/assets/icons/FilterIcon_SortKeyword.svg';
import SortFilterIconURL from '../../../common/assets/icons/FilterIcon_SortFilter.svg';
import IconDownURL from '../../../common/assets/icons/icon_down.svg';
import IconCheckURL from '../../../common/assets/icons/icon_check.svg';
import LectureCard from '../../../common/components/LectureCard';
const LectureListContainer = styled.div`
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
  width: 2.25rem; 
  height: 2.25rem;
  background: ${props => props.$isActive ? 'var(--primary-color-light, #E0FCEF)' : 'var(--Gray-100, #F5F5F5)'};
  color: ${props => props.$isActive ? 'var(--primary-color, #00664F)' : 'var(--Black, #222)'};
  & > img { width: 100%; height: 100%; }
`;
const SortFilterIcon = styled(FilterIconBase)`
  height: 2.25rem;
  background: ${props => props.$isActive ? 'var(--primary-color-light, #E0FCEF)' : 'var(--Gray-100, #F5F5F5)'};
  color: ${props => props.$isActive ? 'var(--primary-color, #00664F)' : 'var(--Black, #222)'};
`;
const SortTypeIcon = styled(FilterIconBase)`
  height: 2.25rem;
  background: ${props => props.$isActive ? 'var(--primary-color-light, #E0FCEF)' : 'var(--Gray-100, #F5F5F5)'};
  color: ${props => props.$isActive ? 'var(--primary-color, #00664F)' : 'var(--Black, #222)'};
`;
const SortRegionIcon = styled(FilterIconBase)`
  height: 2.25rem;
  background: ${props => props.$isActive ? 'var(--primary-color-light, #E0FCEF)' : 'var(--Gray-100, #F5F5F5)'};
  color: ${props => props.$isActive ? 'var(--primary-color, #00664F)' : 'var(--Black, #222)'};
`;
const SortDateIcon = styled(FilterIconBase)`
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

//LectureListPage 함수 컴포넌트 정의
function LectureListContent() {console.log("✅ LectureListContent 컴포넌트 렌더링 시작!");
  const { mainActiveTab, setMainActiveTab } = useLectureTab(); 
  const navigate = useNavigate();
  const { generalFilterParams, updateGeneralFilter, displayMode, setDisplayMode } = useFilter(); 
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getDisplayValueForFilterBar = (filterName) => {
    console.log(`[시작] getDisplayValueForFilterBar 호출: ${filterName}`);
    let result;
    switch (filterName) {
      case '강의 형태':
        switch (generalFilterParams.courseType) { 
          case 'DONATION': return '재능 기부';
          case 'EXCHANGE': return '재능 교환';
          case 'TUTOR': return '과외';
          case 'COFFEECHAT': return '커피챗';
          case null: return '강의 형태'; 
          default: return '강의 형태';
        }
      case '지역':
        switch (generalFilterParams.courseCity) {
          case 'SEOUL': return '서울특별시';
          case 'BUSAN': return '부산광역시';
          case 'DAEJEON': return '대전광역시';
          case 'ULSAN': return '울산광역시';
          case 'INCHEON': return '인천광역시';
          case 'GWANGJU': return '광주광역시';
          case null: return '지역';
          default: return '지역';
        }
      case '기간':
      if (generalFilterParams.courseStartDate && generalFilterParams.courseEndDate) {
        return `${generalFilterParams.courseStartDate.substring(5)}~${generalFilterParams.courseEndDate.substring(5)}`;
      } else if (generalFilterParams.courseStartDate) {
        return `${generalFilterParams.courseStartDate.substring(5)} 이후`;
      } else if (generalFilterParams.courseEndDate) {
        return `${generalFilterParams.courseEndDate.substring(5)} 이전`;
      }
      return '기간';
      case '정렬 기준':
        switch (generalFilterParams.sort) {
          case 'latest': return '최신 순';
          case 'popular': return '인기 순';
          default: return '정렬 기준';
        }
      case '상태': 
        if (mainActiveTab === '내 강의') {
          switch (generalFilterParams.status) {
            case 'inProgress': return '수강 중';
            case 'completed': return '수강 종료';
            case 'all': return '상태';
            case null: return '상태';
            default: return '상태';
          }
        }
        return '전체'; 
      default: return '전체';
    }
  };
 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setLectures([]);

      let apiCallFunction;
      let params = { ...generalFilterParams };

      if (params.status) { 
          delete params.status; 
      }

      if (searchQuery.trim() !== '') {
        params.keyword = searchQuery.trim();
      }

      if (mainActiveTab === '강의 조회') {
        apiCallFunction = getLectureList;
      } else if (mainActiveTab === '강의 추천') {
        apiCallFunction = getRecommendedLectures;
      } else if (mainActiveTab === '내 강의') {
        apiCallFunction = getMyCourses;
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
              let filteredByStatusAndSearch = combinedMyCourses;

              if (searchQuery.trim() !== '') {
                const lowercasedQuery = searchQuery.toLowerCase();
                filteredByStatusAndSearch = filteredByStatusAndSearch.filter(lecture =>
                  (lecture.courseTitle && lecture.courseTitle.toLowerCase().includes(lowercasedQuery)) ||
                  (lecture.teacherNickname && lecture.teacherNickname.toLowerCase().includes(lowercasedQuery))
                );
              }

              if (generalFilterParams.status === 'inProgress') {
                  filteredByStatusAndSearch = filteredByStatusAndSearch.filter(lecture => {
                      const now = new Date();
                      const startDate = new Date(lecture.courseStartDate);
                      const endDate = new Date(lecture.courseEndDate);
                      return now >= startDate && now <= endDate;
                  });
              } else if (generalFilterParams.status === 'completed') {
                  filteredByStatusAndSearch = filteredByStatusAndSearch.filter(lecture => {
                      const now = new Date();
                      const endDate = new Date(lecture.courseEndDate);
                      return now > endDate;
                  });
              }
              setLectures(filteredByStatusAndSearch);
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
  }, [mainActiveTab, generalFilterParams, searchQuery]);

  const handleSearchInputChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery); 
    updateGeneralFilter('keyword', newSearchQuery);
  };
  const handleToggleDisplayMode = () => {
    setDisplayMode(prevMode => prevMode === 'grid' ? 'list' : 'grid');
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
  const handleSortFilterClick=()=>{ 
    navigate('/lectures/search/filter/sort');
  };
  return (
    <LectureListContainer>
      {mainActiveTab === '강의 조회' && (
        <>
          <LectureFilterBar>
        <FilterBarItem onClick={handleToggleDisplayMode}>
            <SortListIcon $isActive={displayMode === 'list'}> {/* 🔴 $isActive prop 전달 */}
                <img
                  src={displayMode === 'grid' ? SortListIconURL : SortGridIconURL}
                  alt={displayMode === 'grid' ? "목록 정렬" : "갤러리 정렬"}
                  style={{ width: '1rem', height: '1rem' }}
                />
            </SortListIcon>
        </FilterBarItem>
        <FilterBarItem onClick={handleToggleSearchBar}>
          <SortKeywordIcon $isActive={showSearchBar}> {/* 🔴 $isActive prop 전달 */}
            <img src={SortKeywordIconURL}style={{ width: '1rem', height: '1rem' }}/>
          </SortKeywordIcon>
        </FilterBarItem>
        <FilterBarItem onClick={handleFilterClick}>
          <SortFilterIcon $isActive={ // 🔴 어떤 필터라도 '전체'가 아니면 활성화
              generalFilterParams.courseType !== null ||
              generalFilterParams.courseCity !== null ||
              generalFilterParams.courseStartDate !== null ||
              generalFilterParams.courseEndDate !== null ||
              generalFilterParams.sort !== 'latest' ||
              (generalFilterParams.keyword && generalFilterParams.keyword.trim() !== '') ||
              (generalFilterParams.status && generalFilterParams.status !== 'all')
          }>
            필터
            <img src={SortFilterIconURL} style={{ width: '0.8rem', height: '0.8rem', marginLeft: '0.25rem' }}/>
          </SortFilterIcon>
        </FilterBarItem>
        <FilterBarItem onClick={handleFormatFilterClick}>
          <SortTypeIcon $isActive={generalFilterParams.courseType !== null}>
            {getDisplayValueForFilterBar('강의 형태')}
            {generalFilterParams.courseType !== null && <img src={IconCheckURL} alt="선택됨" style={{width: '0.8rem', height: '0.8rem', marginLeft: '0.25rem'}} />}
            {generalFilterParams.courseType === null && <img src={IconDownURL} style={{width: '0.8rem', height: '0.8rem', marginLeft: '0.25rem'}}/>} {/* 🔴 설정 안 됐을 때 다운 아이콘 */}
          </SortTypeIcon>
        </FilterBarItem>
            <FilterBarItem onClick={handleRegionFilterClick}>
          <SortRegionIcon $isActive={generalFilterParams.courseCity !== null}>
            {getDisplayValueForFilterBar('지역')}
            {generalFilterParams.courseCity !== null && <img src={IconCheckURL} alt="선택됨" style={{width: '0.8rem', height: '0.8rem', marginLeft: '0.25rem'}} />}
            {generalFilterParams.courseCity === null && <img src={IconDownURL} style={{width: '0.8rem', height: '0.8rem', marginLeft: '0.25rem'}}/>}
          </SortRegionIcon>
        </FilterBarItem>
            <FilterBarItem onClick={handleDateFilterClick}>
          <SortDateIcon $isActive={generalFilterParams.courseStartDate !== null || generalFilterParams.courseEndDate !== null}>
            {getDisplayValueForFilterBar('기간')}
            {(generalFilterParams.courseStartDate !== null && generalFilterParams.courseEndDate !== null) && <img src={IconCheckURL} alt="선택됨" style={{width: '0.8rem', height: '0.8rem', marginLeft: '0.25rem'}} />}
            {(generalFilterParams.courseStartDate == null || generalFilterParams.courseEndDate == null) && <img src={IconDownURL} style={{width: '0.8rem', height: '0.8rem', marginLeft: '0.25rem'}}/>}
          </SortDateIcon>
        </FilterBarItem>
             <FilterBarItem onClick={handleSortFilterClick}>
          <SortRecentIcon $isActive={generalFilterParams.sort !== 'latest'}>
            {getDisplayValueForFilterBar('정렬 기준')}
            {generalFilterParams.sort !== 'latest' && <img src={IconCheckURL} alt="선택됨" style={{width: '0.8rem', height: '0.8rem', marginLeft: '0.25rem'}} />}
            {generalFilterParams.sort === 'latest' && <img src={IconDownURL} style={{width: '0.8rem', height: '0.8rem', marginLeft: '0.25rem'}}/>}
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
          </>)}
      
       {mainActiveTab === '강의 조회' && (
        <>
          
        </>
      )}

      
    </LectureListContainer>
  )};
export default LectureListContent; 