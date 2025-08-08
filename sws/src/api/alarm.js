// src/api/notification.js (수정)

import api from './api'; 

export const getNotifications = async () => {
  try {
    const response = await api.get('/notification'); 
    console.log('🟢 API: 알림 목록 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('🔴 API: 알림 목록 조회 실패:', error.response?.data?.message || error.message || "알 수 없는 오류");
    throw error;
  }
};

export const markNotificationRead = async (notificationId) => {
  try {
    const response = await api.patch(`/notification/${notificationId}/read`); 
    console.log(`🟢 API: 알림 ${notificationId} 읽음 처리 성공:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`🔴 API: 알림 ${notificationId} 읽음 처리 실패:`, error.response?.data?.message || error.message || "알 수 없는 오류");
    throw error;
  }
};