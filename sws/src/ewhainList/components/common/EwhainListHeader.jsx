import styled from 'styled-components';
import theme from '../../../styles/theme';
import X from '../../icons/icon_x.svg?react';
import BACK_ARROW from '../../icons/icon_backarrow.svg?react';

export default function EwhainListHeader({ header, onClick }) {
  if (header === "ewhainlist") {
    return (
      <HeaderWrapper>
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
            bottom: "15px",
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
        <HeaderContents>
          <BACK_ARROW             
            style={{
              position: "absolute",
              bottom: "13px",
              left: "30px",
              transform: "translateY(-50%)",
              color: theme.colors.black, 
            }}
            onClick={onClick}
          />
          <HeaderContainer>{header}</HeaderContainer>
        </HeaderContents>
      </HeaderWrapper>
    );
  }
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 390px;
  height: 102px;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.medium.lineHeight};
`;

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 390px;
  height: 102px;
  margin: 0;
  padding: 20px;
  font-family: ${({ theme }) => theme.fonts.display.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.medium.lineHeight};
`;

const HeaderContents = styled.div`
  display: flex;

`