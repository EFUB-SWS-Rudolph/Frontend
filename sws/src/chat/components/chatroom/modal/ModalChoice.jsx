import styled from 'styled-components';

export default function ModalChoice({ icon: Icon, text, onClick }) {
  return (
    <Container onClick={onClick}>
      <Icon width="1.5625rem" height="1.5625rem" flex-shrink="0" aspect-ratio="1/1" />
      <Text>{text}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 24.375rem;
  padding: 0.96875rem 16.75rem 0.96875rem 1.8125rem;
  align-items: flex-start;
  gap: 0.5rem;
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