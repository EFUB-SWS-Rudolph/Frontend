import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import SortMethodBtn from './SortMethodBtn';
import { useFilterStore } from '../stores/FilterStore';
import { MdOutlineArrowBackIosNew } from "react-icons/md";

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
  width: 390px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

const DetailType = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.body.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.large.lineHeight};
`;

const SelectDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;