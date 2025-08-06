import styled from 'styled-components';
import theme from '../../../styles/theme';
import SEND_BUTTON from '../../assets/send_button.svg?react';

export default function InputContainer({ message, setMessage, onClickButton }) {
  return (
    <Container>
      <InputText value={message} onChange={(e) => setMessage(e.target.value)} />
      <ButtonWrapper onClick={onClickButton}>
        <SEND_BUTTON />
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;

  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
  padding: 0.75rem 0;

  border-top: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray300};
`;

const InputText = styled.input`
  display: flex;

  width: 20rem;
  height: 2rem;

  padding: 0.8rem 1rem;
  align-items: center;

  border: none;
  &:focus {
    outline: none;
  }
  border-radius: 1rem;

  background: ${({ theme }) => theme.colors.gray100};

  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
`;

const ButtonWrapper = styled.div`
  cursor: pointer;
`;
