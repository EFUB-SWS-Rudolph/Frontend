import axios from 'axios';
import { client } from './client';

export const postLogout = async () => {
  try {
    const res = await client.post('/members/logout');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteMember = async () => {
  try {
    const res = await client.delete('/members/delete');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getReissueToken = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/v1/reissue/access-token`,
      {},
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
