import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowBack } from "react-icons/io";

export default function SignUpHeader({ backRoute }) {
  const navigate = useNavigate();

  const handleMoveBack = () => {
    navigate(backRoute);
  };

  return (
    <HeaderWrapper>
      <LeftArea onClick={handleMoveBack}>
        <IoIosArrowBack size={20} />
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
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const RightArea = styled.div`
  width: 40px;
`;