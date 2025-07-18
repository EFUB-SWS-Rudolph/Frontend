import styled from 'styled-components';
import { HiViewGrid } from "react-icons/hi";
import { HiMiniListBullet } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import theme from '../../../styles/theme';
import { useFilterStore } from '../../stores/FilterStore';

export default function HeaderButton({ buttontype, isclicked, onClick }) {
  const { isgallery, major } = useFilterStore();

  function renderContent() {
    if (buttontype === "sorting") {
      return isgallery ? <HiViewGrid size={15} /> : <HiMiniListBullet size={15} />;
    } else if (buttontype === "search") {
      return <CiSearch size={15} color={isclicked ? theme.colors.primary : theme.colors.black} />;
    } else if (buttontype === "filter") {
      return (
        <>
          <span>필터</span>
          <TbAdjustmentsHorizontal size={15} />
        </>
      );
    } else if (buttontype === "major") {
      return (
        <>
          <span>{ major==='전체' ? "학과" : major }</span>
          <IoIosArrowDown size={15} />
        </>
      );
    }
  }

  return (
    <HeaderButtonContainer $buttontype={buttontype} $isclicked={isclicked} $major={major} theme={theme} onClick={onClick}>{renderContent()}</HeaderButtonContainer>
  );
}

const HeaderButtonContainer = styled.button`
  height: 36px;
  width: ${({$buttontype}) => $buttontype === "sorting" || $buttontype === "search" ? "36px" : "auto"};
  padding: ${({$buttontype}) => $buttontype === "filter" ? "10px 12px" : "10px"};
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: ${({ $buttontype, $major, theme }) => 
    ($major !== '전체') && ($buttontype === "major") ? theme.colors.primary : theme.colors.black
  };
  font-family: ${({ theme }) => theme.fonts.display.caption.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.caption.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.caption.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.caption.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.caption.medium.lineHeight};
  background-color: ${({$buttontype, $isclicked, $major, theme}) => (
    (($buttontype === "search") && $isclicked) || (($major !== '전체') && ($buttontype === "major")) ? "#e1fff1": theme.colors.gray100
  )};
`;