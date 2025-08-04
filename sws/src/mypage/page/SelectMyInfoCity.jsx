import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/mypageHeader/Header';
import InfoTagDetail from '../components/myInfo/InfoTagDetail';
import LOCATION from '../constant/LOCATION';

export default function SelectMyInfoCity() {
  const navigate = useNavigate();
  const CITY = Object.keys(LOCATION);

  const handleMoveBack = () => {
    navigate('/mypage');
  };

  return (
    <Wrapper>
      <HeaderSpace>
        <Header type="지역" onClick={handleMoveBack} />
      </HeaderSpace>
      <FilterContents>
        {CITY.map((item) => (
          <InfoTagDetail key={item} select={item} tagname="지역" />
        ))};
      </FilterContents>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 24.375rem;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 1rem;
`;

const HeaderSpace = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.white};
`;

const FilterContents = styled.div`
  width: 24.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;