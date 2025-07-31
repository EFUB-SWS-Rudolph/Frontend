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

export const getMemberList = async () => {
  try {
    const res = await client.get('/members');
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