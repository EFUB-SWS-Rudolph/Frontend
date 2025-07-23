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
  border-radius:  15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white}; 
`;

const ChatBtnContents = styled.div`
  display: flex;
  justify-content: space-between;
  width: 84px;
  height: 24px;
`;

const ChatText = styled.div`
  font-family: ${({ theme }) => theme.fonts.body.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.body.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.body.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.body.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.body.large.lineHeight};
`;