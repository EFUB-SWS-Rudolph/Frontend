// src/common/components/Header.jsx

import styled from 'styled-components';
import theme from '../../styles/theme';
import X from '../../common/assets/icons/icon_x.svg?react';
import BACK_ARROW from '../../common/assets/icons/icon_back.svg?react';

export default function Header({ header, onClick, rightIcon, onRightIconClick }) {
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
            right: '0.87rem',
            transform: 'translateY(-50%)',
            color: theme.colors.black,
          }}
          onClick={onClick}
        />
      </HeaderWrapper>
    );
  } else if (header === '교류 방식') {
    return (
      <HeaderWrapper>
        <BACK_ARROW
          style={{
            color: theme.colors.black,
            position: 'absolute',
            top: '50%',
            left: '2.3rem',
            transform: 'translateY(-50%)',
          }}
          onClick={onClick}
        />
        <HeaderContainer>{header}</HeaderContainer>
      </HeaderWrapper>
    );
  } else if (showDefaultTitle) {
    if (header === '강의') {
      return (
        <HeaderWrapper>
          <HeaderContainer>
            {typeof header === 'string' ? <Title>{header}</Title> : header || null}
          </HeaderContainer>
          {rightIcon && (
            <RightIconWrapper type="button" onClick={onRightIconClick}>
              {typeof rightIcon === 'string' ? <img src={rightIcon} alt="action" /> : rightIcon}
            </RightIconWrapper>
          )}
        </HeaderWrapper>
      );
    }
    return (
      <HeaderWrapper>
        <BACK_ARROW
          style={{
            color: theme.colors.black,
            position: 'absolute',
            top: '50%',
            left: '1.7rem',
            transform: 'translateY(-50%)',
          }}
          onClick={onClick}
        />
        <HeaderContainer>{header}</HeaderContainer>
      </HeaderWrapper>
    );
  } else {
    return null;
  }
}
const RightIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 1.7rem; /* 오른쪽에서 적절한 여백 */
  transform: translateY(-50%);
  cursor: pointer;
  display: flex; /* SVG 컴포넌트를 중앙 정렬하기 위해 */
  align-items: center;
  justify-content: center;
  width: 2.5rem; /* 클릭 영역 확보 */
  height: 2.5rem; /* 클릭 영역 확보 */
  & > svg {
    /* SVG 아이콘 자체의 크기 조절 */
    width: 1.5rem;
    height: 1.5rem;
  }
`;
const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1.12rem 0px 1.06rem;
`;

const HeaderContainer = styled.div`
  width: 100%;
  color: #000;
  text-align: center;
  flex-grow: 1;
  font-family: ${({ theme }) => theme.fonts.display.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.medium.lineHeight};
`;
