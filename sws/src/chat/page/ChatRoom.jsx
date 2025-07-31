import styled from 'styled-components';
import AboutRoom from '../components/chatroom/AboutRoom';
import ChatContainer from '../components/chatroom/ChatContainer';
import ChatRoomHeader from '../components/chatroom/ChatRoomHeader';
import ChatInput from '../components/chatroom/InputContainer';
import { ChatModal } from '../components/chatroom/ChatModal';
import { useEffect, useState } from 'react';
import { getMessageList } from '../../api/chat';
import { useParams } from 'react-router-dom';
import { useChatStore } from '../stores/useChatStore';
import { formatDate } from '../../utils/formatTime';

export default function ChatRoom() {
  const { setUser } = useChatStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState({
    courseId: 101,
    title: '독일어 심화반',
    courseImageUrl:
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR_66XQjlT5XMBH38EXA9chGLxdR9aeu9QhHxTOFGbKD6IwJ_EU6iyeQcqBbzp1bC6Yc_ReJW8iY3rSwvdiwTXjbjW-9wJaTecDCgwskZ8pPg',
    recruitStartDate: '2025-06-18',
    recruitEndDate: '2025-08-18',
  });
  const [messageList, setMessageList] = useState([
    {
      senderId: null,
      type: 'SYSTEM',
      content: '김이화님이 채팅방을 떠났습니다.',
      sentAt: '2025-07-21 00:01',
    },
    {
      senderId: 1,
      type: 'CHAT',
      content: '네! 그때 뵙겠습니다 :)',
      sentAt: '2025-07-19 01:06',
    },
    {
      senderId: 2,
      type: 'CHAT',
      content: '좋아요! 시간은 오후 3시 괜찮으세요?',
      sentAt: '2025-07-19 01:05',
    },
    {
      senderId: 1,
      type: 'CHAT',
      content: '그럼 이번 주 일요일 어때요?',
      sentAt: '2025-07-19 01:04',
    },
    {
      senderId: 2,
      type: 'CHAT',
      content: '저는 주말 오후가 괜찮습니다!',
      sentAt: '2025-07-19 01:03',
    },
    {
      senderId: 2,
      type: 'CHAT',
      content: '혹시 언제 수업 가능하실까요?',
      sentAt: '2025-07-19 01:02',
    },
    {
      senderId: 2,
      type: 'CHAT',
      content: '안녕하세요~ 관심가져주셔서 감사합니다.',
      sentAt: '2025-07-19 01:01',
    },
    {
      senderId: 1,
      type: 'CHAT',
      content: '안녕하세요! 피아노 강의 보고 연락드려요.',
      sentAt: '2025-07-19 01:00',
    },
  ]);
  const [pageNum, setPageNum] = useState(0);
  const roomId = Number(useParams().roomId);

  useEffect(() => {
    const handleMessageList = async () => {
      try {
        const res = await getMessageList(roomId, pageNum);
        if (pageNum == 0) {
          setUser(res.opponent);
          setCourse(res.course);
        }
        setMessageList(res.messages);
      } catch (err) {
        console.error(err);
      }
    };
    //handleMessageList();
    setUser({
      userId: 2,
      name: '김일화',
      profileImageUrl:
        'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTnFeOc40Qkzgh5q9bBm5KJooFBZT877fE7pki3c4M4SFn2OFwEf6FOVEQyMv5rFwZMa2dX3OHWO6uL_R56kuqUAw',
    }); //api 연결 후 삭제
  }, []);

  return (
    <Wrapper>
      <ChatRoomHeader modalHandler={setIsModalOpen} />
      <AboutRoom
        thumbnail={course.courseImageUrl}
        title={course.title}
        date={`${formatDate(course.recruitStartDate)} ~ ${formatDate(course.recruitEndDate)}`}
      />
      <ChatContainer messageList={messageList} />
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
