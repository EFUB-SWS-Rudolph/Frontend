import styled from 'styled-components';

export default function Profile() {
  return (
    <Container>
      <Image />
      <Name>y_eonie</Name>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 6.5rem;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
`;
const Image = styled.div`
  width: 6.5rem;
  height: 6.5rem;
  flex-shrink: 0;
  border-radius: 6.5rem;
  /* background: url(<path-to-image>) lightgray 50% / cover no-repeat; */
  box-shadow: 1px 1px 7px 0px rgba(0, 0, 0, 0.25);
`;

const Name = styled.p`
  color: var(--Black, #222);
  text-align: center;

  /* Title/Large */
  font-family: 'Pretendard Variable';
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 1.75rem */
`;
