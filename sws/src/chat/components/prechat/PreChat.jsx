import styled from 'styled-components';

export default function PreChat() {
  return (
    <Wrapper>
      <ProfileImg />
      <TextsContainer>
        <NameClassContainer>
          <Name>김일화</Name>
          <AboutClass>커피챗</AboutClass>
        </NameClassContainer>
        <PreText>안녕하세요 수업 자리 남았을까요?</PreText>
      </TextsContainer>
      <Time>1시간 전</Time>
      <Messages>2</Messages>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 24.375rem;
  height: 5rem;
  flex-shrink: 0;
`;

const ProfileImg = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 2.5rem;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  box-shadow: 1px 1px 7px 0px rgba(0, 0, 0, 0.25);
`;

const Name = styled.p`
  color: var(--Black, #222);
  /* Title/Medium */
  font-family: 'Pretendard Variable';
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const AboutClass = styled.p`
  color: #5c5c5c;

  /* Title/Small */
  font-family: 'Pretendard Variable';
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const PreText = styled.p`
  color: var(--Black, #222);
  /* Body/Small */
  font-family: 'Pretendard Variable';
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 1.125rem */
  align-self: stretch;
`;

const NameClassContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TextsContainer = styled.div`
  display: flex;
  width: 14.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3125rem;
`;

const Time = styled.p`
  color: #5c5c5c;
  text-align: right;

  /* Title/Small */
  font-family: 'Pretendard Variable';
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Messages = styled.div`
  display: inline-flex;
  padding: 0.125rem 0.25rem 0.125rem 0.3125rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  background: var(--Secondary, #13997b);

  color: var(--White, #fff);

  /* Caption/Medium */
  font-family: 'Pretendard Variable';
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
