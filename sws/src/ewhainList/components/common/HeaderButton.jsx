import styled from 'styled-components';
import { HiViewGrid } from "react-icons/hi";
import { HiMiniListBullet } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import theme from '../../../styles/theme';

export default function HeaderButton({ buttontype, isclicked, onClick }) {
  function renderContent() {
    if (buttontype === "sorting") {
      return isclicked ? <HiMiniListBullet size={15} /> : <HiViewGrid size={15} />;
    } else if (buttontype === "search") {
      return <CiSearch size={15} color={isclicked ? theme.colors.primary : theme.colors.black} />;
    } else if (buttontype === "filter") {
      return (
        <>
          <span>필터</span>
          <TbAdjustmentsHorizontal size={15} />
        </>
      );
    } else {
      return null;
    }
  }

  return (
    <HeaderButtonContainer $buttontype={buttontype} $isclicked={isclicked} theme={theme} onClick={onClick}>{renderContent()}</HeaderButtonContainer>
  );
}

const HeaderButtonContainer = styled.button`
  height: 30px;
  padding: ${({$buttontype}) => $buttontype === "filter" ? "10px 12px" : "10px"};
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.caption.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.caption.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.caption.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.caption.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.caption.medium.lineHeight};
  background-color: ${({$buttontype, $isclicked, theme}) => (
    ($buttontype === "search") && $isclicked ? theme.colors.fourth : theme.colors.gray100
  )};
`;