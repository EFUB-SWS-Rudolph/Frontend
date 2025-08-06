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
  width: 100%; 
  height: 100%; 
  display: flex;
  flex-direction: column;
  gap:0.5rem; 
  overflow-y: auto; 
  -webkit-overflow-scrolling: touch;
  padding:1rem 0 0 0;
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
 padding: 1.25rem 1.5rem 1rem 1.5rem; 
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
      case 'GIVE': return IconGiveURL; 
      case 'EXCHANGE': return IconExchangeURL;
      case 'COFFEECHAT': return IconCoffeeChatURL;
      default: return IconGiveURL; 
    }
  };
  return (
    <AlarmItemWrapper $isRead={alarm.read} onClick={() => onRead(alarm.notificationId)}>
      <AlarmTitle>
        <AlarmCategoryIcon $type={alarm.category}>
          <img src={getAlarmIcon(alarm.category)} alt={`${alarm.category} 아이콘`} />
        </AlarmCategoryIcon>
        {alarm.title}
        <AlarmTime>{new Date(alarm.createdAt).toLocaleString()}</AlarmTime>
      </AlarmTitle>
      <AlarmContent>{alarm.content}</AlarmContent>
    </AlarmItemWrapper>
  );
};

export default function AlarmPage() {
    const { alarms, unreadAlarmCount, initializeAlarms, markAlarmAsRead } = useAlarm(); 
    const navigate = useNavigate();
    useEffect(() => {
        initializeAlarms();
    }, [initializeAlarms]);

    const handleAlarmClick = (notificationId) => { 
        markAlarmAsRead(notificationId);
    };

    if (alarms.length === 0) return <NoAlarmMessage>새로운 소식이 없습니다</NoAlarmMessage>; 

    return (
        <AlarmPageContainer>
            {alarms.map(alarm => (
                <AlarmItem key={alarm.notificationId} alarm={alarm} onRead={handleAlarmClick} />
            ))}
        </AlarmPageContainer>
    );
}