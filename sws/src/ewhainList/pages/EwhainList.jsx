import styled from 'styled-components';
import theme from '../../styles/theme';
import EwhainListHeader from '../components/common/EwhainListHeader';
import HeaderFilter from '../components/memberList/headerFilter/HeaderFilter';
import UserCard from '../components/memberList/UserCard';
import USERS from '../constants/users';
import EMPTY from '../icons/icon_empty.svg?react';
import { useFilterStore } from '../stores/FilterStore';

export default function EwhainList() {
  const searchExist = true;  // api 연결 후 검색 결과 여부 표시
  const { isgallery } = useFilterStore();

  return (
    <EwhainListWrapper>
      <HeaderFilter />
      { searchExist ? 
      <>
        <EwhainContainer $isgallery={isgallery}>
          {USERS.map((user) => (
            <UserCard
              user={user}
              key={user.id}
            />
          ))}
        </EwhainContainer>
      </> :
      <>
        <NoResult>
          <EMPTY styled={{ color: theme.colors.gray500 }} />
          검색 결과가 없어요 :{'('}
        </NoResult>
      </>
      }
    </EwhainListWrapper>
  );
}

const EwhainListWrapper = styled.div`
  position: static;
  width: 390px;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0 10px;
  justify-content: center;
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
  width: 356px;
  margin-top: 10px;
  margin-right: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex: 1;
  color: ${({ theme }) => theme.colors.gray500};
  font-family: ${({ theme }) => theme.fonts.display.body.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.large.lineHeight};
`;