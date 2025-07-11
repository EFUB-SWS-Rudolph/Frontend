import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import theme from '../../../styles/theme';

export default function SignUpHeader({ backRoute }) {
  const navigate = useNavigate();

  const handleMoveBack = () => {
    navigate(backRoute);
  };

  return (
    <HeaderWrapper>
      <LeftArea onClick={handleMoveBack}>
        <MdOutlineArrowBackIosNew size={20} />
      </LeftArea>
      <CenterArea>
        <HeaderTitle>회원가입</HeaderTitle>
      </CenterArea>
      <RightArea />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  width: 100%;
  padding: 0 16px;
`;

const LeftArea = styled.button`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`;

const CenterArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.medium.lineHeight};
  margin: 0;
`;

const RightArea = styled.div`
  width: 40px;
`;