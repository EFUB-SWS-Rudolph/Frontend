import styled from 'styled-components';
import EXCHANGE from "../icons/icon_exchange.svg?react";
import GIVE from "../icons/icon_give.svg?react";
import COFFEECHAT from "../icons/icon_coffeechat.svg?react";
import theme from '../../../styles/theme';
import { useFilterStore } from '../../stores/FilterStore';

export default function UserCard({ user }) {
  // const [users, setUsers] = useState([]);
  const { isgallery } = useFilterStore();

  function available() {
    return (
      <>
        {user.재능기부 && <GIVE width="1rem" height="1rem" aspect-ratio="1/1" />}
        {user.재능교환 && <EXCHANGE width="1rem" height="1rem" aspect-ratio="1/1" />}
        {user.커피챗 && <COFFEECHAT width="1rem" height="1rem" aspect-ratio="1/1" />}
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
  flex-shrink: 0;
  border-radius: 1rem;
  border: 1px solid var(--Gray-300, #D9D9D9);
  background: var(--White, #FFF);
  align-self: ${({ $isgallery }) => 
    $isgallery ? "default" : "stretch"
  };
  position: relative;
  display: flex;
  flex-direction: ${({$isgallery}) => 
    $isgallery ? "column" : "row"
  };
  width: ${({$isgallery}) => 
    $isgallery ? "10.5rem" : "21.87rem"
  };
  height: ${({$isgallery}) => 
    $isgallery ? "11.5rem" : "5rem"
  };
  padding: ${({$isgallery}) => 
    $isgallery ? "0.75rem" : "0.75rem 1rem 0.75rem 0.75rem"
  };
`;

const ProfileImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  flex-shrink: 0;
  border-radius: 3.5rem;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  box-shadow: 1px 1px 7px 0 rgba(0, 0, 0, 0.25);
`;

const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ $isgallery }) => 
    $isgallery ? "9rem" : "12rem"
  };
  gap: 0.5rem;
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
  gap: ${({$isgallery}) => 
    $isgallery ? "0.5" : "0.69rem"
  };
`;

const Nickname = styled.div`
  color: #000;
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const UnivInfoContent = styled.div`
  color: #5D5D5D;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 150px;
  span {
    color: #e0e0e0;
  }
`;

const UserTalent = styled.div`
  color: #5D5D5D;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 10.5rem;
`;

const UserLocation = styled.div`
  width: 7.6875rem;
  color: #5D5D5D;
  font-family: "Pretendard Variable";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const AvailableSection = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.3125rem;
  position: absolute;
  top: ${({$isgallery}) => $isgallery ? "15px" : "18px"};
  right: ${({$isgallery}) => $isgallery ? "10px" : "10px"};
`;