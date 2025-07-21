// src/main/pages/AlarmPage.jsx
import React , { useState } from 'react';
import styled from 'styled-components';

import IconGiveURL from '../../common/assets/icons/icon_give.svg';
import IconExchangeURL from '../../common/assets/icons/icon_exchange.svg';
import IconCoffeeChatURL from '../../common/assets/icons/icon_coffeechat.svg';
//  styled-components 정의
const AlarmPageContainer = styled.div`
  width: 100%;
  height: 100%; 
  display: flex;
  flex-direction: column;
  gap:8px;
`;
const AlarmItem = styled.div`
  width: calc(100% + (2 * 16px)); 
  margin-left: -16px; 
  margin-right: -16px; 
  padding: 15px 15px 15px 24px; 
  background-color: #FFFFFF;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  &:hover {
    background: var(--Fourth, #E0FCEF);
  }
`;
const AlarmCategoryIcon = styled.div`
  width: 16px; 
  height: 16px; 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; 
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const AlarmTitle = styled.div`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #222222;
  display: flex;
  align-items: center;
  gap: 12px;
`;
const AlarmContent = styled.div`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #555;
  margin-left: 30px; 
  padding-right: 15px;
`;
const AlarmTime = styled.div`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 300;
  font-size: 12px;
  color: #999;
  text-align: right;
  margin-left: 30px; 
  padding-right: 15px; 
`;
const NoAlarmMessage = styled.div` 
  width: 100%;
  text-align: center;
  padding: 50px 0;
  color: #888;
  font-size: 16px;
  margin-top: auto; 
  margin-bottom: auto; 
`;
//알림 데이터 (임시)
const initialAlarms = [
  {
    id: 1,
    category: "give",
    title: "새로운 댓글이 달렸습니다.",
    content: "퍼비님의 'React 심화' 강의에 댓글이 달렸습니다.",
    time: "2시간 전"
  },
  {
    id: 2,
    category: "exchange",
    title: "강의 신청이 완료되었습니다.",
    content: "'파이썬 데이터 분석' 강의 신청이 성공적으로 처리되었습니다.",
    time: "어제"
  },
  {
    id: 3,
    category: "coffeechat",
    title: "시스템 공지",
    content: "서버 점검 예정 안내입니다. 자세한 내용은 공지사항을 확인해주세요.",
    time: "2024-07-20"
  },
  {
    id: 4,
    category: "system", 
    title: "시스템 공지",
    content: "서버 점검 예정 안내입니다. 자세한 내용은 공지사항을 확인해주세요.",
    time: "2024-07-20"
  },
];
// AlarmPage 함수 컴포넌트 정의
export default function AlarmPage() {
    const [alarms, setAlarms] = useState(initialAlarms);

    const getAlarmIcon = (category) => {
    switch (category) {
      case 'give': return IconGiveURL;
      case 'exchange': return IconExchangeURL;
      case 'coffeechat': return IconCoffeeChatURL;
      default: return IconGiveURL; 
    }
  };
  const handleAlarmClick = (idToDelete) => {
    setAlarms(prevAlarms => prevAlarms.filter(alarm => alarm.id !== idToDelete));
  };
  return (
    <AlarmPageContainer>
      {alarms.length > 0 ? (
        alarms.map(alarm => (
          <AlarmItem key={alarm.id} onClick={() => handleAlarmClick(alarm.id)}>
            <AlarmTitle>
                 <AlarmCategoryIcon>
                <img src={getAlarmIcon(alarm.category)} alt={`${alarm.category} 아이콘`} />
              </AlarmCategoryIcon>
                {alarm.title}</AlarmTitle>
            <AlarmContent>{alarm.content}</AlarmContent>
            <AlarmTime>{alarm.time}</AlarmTime>
          </AlarmItem>
        ))
      ) : (
        <NoAlarmMessage>새로운 소식이 없습니다</NoAlarmMessage>
      )}
    </AlarmPageContainer>
  );
}