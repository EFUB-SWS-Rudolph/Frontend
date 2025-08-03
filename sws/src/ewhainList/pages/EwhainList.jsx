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

  const major = useFilterStore((state) => state.major);  // 학과
  const exchange = useFilterStore((state) => state.exchange);  // 재능기부, 재능교환, 커피챗
  const period = useFilterStore((state) => state.period);  // 최신순, 오래된 순
  const searchItem = useFilterStore((state) => state.searchItem); // 검색어(학과/닉네임)
  const isExchange = useFilterStore((state) => state.isExchange);
  const setIsExchange = useFilterStore((state) => state.setIsExchange);
  const isDonation = useFilterStore((state) => state.isDonation);
  const setIsDonation = useFilterStore((state) => state.setIsDonation);
  const isCoffeeChat = useFilterStore((state) => state.isCoffeeChat);
  const setIsCoffeeChat = useFilterStore((state) => state.setIsCoffeeChat);
  const isSort = (period === "최신순" ? "desc" : "asc");

  // 필터할 항목들: 학과, 교류 방식, 최신순
  // 검색: 학과, 닉네임

  // api 호출
  const readMemberList = async () => {
    try {
      // 필터링
      const departments = [];

      if (major) departments.push(major);
      if (searchItem) {
        departments.push(searchItem);
      }

      const nickName = searchItem ? searchItem: undefined;

      const coffeechat = isCoffeeChat;
      const donation = isDonation;
      const exchange = isExchange;

      const sort = isSort;

      const params = {
        nickName, 
        department: departments.length > 0 ? departments : undefined,
        coffeechat: coffeechat ? true : undefined,
        donation: donation ? true : undefined,
        exchange: exchange ? true : undefined,
        sort
      };

      const res = await getMemberList(params);
      console.log(res);
      setUsers(res);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    setIsExchange(exchange === "재능교환");
    setIsDonation(exchange === "재능기부");
    setIsCoffeeChat(exchange === "커피챗");
  }, [exchange, setIsExchange, setIsDonation, setIsCoffeeChat]);

  useEffect(() => {
    readMemberList();
  }, [major, searchItem, isExchange, isDonation, isCoffeeChat, period]);

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