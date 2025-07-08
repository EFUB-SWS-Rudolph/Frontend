import styled from 'styled-components';
import { FaComment } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function LoginButton( {method, color} ) {
  return (
    <LoginBtnContainer color={color}>
      <IconWrapper>
        {(method==="카카오") ? <FaComment size={20} /> : <FcGoogle size={20} />}
      </IconWrapper>
      <MethodText>{method} 로그인</MethodText>
    </LoginBtnContainer>
  );
}

const LoginBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 30px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 14px 20px;
  margin: 8px 20px;
  cursor: pointer;
  font-weight: 500;
  color: black;
  background-color: ${(props) =>
    props.color === 'yellow' ? '#fee500' : 'white'};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MethodText = styled.div`
  font-size: 16px;
`;
