// src/common/contexts/AlarmContext.jsx 

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getNotificationList, markNotificationAsRead as callMarkNotificationAsReadAPI } from '../../api/alarm'; 

const AlarmContext = createContext(null);

export const useAlarm = () => {
  const context = useContext(AlarmContext);
  
  console.log("DEBUG: useAlarm() hook useContext(AlarmContext) 반환값:", context);

  if (!context) {
    console.error("오류: useAlarm 훅은 AlarmProvider 내에서 사용되어야 합니다. 현재 Context:", context);
    throw new Error('useAlarm must be used within an AlarmProvider');
  }
  return context;
};

export const AlarmProvider = ({ children }) => {
  const [alarms, setAlarms] = useState([]);
  const [unreadAlarmCount, setUnreadAlarmCount] = useState(0);

  const initializeAlarms = useCallback(async () => {
    try {
      const data = await getNotificationList(); 

      if (data && Array.isArray(data.notifications)) { 
          const notifications = data.notifications;
          const unreadCount = data.unreadCount;

          const sortedData = [...notifications].sort( (a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setAlarms(sortedData);
          setUnreadAlarmCount(unreadCount); 

          console.log("🟢 알림 목록 초기화 성공! 총 알림:", sortedData.length, "읽지 않은 알림:", unreadCount);

      } else {
          console.error("🔴 Context 알림 목록 초기화 실패: 예상치 못한 응답 형태. 받은 데이터:", data);
          setAlarms([]);
          setUnreadAlarmCount(0);
      }

    } catch (error) {
      console.error("🔴 Context 알림 목록 API 호출 오류:", error.response?.data?.message || error.message || "네트워크 오류");
      setAlarms([]);
      setUnreadAlarmCount(0);
    }
  }, []);

  const markAlarmAsRead = useCallback(async (notificationId) => {
    try {
      await callMarkNotificationAsReadAPI(notificationId);
      setAlarms( (prevAlarms) => {
        const updatedAlarms = prevAlarms.map( (alarm) => alarm.notificationId === notificationId ? {
            ...alarm,
            read: true
        } : alarm);
        const newUnreadCount = updatedAlarms.filter( (alarm) => !alarm.read).length;
        setUnreadAlarmCount(newUnreadCount);
        console.log(`알림 (ID: ${notificationId}) 읽음 상태로 API 전송 성공`);
        return updatedAlarms;
      });
    } catch (error) {
      console.error(`알림 (ID: ${notificationId}) 읽음 처리 API 호출 실패:`, error.response?.data?.message || error.message || "네트워크 오류");
    }
  }, []);

  const markAllAlarmsAsRead = useCallback( () => {
    setAlarms( (prevAlarms) => {
        const updatedAlarms = prevAlarms.map( (alarm) => ({
            ...alarm,
            read: true
        }));
        setUnreadAlarmCount(0);
        return updatedAlarms;
    });
  }, []);

  useEffect( () => {
    initializeAlarms();
  }, [initializeAlarms]);

  const value = {
    alarms,
    unreadAlarmCount,
    initializeAlarms,
    markAlarmAsRead,
    markAllAlarmsAsRead
  };

  return (
    <AlarmContext.Provider value={value}>
      {children}
    </AlarmContext.Provider>
  );
};