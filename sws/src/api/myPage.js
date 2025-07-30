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
        "nickname": nickname,
        "dept": department,
        "studnetId": studentid,
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

export const patchProfileImg = async() => {
  try {
    await client.patch('/members/profile/image',
      {
        "profileImg": profileImg,  // 프로필 file(jpg, png 등) 보내기
      }
    )

  } catch (err) {
    throw err;
  }
};

export const putTalentTag = async() => {
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
