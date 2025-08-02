import styled from 'styled-components';
import Profile from './Profile';
import Tags from './Tags';
export default function MyInfo() {
  return (
    <Container>
      <Profile />
      <Tags />
    </Container>
  );
}

const Container = styled.div`
  display: inline-flex;
  padding: 1.5rem 2.125rem 1.4375rem 2.125rem;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--Gray-300, #D9D9D9);
  background: #FFF;
  gap: 2.88rem;
`;
