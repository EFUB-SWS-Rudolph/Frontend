import styled from 'styled-components';
import theme from '../../../styles/theme';
import EXCHANGE from "../../icons/icon_exchange.svg?react";
import GIVE from "../../icons/icon_give.svg?react";
import COFFEECHAT from "../../icons/icon_coffeechat.svg?react";

export default function UserProfileCard({ id }) {
  const userGive = true;
  const userExchange = true;
  const userCoffeechat = true;
  const userStudentId = true;

  return (
    <UserProfileWrapper>
      {/* src={user.prifileimgurl */}
      <ProfileImage src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqyxfxX8QSTvO1ULBKz6IK_KKsMFoiOr9LxoMYKTdAkbIpHxHC" alt="user profile img" />
      <UserNickname>닉네임</UserNickname>
      <UserAvailable>
        {/* user.give user.exchange user.coffeechat === "on" */}
        {userGive && <GIVE width="1rem" height="1rem" aspect-ratio="1/1" />}
        {userExchange && <EXCHANGE width="1rem" height="1rem" aspect-ratio="1/1" />}
        {userCoffeechat && <COFFEECHAT width="1rem" height="1rem" aspect-ratio="1/1" />}
      </UserAvailable>
      {userStudentId ? 
        <UserUnivInfo>
          24학번 <span>|</span> 컴퓨터공학과
        </UserUnivInfo>
        :
        <UserUnivInfo>
          비공개 <span>|</span> 컴퓨터공학과
        </UserUnivInfo>
      }
      <UserLocation>서울 서대문구</UserLocation>
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
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
  color: ${({ theme }) => theme.colors.black}; 
  span {
    color: ${({ theme }) => theme.colors.gray300};
  }
  gap: 0.25rem;
`;

const UserLocation = styled.div`
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
  color: ${({ theme }) => theme.colors.black}; 
`;

