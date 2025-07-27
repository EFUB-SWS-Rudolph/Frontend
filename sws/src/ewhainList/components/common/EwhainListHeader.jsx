import styled from 'styled-components';
import theme from '../../../styles/theme';
import X from '../../icons/icon_x.svg?react';
import BACK_ARROW from '../../icons/icon_backarrow.svg?react';

export default function EwhainListHeader({ header, onClick }) {
  if (header === "ewhainlist") {
    return (
      <HeaderWrapper $header={header}>
        <HeaderContainer>이화인 목록</HeaderContainer> 
      </HeaderWrapper>
    );
  } else if (header === "filter") {
    return (
      <HeaderWrapper>
        <HeaderContainer>필터 설정</HeaderContainer>
        <X              
          style={{
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            color: theme.colors.black, 
          }}
          onClick={onClick}        
        />
      </HeaderWrapper>
    );
  } else {
    return(
      <HeaderWrapper>
        <BACK_ARROW             
          style={{
            position: "absolute",
            top: "50%",
            left: "30px",
            transform: "translateY(-50%)",
            color: theme.colors.black, 
          }}
          onClick={onClick}
        />
        <HeaderContainer>{header}</HeaderContainer>
      </HeaderWrapper>
    );
  }
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
  color: #000;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.display.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.medium.lineHeight};
`;

const HeaderContents = styled.div`
  display: flex;

`