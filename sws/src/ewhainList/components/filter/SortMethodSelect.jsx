import styled from 'styled-components';
import theme from '../../../styles/theme';
import SortMethodBtn from './SortMethodBtn';
import { useFilterStore } from '../../stores/FilterStore';

export default function SortMethodSelect() {
  const { isgallery, setIsGallery } = useFilterStore();

  const handleIsGallery = () => {
    isgallery ? null : setIsGallery(!isgallery);
  };

  const handleIsIndex = () => {
    isgallery ? setIsGallery(!isgallery) : null;
  };

  return(
    <DetailBtnWrapper>
      <DetailType>보기 방식</DetailType>
      <SelectDetailContainer>
        <SortMethodBtn buttontype="gallery" onClick={handleIsGallery} />
        <SortMethodBtn buttontype="index" onClick={handleIsIndex} />
      </SelectDetailContainer>
    </DetailBtnWrapper>
  );
}

const DetailBtnWrapper = styled.div`
  display: flex;
  padding: 0.5rem 1.12rem 0.5rem 2.5rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  width: 24.375rem;
  height: 3.75rem;
`;

const DetailType = styled.div`
  color: #000;
  font-family: ${({ theme }) => theme.fonts.display.body.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.large.lineHeight};
`;

const SelectDetailContainer = styled.div`
  width: 4.94rem;
  display: flex;
  align-items: center;
  gap: 0.94rem;
`;