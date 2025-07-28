import axios from 'axios';

export const client = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

client.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      const token = JSON.parse(tokenString);
      config.headers['Authorization'] = `Bearer ${token.accessToken}`;
      if (config.url === '/v1/reissue/access-token') {
        config.headers['Authorization'] = `Bearer ${token.refreshToken}`;
      }
    } else {
      console.log('토큰 없음');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
