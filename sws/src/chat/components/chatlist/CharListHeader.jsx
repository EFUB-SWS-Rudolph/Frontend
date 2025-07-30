import styled from 'styled-components';

export default function CharListHeader() {
  return (
    <HeaderWrapper>
      <HeaderContainer>채팅</HeaderContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  width: 24.375rem;
  height: 3.75rem;
  padding-top: 1.12rem;
  padding-bottom: 1.06rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HeaderContainer = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.medium.lineHeight};
`;
