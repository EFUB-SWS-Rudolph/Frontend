import { getNotifications, markNotificationRead } from '../api/notification'; // 🔴 API 함수들 임포트

export const useAlarm = () => {
  const [alarms, setAlarms] = useState([]);
  const [unreadAlarmCount, setUnreadAlarmCount] = useState(0);
  const fetchAlarms = useCallback(async () => {
    try {
      const data = await getNotifications(); // 🔴 API 함수 호출
      
      setAlarms(data.notifications || []); 
      setUnreadAlarmCount(data.unreadCount || 0); 

      console.log("🟢 useAlarm 훅: 알림 데이터 업데이트 성공!", data.notifications, "읽지 않음:", data.unreadCount);
    } catch (error) {
      console.error("🔴 useAlarm 훅: 알림 데이터 가져오기 실패:", error);
      setAlarms([]);
      setUnreadAlarmCount(0);
    }
  }, []); 

  const markAlarmAsRead = useCallback(async (alarmId) => {
    try {
      await markNotificationRead(alarmId); // 🔴 API 함수 호출
      fetchAlarms(); 
    } catch (error) {
        console.error("🔴 useAlarm 훅: 알림 읽기 가져오기 실패:", error);
    }
  }, [fetchAlarms]);

  return { alarms, unreadAlarmCount, initializeAlarms, markAlarmAsRead, fetchAlarms };
};
