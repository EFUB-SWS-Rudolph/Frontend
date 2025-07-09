import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignUpHeader from '../components/common/SignUpHeader';
import ProgressBar from '../components/common/ProgressBar';
import FieldItems from '../components/FieldItems';
import NextButton from '../components/common/NextButton';
import FIELDLIST from '../constants/FieldList';

export default function SetProfile() {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('경로 작성');
  };

  return (
    <SignUpPageWrapper>
      <HeaderContainer>
        <SignUpHeader backRoute={'/setprofile'} />
        <ProgressBar step='4' totalSteps='4' />
      </HeaderContainer>

      <SignUpContents>
        <EnteringInfoContainer>
          <EnteringInfo>
            관심있는 분야<br/>
            3가지를 설정해 주세요
          </EnteringInfo>
        </EnteringInfoContainer>

        <FieldItems fields={FIELDLIST} />

        <Spacer />
        <LaterButton>나중에 할래요</LaterButton>
        <NextButton disabled={false} onClick={handleNextClick} />
      </SignUpContents>
    </SignUpPageWrapper>
  );
}

const SignUpPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  height: 100vh;
`;

const SignUpContents = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 40px 25px 10px;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const EnteringInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
`;

const EnteringInfo = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.4;
  color: black;
  span {
    color: #13997b;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const LaterButton = styled.button`
  font-size: 15px;
  font-weight: 500;
  color: #999;
`;