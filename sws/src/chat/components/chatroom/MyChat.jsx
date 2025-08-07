import styled from 'styled-components';
import theme from '../../../styles/theme';
import { extractTime } from '../../../utils/formatTime';

export default function MyChat({ msg }) {
  return (
    <Container>
      <Time>{extractTime(msg.sentAt)}</Time>
      <Text>{msg.content}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  margin-left: auto;
`;

const Text = styled.div`
  display: flex;
  max-width: 16.125rem;
  padding: 0.6rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1.25rem;
  border: 1px solid var(--Color-2, #d9d9d9);

  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.title.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.small.lineHeight};
`;

const Time = styled.p`
  color: ${({ theme }) => theme.colors.gray500};
  font-family: ${({ theme }) => theme.fonts.display.caption.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.caption.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.caption.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.caption.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.caption.small.lineHeight};
`;

const Imgs = styled.img`
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  border-radius: 2.25rem;

  box-shadow: 1px 1px 7px 0px rgba(0, 0, 0, 0.25);
`;
