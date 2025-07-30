import FilterBar from '../components/chatlist/FilterBar';
import Header from '../components/chatlist/CharListHeader';
import PreChat from '../components/chatlist/PreChat';
import styled from 'styled-components';
import { useState } from 'react';

export default function ChatLists() {
  const [filter, setFilter] = useState(0);

  return (
    <Wrapper>
      <Header />
      <FilterBar filter={filter} onChange={setFilter} />
      <ChatContainer>
        <PreChat />
        <PreChat />
        <PreChat />
        <PreChat />
        <PreChat />
        <PreChat />
      </ChatContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 52.75rem;
`;

const ChatContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
