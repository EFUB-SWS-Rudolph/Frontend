import { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import EXCHANGE from "../../../common/assets/icons/icon_exchange_black.svg?react";
import GIVE from "../../icons/icon_give.svg?react";
import COFFEECHAT from "../../../common/assets/icons/icon_coffeechat_black.svg?react";
import { getMemberIndividual } from '../../../api/members';
import defaultImage from '../../icons/defaultImage.jpg';

export default function UserProfileCard({ id }) {
  const [user, setUser] = useState(null);

  const readMemberIndividual = async ({ id }) => {
    try {
      const res = await getMemberIndividual(id);
      console.log("API 응답: ", res);
      setUser(res);
      console.log("프로필 url: ", res.profileImage);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    readMemberIndividual({ id });
  }, [id]);

  if (!user) {
    return null;
  }

  return (
    <UserProfileWrapper>
      {/* src={user.prifileimgurl */}
      {(user.profileImage && user.profileImage !== "/images/스크린샷 2025-07-20 오전 1.33.39.png") ? <ProfileImage src={user.profileImage} alt="profileimg" /> : 
        <ProfileImage src={defaultImage} alt="profileimg" />}
      <UserNickname>{user.nickName}</UserNickname>
      <UserAvailable>
        {/* user.give user.exchange user.coffeechat === "on" */}
        {user.donation && <GIVE width="1rem" height="1rem" aspect-ratio="1/1" />}
        {user.exchange && <EXCHANGE width="1rem" height="1rem" aspect-ratio="1/1" />}
        {user.coffeeChat && <COFFEECHAT width="1rem" height="1rem" aspect-ratio="1/1" />}
      </UserAvailable>
      {user.studentId ? 
        <UserUnivInfo>
          <UserStudentId>{user.studentId.slice(0, 2)}학번</UserStudentId>
          <Partition>|</Partition>
          <UserDept>{user.department}</UserDept>
          {/* {user.studentId}학번 <span>|</span> {user.department} */}
        </UserUnivInfo>
        :
        <UserUnivInfo>
          <UserStudentId>비공개</UserStudentId>
          <Partition>|</Partition>
          <UserDept>{user.department}</UserDept>
          {/* 비공개 <span>|</span> {user.department} */}
        </UserUnivInfo>
      }
      <UserLocation>{user.location}</UserLocation>
    </UserProfileWrapper>
  );
}

const UserProfileWrapper = styled.div`
  display: flex;
  width: 24.375rem;
  height: 15.25rem;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

const ProfileImage = styled.img`
  width: 6.5rem;
  height: 6.5rem;
  flex-shrink: 0;
  border-radius: 6.5rem;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  box-shadow: 1px 1px 7px 0 rgba(0, 0, 0, 0.25);
`;

const UserNickname = styled.div`
  font-family: ${({ theme }) => theme.fonts.display.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.large.lineHeight};
  color: ${({ theme }) => theme.colors.black}; 
  text-align: center;
`;

const UserAvailable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
`;

const UserUnivInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
`;

const UserStudentId = styled.div`
  color: var(--Black, #222);
  text-align: center;

  /* Body/Medium */
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.3125rem */
`;

const Partition = styled.div`
  color: ${({ theme }) => theme.colors.gray300};
  text-align: center;

  /* Body/Medium */
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.3125rem */
`;

const UserDept = styled.div`
  color: var(--Black, #222);

  /* Body/Medium */
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.3125rem */
`;

const UserLocation = styled.div`
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
  color: ${({ theme }) => theme.colors.black}; 
`;

