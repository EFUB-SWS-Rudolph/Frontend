import styled from 'styled-components';
import theme from '../../../styles/theme';

export default function InputWindow({ inputPlaceholder, value, onChange }) {
  return (
    <InputPlace type="text" placeholder={inputPlaceholder} value={value} onChange={onChange} />
  );
}

const InputPlace = styled.input`
  width: 342px;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
  color: ${({ theme }) => theme.colors.black};
  padding: 12px;
  outline: none;
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    box-shadow: none;
  }
`;