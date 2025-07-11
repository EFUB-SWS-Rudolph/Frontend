import { useState } from 'react';
import styled from 'styled-components';
import FILTER from '../../constants/Filter';
import SearchBar from './SearchBar';
import HeaderButton from './HeaderButton';
import FilterDropDown from './FilterDropDown';

export default function HeaderFilter({ sortBtn, selectedExchange, selectedPeriod, handleSortBtn, handleExchangeFilter, handlePeriodFilter }) {
  const [searchBtn, setSearchBtn] = useState(false);
  const [filterBtn, setFilterBtn] = useState(false);

  const handleSearchBtn = () => {
    setSearchBtn(!searchBtn);
  };
  const handleFilterBtn = () => {
    setFilterBtn(!filterBtn);
  };

  return (
    <Filter>
      <FilterWrapper>
        <HeaderButton buttontype="sorting" isclicked={sortBtn} onClick={handleSortBtn} />
        <HeaderButton buttontype="search" isclicked={searchBtn} onClick={handleSearchBtn} />
        <HeaderButton buttontype="filter" isclicked={filterBtn} onClick={handleFilterBtn} />
        
        <FilterDropDown 
          options={FILTER.EXCHANGE}
          value={selectedExchange}
          onChange={handleExchangeFilter}
          placeholder="교환방식"
        />
        <FilterDropDown 
          options={FILTER.PERIOD}
          value={selectedPeriod}
          onChange={handlePeriodFilter}
          placeholder="최신순"
        />
      </FilterWrapper>
      {searchBtn && <SearchBar />}
    </Filter>
  );
}

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 0;
  margin-top: 5px;
`;