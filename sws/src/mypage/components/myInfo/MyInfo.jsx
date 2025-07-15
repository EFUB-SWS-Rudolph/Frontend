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
  display: flex;
  align-items: center;
  gap: 2.875rem;
`;
