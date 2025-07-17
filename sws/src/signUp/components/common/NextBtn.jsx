import styled from 'styled-components';
import theme from '../../../styles/theme';

export default function NextBtn({ disabled, onClick }) {
  return (
    <NextButton disabled={disabled} onClick={onClick}>다음</NextButton>
  );
}

const NextButton = styled.button`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.display.body.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.large.lineHeight};
  height: 56px;
  width: 358px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: none;
  margin: 17px auto 0;
  cursor: pointer;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.gray300 : theme.colors.primary};
  cursor: ${({disabled}) => disabled ? 'default' : 'pointer'};
  opacity: ${({disabled}) => disabled ? 0.6 : 1};
`;