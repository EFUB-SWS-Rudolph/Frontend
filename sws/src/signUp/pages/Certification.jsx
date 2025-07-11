import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdHelpCircleOutline } from "react-icons/io";
import SignUpHeader from '../components/common/SignUpHeader';
import ProgressBar from '../components/common/ProgressBar';
import InputWindow from '../components/common/InputWindow';
import NextBtn from '../components/common/NextBtn';
import PLACEHOLDER_MESSAGE from '../constants/PlaceHolderMessage';
import ERROR_MESSAGE from '../constants/ErrorMessage';
import theme from '../../styles/theme';

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
        <SignUpHeader backRoute={'/'} />
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
          <ErrorNotice>{ERROR_MESSAGE.CERTIFICATION}</ErrorNotice>
        </InfoEnterContainer>

        <CertificationNotice>
          <NoticeContainer>
            <IoMdHelpCircleOutline size={15} color={theme.colors.primary} />
            <Notice>인증단어 안내</Notice>
          </NoticeContainer>
          유레카 포털 {'>'} 로그인 {'>'} 자유게시판 {'>'} 'Weevo' 검색
        </CertificationNotice>
        <Spacer />
        <NextBtn disabled={!isNextEnabled} onClick={handleNextClick} />
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
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.large.lineHeight};
  span {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const EnteringDescription = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const InfoEnterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 342px;
  height: 100px;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const InfoToEnter = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.body.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.large.lineHeight};
  margin-bottom: 5px;
`;

const CertificationNotice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.gray500};
  font-family: ${({ theme }) => theme.fonts.display.body.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.small.lineHeight};
`;

const NoticeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  gap: 4px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.display.body.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.small.lineHeight};
`;

const ErrorNotice = styled.div`
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.warning};
  font-family: ${({ theme }) => theme.fonts.display.body.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.small.lineHeight};
`;

const Notice = styled.span`
  line-height: 1;
`;

const Spacer = styled.div`
  flex: 1;
`;
