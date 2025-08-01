import axios from 'axios';
import { client } from './client';

export const getAccessToken = async (provider, code) => {
  try {
    const res = await client.post(`/auth/login/${provider}`, {
      code,
    });

    console.log(res.data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

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
    const tokenString = localStorage.getItem('token');
    const token = tokenString ? JSON.parse(tokenString) : null;

    if (!token?.refreshToken) {
      throw new Error('리프레시 토큰 없음');
    }
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/v1/reissue/access-token`,
      { refreshToken: token.refreshToken },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
