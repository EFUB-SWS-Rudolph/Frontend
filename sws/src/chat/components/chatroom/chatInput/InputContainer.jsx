import styled from 'styled-components';
import MoreContentButton from './MoreContentButton';
import InputText from './InputText';
import SendButton from './SendButton';

export default function InputContainer() {
  return (
    <Container>
      <MoreContentButton />
      <InputText />
      <SendButton />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 24.375rem;
  height: 2.5rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;
