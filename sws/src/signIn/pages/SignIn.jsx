import styled from 'styled-components';
import LoginBtn from '../components/LoginButton';
import WeevoLogo from '../icons/logo_weevo.svg?react';
import theme from '../../styles/theme';

export default function SignIn() {
  return (
    <Wrapper>
      <LoginPhraseContainer>
        <WeevoLogo width="8.25rem" height="1.75rem" />
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
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0;
  margin: 0;
`;

const LoginPhraseContainer = styled.div`
  display: flex;
  width: 8.25rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 18.5rem 8.06rem 16rem;
  padding: 0;
`;

const LoginPhrase = styled.h3`
  align-self: stretch;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.display.title.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.large.lineHeight};
  margin: 0;
  padding: 0;
`;

const LoginBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  gap: 1rem;
  margin: 0 1.5rem 1.81rem;
  padding: 0;
`;