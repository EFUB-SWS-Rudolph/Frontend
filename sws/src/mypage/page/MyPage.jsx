import React from 'react';
import { useState } from 'react';
import MyInfo from '../components/myInfo/MyInfo';
import MyTags from '../components/myTags/MyTags';
import MyPageFooter from '../components/mypagefooter/MyPageFooter';
import Header from '../components/mypageHeader/Header';
import MembershipContainer from '../components/membership/membershipContainer';
import ChoiceContainer from '../components/editProfile/ChoiceContainer';
import { useProfileStore } from '../stores/ProfileStore';
import MoveWishList from '../components/wishlist/MoveWishList';

export default function MyPage() {
  const { isOnChoice, isEditing, setIsOnChoice } = useProfileStore();

  const handleOnChoice = () => {
    setIsOnChoice(!isOnChoice);
  };

  return (
    <>
      <Header type="mypage" />
      <MyInfo /> <MyTags />
      <MyPageFooter />
      {!isEditing && 
        <>
          <MoveWishList />

          <MembershipContainer />
        </>
      }

      {isOnChoice && (
        <ChoiceContainer onClose={handleOnChoice} />
      )}
    </>
  );
}
