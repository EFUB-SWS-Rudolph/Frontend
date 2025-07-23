import styled from 'styled-components';
import GALLERY from '../icons/icon_gallery.svg?react';
import INDEX from '../icons/icon_index.svg?react';
import theme from '../../styles/theme';
import { useFilterStore } from '../stores/FilterStore';

export default function SortMethodBtn({ buttontype, onClick }) {
  const { isgallery } = useFilterStore();

  return (
    <HeaderButtonContainer $buttontype={buttontype} $isgallery={isgallery} theme={theme} onClick={onClick}>
      {buttontype==="gallery" ? <GALLERY width="12px" height="12px" /> : <INDEX width="16px" height="10px" />}
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
    ($isgallery && ($buttontype==="gallery")) || (!$isgallery && ($buttontype==="index")) ? "#e1fff1" : theme.colors.gray100
  )};
`;