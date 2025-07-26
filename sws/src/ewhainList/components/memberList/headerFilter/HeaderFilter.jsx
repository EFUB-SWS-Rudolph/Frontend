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
  width: 23.57rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 0.87rem;
  gap: 0px;
`;

const SearchBarSpace = styled.div`
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
  padding: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;