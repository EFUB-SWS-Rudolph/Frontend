import styled from 'styled-components';
import GALLERY from '../../icons/icon_gallery.svg?react';
import INDEX from '../../icons/icon_index.svg?react';
import SEARCH from '../../icons/icon_search.svg?react';
import FILTER from '../../icons/icon_filter.svg?react';
import DOWNARROW from '../../icons/icon_downarrow.svg?react';
import theme from '../../../styles/theme';
import { useFilterStore } from '../../stores/FilterStore';

export default function HeaderButton({ buttontype, isclicked, onClick }) {
  const { isgallery, major, exchange, period } = useFilterStore();

  const buttonRenderMap = {
    sorting: () => isgallery ? <GALLERY width="14px" height="14px" /> : <INDEX width="14px" height="14px" />,
    search: () => <SEARCH width="30px" height="30px" color={isclicked ? theme.colors.primary : theme.colors.black} />,
    filter: () => (
      <>
        <span>필터</span>
        <FILTER width="13px" height="13px" />
      </>
    ),
    major: () => (
      <>
        <span>{ major==='전체' ? "학과" : major }</span>
        <DOWNARROW />
      </>
    ),
    exchange: () => (
      <>
        <span>{ exchange==='전체' ? "교류방식" : exchange }</span>
        <DOWNARROW />
      </>
    ),
    period: () => (
      <>
        <span>{ period==='전체' ? "최신순" : period }</span>
        <DOWNARROW />
      </>
    ),
  };
  
  
  function renderContent() {
    return buttonRenderMap[buttontype]?.() || null;
  }

  return (
    <HeaderButtonContainer $buttontype={buttontype} $major={major} $exchange={exchange} $period={period} $isclicked={isclicked} onClick={onClick} theme={theme}>{renderContent()}</HeaderButtonContainer>
  );
}

const HeaderButtonContainer = styled.button`
  height: 36px;
  width: ${({$buttontype}) => $buttontype === "sorting" || $buttontype === "search" ? "36px" : "auto"};
  padding: ${({$buttontype}) => $buttontype === "filter" ? "10px 12px" : "11px"};
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: ${({ $buttontype, $major, $exchange, $period, theme }) => 
    (($major !== '전체') && ($buttontype === "major")) ||
    (($exchange !== '전체') && ($buttontype === "exchange")) ||
    (($period !== '최신순') && ($buttontype === "period")) ?
    theme.colors.primary : theme.colors.black
  };
  font-family: ${({ theme }) => theme.fonts.display.caption.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.caption.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.caption.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.caption.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.caption.medium.lineHeight};
  background-color: ${({$buttontype, $isclicked, $major, $exchange, $period, theme}) => (
    (($buttontype === "search") && $isclicked) || 
    (($major !== '전체') && ($buttontype === "major")) ||
    (($exchange !== '전체') && ($buttontype === "exchange")) ||
    (($period !== '최신순') && ($buttontype === "period")) ?
    "#e1fff1": theme.colors.gray100
  )};
`;