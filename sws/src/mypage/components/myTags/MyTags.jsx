import styled from 'styled-components';
import MyTalent from './MyTalent';
import Interests from './Interests';

export default function MyTags() {
  return (
    <Container>
      <MyTalent />
      <Interests />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 24.375rem;
  padding: 1.9375rem 2.3125rem 1.9375rem 2.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  border-bottom: 1px solid var(--Gray-300, #d9d9d9);
  background: #fff;
`;
