import styled from 'styled-components';
import LoginBtn from '../components/LoginButton';
import WeevoLogo from '../icons/logo_weevo.svg?react';
import theme from '../../styles/theme';

export default function SignIn() {
  return (
    <Wrapper>
      <Spacer />
      <LoginPhraseContainer>
        <WeevoLogo width="132px" height="28px" />
        <LoginPhrase>로그인</LoginPhrase>
      </LoginPhraseContainer>
      <LoginBtnContainer>
        <LoginBtn method="카카오" color="yellow" />
        <LoginBtn method="구글" />
      </LoginBtnContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f7f6f3;
  justify-content: space-between;
`;

const Spacer = styled.div`
  flex: 0.3;
`;

const LoginPhraseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginPhrase = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.display.title.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.large.lineHeight};
  margin: 10px 0;
`;

const LoginBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  gap: 10px;
`;