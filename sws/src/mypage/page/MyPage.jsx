import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
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
      <HeaderSpace>
        <Header type="mypage" />
      </HeaderSpace>
      <Content>
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
      </Content>
    </>
  );
}

const HeaderSpace = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;