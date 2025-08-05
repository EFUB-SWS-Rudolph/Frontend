import styled from 'styled-components';
import AboutRoom from '../components/chatroom/AboutRoom';
import ChatContainer from '../components/chatroom/ChatContainer';
import ChatRoomHeader from '../components/chatroom/ChatRoomHeader';
import ChatInput from '../components/chatroom/InputContainer';
import { ChatModal } from '../components/chatroom/ChatModal';
import { useEffect, useRef, useState } from 'react';
import { deleteChatroom, getMessageList, patchMessageRead } from '../../api/chat';
import { useNavigate, useParams } from 'react-router-dom';
import { useChatStore } from '../stores/useChatStore';
import { formatDate } from '../../utils/formatTime';

import { Client } from '@stomp/stompjs';
import { getUserIdFromToken } from '../../utils/getUserIdFromToken';

export default function ChatRoom() {
  const { setUser, userId } = useChatStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState({});
  const [messageList, setMessageList] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const roomId = Number(useParams().chatId);
  const stompRef = useRef();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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

    handleMessageList();
  }, [pageNum]);

  useEffect(() => {
    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString).accessToken;

    const stompClient = new Client({
      brokerURL: `${import.meta.env.VITE_WEBSOCKET_URL}`,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      },
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        stompClient.subscribe(`/sub/chat/${roomId}`, (message) => {
          console.log('🔔 메시지 수신됨:', message);
          try {
            console.log(JSON.parse(message.body));
            const newChat = JSON.parse(message.body);
            setMessageList((prev) => [...prev, newChat]);
          } catch (error) {
            console.error('구독 에러 : ', error);
          }
        });
      },
      onStompError: (frame) => {
        console.error('STOMP 오류', frame.headers['message']);
      },
    });
    stompRef.current = stompClient;
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [roomId]);

  useEffect(() => {
    const handleReadMessage = async () => {
      try {
        await patchMessageRead(roomId);
      } catch (err) {
        console.error(err);
      }
    };

    handleReadMessage();
  }, [messageList]);

  const sendMessage = () => {
    console.log(message);
    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString).accessToken;
    const myUserId = getUserIdFromToken();

    if (stompRef.current && stompRef.current.connected && message.trim()) {
      const messageData = {
        chatRoomId: roomId,
        senderId: myUserId,
        receiverId: userId,
        content: message,
      };

      const payload = JSON.stringify(messageData);

      try {
        stompRef.current.publish({
          destination: '/pub/chat',
          body: payload,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage('');
      } catch (err) {
        alert('메세지 전송 실패');
        console.error(err);
      }
    }
  };

  const onClickLeftButton = async () => {
    try {
      const res = await deleteChatroom(roomId);
      navigate('/chatlist');
    } catch (err) {
      alert('채팅방 삭제에 실패했습니다.');
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <ChatRoomHeader modalHandler={setIsModalOpen} />
      <AboutRoom
        thumbnail={course.courseImageUrl}
        title={course.title}
        date={`${formatDate(course.recruitStartDate)} ~ ${formatDate(course.recruitEndDate)}`}
      />
      <ChatContainer messageList={messageList} />
      <ChatInput message={message} setMessage={setMessage} onClickButton={sendMessage} />
      {isModalOpen && <ChatModal modalHandler={setIsModalOpen} onClick={onClickLeftButton} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  position: relative;
`;
