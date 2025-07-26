import styled from 'styled-components';
import theme from '../../../styles/theme';
import EXCHANGE from "../icons/icon_exchange.svg?react";
import GIVE from "../icons/icon_give.svg?react";
import COFFEECHAT from "../icons/icon_coffeechat.svg?react";

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
        {userGive && <GIVE />}
        {userExchange && <EXCHANGE />}
        {userCoffeechat && <COFFEECHAT />}
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
  width: 390px;
  height: 244px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 104px;
  height: 104px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
`;

const UserNickname = styled.div`
  font-family: ${({ theme }) => theme.fonts.display.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.large.lineHeight};
  color: ${({ theme }) => theme.colors.black}; 
`;

const UserAvailable = styled.div`
  display: flex;
  justify-content: space-between;
  width: 88px;
  height: 16px;
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
`;

const UserLocation = styled.div`
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
  color: ${({ theme }) => theme.colors.black}; 
`;

