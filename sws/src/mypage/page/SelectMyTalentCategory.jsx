import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/mypageHeader/Header';
import MoveTagDetail from '../components/myTags/tagChoice/MoveTagDetail';
import { exchangeLectureCategoryMap } from '../../common/data/Category';

export default function SelectMyTalentCategory() {
  const navigate = useNavigate();
  const CATEGORY = Object.keys(exchangeLectureCategoryMap);

  const handleMoveBack = () => {
    navigate('/mypage');
  };

  return (
    <Wrapper>
      <HeaderSpace>
        <Header type="나의 재능" onClick={handleMoveBack} />
      </HeaderSpace>
      <FilterContents>
        {CATEGORY.map((category) => (
          <MoveTagDetail key={category} select={category} detailroute={'/mypage/talenttag/detail'} />
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