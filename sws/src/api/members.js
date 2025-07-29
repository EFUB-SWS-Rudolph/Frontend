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
