import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/mypageHeader/header';

export default function WishList() {
  const navigate = useNavigate();

  const handleMoveBack = () => {
    navigate('/mypage');
  };

  return (
    <Wrapper>
      <HeaderSpace>
        <Header type="찜한 강의" onClick={handleMoveBack} />
      </HeaderSpace>
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