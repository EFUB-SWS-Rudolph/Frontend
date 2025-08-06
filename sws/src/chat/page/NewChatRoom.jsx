import styled from 'styled-components';
import AboutRoom from '../components/chatroom/AboutRoom';
import ChatContainer from '../components/chatroom/ChatContainer';
import ChatRoomHeader from '../components/chatroom/ChatRoomHeader';
import ChatInput from '../components/chatroom/InputContainer';
import { useState } from 'react';
import { postChatroom } from '../../api/chat';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatTime';

export default function NewChatRoom() {
  const location = useLocation();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleMakeChatroom = async () => {
    try {
      const data = {
        opponentId: location.state.opponentId,
        courseId: location.state.courseId,
        content: message,
      };
      const res = await postChatroom(data);
      if (res.chatRoomId) {
        navigate(`/chatroom/${res.chatRoomId}`);
      } else {
        throw error;
      }
    } catch (err) {
      alert('채팅방 생성에 실패했습니다. 다시 시도해주세요');
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <ChatRoomHeader modalHandler={null} newUser={location.state.res.opponentName} />
      {location.state.courseId && (
        <AboutRoom
          thumbnail={location.state.res.courseImageUrl}
          title={location.state.res.courseTitle}
          date={`${formatDate(location.state.res.recruitStartDate)} ~ ${formatDate(location.state.res.recruitEndDate)}`}
        />
      )}

      <ChatContainer messageList={[]} />
      <ChatInput message={message} setMessage={setMessage} onClickButton={handleMakeChatroom} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
