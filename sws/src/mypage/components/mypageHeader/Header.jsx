import styled from 'styled-components';
import theme from '../../../styles/theme';

export default function Header() {
  return (
    <HeaderWrapper>
      <HeaderContainer>마이 페이지</HeaderContainer>
      <EditButton>
        <EditText>편집</EditText>
      </EditButton>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  width: 24.375rem;
  height: 3.75rem;
  padding: 1.12rem 1.69rem 1.06rem 9.41rem;
  gap: 6.28rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HeaderContainer = styled.div`
  color: var(--Black, #222);
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.display.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.medium.lineHeight};
`;

const EditButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditText = styled.div`
  color: var(--Gray-500, #999);
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.display.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.small.lineHeight};
`;