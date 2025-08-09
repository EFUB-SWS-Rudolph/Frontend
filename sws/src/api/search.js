// src/api/search.js

import { client } from './client'; 


export const getLecturesByKeyword = async (keyword, page = 0, size = 10) => {
  try {
    console.log(`🟢 API: getLecturesByKeyword 요청 - 키워드: ${keyword}`);
    const response = await client.get('/lectures', { params: { keyword: keyword, page: page, size: size } });
    console.log(`🟢 API: getLecturesByKeyword 응답 - 키워드: ${keyword}, 데이터:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`🔴 API: getLecturesByKeyword 실패 - 키워드: ${keyword}, 오류:`, error.response?.data || error.message);
    throw error;
  }
};

export const getEwhainsByKeyword = async (keyword, page = 0, size = 10) => {
  try {
    console.log(`🟢 API: getEwhainsByKeyword 요청 - 키워드: ${keyword}`);
    const response = await client.get('/members', { params: { keyword: keyword, page: page, size: size } }); // 🔴 /ewhainlist 대신 /members가 맞다면 수정!
    console.log(`🟢 API: getEwhainsByKeyword 응답 - 키워드: ${keyword}, 데이터:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`🔴 API: getEwhainsByKeyword 실패 - 키워드: ${keyword}, 오류:`, error.response?.data || error.message);
    throw error;
  }
};

export const searchAll = async (keyword) => {
  try {
    const response = await client.get(`/search`, { 
      params: { keyword: keyword },
    });
    console.log('🟢 API: searchAll 응답:', response.data); 
    return response.data; 
  } catch (error) {
    console.error("🔴 전체 검색 API 호출 중 오류:", error.response?.data || error.message); // 오류 로깅 강
    return {
      isSuccess: false,
      message: error.response?.data?.message || '검색 중 오류가 발생했습니다.',
      payload: { courses: [], membersByNickname: [], membersByDept: [] }
    };
  }
};
