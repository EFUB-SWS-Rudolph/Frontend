import React from 'react';
import MyInfo from '../components/myInfo/MyInfo';
import MyTags from '../components/myTags/MyTags';
import MyPageFooter from '../components/mypagefooter/MyPageFooter';

export default function MyPage() {
  return (
    <>
      <MyInfo /> <MyTags />
      <MyPageFooter />
    </>
  );
}
