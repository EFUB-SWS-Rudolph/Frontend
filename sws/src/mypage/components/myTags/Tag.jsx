//나의재능 관심분야 tag

import styled from 'styled-components';
export default function Tag({ text }) {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 6.3125rem;
  height: 2.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1.25rem;
  border: 1px solid var(--Gray-300, #d9d9d9);
  background: var(--White, #fff);
`;

const Text = styled.div`
  display: flex;

  color: #000;

  /* Body/Medium */
  font-family: 'Pretendard Variable';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;
