import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { useFilterStore } from '../stores/FilterStore';
import { BsArrowCounterclockwise } from "react-icons/bs";

export default function FilterFooter() {
  const { setExchange, setMajor, setPeriod, setIsGallery } = useFilterStore();
  const navigate = useNavigate();

  const handleMoveEwhainPage = () => {
    navigate('/ewhainlist');
  }

  const handleInitiate = () => {
    setExchange('전체');
    setMajor('전체');
    setPeriod('최신순');
    setIsGallery(true);
  };

  return(
    <FooterWrapper>
      <ResetBtnContainer onClick={handleInitiate}>
        <BsArrowCounterclockwise size={20} color={theme.colors.black} /> 
        초기화
      </ResetBtnContainer>
      <FinishFilterBtnContainer onClick={handleMoveEwhainPage}>
        필터 설정 완료
      </FinishFilterBtnContainer>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  width: 390px;
  height: 100px;
  padding: 4px 10px 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ResetBtnContainer = styled.button`
  width: 54px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.gray100};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.title.extraSmall.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.extraSmall.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.extraSmall.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.extraSmall.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.extraSmall.lineHeight};
`;

const FinishFilterBtnContainer = styled.div`
  width: 276px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display.title.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.medium.lineHeight};
`;