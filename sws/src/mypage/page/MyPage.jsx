import React from 'react';
import MyInfo from '../components/myInfo/MyInfo';
import MyTags from '../components/myTags/MyTags';
import MyPageFooter from '../components/mypagefooter/MyPageFooter';
import Header from '../components/mypageHeader/header';

export default function MyPage() {
  return (
    <>
      <Header />
      <MyInfo /> <MyTags />
      <MyPageFooter />
    </>
  );
}
