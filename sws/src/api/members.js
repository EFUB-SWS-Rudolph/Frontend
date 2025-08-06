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

export const getMemberList = async (params) => {
  try {
    const res = await client.get('/members', { params });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getMemberIndividual = async (memberId) => {
  try {
    const res = await client.get(`/members/${memberId}`);
    return res.data;
  } catch (err) {
    throw err;
  }

};

export const getFilteredSeniorList = async (myDepartment, myMemberId) => {
  try {
    const allMembers = await getMemberList();
    
    const filteredSenors = (allMembers || []) 
      .filter(member => {
        const isSameDepartment = myDepartment && member.department === myDepartment; 
        
        const isNotSelf = member.memberId !== myMemberId;

        return isSameDepartment && isNotSelf;
      })
      .sort((a, b) => b.memberId - a.memberId) 

      .slice(0, 3); 

    console.log("필터링된 선배 목록 (학과 필터 적용 후):", filteredSenors); 
    return filteredSenors;
  } catch (error) {
    console.error("필터링된 선배 목록 조회 실패:", error.response?.data?.message || error.message || "알 수 없는 오류");
    throw error;
  }
};