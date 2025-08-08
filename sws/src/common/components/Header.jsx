// src/common/components/Header.jsx
import React from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';
import theme from '../../styles/theme';
import X from '../../common/assets/icons/icon_x.svg?react';
import BACK_ARROW from '../../common/assets/icons/icon_back.svg?react';
import MainHeaderContent from '../../main/components/MainHeaderContent'; 

export default function Header({ header, onClick, rightIcon, onRightIconClick, isHomePage , hideTitle = false }) {
  const navigate = useNavigate();
  const showDefaultTitle = typeof header === 'string' && header.length > 0;
  if (isHomePage) {
    return (
      <HeaderWrapper>
        <MainHeaderContent /> 
      </HeaderWrapper>
    );
  }
  if (header === 'filter' || header === '정렬 기준') { 
    return (
      <HeaderWrapperBig>
        {!hideTitle && <HeaderContainer>{header}</HeaderContainer>} 
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
      </HeaderWrapperBig>
    );
  } 
if (React.isValidElement(header)) {
    return (
      <HeaderWrapper>
        {header} 
        {rightIcon && ( 
            <RightIconWrapper type="button" onClick={onRightIconClick}>
                {typeof rightIcon === 'string' ? <img src={rightIcon} alt="action" /> : rightIcon}
            </RightIconWrapper>
        )}
      </HeaderWrapper>
    );
  }

  if (typeof header === 'string' && header.length > 0) {
    if (header === '교류 방식' || header === '강의 등록') { 
        return (
            <HeaderWrapper>
                <BACK_ARROW
                    style={{
                        color: theme.colors.black,
                        position: 'absolute',
                        top: '50%',
                        left: '1.5rem',
                        transform: 'translateY(-50%)',
                    }}
                    onClick={onClick}
                />
                {!hideTitle && <HeaderContainer>{header}</HeaderContainer>} 
            </HeaderWrapper>
        );
    } else if (header === '검색' || header === '알림') { 
        return (
            <HeaderWrapperBig>
                <BACK_ARROW
                    style={{
                        color: theme.colors.black,
                        left: '1.5rem',
                    }}
                    onClick={onClick}
                />
                {!hideTitle && <HeaderContainerBig>{header}</HeaderContainerBig>} 
            </HeaderWrapperBig>
        );
    }  else if (header === 'ewhainlist') {
    return (
      <HeaderWrapperBig>
        <HeaderContainer>이화인 목록</HeaderContainer>
      </HeaderWrapperBig>
    );
  }else if (header === '강의' ) { 
        return (
            <HeaderWrapper>
                {!hideTitle && <HeaderContainer> 
                    {typeof header === 'string' ? <Title>{header}</Title> : header || null}
                </HeaderContainer>}
                {rightIcon && (
                    <RightIconWrapper type="button" onClick={onRightIconClick}>
                        {typeof rightIcon === 'string' ? <img src={rightIcon} alt="action" /> : rightIcon}
                    </RightIconWrapper>
                )}
            </HeaderWrapper>
        );
    } else { 
        return (
            <HeaderWrapperBig>
                <BACK_ARROW
                    style={{
                        color: theme.colors.black,
                        position: 'absolute',
                        //top: '50%',
                        //left: '1.7rem',
                        transform: 'translateY(-50%)',
                    }}
                    onClick={onClick || (() => navigate(-1))} 
                />
                {!hideTitle && <HeaderContainer>{header}</HeaderContainer>}
            </HeaderWrapperBig>
        );
    }
  }

  // 5. 헤더 내용이 없는 경우
  return null;
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
  padding:1rem;
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

const HeaderWrapperBig = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding:1rem;
`;
const HeaderContainerBig = styled(HeaderContainer)`
  font-size: 24px;
  text-align: left;
  padding-left: 20px;
`;
