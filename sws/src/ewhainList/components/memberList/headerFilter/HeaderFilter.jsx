import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import HeaderButton from './HeaderButton';
import { useFilterStore } from '../../../stores/FilterStore';

export default function HeaderFilter() {
  const [searchBtn, setSearchBtn] = useState(false);
  const { isgallery, setIsGallery } = useFilterStore();
  const navigate = useNavigate();

  const handleIsGallery = () => {
    setIsGallery(!isgallery);
  };
  const handleSearchBtn = () => {
    setSearchBtn(!searchBtn);
  };
  const handleIsFilter = () => {
    navigate("/ewhainfilter");
  };
  const handleMoveMajor = () => {
    navigate("/ewhainfilter/dept", { replace: true, state: { fromHeader: true } });
  }
  const handleMoveExchange = () => {
    navigate("/ewhainfilter/exchange", { replace: true, state: { fromHeader: true } });
    //setExchange(value);
  };
  const handleMovePeriod = () => {
    navigate("/ewhainfilter/period", { replace: true, state: { fromHeader: true } });
    //setPeriod(value);
  };

  return (
    <Filter>
      <FilterWrapper>
        <HeaderButton buttontype="sorting" onClick={handleIsGallery} />
        <HeaderButton buttontype="search" isclicked={searchBtn} onClick={handleSearchBtn} />
        <HeaderButton buttontype="filter" onClick={handleIsFilter} />
        <HeaderButton buttontype="major" onClick={handleMoveMajor} />
        <HeaderButton buttontype="exchange" onClick={handleMoveExchange} />
        <HeaderButton buttontype="period" onClick={handleMovePeriod} />
      </FilterWrapper>
      <SearchBarSpace>
        {searchBtn && <SearchBar />}
      </SearchBarSpace>
    </Filter>
  ); 
}

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-top: 0.5rem;
`;

const SearchBarSpace = styled.div`
  width: 22.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterWrapper = styled.div`
  position: relative;
  width: 23.57rem;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  align-items: center;
  flex: 1;
  gap: 0.5rem;
  padding-left: 0.88rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;