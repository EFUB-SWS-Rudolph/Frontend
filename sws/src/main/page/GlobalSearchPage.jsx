// src/main/pages/GlobalSearchPage.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 필요한 SVG 아이콘 URL 임포트 
import SearchIconURL from '../../common/assets/icons/icon_search_white.svg'; 
import DeleteIconURL from '../../common/assets/icons/icon_delete.svg';
// styled-components 정의
const GlobalSearchContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 2rem;
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
  margin-top:0.6rem;
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
  color: #BBB;
  /* Title/Medium */
  font-family: "Pretendard Variable";
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
    border:2px;
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
  background: var(--Primary, #00664F);
  position:absolute;
  margin-left:17rem;
`;
const SearchResultsArea = styled.div`
  display: flex;
  width: 21.1875rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  flex-grow: 1;
  background-color: #fff;
  justify-content: center;
  flex-direction: column;
`;
// 최근 검색어 섹션 (GlobalSearchPage.jsx)
const RecentSearchFrame = styled.div`
  width: 21.1875rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding:0 0.5rem;
`;
// 최근 검색어 타이틀
const RecentSearchTitle = styled.h3`
  align-self: stretch;
  color: #000;
  /* Display/Small */
  font-family: "Pretendard Variable";
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
  font-family: "Pretendard Variable";
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
  width:flex;
  height: 2.5rem;
  padding: 1rem 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid #BBB;
  background: #FFF;
  gap: 0.5rem;
`;
// GlobalSearchPage 함수 컴포넌트 정의
export default function GlobalSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null); 
  const [recentSearches, setRecentSearches] = useState([
    '강의', '이화인', '인기 강의', '웹 개발', '프로그래밍', 'UX/UI', '데이터', '인공지능', '머신러닝'
  ]);//최근검색어 예시 데이터

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() === '') return;
    console.log("검색어 제출:", searchQuery);
    setRecentSearches(prev => [searchQuery, ...prev.filter(item => item !== searchQuery)].slice(0, 5));
    setSearchResults(`"${searchQuery}"에 대한 검색 결과`);
  };
  const handleRecentSearchClick = (keyword) => {
    setSearchQuery(keyword);
    handleSearchSubmit();
  };
  //최근 검색어 삭제
  const handleDeleteRecentSearch = (keywordToDelete) => {
    setRecentSearches(prev => prev.filter(keyword => keyword !== keywordToDelete));
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };
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

      <RecentSearchFrame>
        <RecentSearchTitle>최근 검색어</RecentSearchTitle>
        <RecentSearchItemsContainer>
          {recentSearches.map((keyword, index) => (
            <RecentSearchItem key={index}>
              <RecentSearchText onClick={() => handleRecentSearchClick(keyword)}>
                {keyword}
              </RecentSearchText>
              <RecentSearchItemDeleteButton onClick={(e) => { 
                e.stopPropagation();
                handleDeleteRecentSearch(keyword); 
              }}>
                <img src={DeleteIconURL} alt="삭제" />
              </RecentSearchItemDeleteButton>
            </RecentSearchItem>
          ))}
        </RecentSearchItemsContainer>
      </RecentSearchFrame>

      <SearchResultsArea>
        
      </SearchResultsArea>
    </GlobalSearchContainer>
  );
}