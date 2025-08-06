import styled from 'styled-components';
import { ChatGroup } from './ChatGroup';
import { formatDate } from '../../../utils/formatTime';
import { useChatStore } from '../../stores/useChatStore';

export default function ChatContainer({ messageList, topRef, bottomRef, scrollRef }) {
  const { userId } = useChatStore();

  const groupMessages = (data) => {
    const result = [];

    data
      .slice()
      .sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
      .forEach((msg) => {
        const dateKey = msg.sentAt.split(' ')[0];

        let dateGroup = result.find((group) => group.date === dateKey);
        if (!dateGroup) {
          dateGroup = { date: dateKey, messages: [] };
          result.push(dateGroup);
        }

        const lastMessageGroup = dateGroup.messages[dateGroup.messages.length - 1];

        const contentObj = {
          content: msg.content,
          sentAt: msg.sentAt,
        };

        if (
          lastMessageGroup &&
          lastMessageGroup.senderId === msg.senderId &&
          lastMessageGroup.type === msg.type
        ) {
          lastMessageGroup.contentGroup.push(contentObj);
        } else {
          dateGroup.messages.push({
            senderId: msg.senderId,
            type: msg.type,
            contentGroup: [contentObj],
          });
        }
      });

    return result;
  };

  const grouped = groupMessages(messageList);

  return (
    <Container ref={scrollRef}>
      <div ref={topRef} />
      {grouped.map((dateGroup, idx) => (
        <DateGroup key={`date-${idx}`}>
          <Dates>{formatDate(dateGroup.date)}</Dates>
          {dateGroup.messages.map((chatGroup, idx) =>
            chatGroup.type === 'SYSTEM' ? (
              chatGroup.contentGroup.map((msg, subIdx) => (
                <ChatLeft key={`left-${idx}-${subIdx}`}>{msg.content}</ChatLeft>
              ))
            ) : (
              <ChatGroup
                key={`chat-${idx}`}
                opponent={chatGroup.senderId == userId}
                messages={chatGroup.contentGroup}
              />
            )
          )}
        </DateGroup>
      ))}
      <div ref={bottomRef} />
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

const Dates = styled.div`
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
