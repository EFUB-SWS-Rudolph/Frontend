import styled from 'styled-components';
import InputTitle from '../InputTitle';
import InputWindow from './InputWindow';
import ERROR_MESSAGE from '../../../constants/ErrorMessage';

export default function InputContainer({ title, inputPlaceholder, value, onChange, hasSubmitted, isValid }) {
  return(
    <InputWrapper>
      <InputTitle title={title} />
      <InputContents>
        <InputWindow inputPlaceholder={inputPlaceholder} value={value} onChange={onChange} />
        {(hasSubmitted && !isValid) && <Wraning>{ERROR_MESSAGE.CERTIFICATION}</Wraning>}
      </InputContents>
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  width: 21.375rem;
  height: 6.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const InputContents = styled.div`
  display: flex;
  width: 21.375rem;
  height: 6.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

const Wraning = styled.div`
  color: ${({ theme }) => theme.colors.warning};
  font-family: ${({ theme }) => theme.fonts.display.body.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.small.lineHeight};
`;