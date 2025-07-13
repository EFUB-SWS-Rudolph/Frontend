import styled from 'styled-components';
export default function ChatMessage() {
  return (
    <>
      <Container>
        <Imgs />
        <Text>안녕하세요 수업 자리 남았을까요?</Text>
        <Time>12:53</Time>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1.0625rem;
`;

const Text = styled.div`
  display: flex;
  height: 2.25rem;
  padding: 0.4375rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1.25rem;
  border: 1px solid var(--Color-2, #d9d9d9);

  color: #000;

  /* Title/Small */
  font-family: 'Pretendard Variable';
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Time = styled.p`
  color: var(--Gray-500, #999);
  text-align: center;

  /* Caption/Small */
  font-family: 'Pretendard Variable';
  font-size: 0.5625rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Imgs = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  border-radius: 2.25rem;
  /* background: url(<path-to-image>) lightgray 50% / cover no-repeat; */
  box-shadow: 1px 1px 7px 0px rgba(0, 0, 0, 0.25);
`;
