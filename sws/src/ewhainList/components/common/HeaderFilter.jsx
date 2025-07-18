import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FILTER from '../../constants/Filter';
import SearchBar from '../SearchBar';
import HeaderButton from './HeaderButton';
import FilterDropDown from './FilterDropDown';
import { useFilterStore } from '../../stores/FilterStore';

export default function HeaderFilter() {
  const [searchBtn, setSearchBtn] = useState(false);
  const { isgallery, setIsGallery, exchange, setExchange, period, setPeriod } = useFilterStore();
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
  const handleExchange = (value) => {
    setExchange(value);
  };
  const handlePeriod = (value) => {
    setPeriod(value);
  };

  return (
    <Filter>
      <FilterWrapper>
        <HeaderButton buttontype="sorting" onClick={handleIsGallery} />
        <HeaderButton buttontype="search" isclicked={searchBtn} onClick={handleSearchBtn} />
        <HeaderButton buttontype="filter" onClick={handleIsFilter} />
        <HeaderButton buttontype="major" onClick={handleMoveMajor} />
        
        <FilterDropDown 
          options={FILTER.EXCHANGE}
          value={exchange}
          onChange={handleExchange}
          placeholder="교류방식"
        />
        <FilterDropDown 
          options={FILTER.PERIOD}
          value={period}
          onChange={handlePeriod}
          placeholder="최신순"
        />
      </FilterWrapper>
      {searchBtn && <SearchBar />}
    </Filter>
  ); 
}

const Filter = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const FilterWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  align-items: center;
  flex: 1;
  gap: 8px;
  padding: 0;
  margin-top: 5px;
  &::-webkit-scrollbar {
    display: none;
  }
`;