import { useState } from 'react';
import styled from 'styled-components';
import SEARCH from '../../../icons/icon_search.svg?react';
import theme from '../../../../styles/theme';
import { useFilterStore } from '../../../stores/FilterStore';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const setSearchItem = useFilterStore((state) => state.setSearchItem);
  const searchItem = useFilterStore((state) => state.searchItem);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    setSearchItem(searchTerm);
    console.log(searchItem);
  };

  return (
    <SearchBarContainer>
      <SearchBarContext>
        <SearchInput placeholder="학과 또는 닉네임 입력" value={searchTerm} onChange={handleSearchTerm} />
        <SEARCH onClick={handleSearch} />
      </SearchBarContext>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  display: inline-flex;
  padding-left: 0.9375rem;
  justify-content: start;
  align-items: center;
  border-radius: 0.75rem;
  background: var(--Gray-100, #F5F5F5);
  width: 22.125rem;
  height: 2.5rem;
  border: none;
`;

const SearchBarContext = styled.div`
  width: 21.1875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0.75rem 0.75rem 0;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: "Pretendard Variable";
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: ${({ theme }) => theme.colors.black};
  &:placeholder {
    color: #aaa;
    letter-spacing: -0.01031rem;
  }
`;