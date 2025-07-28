import React from 'react';
import { useState } from 'react';
import MyInfo from '../components/myInfo/MyInfo';
import MyTags from '../components/myTags/MyTags';
import MyPageFooter from '../components/mypagefooter/MyPageFooter';
import Header from '../components/mypageHeader/header';
import MembershipContainer from '../components/membership/membershipContainer';
import ChoiceContainer from '../components/editProfile/ChoiceContainer';

export default function MyPage() {
  const [isChoiceOpen, setIsChoiceOpen] = useState(true);

  return (
    <>
      <Header />
      <MyInfo /> <MyTags />
      <MyPageFooter />
      <MembershipContainer />

      {isChoiceOpen && (
        <ChoiceContainer onClose={() => setIsChoiceOpen(!isChoiceOpen)} />
      )}
    </>
  );
}
