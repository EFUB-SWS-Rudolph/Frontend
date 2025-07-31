import { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import EwhainListHeader from '../components/common/EwhainListHeader';
import HeaderFilter from '../components/memberList/headerFilter/HeaderFilter';
import UserCard from '../components/memberList/UserCard';
import USERS from '../constants/users';
import EMPTY from '../icons/icon_empty.svg?react';
import { useFilterStore } from '../stores/FilterStore';
import { getMemberList } from '../../api/members';

export default function EwhainList() {
  const searchExist = true;  // api 연결 후 검색 결과 여부 표시
  const { isgallery } = useFilterStore();
  const [users, setUsers] = useState([]);

  // api 호출
  const readMemberList = async () => {
    try {
      const res = await getMemberList();
      console.log(res);
      setUsers(res);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    readMemberList();
  }, [])

  return (
    <EwhainListWrapper>
      <EwhainListHeader header="ewhainlist" />
      <HeaderFilter />
      { searchExist ? 
      <>
        <EwhainContainer $isgallery={isgallery}>
          {users.map((user) => (
            <UserCard
              user={user}
              key={user.memberId}
            />
          ))}
        </EwhainContainer>
      </> :
      <>
        <NoResult>
          <EMPTY width="6.1875rem" height="6.1875rem" flex-shrink="0" aspect-ratio="1/1" />
          <EmptyText>검색 결과가 없어요 :{'('}</EmptyText>
        </NoResult>
      </>
      }
    </EwhainListWrapper>
  );
}

const EwhainListWrapper = styled.div`
  position: static;
  width: 24.375rem;
  height: 47.625rem;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0 10px;
  justify-content: flex-start;
  align-items: center;
`;

const EwhainContainer = styled.div`
  display: flex;
  width: ${({$isgallery}) => 
    $isgallery ? "22.25rem" : "21.875rem"
  };
  align-items: flex-start;
  align-content: flex-start;
  gap: 1.25rem;
  flex-wrap: wrap;
  overflow-y: auto;
  flex: 1;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NoResult = styled.div`
  height: 33.87rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.06rem;
`;

const EmptyText = styled.div`
  color: var(--Gray-500, #999);
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.01031rem;
`;