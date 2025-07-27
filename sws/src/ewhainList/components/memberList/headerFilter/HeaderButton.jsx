import styled from 'styled-components';
import GALLERY from '../../../icons/icon_gallery.svg?react';
import INDEX from '../../../icons/icon_index.svg?react';
import SEARCH from '../../../icons/icon_search.svg?react';
import SEARCH_GREEN from '../../../icons/icon_searchgreen.svg?react';
import FILTER from '../../../icons/icon_filter.svg?react';
import DOWNARROW from '../../../icons/icon_downarrow.svg?react';
import theme from '../../../../styles/theme';
import { useFilterStore } from '../../../stores/FilterStore';

export default function HeaderButton({ buttontype, isclicked, onClick }) {
  const { isgallery, major, exchange, period } = useFilterStore();

  const buttonRenderMap = {
    sorting: () => isgallery ? <GALLERY width="0.84375rem" height="0.84375rem" flex-shrink="0" /> 
      : <INDEX width="1.5rem" height="1.5rem" flex-shrink="0" aspect-ratio="1/1" />,
    search: () => isclicked ? <SEARCH_GREEN /> : <SEARCH />,
    filter: () => (
      <FilterWrapper>
        <span>필터</span>
        <FILTER width="0.75rem" height="0.6875rem" />
      </FilterWrapper>
    ),
    major: () => (
      <MajorWrapper>
        <span>{ major==='전체' ? "학과" : major }</span>
        <DOWNARROW />
      </MajorWrapper>
    ),
    exchange: () => (
      <ExchangeWrapper>
        <span>{ exchange==='전체' ? "교류 방식" : exchange }</span>
        <DOWNARROW />
      </ExchangeWrapper>
    ),
    period: () => (
      <PeriodWrapper>
        <span>{ period==='전체' ? "최신순" : period }</span>
        <DOWNARROW />
      </PeriodWrapper>
    ),
  };
  
  
  function renderContent() {
    return buttonRenderMap[buttontype]?.() || null;
  }

  return (
    <HeaderButtonContainer $buttontype={buttontype} $major={major} $exchange={exchange} $period={period} $isclicked={isclicked} onClick={onClick} theme={theme}>{renderContent()}</HeaderButtonContainer>
  );
}

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4375rem;
  span {
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const ExchangeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  span {
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const MajorWrapper = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  gap: 0.5rem;
  span {
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const PeriodWrapper = styled.div`
  display: flex;
  width: auto;
  height: 1rem;
  align-items: center;
  gap: 0.5rem;
  span {
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const HeaderButtonContainer = styled.button`
  flex-shrink: 0;
  height: 2.25rem;
  width: ${({$buttontype}) => $buttontype === "sorting" || $buttontype === "search" ? "2.25rem" : "fit-content"};
  padding: ${({$buttontype}) => $buttontype === "sorting" || $buttontype === "search" ? "0.715rem" : "0.625rem 0.75rem"};
  border-radius: 0.5rem;
  background: var(--Gray-100, #F5F5F5);
  display: flex;
  align-items: center;
  justify-content: ${({$buttontype}) => $buttontype === "sorting" || $buttontype === "search" ? "center" : "default"};
  color: ${({ $buttontype, $major, $exchange, $period, theme }) => 
    (($major !== '전체') && ($buttontype === "major")) ||
    (($exchange !== '전체') && ($buttontype === "exchange")) ||
    (($period !== '최신순') && ($buttontype === "period")) ?
    theme.colors.primary : theme.colors.black
  };
  background-color: ${({$buttontype, $isclicked, $major, $exchange, $period, theme}) => (
    (($buttontype === "search") && $isclicked) || 
    (($major !== '전체') && ($buttontype === "major")) ||
    (($exchange !== '전체') && ($buttontype === "exchange")) ||
    (($period !== '최신순') && ($buttontype === "period")) ?
    "#e1fff1": theme.colors.gray100
  )};
`;