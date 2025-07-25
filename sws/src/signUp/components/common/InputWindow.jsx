import styled from 'styled-components';
import theme from '../../../styles/theme';

export default function InputWindow({ inputPlaceholder, value, onChange }) {
  return (
    <InputContainer>
      <InputPlace type="text" placeholder={inputPlaceholder} value={value} onChange={onChange} />
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
  width: 21.375rem;
  height: 3rem;
  padding: 1rem;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-radius: 1rem;
  border: 1px solid var(--Gray-300, #D9D9D9);
`;

const InputPlace = styled.input`
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
  color: ${({ theme }) => theme.colors.black};
  outline: none;
  border: none;
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;