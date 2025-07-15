import styled from 'styled-components';
export default function InfoTag({ tagname, info }) {
  return (
    <Container>
      <Tag>{tagname}</Tag>
      <InfoText>{info}</InfoText>
    </Container>
  );
}

const Tag = styled.div`
  display: flex;
  padding: 0.1875rem 0.625rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background: var(--Secondary, #13997b);
  color: var(--White, #fff);
  text-align: center;

  /* Body/Large */
  font-family: 'Pretendard Variable';
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 1.4rem */
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const InfoText = styled.p`
  color: var(--Black, #222);
  text-align: center;

  /* Body/Medium */
  font-family: 'Pretendard Variable';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 1.3125rem */
`;
