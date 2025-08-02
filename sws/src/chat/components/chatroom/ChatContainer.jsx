import styled from 'styled-components';
import { ChatGroup } from './ChatGroup';

export default function ChatContainer() {
  return (
    <Container>
      <DateGroup>
        <Date>2025년 6월 10일</Date>
        <ChatGroup owner={0}></ChatGroup>
        <ChatGroup owner={1}></ChatGroup>
      </DateGroup>
      <DateGroup>
        <Date>2025년 6월 10일</Date>
        <ChatGroup owner={0}></ChatGroup>
        <ChatGroup owner={1}></ChatGroup>
      </DateGroup>
      <ChatLeft>닉네임 님이 채팅방을 떠났습니다.</ChatLeft>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  flex: 1;
  padding: 1.5rem 1.25rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DateGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 100%;

  margin-bottom: 1rem;
`;

const Date = styled.div`
  margin-bottom: 0.5rem;

  color: ${({ theme }) => theme.colors.gray500};
  font-family: ${({ theme }) => theme.fonts.display.caption.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.caption.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.caption.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.caption.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.caption.medium.lineHeight};
`;

const ChatLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 3rem;

  color: ${({ theme }) => theme.colors.gray500};
  font-family: ${({ theme }) => theme.fonts.display.title.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.small.lineHeight};
`;
