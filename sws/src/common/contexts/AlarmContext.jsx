// src/common/contexts/AlarmContext.jsx

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AlarmContext = createContext(null);

export const useAlarm = () => {
  const context = useContext(AlarmContext);
  if (!context) {
    throw new Error('useAlarm must be used within an AlarmProvider');
  }
  return context;
};

export const AlarmProvider = ({ children }) => {
  const [alarms, setAlarms] = useState([]); 
  const [unreadAlarmCount, setUnreadAlarmCount] = useState(0); 

  // 컴포넌트 마운트 시 알림 목록을 초기화하고, 미확인 알림 개수를 계산합니다.
  const initializeAlarms = useCallback((initialData) => {
    // ID 기준으로 최신순 정렬 (ID가 클수록 최근 알림이라고 가정)
    const sortedData = [...initialData].sort((a, b) => b.id - a.id); 
    setAlarms(sortedData);
    const count = sortedData.filter(alarm => !alarm.isRead).length;
    setUnreadAlarmCount(count);
  }, []);

  // 특정 알림을 읽음 상태로 변경
  const markAlarmAsRead = useCallback((id) => {
    setAlarms(prevAlarms => {
      const updatedAlarms = prevAlarms.map(alarm =>
        alarm.id === id ? { ...alarm, isRead: true } : alarm
      );
      // 읽지 않은 알림 개수 재계산 (최적화)
      const newUnreadCount = updatedAlarms.filter(alarm => !alarm.isRead).length;
      setUnreadAlarmCount(newUnreadCount);
      return updatedAlarms;
    });
  }, []);

  // 모든 알림을 읽음 상태로 변경
  const markAllAlarmsAsRead = useCallback(() => {
    setAlarms(prevAlarms => {
      const updatedAlarms = prevAlarms.map(alarm => ({ ...alarm, isRead: true }));
      setUnreadAlarmCount(0);
      return updatedAlarms;
    });
  }, []);
  // 알림 개수 업데이트 함수
  const setAlarmsChecked = (countReduction = 1) => {
    setUnreadAlarmCount(prevCount => Math.max(0, prevCount - countReduction));
  };

  // 외부에서 알림 개수를 직접 설정할 수 있도록 (예: 로그인 후 서버 응답)
  const initializeAlarmCount = (count) => {
    setUnreadAlarmCount(count);
  }

  const value = {
    alarms,               // 모든 알림 목록
    unreadAlarmCount,     // 미확인 알림 개수
    initializeAlarms,     // 초기 알림 설정 및 개수 계산
    markAlarmAsRead,      // 특정 알림 읽음 처리
    markAllAlarmsAsRead,  // 모든 알림 읽음 처리
  };

  return (
    <AlarmContext.Provider value={value}>
      {children}
    </AlarmContext.Provider>
  );
};