// src/hooks/useAlarm.js (최종 수정)

import { useState, useEffect, useCallback } from 'react';
import { getNotifications, markNotificationRead } from '../api/alarm'; 

export const useAlarm = () => {
  const [alarms, setAlarms] = useState([]);
  const [unreadAlarmCount, setUnreadAlarmCount] = useState(0);

  const fetchAlarms = useCallback(async () => {
    try {
      const data = await getNotifications(); 
      setAlarms(data.notifications || []); 
      setUnreadAlarmCount(data.unreadCount || 0); 

      console.log("🟢 useAlarm 훅: 알림 데이터 업데이트 성공!", data.notifications, "읽지 않음:", data.unreadCount);
    } catch (error) {
      console.error("🔴 useAlarm 훅: 알림 데이터 가져오기 실패:", error);
      setAlarms([]);
      setUnreadAlarmCount(0);
    }
  }, []); 

  const markAlarmAsRead = useCallback(async (notificationId) => {
    try {
      await markNotificationRead(notificationId); 
      fetchAlarms(); 
      console.log(`🟢 알림 ${notificationId} 읽음 처리 성공 및 새로고침!`);
    } catch (error) {
        console.error("🔴 useAlarm 훅: 알림 읽음 처리 실패:", error.response?.data?.message || error.message || "알 수 없는 오류");
    }
  }, [fetchAlarms]);
  return { alarms, unreadAlarmCount, markAlarmAsRead, fetchAlarms };
};