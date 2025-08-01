import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/mypageHeader/Header';
import TagChoice from '../components/myTags/tagChoice/TagChoice';
import { useProfileStore } from '../stores/ProfileStore';

export default function SelectMyInterestDetail({}) {
  const addInterestTag = useProfileStore((state) => state.addInterestTag);
  const category = useProfileStore((state) => state.category);
  const navigate = useNavigate();
  const TAG_DETAIL = TAGS[category];  // category: 언어, 음악/악기, ...

  const handleMoveBack = () => {
    navigate('/mypage/interesttag')
  };

  const handleTagChoice = (item) => {
    addInterestTag(item);
    navigate('/mypage');
  };

  return (
    <Wrapper>
      <HeaderSpace>
        <Header type="관심 분야" onClick={handleMoveBack} />
      </HeaderSpace>
      <FilterContents>
        {TAG_DETAIL.map((item) => (
          <TagChoice type={type} item={item} onChange={handleTagChoice} />
        ))};
      </FilterContents>
    </Wrapper>
  )
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