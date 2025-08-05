import styled from 'styled-components';
import OUT_BUTTON from '../../assets/out_button.svg?react';

export const ChatModal = ({ modalHandler, onClick }) => {
  return (
    <Overlay onClick={() => modalHandler((prev) => !prev)}>
      <Container>
        <LeftButton onClick={onClick}>
          <OUT_BUTTON />
          <OutText>채팅방 나가기</OutText>
        </LeftButton>
        <CancelButton>취소</CancelButton>
      </Container>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  width: 24.375rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25); // 회색 반투명 배경
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Container = styled.div`
  width: 100%;
  height: 9.5rem;

  display: flex;
  flex-direction: column;

  padding: 1.31rem;
  margin-top: auto;
  gap: 1rem;
  border-radius: 1.25rem 1.25rem 0 0;

  background-color: ${({ theme }) => theme.colors.white};
`;

const LeftButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-left: 0.56rem;
  gap: 0.5rem;
`;

const OutText = styled.div`
  padding: 1rem 0;

  color: ${({ theme }) => theme.colors.warning};
  font-family: ${({ theme }) => theme.fonts.display.body.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.large.lineHeight};
`;

const CancelButton = styled.button`
  width: 100%;

  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.gray100};

  padding: 0.69rem 0;

  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.body.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.large.lineHeight};
`;
