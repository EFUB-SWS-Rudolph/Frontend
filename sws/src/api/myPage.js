import {client} from './client';
import { useProfileStore } from '../mypage/stores/ProfileStore';
const { nickname, department, studentid, location, exchange, coffeechat, donation, profileImg } = useProfileStore();

export const getMemberProfile = async() => {
  try {
    const res = await client.get('/members/profile');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getMemberTalent = async() => {
  try {
    const res = await client.get('/members/talent');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getMemberInterest = async() => {
  try {
    const res = await client.get('/members/interest');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const patchMemberProfile = async({
  nickname,
  department,
  studentid,
  location,
  exchange,
  coffeechat,
  donation,
}) => {
  try {
    await client.patch('/members/profile',
      {
        "nickname": nickname,
        "dept": department,
        "studentId": studentid,
        "location": location,
        "isExchange": exchange,
        "isCoffeeChat": coffeechat,
        "isSkillDonation": donation,
      }
    )

  } catch (err) {
    throw err;
  }
}

// profileImg: 파일 객체
// 사용 예시 (예: 파일 업로드 onChange 이벤트에서)
// const file = e.target.files[0];
// await patchProfileImg({ profileImg: file });

export const patchProfileImg = async({ profileImg }) => {
  try {
    const formData = new FormData();
    formData.append('profileImg', profileImg);
    
    await client.patch('/members/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {
    throw err;
  }
};

export const putTalentTag = async({ tag1, tag2, tag3 }) => {
  try {
    await client.put('/members/talent',
      {
        "tag1": tag1,
        "tag2": tag2,
        "tag3": tag3
      }
    )
  } catch (err) {
    throw err;
  }
};

export const putInterestTag = async({ tag1, tag2, tag3 }) => {
  try {
    await client.put('/members/interest',
      {
        "tag1": tag1,
        "tag2": tag2,
        "tag3": tag3
      }
    )
  } catch (err) {
    throw err;
  }
};

export const getWishlist = async() => {
  try {
    await client.get('/members/wishlist-courses')
  } catch (err) {
    throw err;
  }
};
