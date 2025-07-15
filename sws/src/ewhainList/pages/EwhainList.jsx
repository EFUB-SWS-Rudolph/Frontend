import { useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import EwhainListHeader from '../components/common/EwhainListHeader';
import HeaderFilter from '../components/common/HeaderFilter';
import UserCard from '../components/common/UserCard';
import USERS from '../constants/users';

export default function EwhainList() {
  return (
    <EwhainListWrapper>
      <HeaderContainer>
        <EwhainListHeader header="ewhainlist" />
        <HeaderFilter/>
      </HeaderContainer>
      
      <EwhainContainer>
        {USERS.map((user) => (
          <UserCard
            user={user}
            key={user.id}
          />
        ))}
      </EwhainContainer>
      
      <NavigationBar>내비게이션바위치</NavigationBar>
    </EwhainListWrapper>
  );
}

const EwhainListWrapper = styled.div`
  position: static;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const EwhainContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-right: 0;
  padding: 0 6px 0;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  flex: 1;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavigationBar = styled.div`
  position: static;
  bottom: 0;
  height: 50px;
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};
  display: flex;
  align-items: center;
  text-align: center;
`;