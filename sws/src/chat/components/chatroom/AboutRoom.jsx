import styled from 'styled-components';
import theme from '../../../styles/theme';

export default function AboutRoom({ thumbnail, title, date }) {
  return (
    <Wrapper>
      <RoomImg src={thumbnail} />
      <TextContainer>
        <RoomTitle>{title}</RoomTitle>
        <Dates>{date}</Dates>
      </TextContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 4.5rem;

  padding: 1rem;

  border-top: 0.75px solid;
  border-bottom: 0.75px solid;
  border-color: ${({ theme }) => theme.colors.gray300};
`;

const RoomImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-left: 1rem;
`;

const RoomTitle = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.title.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.medium.lineHeight};
`;

const Dates = styled.p`
  color: ${({ theme }) => theme.colors.gray500};
  font-family: ${({ theme }) => theme.fonts.display.caption.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.caption.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.caption.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.caption.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.caption.medium.lineHeight};
`;
