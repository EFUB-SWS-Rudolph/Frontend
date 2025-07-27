import styled from 'styled-components';
import GALLERY from '../../icons/icon_gallery.svg?react';
import INDEX from '../../icons/icon_material-symbols_list-rounded.svg?react';
import theme from '../../../styles/theme';
import { useFilterStore } from '../../stores/FilterStore';

export default function SortMethodBtn({ buttontype, onClick }) {
  const { isgallery } = useFilterStore();

  return (
    <HeaderButtonContainer $buttontype={buttontype} $isgallery={isgallery} theme={theme} onClick={onClick}>
      {buttontype==="gallery" ? <GALLERY  width="0.7rem" height="0.7rem" flex-shrink="0" /> 
      :<INDEX  width="1.5rem" height="1.5rem" flex-shrink="0" aspect-ratio="1/1" />}
    </HeaderButtonContainer>
  );
}

const HeaderButtonContainer = styled.button`
  width: 2rem;
  height: 2rem;
  flex-shrink: ${({$buttontype}) => 
    $buttontype==="index" ? "0" : "default"
  };
  border-radius: 0.5rem;
  background: ${({$buttontype, $isgallery, theme}) => (
    ($isgallery && ($buttontype==="gallery")) || (!$isgallery && ($buttontype==="index")) ? "#e1fff1" : theme.colors.gray100
  )};
  display: flex;
  justify-content: center;
  align-items: center;
`;