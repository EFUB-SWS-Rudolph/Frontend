// src/main/page/lecture/LecturMy.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled , { css } from 'styled-components';
import { getMyCourses } from '../../../api/course'; 
import { useFilter } from '../../../common/contexts/FilterContext';

import SortGridIconURL from '../../../common/assets/icons/FilterIcon_SortGrid.svg';
import SortListIconURL from '../../../common/assets/icons/FilterIcon_SortList.svg';
import SortKeywordIconURL from '../../../common/assets/icons/FilterIcon_SortKeyword.svg';
import SortFilterIconURL from '../../../common/assets/icons/FilterIcon_SortFilter.svg';
import IconDownURL from '../../../common/assets/icons/icon_down.svg';
import IconCheckURL from '../../../common/assets/icons/icon_check.svg'
import LectureCard from '../../../common/components/LectureCard';

const MyLecturePageContainer= styled.div`
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
//  MyLecturePage 함수 컴포넌트 정의
export default function MyLecturePage() {
  const navigate = useNavigate();
  const [originalLectures, setOriginalLectures] = useState([]); 
  const [lectures, setLectures] = useState([]); 
  const { generalFilterParams, updateGeneralFilter, displayMode, setDisplayMode } = useFilter();
   console.log("📍 MyLecturePage: generalFilterParams current value", JSON.parse(JSON.stringify(generalFilterParams)));
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDisplayValueForFilterBar = (filterName) => {
    switch (filterName) {
      case '상태':
        switch (generalFilterParams.status) { 
          case 'inProgress': return '수강 중';
          case 'completed': return '수강 종료';
          case 'all': return '상태';
          case null: return '상태';
          default: return '상태';
        }
      default: return '전체';
    }
  };

useEffect(() => {
    const fetchMyCoursesData = async () => {
      setLoading(true);
      setError(null);
      setLectures([]); // 로딩 중에는 빈 배열

      let params = { ...generalFilterParams };
      delete params.status; 

      if (searchQuery.trim() !== '') {
        params.keyword = searchQuery.trim();
      }

      try {
        const response = await getMyCourses(params);
        console.log("API 응답 (getMyCourses):", response);
        if (response.isSuccess) {
          const combinedMyCourses = [
            ...(response.payload?.teachingCourses || []),
            ...(response.payload?.enrolledCourses || [])
          ];
          console.log("처리된 내 강의 데이터 (MyLecturePage or Main):", combinedMyCourses);
          setOriginalLectures(combinedMyCourses); // 원본 저장
        } else {
          setError(new Error(response.message || "내 강의 목록을 불러오지 못했습니다."));
        }
      } catch (err) {
        console.error("내 강의 목록 로드 중 오류 발생:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCoursesData();
  }, [generalFilterParams, searchQuery]); 
  useEffect(() => {
    let finalFilteredLectures = originalLectures; 

    // 1. 검색어 필터링
    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase();
      finalFilteredLectures = finalFilteredLectures.filter(lecture =>
        (lecture.courseTitle && lecture.courseTitle.toLowerCase().includes(lowercasedQuery)) ||
        (lecture.teacherNickname && lecture.teacherNickname.toLowerCase().includes(lowercasedQuery))
      );
    }

    // 2. 강의 상태 필터링 (generalFilterParams.status 활용)
    if (generalFilterParams.status === 'inProgress') {
      finalFilteredLectures = finalFilteredLectures.filter(lecture => {
        const now = new Date();
        const startDate = new Date(lecture.courseStartDate);
        const endDate = new Date(lecture.courseEndDate);
        return now >= startDate && now <= endDate;
      });
    } else if (generalFilterParams.status === 'completed') {
      finalFilteredLectures = finalFilteredLectures.filter(lecture => {
        const now = new Date();
        const endDate = new Date(lecture.courseEndDate);
        return now > endDate;
      });
    }
    // else if (generalFilterParams.status === 'all' 또는 null) 일 때는 추가 필터링 없음

    setLectures(finalFilteredLectures); // 렌더링할 최종 강의 목록 업데이트
  }, [searchQuery, generalFilterParams, originalLectures]);

  const handleToggleSearchBar = () => {
    setShowSearchBar(prev => !prev);
    // 검색바 닫을 때 검색어 초기화 (FilterContext의 keyword도 초기화)
    const newSearchQuery = '';
    setSearchQuery(newSearchQuery);
    updateGeneralFilter('keyword', newSearchQuery);
  };
 const handleSearchInputChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    updateGeneralFilter('keyword', newSearchQuery);
  };
  const handleToggleDisplayMode = () => {
    setDisplayMode(prevMode => prevMode === 'grid' ? 'list' : 'grid');
  };
  const handleFilterClick = () => {
    navigate('/lectures/my/filter'); 
  }
   const handleStatusFilterClick=()=>{
    navigate('/lectures/my/filter/status'); 
  };;

  return (
    <MyLecturePageContainer>
      {/* 강의 필터 바 [강의 필터 바] */}
      <LectureFilterBar>
          {/* 보기 방식 토글 */}
          <FilterBarItem onClick={handleToggleDisplayMode}>
            <SortListIcon $isActive={displayMode === 'list'}>
              <img
                src={displayMode === 'grid' ? SortListIconURL : SortGridIconURL}
                alt={displayMode === 'grid' ? "목록 정렬" : "갤러리 정렬"}
                style={{ width: '1rem', height: '1rem' }}
              />
            </SortListIcon>
          </FilterBarItem>
          {/* 검색바 토글 */}
          <FilterBarItem onClick={handleToggleSearchBar}>
            <SortKeywordIcon $isActive={showSearchBar}>
              <img src={SortKeywordIconURL} style={{ width: '1rem', height: '1rem' }} />
            </SortKeywordIcon>
          </FilterBarItem>
          {/* 필터 메인 페이지로 이동 */}
          <FilterBarItem onClick={handleFilterClick}>
            <SortFilterIcon $isActive={
                (generalFilterParams.status !== 'all' && generalFilterParams.status !== null)
            }>
              필터
              <img src={SortFilterIconURL} style={{ width: '0.8rem', height: '0.8rem', marginLeft: '0.25rem' }} />
            </SortFilterIcon>
          </FilterBarItem>
          
        <FilterBarItem onClick={handleStatusFilterClick}>
            <SortTypeIcon $isActive={generalFilterParams.status !== 'all' && generalFilterParams.status !== null}>
              {getDisplayValueForFilterBar('상태')}
              {(generalFilterParams.status !== 'all' && generalFilterParams.status !== null) && <img src={IconCheckURL} alt="선택됨" style={{ width: '0.8rem', height: '0.8rem', marginLeft: '0.25rem'}} />}
              {(generalFilterParams.status === 'all' || generalFilterParams.status === null) && <img src={IconDownURL} style={{ width: '0.8rem', height: '0.8rem', marginLeft: '0.25rem'}}/>}
            </SortTypeIcon>
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
        {loading && <div>내 강의 목록 불러오는 중...</div>}
        {error && <div>오류 발생: {error.message}</div>}
        {!loading && !error && lectures.length === 0 ? (
          <NoResultsMessage>현재 표시할 내 강의가 없습니다.</NoResultsMessage>
        ) : (
          <LectureListDisplayArea>
<LectureCardsGrid $displayMode={displayMode}>
            {lectures.map(lecture => { 
              const transformedLecture = {
                courseId: lecture.courseId,
                title: lecture.courseTitle, 
                instructor: lecture.teacherNickname, 
                period: {
                  start: lecture.courseStartDate,
                  end: lecture.courseEndDate,
                },
                thumbnailUrl: lecture.thumbnailUrl, 
              };
              console.log("MyLecturePage.jsx: LectureCard에 넘겨줄 transformedLecture:", transformedLecture);
              return displayMode === 'grid' ? (
                <LectureCard
                  key={transformedLecture.courseId} 
                  lecture={transformedLecture}    
                />
              ) : (
                <LectureListItem
                  key={transformedLecture.courseId}
                  lecture={transformedLecture}
                />
              );
            })}
          </LectureCardsGrid>        </LectureListDisplayArea>
      )}
    </MyLecturePageContainer>
  );
}