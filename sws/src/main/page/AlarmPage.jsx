// src/main/pages/AlarmPage.jsx
import React , { useState , useEffect } from 'react';
import styled from 'styled-components';
import { useAlarm } from '../../common/contexts/AlarmContext';
import { useNavigate } from 'react-router-dom';

import IconGiveURL from '../../common/assets/icons/icon_give.svg';
import IconExchangeURL from '../../common/assets/icons/icon_exchange.svg';
import IconCoffeeChatURL from '../../common/assets/icons/icon_coffeechat.svg';
//  styled-components 정의
const AlarmPageContainer = styled.div`
 width: calc(100% + 2rem); 
  height: 100%; 
  margin-left: -1rem; 
  margin-right: -1rem; 
  display: flex;
  flex-direction: column;
  gap:0.5rem; 
  overflow-y: auto; 
  -webkit-overflow-scrolling: touch;
`;

const AlarmItemWrapper = styled.div`
  width: 100% ; 
  padding: 1.25rem 1.5rem 1rem 1.5rem; 
  background-color: ${props => props.$isRead ? '#FFFFFF' : '#E0FCEF'}; 
  border: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem; 
  cursor: pointer;
`;

const AlarmCategoryIcon = styled.div`
  width: 1rem; 
  height: 1rem; 
  flex-shrink: 0;
  aspect-ratio: 1/1; 
  display: inline-flex; 
  align-items: center;
  justify-content: center;
  margin-right:1rem;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const AlarmTitle = styled.div`
  color: var(--Black, #222);
<<<<<<< HEAD
  font-family: "Pretendard Variable";
  font-size: 1rem; 
  font-style: normal;
  font-weight: 600; 
  line-height: normal;
  align-items: center; 
  display: flex;
`;

const AlarmContent = styled.p` 
  color: var(--Black, #222);
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500; 
  line-height: 150%; 
  margin-left: calc(1rem + 1rem); 
`;

const AlarmTime = styled.span` 
  color: var(--Gray-500, #999);
  font-family: "Pretendard Variable";
  font-size: 0.625rem; 
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: auto; 
`;

const NoAlarmMessage = styled.div` 
  color: var(--Gray-500, #999);
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal; 
  font-weight: 600; 
  line-height: normal; 
  letter-spacing: 0rem; 
  width: 100%;
  text-align: center; 
  margin: auto; 
`;
const AlarmItem = ({ alarm, onRead }) => {
  const getAlarmIcon = (category) => {
    switch (category) {
      case 'give': return IconGiveURL;
      case 'exchange': return IconExchangeURL;
      case 'coffeechat': return IconCoffeeChatURL;
      
      default: return IconGiveURL; 
    }
  };
  return (
    <AlarmItemWrapper $isRead={alarm.isRead} onClick={() => onRead(alarm.id)}>
      <AlarmTitle>
        <AlarmCategoryIcon $type={alarm.category}>
          <img src={getAlarmIcon(alarm.category)} alt={`${alarm.category} 아이콘`} />
        </AlarmCategoryIcon>
        {alarm.title}
        <AlarmTime>{alarm.time}</AlarmTime>
      </AlarmTitle>
      <AlarmContent>{alarm.content}</AlarmContent>
      
    </AlarmItemWrapper>
  );
};

//알림 데이터 (임시)
const initialAlarms = [
  {
    id: 1,
    category: "give",
    title: "새로운 댓글이 달렸습니다.",
    content: "퍼비님의 'React 심화' 강의에 댓글이 달렸습니다.",
    time: "2시간 전",
    isRead: false
  },
  {
    id: 2,
    category: "exchange",
    title: "강의 신청이 완료되었습니다.",
    content: "'파이썬 데이터 분석' 강의 신청이 성공적으로 처리되었습니다.",
    time: "어제",
    isRead: false
  },
  {
    id: 3,
    category: "coffeechat",
    title: "시스템 공지",
    content: "서버 점검 예정 안내입니다.자세한 내용은 공지사항을 확인해주세요.",
    time: "2024-07-20",
    isRead: true
  },
  {
    id: 4,
    category: "system", 
    title: "시스템 공지",
    content: "서버 점검 예정 안내입니다. 자세한 내용은 공지사항을 확인해주세요.",
    time: "2024-07-20",
    isRead: true
  },
];
// AlarmPage 함수 컴포넌트 정의
export default function AlarmPage() {
    const { alarms, initializeAlarms, markAlarmAsRead, unreadAlarmCount } = useAlarm();
    const navigate = useNavigate(); 

    useEffect(() => {
        initializeAlarms(initialAlarms);
    }, [initializeAlarms]); 

    const handleAlarmClick = (id) => {
        markAlarmAsRead(id); 
    };
    
    return (
        <AlarmPageContainer>
            {alarms.length > 0 ? (
                alarms.map(alarm => (
                    <AlarmItem key={alarm.id} alarm={alarm} onRead={handleAlarmClick} />
                ))
            ) : (
                <NoAlarmMessage>새로운 소식이 없습니다</NoAlarmMessage>
            )}
        </AlarmPageContainer>
    );
}