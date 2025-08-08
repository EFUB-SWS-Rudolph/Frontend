import styled from 'styled-components';
import ModalChoice from './ModalChoice';
import ModalCancelBtn from './ModalCancelBtn';

export default function EditModalContainer({ choices, onClose }) {
  return(
    <Wrapper onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Choices>
          {choices.map(choice => (
            <ModalChoice
              key={choice.text}
              icon={choice.icon}
              text={choice.text}
              onClick={choice.onClick}
            />
          ))}
        </Choices>
        <ModalCancelBtn onClick={onClose} />
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 24.375rem;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
`;

const Container = styled.div`
  display: flex;
  width: 24.375rem;
  max-width: 24.375rem;
  padding: 2.375rem 2.4375rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 1.25rem 1.25rem 0 0;
  background: var(--White, #FFF);
`;

const Choices = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;