import styled from 'styled-components';
import { FaComment } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import theme from '../../styles/theme';

export default function LoginButton( {method, color} ) {
  return (
    <LoginBtnContainer color={color} theme={theme}>
        <IconWrapper>
          {(method==="카카오") ? <FaComment size={20} /> : <FcGoogle size={20} />}
        </IconWrapper>
          <MethodText>{method} 로그인</MethodText>
    </LoginBtnContainer>
  );
}

const LoginBtnContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 341px;
  height: 48px;
  gap: 10px;
  border-radius: 30px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 14px 20px;
  margin: 8px 20px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display.title.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.medium.lineHeight};
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ color, theme }) =>
    color === 'yellow' ? '#fee500' : theme.colors.white};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

const MethodText = styled.div`
  font-family: ${({ theme }) => theme.fonts.display.title.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.medium.lineHeight};
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
