import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import { useFilterStore } from '../../stores/FilterStore';
import Reset from '../../icons/icon_reset.svg?react';

export default function FilterFooter() {
  const { setExchange, setMajor, setPeriod, setIsGallery, setIsExchange, setIsDonation, setIsCoffeeChat } = useFilterStore();
  const navigate = useNavigate();

  const handleMoveEwhainPage = () => {
    navigate('/ewhainlist');
  }

  const handleInitiate = () => {
    setExchange('전체');
    setMajor('전체');
    setPeriod('최신순');
    setIsGallery(true);
    setIsExchange(false);
    setIsDonation(false);
    setIsCoffeeChat(false);
  };

  return(
    <FooterWrapper>
      <ResetBtnContainer onClick={handleInitiate}>
        <Reset /> 
        <ResetText>초기화</ResetText>
      </ResetBtnContainer>
      <FinishFilterBtnContainer onClick={handleMoveEwhainPage}>
        <FinishButtonText>
          필터 설정 완료
        </FinishButtonText>
      </FinishFilterBtnContainer>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  width: 24.375rem;
  height: 3rem;
  padding: 0 1.25rem 0;
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const ResetBtnContainer = styled.button`
  width: 3.375rem;
  height: 3rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  background: var(--Gray-100, #F5F5F5);
  gap: 0.37rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ResetText = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.title.extraSmall.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.extraSmall.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.extraSmall.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.extraSmall.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.extraSmall.lineHeight};
`;

const FinishFilterBtnContainer = styled.div`
  width: 17.25rem;
  height: 3rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  background: var(--Primary, #00664F);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FinishButtonText = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display.title.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.medium.lineHeight};
`;