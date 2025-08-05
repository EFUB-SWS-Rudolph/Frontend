import { client } from './client';

export const postMemberInfo = async (data) => {
  try {
    console.log(data);
    const res = await client.post('/members/info', data);
    return res.data;
  } catch (err) {
    throw err;
  }
};
export const getMemberList = async (params = {}) => {
    try {
        const response = await client.get(`/members`, { params }); 
        console.log("이화인 목록 조회 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("이화인 목록 조회 실패:", error);
        throw error;
    }
};