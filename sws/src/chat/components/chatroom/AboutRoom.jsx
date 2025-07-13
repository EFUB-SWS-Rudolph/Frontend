import styled from 'styled-components';
export default function AboutRoom() {
  return (
    <Wrapper>
      <RoomImg />
      <AboutRoom>독일어 심화반</AboutRoom>
      <Dates>2025년 6월 18일 ~ 2025년 8월 18일</Dates>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 24.375rem;
  height: 4.5rem;
  flex-shrink: 0;
  border: 0.75px solid var(--Gray-300, #d9d9d9);
  background: #fff;
`;

const RoomImg = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  /* background: url(<path-to-image>) lightgray 0px -1.85px / 100% 136.75% no-repeat; */
`;

const RoomTitle = styled.div`
  color: #000;

  /* Title/Medium */
  font-family: 'Pretendard Variable';
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Dates = styled.p`
  color: var(--Gray-500, #999);

  /* Caption/Medium */
  font-family: 'Pretendard Variable';
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
