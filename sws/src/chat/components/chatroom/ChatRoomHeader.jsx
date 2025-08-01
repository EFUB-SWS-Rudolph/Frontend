import styled from 'styled-components';
import BACK_BUTTON from '../../assets/back_button.svg?react';
import MORE_BUTTON from '../../assets/more_button.svg?react';
import { useNavigate } from 'react-router-dom';

export default function ChatRoomHeader({ name, modalHandler }) {
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <ButtonWrapper onClick={() => navigate('/chatlist')}>
        <BACK_BUTTON />
      </ButtonWrapper>
      <HeaderContainer>{name}</HeaderContainer>
      <ButtonWrapper>
        <MORE_BUTTON onClick={() => modalHandler((prev) => !prev)} />
      </ButtonWrapper>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  width: 100%;
  height: 3.75rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 0.75rem;
`;

const HeaderContainer = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.medium.lineHeight};
`;

const ButtonWrapper = styled.div`
  cursor: pointer;
`;
