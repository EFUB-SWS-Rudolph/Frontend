import styled from 'styled-components';
import theme from '../../../styles/theme';

export default function TalentInterestItem({ item }) {
  return (
    <ItemContainer>
      <ItemText>{item}</ItemText>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  display: flex;
  width: 6.2708rem;
  height: 2.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1.25rem;
  border: 1px solid transparent;
  background: ${({ theme }) => `
    linear-gradient(${theme.colors.white}, ${theme.colors.white}) padding-box,
    linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.third}) border-box
  `};
`;

const ItemText = styled.div`
  color: #000;
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
`;