import styled from 'styled-components';
import { Container } from './MembershipBtn';
import MoveWishList from '../wishlist/MoveWishList';

export default function MembershipContainer() {
  return (
    <Wrapper>
      <Container>
        <Text>로그아웃</Text>
      </Container>
      <Container>
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