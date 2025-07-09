import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdHelpCircleOutline } from "react-icons/io";
import SignUpHeader from '../components/common/SignUpHeader';
import ProgressBar from '../components/common/ProgressBar';
import InputWindow from '../components/common/InputWindow';
import NextButton from '../components/common/NextButton';
import PLACEHOLDER_MESSAGE from '../constants/PlaceHolderMessage';

export default function Certification() {
  const [certCode, setCertCode] = useState('');
  const isNextEnabled = certCode.length === 4;
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (isNextEnabled) {
      navigate('경로입력');
    }
  }

  return(
    <SignUpPageWrapper>
      <HeaderContainer>
        <SignUpHeader />
        <ProgressBar step='1' totalSteps='4' />
      </HeaderContainer>

      <SignUpContents>
        <EnteringInfoContainer>
          <EnteringInfo>
            <span>Weevo</span> 이용을 위해서는<br/>
            이화인 인증이 필요해요
          </EnteringInfo>
          <EnteringDescription>
            <span>Weevo</span>는 오직 이화인을 위한 재능 공유 서비스입니다.<br/>
            안전하고 신뢰할 수 있는 서비스 환경을 만들기 위해<br/>
            회원가입 시 이화인 인증 절차를 거치고 있어요.
          </EnteringDescription>
        </EnteringInfoContainer>

        <InfoEnterContainer>
          <InfoToEnter>인증단어 입력</InfoToEnter>
          <InputWindow 
            inputPlaceholder={PLACEHOLDER_MESSAGE.CERTIFICATION}
            value={certCode}
            onChange={(e) => setCertCode(e.target.value)} 
          />
        </InfoEnterContainer>

        <CertificationNotice>
          <NoticeContainer>
            <IoMdHelpCircleOutline size={15} color="#00664f" />
            <Notice>인증단어 안내</Notice>
          </NoticeContainer>
          유레카 포털 {'>'} 로그인 {'>'} 자유게시판 {'>'} 'Weevo' 검색
        </CertificationNotice>
        <Spacer />
        <NextButton disabled={!isNextEnabled} onClick={handleNextClick} />
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
  margin-bottom: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SignUpContents = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 40px 25px 10px;
  width: 100%;
`;

const EnteringInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const EnteringDescription = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
  color: #333333;
  span {
    color: #00664f;
  }
`;

const InfoEnterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const InfoToEnter = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const CertificationNotice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 12px;
  color: #999;
`;

const NoticeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  color: #00664f;
`;

const Notice = styled.span`
  line-height: 1;
`;

const Spacer = styled.div`
  flex: 1;
`;
