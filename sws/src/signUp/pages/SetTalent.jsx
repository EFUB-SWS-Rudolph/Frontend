import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignUpHeader from '../components/common/SignUpHeader';
import ProgressBar from '../components/common/ProgressBar';
import FieldItems from '../components/common/tags/FieldItems';
import NextBtn from '../components/common/NextBtn';
import FIELDLIST from '../constants/FieldList';
import theme from '../../styles/theme';
import { useUserStore } from '../stores/useUserStore';

export default function SetTalent() {
  const { resetTalents } = useUserStore();
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/main');
    resetTalents();
  };

  return (
    <Wrapper>
      <SignUpHeader backRoute="/signup/interest" />
      <ProgressBar step='5' totalSteps='5' />
      <SignUpContents>
        <EnteringInfo>
          본인의 재능<br/>
          3가지를 설정해 주세요
        </EnteringInfo>
        <FieldItems fields={FIELDLIST} type="talent" />
      </SignUpContents>
        <ButtonContainer>
          <LaterButtonContainer>
            <LaterButton onClick={handleNextClick}>나중에 할래요</LaterButton>
          </LaterButtonContainer>
          <NextBtn disabled={false} onClick={handleNextClick} />
        </ButtonContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 24.375rem;
  height: 52.8125rem; 
  background: var(--White, #FFF);
`;

const SignUpContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  width: 22.75rem;
  gap: 3.62rem;
  padding: 2.62rem 0.8rem 6rem;
`;

const EnteringInfo = styled.h2`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.large.lineHeight};
`;

const LaterButtonContainer = styled.div`
  display: inline-flex;
  padding: 0.4375rem 3.8125rem;
  justify-content: center;
  align-items: center;
`;

const LaterButton = styled.button`
  color: ${({ theme }) => theme.colors.gray500};
  font-family: ${({ theme }) => theme.fonts.display.body.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.large.lineHeight};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;