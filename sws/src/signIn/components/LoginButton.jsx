import styled from 'styled-components';
import KAKAO from '../icons/icon_kakao.svg?react';
import GOOGLE from '../icons/logo_google.svg?react';
import { FcGoogle } from 'react-icons/fc';
import theme from '../../styles/theme';

export default function LoginButton({ provider, method, color }) {
  const handleLogin = () => {
    const AUTH_URL = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/${provider}`;
    window.location.href = AUTH_URL;
  };

  return (
    <LoginBtnContainer color={color} theme={theme} onClick={handleLogin}>
      {method === '카카오' ? (
        <IconContainer>
          <KAKAO width="2rem" height="2rem" flex-shrink="0" />
        </IconContainer>
      ) : (
        <IconContainer>
          <FcGoogle
            style={{
              width: '1.25rem',
              height: '1.25rem',
              flexShrink: '0',
              aspectRatio: '1/1',
              borderRadius: '3.125rem',
            }}
          />
        </IconContainer>
      )}
      <MethodText color={color}>{method} 로그인</MethodText>
    </LoginBtnContainer>
  );
}

const LoginBtnContainer = styled.div`
  width: 21.3125rem;
  height: 3rem;
  display: inline-flex;
  padding: ${({ color }) =>
    color === 'yellow' ? '0.5rem 7.9375rem 0.5rem 1rem' : '0.5rem 8.375rem 0.5rem 0.9375rem'};
  align-items: center;
  gap: ${({ color }) => (color === 'yellow' ? '4.9375rem' : '5.4375rem')};
  border-radius: 1.5rem;
  background: ${({ color }) =>
    color === 'yellow' ? 'var(--Kakao, #FEE500)' : 'var(--White, #FFF)'};
`;

const IconContainer = styled.div`
  display: flex;
  width: 2rem;
  height: 2rem;
  padding: ${({ color }) => (color === 'yellow' ? '0.375rem' : '0')};
  justify-content: center;
  align-items: center;
`;

const MethodText = styled.div`
  width: ${({ color }) => (color === 'yellow' ? '5.4375rem' : '4.5625rem')};
  height: 1.1875rem;
  flex: 1 0 0;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.display.title.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.medium.lineHeight};
`;
