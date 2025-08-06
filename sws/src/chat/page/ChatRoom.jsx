import styled from 'styled-components';
import AboutRoom from '../components/chatroom/AboutRoom';
import ChatContainer from '../components/chatroom/ChatContainer';
import ChatRoomHeader from '../components/chatroom/ChatRoomHeader';
import ChatInput from '../components/chatroom/InputContainer';
import { ChatModal } from '../components/chatroom/ChatModal';
import { useCallback, useEffect, useRef, useState } from 'react';
import { deleteChatroom, getMessageList, patchMessageRead } from '../../api/chat';
import { useNavigate, useParams } from 'react-router-dom';
import { useChatStore } from '../stores/useChatStore';
import { formatDate } from '../../utils/formatTime';

import { Client } from '@stomp/stompjs';
import { getUserIdFromToken } from '../../utils/getUserIdFromToken';

export default function ChatRoom() {
  const { setUser, clearUser, userId } = useChatStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const roomId = Number(useParams().chatId); //채팅방 아이디
  const [course, setCourse] = useState({}); //강의 정보
  const [messageList, setMessageList] = useState([]); //메시지 목록
  const [pageNum, setPageNum] = useState(0); //메시지 페이지

  const stompRef = useRef();
  const [message, setMessage] = useState(''); //내가 보낼 메시지

  const [hasMore, setHasMore] = useState(true); //더 불러올 메시지가 있는지 여부
  const scrollRef = useRef();
  const topRef = useRef(); //스크롤 맨 위
  const bottomRef = useRef(); //스크롤 맨 아래
  const isFetchingRef = useRef(false); //불러오기 중인지 여부

  const handleMessageList = useCallback(
    //메시지 불러오는 함수
    async (page) => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      const prevScrollHeight = getScrollHeight(); // 전체 높이 저장
      const prevScrollTop = getScrollTop(); // 현재 스크롤 위치 저장

      try {
        const res = await getMessageList(roomId, page);
        if (page == 0) {
          setUser(res.opponent);
          setCourse(res.course);
        }

        if (res.messages.length === 0) {
          setHasMore(false);
        } else {
          setMessageList((prev) => [...res.messages, ...prev]);
          setPageNum(page);
        }
      } catch (err) {
        if (err.status == 400) {
          alert(err.response.data.message);
          navigate(-1);
        }
      } finally {
        requestAnimationFrame(() => {
          const newScrollHeight = getScrollHeight();
          const scrollDiff = newScrollHeight - prevScrollHeight;
          if (scrollRef.current) {
            scrollRef.current.scrollTop = prevScrollTop + scrollDiff;
          }
        });
        isFetchingRef.current = false;
      }
    },
    [roomId]
  );

  useEffect(() => {
    handleMessageList(0);
  }, [handleMessageList]);

  useEffect(() => {
    //맨 처음 스크롤 맨 아래로
    if (pageNum === 0) {
      scrollToBottom();
    }
  }, [messageList]);

  useEffect(() => {
    //stomp 웹소켓 연결
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
            const newChat = JSON.parse(message.body);
            setMessageList((prev) => [...prev, newChat]);
            scrollToBottom();
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
      clearUser();
    };
  }, [roomId]);

  useEffect(() => {
    //메시지 읽음 처리
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

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingRef.current) {
          handleMessageList(pageNum + 1);
        }
      },
      { threshold: 1 }
    );

    const current = topRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [pageNum, hasMore, handleMessageList]);

  const onClickLeftButton = async () => {
    try {
      const res = await deleteChatroom(roomId);
      navigate('/chatlist');
    } catch (err) {
      alert('채팅방 삭제에 실패했습니다.');
      console.error(err);
    }
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getScrollTop = () => {
    return scrollRef.current?.scrollTop || 0;
  };

  const getScrollHeight = () => {
    return scrollRef.current?.scrollHeight || 0;
  };

  return (
    <Wrapper>
      <ChatRoomHeader modalHandler={setIsModalOpen} />
      {course && (
        <AboutRoom
          thumbnail={course.courseImageUrl}
          title={course.title}
          date={`${formatDate(course.recruitStartDate)} ~ ${formatDate(course.recruitEndDate)}`}
        />
      )}

      <ChatContainer
        messageList={messageList}
        topRef={topRef}
        bottomRef={bottomRef}
        scrollRef={scrollRef}
      />
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
