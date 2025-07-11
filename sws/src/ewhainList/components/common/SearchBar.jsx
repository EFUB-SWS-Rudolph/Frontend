import { useState } from 'react';
import styled from 'styled-components';
import { CiSearch } from "react-icons/ci";
import theme from '../../../styles/theme';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  }
  return (
    <SearchBarContainer>
      <SearchInput placeholder="학과 또는 닉네임 입력" value={searchTerm} onChange={handleSearchTerm} />
      <CiSearch size={20} color="#aaa"/>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  width: 354px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  border-radius: 12px;
  height: 40px;
  padding: 0 12px;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: ${({ theme }) => theme.fonts.display.body.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.small.lineHeight};
  color: ${({ theme }) => theme.colors.black};
  &:placeholder {
    color: #aaa;
  }
`