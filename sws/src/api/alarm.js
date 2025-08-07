
import { client } from './client';
export const getNotificationList = async () => {
  try {
    const response = await  client.get('/notification'); 
    return response.data; 
  } catch (error) {
    console.error("알림 목록 조회 실패:", error);
    throw error; 
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await  client.patch(`/notification/${notificationId}/read`);
    return response.data; 
  } catch (error) {
    console.error(`알림 (ID: ${notificationId}) 읽음 처리 실패:`, error);
    throw error;
  }
};