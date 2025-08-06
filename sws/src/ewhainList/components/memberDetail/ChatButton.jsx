import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import CHAT from '../../icons/icon_chat.svg?react';
import { getChatroomExists } from '../../../api/chat';

export default function ChatButton({ id }) {
  const navigate = useNavigate();

  const handleMoveChat = async () => {
    try {
      const res = await getChatroomExists(id);
      if (res.exists) {
        navigate(`/chatroom/${res.chatRoomId}`);
      } else {
        navigate(`/chatroom/new`, {
          state: {
            opponentId: id,
            courseId: null,
            res,
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ChatBtnWrapper>
      <ChatBtnContainer onClick={handleMoveChat}>
        <ChatBtnContents>
          <CHAT width="1.25rem" height="1.25rem" aspect-ratio="1/1" />
          <ChatText>채팅하기</ChatText>
        </ChatBtnContents>
      </ChatBtnContainer>
    </ChatBtnWrapper>
  );
}

const ChatBtnWrapper = styled.div`
  display: flex;
  width: 24.3125rem;
  height: 5.5rem;
  padding: 1rem 2.25rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const ChatBtnContainer = styled.button`
  display: flex;
  width: 19.8125rem;
  height: 3.5rem;
  padding: 1rem 0;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: var(--Primary, #00664f);
`;

const ChatBtnContents = styled.div`
  width: 5.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatText = styled.div`
  color: var(--White, #fff);
  text-align: center;
  font-family: 'Pretendard Variable';
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 150% */
`;
