import styled from 'styled-components';
import { HiViewGrid } from "react-icons/hi";
import { HiMiniListBullet } from "react-icons/hi2";
import theme from '../../styles/theme';
import { useFilterStore } from '../stores/FilterStore';

export default function SortMethodBtn({ buttontype, onClick }) {
  const { isgallery } = useFilterStore();

  return (
    <HeaderButtonContainer $buttontype={buttontype} $isgallery={isgallery} theme={theme} onClick={onClick}>
      {buttontype==="gallery" ? <HiViewGrid size={15} /> : <HiMiniListBullet size={15} />}
    </HeaderButtonContainer>
  );
}

const HeaderButtonContainer = styled.button`
  width: 32px;
  height: 32px;
  padding: 10px;
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
  background-color: ${({$buttontype, $isgallery, theme}) => (
    ($isgallery && ($buttontype==="gallery")) || (!$isgallery && ($buttontype==="index")) ? theme.colors.fourth : theme.colors.gray100
  )};
`;