import { client } from './client';

export const getChatroomExists = async (opponentId, courseId = null) => {
  try {
    if (courseId) {
      const res = await client.get(
        `/chat/rooms/exist?opponentId=${opponentId}&courseId=${courseId}`
      );
      console.log(res.data);
      return res.data;
    } else {
      const res = await client.get(`/chat/rooms/exist?opponentId=${opponentId}`);
      console.log(res.data);
      return res.data;
    }
  } catch (err) {
    throw err;
  }
};

export const postChatroom = async (data) => {
  try {
    const res = await client.post(`/chat/rooms`, data);
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getChatroomList = async (category) => {
  try {
    const res = await client.get(`/chat/rooms?category=${category}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getMessageList = async (chatroomId, pageNum, size = 20) => {
  console.log(`${pageNum}페이지 불러오기`);
  try {
    const res = await client.get(`/chat/${chatroomId}/messages?page=${pageNum}&size=${size}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const patchMessageRead = async (chatroomId) => {
  try {
    const res = await client.patch(`/chat/rooms/${chatroomId}/read`);
    console.log(res.status);
  } catch (err) {
    throw err;
  }
};

export const deleteChatroom = async (chatroomId) => {
  try {
    const res = await client.delete(`/chat/rooms/${chatroomId}`);
    console.log(res.data);
  } catch (err) {
    throw err;
  }
};
