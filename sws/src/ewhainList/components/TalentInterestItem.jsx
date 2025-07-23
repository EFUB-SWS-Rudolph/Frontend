import styled from 'styled-components';
import theme from '../../styles/theme';

export default function TalentInterestItem({ item }) {
  return (
    <ItemContainer>
      {item}
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 101px;
  height: 36px;
  background: ${({ theme }) => `
    linear-gradient(${theme.colors.white}, ${theme.colors.white}) padding-box,
    linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.forth}) border-box
  `};

  border: 1px solid transparent;
  border-radius: 90px;
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
  color: ${({ theme }) => theme.colors.black};
`;