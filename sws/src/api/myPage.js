import {client} from './client';

export const getMemberProfile = async() => {
  try {
    const res = await client.get('/members/profile');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const patchMemberProfile = async() => {
  try {
    await client.patch('/members/profile',
      {
        "userId": userId,
        "nickname": nickname,
        "college": college,
        "dept": department,
        "studentId": studentid,
        "location": location,
      }
    )

  } catch (err) {
    throw err;
  }
}

export const patchProfileImg = async() => {
  try {
    await client.patch('/members/profile/image',
      {
        "profileImg": profileImg,
      }
    )

  } catch (err) {
    throw err;
  }
}