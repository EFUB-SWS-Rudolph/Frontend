import { client } from './client';

export const postLecture = async (formData) => {
  try {
    console.log('FormData 내용 출력:', formData);
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await client.post('/course', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response, 'success');
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getLectureDetail = async (courseId) => {
  try {
    const response = await client.get(`/course/${courseId}`);
    console.log(`강의 상세 조회 성공 (ID: ${courseId}):`, response.data);
    return response.data;
  } catch (error) {
    console.error(`강의 상세 조회 실패 (ID: ${courseId}):`, error);
    throw error;
  }
};
export const getLectureList = async (params = {}) => {
  try {
    const response = await client.get(`/course`, { params });
    console.log('강의 목록 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('강의 목록 조회 실패:', error);
    throw error;
  }
};
export const getMyCourses = async () => {
  try {
    const response = await client.get(`/course/mine`);
    console.log('내 강의 목록 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('내 강의 목록 조회 실패:', error);
    throw error;
  }
};
export const getRecommendedLectures = async (params = {}) => {
  try {
    const response = await client.get(`/course/recommend`, { params });
    console.log('강의 추천 목록 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('강의 추천 목록 조회 실패:', error);
    throw error;
  }
};
