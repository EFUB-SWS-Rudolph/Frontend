import { useState } from 'react';
import styled from 'styled-components';
import Exchange from "../../icons/icon_exchange.svg?react";
import Give from "../../icons/icon_give.svg?react";
import Coffeechat from "../../icons/icon_coffeechat.svg?react";
import theme from '../../../styles/theme';
import { useFilterStore } from '../../stores/FilterStore';

export default function UserCard({ user }) {
  // const [users, setUsers] = useState([]);
  const { isgallery } = useFilterStore();

  function available() {
    return (
      <>
        {user.재능기부 && <Give width="16px" height="16px" />}
        {user.재능교환 && <Exchange width="16px" height="16px" />}
        {user.커피챗 && <Coffeechat width="16px" height="16px" />}
      </>
    );
  }

  return (
    <UserCardWrapper $isgallery={isgallery}>
      <ProfileImage src={user.profileimageurl} alt="profileimg" />
      <UserContent $isgallery={isgallery}>
        <UserInfoContent $isgallery={isgallery}>
          <Nickname>{user.nickname}</Nickname>
          <UnivInfoContent>
            {user.studentid ? 
              (
                <>
                  {user.studentid}학번 <span>|</span> {user.major}
                </>
              )
              : user.major
            }
          </UnivInfoContent>
        </UserInfoContent>
        <UserTalent $isgallery={isgallery}>{user.talent}</UserTalent>
        {isgallery && <UserLocation>{user.location}</UserLocation>}
      </UserContent>
      <AvailableSection $isgallery={isgallery}>{available()}</AvailableSection>
    </UserCardWrapper>
  );
}

const UserCardWrapper = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 12px;
  display: flex;
  flex-direction: ${({$isgallery}) => 
    $isgallery ? "column" : "row"
  };
  width: ${({$isgallery}) => 
    $isgallery ? "168px" : "100%"
  };
  height: ${({$isgallery}) => 
    $isgallery ? "184px" : "70px"
  };
  padding: ${({$isgallery}) => 
    $isgallery ? "13px 10px 10px" : "10px"
  };
  margin: 10px;
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
`;

const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  margin-bottom: 0;
`;

const UserInfoContent = styled.div`
  display: flex;
  flex-direction: ${({$isgallery}) => 
    $isgallery ? "column" : "row"
  };
  align-items: ${({$isgallery}) => 
    $isgallery ? "default" : "center"
  };
  justify-content: ${({$isgallery}) => 
    $isgallery ? "default" : "center"
  };
  gap: 3px;
  margin-left: ${({$isgallery}) => $isgallery ? "0px" : "2px"};
  margin-top: ${({$isgallery}) => $isgallery ? "5px" : "0px"};
  margin-bottom: 0px;
  font-family: ${({ theme }) => theme.fonts.display.caption.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.caption.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.caption.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.caption.medium.lineHeight};
`;

const Nickname = styled.div`
  color: #000;
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
`;

const UnivInfoContent = styled.div`
  color: #5d5d5d;
  font-family: ${({ theme }) => theme.fonts.display.body.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.small.lineHeight};
  span {
    color: #e0e0e0;
  }
`;

const UserTalent = styled.div`
  margin-left: ${({$isgallery}) => $isgallery ? "0px" : "5px"};
  font-family: ${({ theme }) => theme.fonts.display.body.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.small.lineHeight};
  color: #5d5d5d;
`;

const UserLocation = styled.div`
  color: #5d5d5d;
  margin-top: 3px;
  font-family: ${({ theme }) => theme.fonts.display.body.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.small.lineHeight};
`;

const AvailableSection = styled.div`
  position: absolute;
  display: flex;
  gap: 5px;
  align-items: center;
  top: ${({$isgallery}) => $isgallery ? "10px" : "15px"};
  right: ${({$isgallery}) => $isgallery ? "10px" : "10px"};
`;