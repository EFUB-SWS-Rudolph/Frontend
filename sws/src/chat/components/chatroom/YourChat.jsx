import styled from 'styled-components';
import theme from '../../../styles/theme';
import { extractTime } from '../../../utils/formatTime';

export default function YourChat({ msg }) {
  return (
    <Container>
      <Text>{msg.content}</Text>
      <Time>{extractTime(msg.sentAt)}</Time>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  margin-right: auto;
`;

const Text = styled.div`
  display: flex;
  padding: 0.6rem 0.75rem;
  justify-content: center;
  align-items: center;

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
