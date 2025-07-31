import FilterBar from '../components/chatlist/FilterBar';
import Header from '../components/chatlist/CharListHeader';
import PreChat from '../components/chatlist/PreChat';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getChatroomList } from '../../api/chat';
import { HEADER_BUTTON_LIST_PARAM } from '../constant/headerButtonList';

const dummydata = [
  {
    chatRoomId: 1,
    opponentId: 2,
    opponentName: '김일화',
    opponentProfileImageUrl: 'https://example.com/profile1.jpg',
    courseTitle: '피아노 레슨 - 무료',
    lastMessage: '네! 그때 뵙겠습니다 :)',
    lastMessageSentAt: '2025-07-19 01:06',
    unreadCount: 0,
  },
  {
    chatRoomId: 2,
    opponentId: 3,
    opponentName: '김삼화',
    opponentProfileImageUrl: 'https://example.com/profile2.jpg',
    courseTitle: '독일어 심화반',
    lastMessage: null,
    lastMessageSentAt: null,
    unreadCount: 0,
  },
];

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
        {chatlist.map((item, idx) => (
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
