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
  gap: 16px;
`;
// 상단 검색 바 섹션
const SearchBarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 284px;
  height: 52px; 
  border-radius: 24px; 
  background-color: #f5f5f5; 
  padding: 0 16px; 
  box-sizing: border-box;
  `;
// 검색 입력 필드 (SearchBar)
const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 16px;
  color: #222;
  &::placeholder {
    color: #aaaaaa;
  }
`;
// 검색 버튼 아이콘 컨테이너
const SearchButton = styled.button`
  width: 48px;
  height: 48px;
  border: none;
  background: #00664F;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 40px;
  position: absolute; 
  margin-left:285px;
  top: 122px; 
  & > img {
    width: 20px;
    height: 20px;
    border:2px;
  }
`;
const SearchResultsArea = styled.div`
  flex-grow: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  font-size: 16px;
  flex-direction: column;
  gap: 10px;
`;
// 최근 검색어 섹션 (GlobalSearchPage.jsx)
const RecentSearchFrame = styled.div`
  width: 339px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding:0 9px;
`;
// 최근 검색어 타이틀
const RecentSearchTitle = styled.h3`
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 14px;
  color: #222222;
  margin: 0;
`;
// 최근 검색어 아이템 컨테이너 
const RecentSearchItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
// RecentSearchItem 내부 텍스트 스타일 (클릭 가능 영역)
const RecentSearchText = styled.span`
  cursor: pointer;
  white-space: nowrap;
`;
const RecentSearchItemDeleteButton = styled.button`
  width: 16px; 
  height: 16px;
  border: none;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0; 
  & > img {
    width: 8px;
    height: 8px;
    object-fit: contain;
  }
`;
// 최근 검색어 개별 아이템
const RecentSearchItem = styled.div`
  min-width: 50px; 
  width:auto; 
  height: 40px;
  border-radius: 20px;
  border: 1px solid #BBBBBB;
  background: #FFFFFF;
  padding: 4px 16px; 
  display: flex;
  align-items: center;
  justify-content: space-between; 
  font-family: Pretendard Variable;
  font-weight: 500;
  font-size: 14px;
  color: #222222;
  gap: 4px; 
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