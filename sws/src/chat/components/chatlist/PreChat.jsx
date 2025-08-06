import styled from 'styled-components';
import theme from '../../../styles/theme';
import { formatTime } from '../../../utils/formatTime';
import { useNavigate } from 'react-router-dom';

export default function PreChat({ prechatData }) {
  const navigate = useNavigate();
  const onClickPrechat = () => {
    navigate(`/chatroom/${prechatData.chatRoomId}`);
  };

  return (
    <Wrapper onClick={onClickPrechat}>
      <ProfileImg src={prechatData.opponentProfileImageUrl} />
      <TextsContainer>
        <NameClassContainer>
          <Name>{prechatData.opponentName}</Name>
          <AboutClass>{prechatData.courseTitle}</AboutClass>
        </NameClassContainer>
        <PreText>{prechatData.lastMessage}</PreText>
      </TextsContainer>
      <AdditionalContainer>
        <Time>{formatTime(prechatData.lastMessageSentAt)}</Time>
        {prechatData.unreadCount > 0 && <Messages>{prechatData.unreadCount}</Messages>}
      </AdditionalContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 5rem;

  display: flex;
  flex-shrink: 0;

  padding: 1.1rem 1.5rem;
  align-items: center;

  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray300};
`;

const ProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2.5rem;
  background-color: ${({ theme }) => theme.colors.gray300};
  box-shadow: 1px 1px 7px 0px rgba(0, 0, 0, 0.25);
  object-fit: cover;
`;

const TextsContainer = styled.div`
  display: flex;
  width: 14.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3125rem;
  margin-left: 1rem;
`;

const NameClassContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 14.5rem;
`;

const Name = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.title.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.medium.lineHeight};

  max-width: 10rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AboutClass = styled.p`
  text-align: center;
  color: #5c5c5c;
  font-family: ${({ theme }) => theme.fonts.display.title.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.small.lineHeight};
`;

const PreText = styled.div`
  width: 100%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
`;

const AdditionalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 0.35rem;
  height: 100%;

  margin-left: auto;
`;

const Time = styled.p`
  text-align: center;
  color: #5c5c5c;
  font-family: ${({ theme }) => theme.fonts.display.title.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.small.lineHeight};
`;

const Messages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1rem;
  height: 1rem;
  border-radius: 0.625rem;

  background: ${({ theme }) => theme.colors.secondary};

  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display.caption.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.caption.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.caption.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.caption.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.caption.medium.lineHeight};
`;
