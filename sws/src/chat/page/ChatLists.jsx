import FilterBar from '../components/chatlist/FilterBar';
import Header from '../components/chatlist/CharListHeader';
import PreChat from '../components/chatlist/PreChat';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getChatroomList } from '../../api/chat';
import { HEADER_BUTTON_LIST_PARAM } from '../constant/headerButtonList';
import dayjs from 'dayjs';

export default function ChatLists() {
  const [filter, setFilter] = useState(0);
  const [chatlist, setChatlist] = useState([]);

  useEffect(() => {
    handleChatlist();
  }, [filter]);

  const handleChatlist = async () => {
    try {
      const res = await getChatroomList(HEADER_BUTTON_LIST_PARAM[filter]);
      setChatlist(res.chatRoomSummaries);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <Header />
      <FilterBar filter={filter} onChange={setFilter} />
      <ChatContainer>
        {[...chatlist]
          .sort((a, b) => dayjs(b.lastMessageSentAt).diff(dayjs(a.lastMessageSentAt)))
          .map((item, idx) => (
            <PreChat key={`prechat-${idx}`} prechatData={item} />
          ))}
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
