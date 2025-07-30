import styled from 'styled-components';
import MyChat from './MyChat';
import YourChat from './YourChat';

export const ChatGroup = ({ owner }) => {
  return owner ? (
    <Wrapper>
      <Imgs />
      <Container>
        <YourChat />
        <YourChat />
      </Container>
    </Wrapper>
  ) : (
    <MyContainer>
      <MyChat />
    </MyContainer>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  margin: 0.5rem 0;
  gap: 0.5rem;
`;

const MyContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin: 0.5rem 0;
  gap: 0.5rem;
`;

const Imgs = styled.img`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 2.25rem;

  box-shadow: 1px 1px 7px 0px rgba(0, 0, 0, 0.25);

  object-fit: cover;

  margin-top: auto;
  margin-bottom: 0.5rem;
`;
