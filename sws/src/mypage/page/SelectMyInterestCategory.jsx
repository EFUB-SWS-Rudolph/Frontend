import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/mypageHeader/Header';
import MoveTagDetail from '../components/myTags/tagChoice/MoveTagDetail';

export default function SelectMyInterestCategory() {
  const navigate = useNavigate();

  const handleMoveBack = () => {
    navigate('/mypage');
  };

  return (
    <Wrapper>
      <HeaderSpace>
        <Header type="관심 분야" onClick={handleMoveBack} />
      </HeaderSpace>
      <FilterContents>
        {CATEGORIES.map((category) => (
          <MoveTagDetail select={category} detailroute={'/mypage/interesttag/detail'} />
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