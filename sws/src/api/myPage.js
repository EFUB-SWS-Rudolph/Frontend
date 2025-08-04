import {client} from './client';

export const getMemberProfile = async() => {
  try {
    const res = await client.get('/members/profile');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getMemberTag = async() => {
  try {
    const res = await client.get('/members/profile/tags');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const patchMemberProfile = async({
  nickname,
  college,
  department,
  studentid,
  location,
  exchange,
  coffeechat,
  donation,
}) => {
  try {
    await client.patch('/members/profile/basic',
      {
        nickname,
        college,
        department,
        studentid,
        location,
        isExchange: exchange,
        isCoffeeChat: coffeechat,
        isSkillDonation: donation,
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
    formData.append('image', profileImg);
    
    await client.patch('/members/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {
    throw err;
  }
};

export const putTalentTag = async({ talentTags }) => {
  try {
    await client.put('/members/talent',
      {
        "tagNames": talentTags.tag
      }
    )
  } catch (err) {
    throw err;
  }
};

export const putInterestTag = async({ interestTags }) => {
  try {
    await client.put('/members/interest',
      {
        "tagNames": interestTags.tag
      }
    )
  } catch (err) {
    throw err;
  }
};

export const getWishlist = async() => {
  try {
    const res = await client.get('/course/bookmark');
    return res.data;
  } catch (err) {
    throw err;
  }
};
