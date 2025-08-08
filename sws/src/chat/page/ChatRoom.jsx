import styled from 'styled-components';
import AboutRoom from '../components/chatroom/AboutRoom';
import ChatContainer from '../components/chatroom/ChatContainer';
import ChatRoomHeader from '../components/chatroom/ChatRoomHeader';
import ChatInput from '../components/chatroom/InputContainer';
import { ChatModal } from '../components/chatroom/ChatModal';
import { useCallback, useEffect, useRef, useState } from 'react';
import { deleteChatroom, getMessageList, patchMessageRead } from '../../api/chat';
import { postCourseRegister, postCourseCancel, getMyCourses } from '../../api/course';
import { useNavigate, useParams } from 'react-router-dom';
import { useChatStore } from '../stores/useChatStore';
import { formatDate } from '../../utils/formatTime';

import { Client } from '@stomp/stompjs';
import { getUserIdFromToken } from '../../utils/getUserIdFromToken';
import EditModalContainer from '../components/chatroom/modal/EditModalContainer';
import { getEditModalChoices } from '../components/chatroom/modal/getEditModalChoices';
import SelectionCheckModal from '../components/chatroom/modal/SelectionCheckModal';

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

  // Role & 강의 성사 상태
  const [userRole, setUserRole] = useState(null); // "owner" or "student"
  const [isRegistered, setIsRegistered] = useState(false);
  const [isMine, setIsMine] = useState(false);

  // 모달 상태 (Header로 전달)
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [checkModalType, setCheckModalType] = useState(""); // "register" | "cancel" | "agreeCancel" | "exit"
  const [checkModalData, setCheckModalData] = useState(null); // 모달에서 참조용 데이터

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
        console.log("이전대화:", res.messages);  // 대화내역 확인
        updateUserRoleAndRegistration(res.course.courseId);
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

  // 2) 내 강의 목록 조회 후 강의 성사 여부, 내 강의 포함 여부 및 역할("owner"/"student") 판별
  const updateUserRoleAndRegistration = async (courseId) => {
    // 강의 성사 여부 => 수강생의 enrolled에 있는지 course.courseId랑 비교
    // owner/studnet 여부 => 메세지 목록의 courseId가 getMyCourses의 teachingCourses/enrolledCourses에 있는지
    try {
      // owner/student 여부
      const myCoursesData = await getMyCourses();
      const teachingCourses = myCoursesData.payload.teachingCourses || [];  // 개설자인지 학생인지 판별
      const teachingCourseIds = teachingCourses.map(c => c.courseId);  // 내가 개설한 강의 목록
      const owner = teachingCourseIds.includes(courseId);
      setUserRole(owner ? "owner" : "student");
      
      const enrolledCourses = myCoursesData.payload.enrolledCourses || [];  // 강의 성사가 됐는지
      // 강의 성사 여부 -> owner면 상관 없음 / 수강생이면 구분
      const enrolledCourseIds = enrolledCourses.map(c => c.courseId);
      

      const registered = !owner && enrolledCourseIds.includes(courseId);
      setIsRegistered(registered);
      setIsMine(owner || registered);

    } catch (err) {
      console.error('내 강의 정보 조회 실패', err);
    }
  };

  useEffect(() => {
    handleMessageList(0);
  }, [handleMessageList]);

  //////////////////////////////////////////////////////////////////

  // 점 세개 모달 열기/닫기
  const handleEditModalOpen = () => setShowEditModal(true);  // 점 세개 모달 열기
  const handleEditModalClose = () => setShowEditModal(false);  // 모달 닫기

  // 확인 모달 열기/닫기
  const handleCheckModalOpen = (type, data = null) => {
    setCheckModalType(type);
    setCheckModalData(data);
    setShowCheckModal(true);
  };
  const handleCheckModalClose = () => setShowCheckModal(false);

  // 각 모달내 확인 버튼 클릭 시 API/상태 처리 핸들러
  const handleConfirmAction = async () => {
    try {
      if (checkModalType === "register" && course) {
        const res = await postCourseRegister(course.courseId);
        alert(res.message || "강의가 성사되었습니다.");
        setIsRegistered(true);
      } else if (checkModalType === "cancel" && course && checkModalData?.studentId) {
        // 강의 취소 신청 요청
        const res = await postCourseCancel(course.courseId, checkModalData.studentId);
        alert(res.message || "성사 취소 신청 완료되었습니다.");
        // 필요시 상태 업데이트
      } else if (checkModalType === "agreeCancel") {
        // 개설자가 취소 신청 확인 API 호출 (동일 api인지, 별도 api인지 서버 확인 필요)
        // 여기서는 강의취소 api 호출로 대체
        if (course && checkModalData?.studentId) {
          const res = await postCourseCancel(course.courseId, checkModalData.studentId);
          alert(res.message || "성사 취소 완료되었습니다.");
          setIsRegistered(false);
          setIsMine(false);
        }
      } else if (checkModalType === "exit") {
        onClickLeftButton();
        // 채팅방 나가기 처리 (api 또는 router 이동)
        alert("채팅방을 나갑니다.");
        // 예: navigate('/chatlist');
      }
    } catch (err) {
      alert("요청 처리 중 오류가 발생했습니다");
      console.error(err);
    } finally {
      handleCheckModalClose();
    }
  };
//////////////////////////////////////////////////////////////////////
  // 콜백 객체 (Header 에 전달)
  const modalCallbacks = {
    onClickRegisterLecture: () => {
      handleEditModalClose();
      handleCheckModalOpen("register");
    },
    onClickCancelLecture: () => {
      handleEditModalClose();
      // 취소 요청 할 학생 정보 필요 (로그인 유저 id 가 수강자 id라 가정)
      if (userRole === "student") {
        const myId = getUserIdFromToken();
        handleCheckModalOpen("cancel", { studentId: myId });
      } else {
        handleCheckModalOpen("cancel", { studentId: userId });
      }
    },
    onClickExit: () => {
      handleEditModalClose();
      handleCheckModalOpen("exit");
    }
  };

  return (
    <Wrapper>
      <ChatRoomHeader 
        modalHandler={setShowEditModal} 
        showEditModal={showEditModal} 
        choicesProps={{ course, userRole, isRegistered, isMine, callbacks: modalCallbacks }}
      />
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
      {showEditModal && (
        <EditModalContainer
          choices={getEditModalChoices({
            isRegistered,
            isOwner: userRole === "owner",
            isMine,
            callbacks: modalCallbacks
          })}
          onClose={handleEditModalClose}
        />
      )}
      {showCheckModal && (
        <SelectionCheckModal
          type={checkModalType}
          onClose={handleCheckModalClose}
          onConfirm={handleConfirmAction}
        />
      )}
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
