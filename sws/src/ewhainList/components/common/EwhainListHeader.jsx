import styled from 'styled-components';
import theme from '../../../styles/theme';

export default function EwhainListHeader() {
  return (
    <HeaderContainer>이화인 목록</HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.medium.lineHeight};
`;