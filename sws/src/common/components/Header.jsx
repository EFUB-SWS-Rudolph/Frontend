// src/common/components/Header.jsx

import styled from 'styled-components';
import theme from '../../styles/theme'; 
import X from '../../common/assets/icons/icon_x.svg?react';
import BACK_ARROW from '../../common/assets/icons/icon_back.svg?react';
import BACK_ARROW_WHITE from '../../common/assets/icons/icon_back_white.svg?react';

export default function Header({ header, onClick }) { 
  const showDefaultTitle = typeof header === 'string' && header.length > 0;

  if (header === 'ewhainlist') {
    return (
      <HeaderWrapper>
        <HeaderContainer>이화인 목록</HeaderContainer>
      </HeaderWrapper>
    );
  } else if (header === 'filter') {
    return (
      <HeaderWrapper>
        <HeaderContainer>필터 설정</HeaderContainer>
        <X
          style={{
            position: 'absolute',
            top: '50%',
            right: '1rem',
            transform: 'translateY(-50%)',
            color: theme.colors.black,
          }}
          onClick={onClick}
        />
      </HeaderWrapper>
    );
  } else if (showDefaultTitle) {
    return (
      <HeaderWrapper>
        <BACK_ARROW
          style={{
            color: theme.colors.black,
          }}
          onClick={onClick}
        />
        <HeaderContainer>{header}</HeaderContainer>
        <BACK_ARROW_WHITE
          style={{
            color: theme.colors.white,
          }}
          onClick={onClick}
        />
      </HeaderWrapper>
    );
  } else { 
    return null;
  }
}

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0px 24px 8px; 
`;

const HeaderContainer = styled.div`
  color: #000;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.display.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.medium.lineHeight};
`;