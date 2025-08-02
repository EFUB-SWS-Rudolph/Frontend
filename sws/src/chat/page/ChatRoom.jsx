import styled from 'styled-components';
import AboutRoom from '../components/chatroom/AboutRoom';
import ChatContainer from '../components/chatroom/ChatContainer';
import ChatRoomHeader from '../components/chatroom/ChatRoomHeader';
import ChatInput from '../components/chatroom/InputContainer';
import { ChatModal } from '../components/chatroom/ChatModal';
import { useState } from 'react';

export default function ChatRoom() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Wrapper>
      <ChatRoomHeader name={'화연'} modalHandler={setIsModalOpen} />
      <AboutRoom thumbnail={null} title={'영어 과외'} date={'2025년 6월 18일 ~ 2025년 8월 18일'} />
      <ChatContainer />
      <ChatInput />
      {isModalOpen && <ChatModal modalHandler={setIsModalOpen} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 24.375rem;
  height: 52.75rem;
`;
