// src/common/contexts/AlarmContext.jsx (수정)

import React, { createContext, useContext, useState, useCallback } from 'react';
import { getNotifications, markNotificationRead } from '../../api/alarm'; 

const AlarmContext = createContext(null);

export const AlarmProvider = ({ children }) => {
  const [alarms, setAlarms] = useState([]);
  const [unreadAlarmCount, setUnreadAlarmCount] = useState(0);

  const initializeAlarms = useCallback(async () => {
    try {
      const response = await getNotifications(); 
      if (response.code === '200' && response.notifications) { 
        setAlarms(response.notifications); 
        setUnreadAlarmCount(response.unreadCount || 0); 
        console.log('🟢 알림 목록 초기화 성공! 총 알림:', response.notifications.length, '읽지 않은 알림:', response.unreadCount);
      } else {
          console.error('🔴 알림 목록 초기화 실패: ', response.message || '데이터 없음');
      }
    } catch (error) {
      console.error('🔴 Context 알림 목록 API 호출 오류:', error.message || error);
    }
  }, []);

  const markAlarmAsRead = useCallback(async (notificationId) => {
    try {
      await markNotificationRead(notificationId);
      
      setAlarms((prevAlarms) =>
        prevAlarms.map((alarm) =>
          alarm.notificationId === notificationId ? { ...alarm, read: true } : alarm 
        )
      );
      setUnreadAlarmCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
      console.log(`🟢 알림 ${notificationId} 읽음 처리 완료.`);
    } catch (error) {
      console.error('🔴 Context 알림 읽음 처리 실패:', error.response?.data?.message || error.message || error);
    }
  }, []);

  const value = {
    alarms,
    unreadAlarmCount,
    initializeAlarms,
    markAlarmAsRead,
  };

  return <AlarmContext.Provider value={value}>{children}</AlarmContext.Provider>;
};

export const useAlarm = () => {
  const context = useContext(AlarmContext);
  if (!context) {
    throw new Error('useAlarm must be used within an AlarmProvider');
  }
  return context;
};