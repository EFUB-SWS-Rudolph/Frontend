import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import CHAT from '../icons/icon_chat.svg?react';

export default function ChatButton() {
  return (
    <ChatBtnWrapper>
      <ChatBtnContainer>
        <ChatBtnContents>
          <CHAT />
          <ChatText>채팅하기</ChatText>
        </ChatBtnContents>
      </ChatBtnContainer>
    </ChatBtnWrapper>
  );
}

const ChatBtnWrapper = styled.div`
  width: 389px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatBtnContainer = styled.button`
  width: 317px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius:  15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white}; 
`;

const ChatBtnContents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 84px;
  height: 24px;
`;

const ChatText = styled.div`
  font-family: ${({ theme }) => theme.fonts.display.body.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.large.lineHeight};
`;