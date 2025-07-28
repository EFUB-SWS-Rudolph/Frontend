import styled from 'styled-components';
import { MembershipBtn } from './MembershipBtn';

export default function MembershipContainer() {
  return (
    <Wrapper>
      <MembershipBtn>로그아웃</MembershipBtn>
      <MembershipBtn>회원탈퇴</MembershipBtn>
    </Wrapper>
  );
}

const Wrapper = styled.dvi`
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