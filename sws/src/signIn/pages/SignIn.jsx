import styled from 'styled-components';
import LoginBtn from '../components/LoginButton';
import theme from '../../styles/theme';

const fontWeevoLink = document.createElement('link');
fontWeevoLink.href = "https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
fontWeevoLink.rel = "stylesheet";
document.head.appendChild(fontWeevoLink);

export default function SignIn() {
  return (
    <Wrapper>
      <Spacer />
      <LoginPhraseContainer>
        <LoginTitle>Weevo</LoginTitle>
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

const LoginTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-family: "prompt";
  font-size: 36px;
  margin: 0px;
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