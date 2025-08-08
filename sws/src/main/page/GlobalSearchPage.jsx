// src/main/pages/GlobalSearchPage.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { searchAll } from '../../api/search';
// 필요한 SVG 아이콘 URL 임포트
import SearchIconURL from '../../common/assets/icons/icon_search_white.svg';
import DeleteIconURL from '../../common/assets/icons/icon_delete.svg';

import { getLecturesByKeyword, getEwhainsByKeyword } from '../../api/search';
import LectureCard from '../../common/components/LectureCard';
import UserCard from '../../ewhainList/components/memberList/UserCard';
import Header from '../../common/components/Header';
import { useNavigate } from 'react-router-dom';


// styled-components 정의
const GlobalSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 1rem  1rem   1rem
`;
// 상단 검색 바 섹션
const SearchBarSection = styled.div`
  border-radius: 24px;
  background-color: #f5f5f5;
  padding: 0 1rem;
  box-sizing: border-box;
  display: flex;
  width: 17.75rem;
  height: 3.25rem;
  padding: 1rem 1.625rem;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;
// 검색 입력 필드 (SearchBar)
const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  background: transparent;
  outline: none;
  width: 8.8125rem;
  flex-shrink: 0;
  color: #222;
  /* Title/Medium */
  font-family: 'Pretendard Variable';
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  &::placeholder {
    color: #aaaaaa;
  }
`;
// 검색 버튼 아이콘 컨테이너
const SearchButton = styled.button`
  & > img {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    border: 2px;
  }
  border: none;
  cursor: pointer;
  display: flex;
  width: 3rem;
  height: 3rem;
  padding: 0.90625rem 0.875rem 0.84375rem 0.875rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 2.5rem;
  background: var(--Primary, #00664f);
  position: absolute;
  margin-left: 17rem;
`;
// 최근 검색어 섹션 (GlobalSearchPage.jsx)
const RecentSearchFrame = styled.div`
  width: 21.1875rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 0;
`;
// 최근 검색어 타이틀
const RecentSearchTitle = styled.h3`
  align-self: stretch;
  color: #000;
  /* Display/Small */
  font-family: 'Pretendard Variable';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0;
`;
// 최근 검색어 아이템 컨테이너
const RecentSearchItemsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0.5rem 0.5625rem;
  align-self: stretch;
  flex-wrap: wrap;
`;
// RecentSearchItem 내부 텍스트 스타일 (클릭 가능 영역)
const RecentSearchText = styled.span`
  cursor: pointer;
  white-space: nowrap;
  color: #000;

  /* Body/Medium */
  font-family: 'Pretendard Variable';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.3125rem */
  gap: 0.5rem;
`;
const RecentSearchItemDeleteButton = styled.button`
  width: 0.53125rem;
  height: 0.49331rem;
  border: none;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  & > img {
    width: 0.53125rem;
    height: 0.49331rem;
    object-fit: contain;
  }
`;
// 최근 검색어 개별 아이템
const RecentSearchItem = styled.div`
  display: flex;
  min-width: 5rem;
  width: flex;
  height: 2.5rem;
  padding: 1rem 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid #bbb;
  background: #fff;
  gap: 0.5rem;
`;
const SearchResultsDisplayArea = styled.div`
  width: 100%;
  flex-grow: 1; /* 남은 공간을 차지하도록 */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 0.5rem;
`;

const SectionTitle = styled.h2`
  width: 100%;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  text-align: left;
`;

const ResultsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); /* 강의 카드 그리드 예시 */
  gap: 1rem;
  justify-content: center;
`;

const NoResultsMessage = styled.div`
  width: 100%;
  text-align: center;
  color: #888;
  padding: 3rem;
  font-size: 1.1rem;
`;

const NoTypeResults = styled.div`
  width: 100%;
  text-align: center;
  color: #aaa;
  margin-bottom: 1rem;
`;
export default function GlobalSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    lectures: [],
    users: [],
  });
  const [recentSearches, setRecentSearches] = useState([
    '강의',
    '이화인',
    '인기 강의',
    '웹 개발',
    '프로그래밍',
    'UX/UI',
    '데이터',
    '인공지능',
    '머신러닝',
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const performSearch = async (keyword) => {
    console.log('🟢 performSearch 호출됨. 검색 키워드:', keyword);
    if (keyword.trim() === '') {
      console.log('🟠 performSearch: 검색 키워드 공백. 결과 초기화.');
      setSearchResults({ lectures: [], users: [] });
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setSearchResults({ lectures: [], users: [] });
    setHasSearched(true);

    try {
      const response = await searchAll(keyword.trim()); // 🔴 searchAll API 호출

      if (response.isSuccess) {
        setSearchResults({
          lectures: response.payload?.courses || [],
          users: [
            ...(response.payload?.membersByNickname || []),
            ...(response.payload?.membersByDept || [])
          ],
        });
        console.log('🟢 searchAll: 검색 결과 상태 업데이트 성공.', response.payload);
      } else {
        setError(new Error(response.message || '검색 결과가 없습니다.'));
        setSearchResults({ lectures: [], users: [] });
      }
    } catch (err) {
      console.error('🔴 searchAll: API 호출 중 오류 발생:', err);
      setError(new Error(`검색 중 오류가 발생했습니다: ${err.message}`));
      setSearchResults({ lectures: [], users: [] });
    } finally {
      setLoading(false);
    }
  };


  const handleSearchSubmit = () => {
    console.log('🟢 handleSearchSubmit 호출됨. 현재 검색 키워드:', searchQuery);
    if (searchQuery.trim() === '') {
      setSearchResults({ lectures: [], users: [] });
      setHasSearched(false);
      console.log('🟠 handleSearchSubmit: 검색 키워드 공백. 검색 실행하지 않음.');
      return;
    }
    performSearch(searchQuery.trim());
    if (searchQuery.trim() !== '') {
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    console.log('🟢 handleSearchInputChange: 입력된 키워드:', event.target.value);
  };

  const handleRecentSearchClick = (keyword) => {
    setSearchQuery(keyword);
    performSearch(keyword);
  };

  const handleDeleteRecentSearch = (keywordToDelete) => {
    setRecentSearches((prev) => prev.filter((keyword) => keyword !== keywordToDelete));
  };

  const handleKeyDown = (event) => {
    console.log('🟢 handleKeyDown: 눌린 키:', event.key);
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

const hasAnyResults = searchResults.lectures.length > 0 || searchResults.users.length > 0;
  return (
    <GlobalSearchContainer>
      
      <SearchBarSection>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
        />
        <SearchButton onClick={handleSearchSubmit}>
          <img src={SearchIconURL} alt="검색" />
        </SearchButton>
      </SearchBarSection>
      {!hasSearched || (hasSearched && !loading && !error && !hasAnyResults) ? (
        <RecentSearchFrame>
          <RecentSearchTitle>최근 검색어</RecentSearchTitle>
          <RecentSearchItemsContainer>
            {recentSearches.map((keyword, index) => (
              <RecentSearchItem key={index}>
                <RecentSearchText onClick={() => handleRecentSearchClick(keyword)}>
                  {keyword}
                </RecentSearchText>
                <RecentSearchItemDeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteRecentSearch(keyword);
                  }}
                >
                  <img src={DeleteIconURL} alt="삭제" />
                </RecentSearchItemDeleteButton>
              </RecentSearchItem>
            ))}
          </RecentSearchItemsContainer>
        </RecentSearchFrame>
      ) : null}

      <SearchResultsDisplayArea>
        {!loading && searchResults.lectures.length > 0 && (
          <>
            <SectionTitle>강의 검색 결과 ({searchResults.lectures.length}개)</SectionTitle>
            <ResultsGrid>
              {searchResults.lectures.map((lecture) => (
                <LectureCard key={lecture.courseId} lecture={lecture} /> 
              ))}
            </ResultsGrid>
          </>
        )}
        {!loading && hasSearched && searchResults.lectures.length === 0 && (
          <NoTypeResults>강의 검색 결과가 없습니다.</NoTypeResults>
        )}

        {!loading && searchResults.users.length > 0 && (
          <>
            <SectionTitle>이화인 검색 결과 ({searchResults.users.length}개)</SectionTitle>
            <ResultsGrid>
              {searchResults.users.map((user) => (
                <UserCard key={user.memberId} user={user} />
              ))}
            </ResultsGrid>
          </>
        )}
        {!loading && hasSearched && searchResults.users.length === 0 && (
          <NoTypeResults>이화인 검색 결과가 없습니다.</NoTypeResults>
        )}
      </SearchResultsDisplayArea>
    </GlobalSearchContainer>
  );
}
