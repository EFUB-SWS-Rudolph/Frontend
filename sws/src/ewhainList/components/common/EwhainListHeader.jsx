import styled from 'styled-components';
import theme from '../../../styles/theme';
import { IoIosClose } from "react-icons/io";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

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
        <IoIosClose 
          size={35}                
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
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
        <MdOutlineArrowBackIosNew 
          size={20}              
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 390px;
  height: 56px;
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
  align-items: center;
  justify-content: center;
  width: 390px;
  height: 56px;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.medium.lineHeight};
`;