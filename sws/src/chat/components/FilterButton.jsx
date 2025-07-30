import styled from 'styled-components';
import theme from '../../styles/theme';

export default function FilterButton({ text, $isActive, onClick }) {
  return (
    <Button onClick={onClick} $isActive={$isActive}>
      {text}
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  height: 2.125rem;
  padding: 0.4375rem 0.8125rem;
  justify-content: center;
  align-items: center;

  border-radius: 1.25rem;
  border: 1px solid;
  border-color: ${({ $isActive }) => ($isActive ? theme.colors.primary : theme.colors.gray300)};
  background: ${({ $isActive }) => ($isActive ? theme.colors.third : theme.colors.white)};

  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
`;
