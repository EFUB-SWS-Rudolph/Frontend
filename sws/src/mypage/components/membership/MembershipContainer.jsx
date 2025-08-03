import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from './MembershipBtn';
import MoveWishList from '../wishlist/MoveWishList';
import { postLogout } from '../../../api/auth';
import { deleteMember } from '../../../api/auth';

export default function MembershipContainer() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await postLogout();
      alert('로그아웃 성공');
      navigate('/signin');
    } catch (err) {
      alert('로그아웃 실패:');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMember();
      alert('회원탈퇴가 완료되었습니다');
      navigate('/signin');
    } catch (err) {
      alert('회원탈퇴에 실패하였습니다')
    }
  };

  return (
    <Wrapper>
      <Container onClick={handleLogout}>
        <Text>로그아웃</Text>
      </Container>
      <Container onClick={handleDelete}>
        <Text>회원탈퇴</Text>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 24.375rem;
  height: 7.75rem;
  padding: 0.75rem 0;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  border-bottom: 1px solid var(--Gray-300, #D9D9D9);
  background: #FFF;
`;

const Text = styled.div`
  color: var(--Black, #222);

  /* Body/Large */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 1.4rem */
`;