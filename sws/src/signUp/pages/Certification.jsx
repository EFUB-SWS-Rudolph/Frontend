import styled from 'styled-components';
import { IoMdHelpCircleOutline } from "react-icons/io";
import SignUpHeader from '../components/common/SignUpHeader';
import ProgressBar from '../components/common/ProgressBar';
import InputWindow from '../components/common/InputWindow';
import NextButton from '../components/common/NextButton';
import PLACEHOLDER_MESSAGE from '../constants/PlaceHolderMessage';

export default function Certification() {
  return(
    <CertificationPageWrapper>
      <HeaderContainer>
        <SignUpHeader />
        <ProgressBar step='1' totalSteps='4' />
      </HeaderContainer>

      <CertificationContents>
        <CertificationInfoContainer>
          <CertificationInfo>
            <span>Weevo</span> 이용을 위해서는<br/>
            이화인 인증이 필요해요
          </CertificationInfo>
          <CertificationDescription>
            <span>Weevo</span>는 오직 이화인을 위한 재능 공유 서비스입니다.<br/>
            안전하고 신뢰할 수 있는 서비스 환경을 만들기 위해<br/>
            회원가입 시 이화인 인증 절차를 거치고 있어요.
          </CertificationDescription>
        </CertificationInfoContainer>

        <CertificationEnterContainer>
          <InfoToEnter>인증단어 입력</InfoToEnter>
          <InputWindow inputPlaceholder={PLACEHOLDER_MESSAGE.CERTIFICATION} />
        </CertificationEnterContainer>

        <CertificationNotice>
          <NoticeContainer>
            <IoMdHelpCircleOutline size={15} color="#00664f" />
            <Notice>인증단어 안내</Notice>
          </NoticeContainer>
          유레카 포털 {'>'} 로그인 {'>'} 자유게시판 {'>'} 'Weevo' 검색
        </CertificationNotice>
        <NextButton />
      </CertificationContents>
    </CertificationPageWrapper>
  );
}

const CertificationPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CertificationContents = styled.div`
  padding: 40px 15px 10px;
`;

const CertificationInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CertificationInfo = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.4;
  color: black;
  span {
    color: #13997b;
  }
`;

const CertificationDescription = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
  color: #333333;
  span {
    color: #00664f;
  }
`;

const CertificationEnterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const InfoToEnter = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const CertificationNotice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 250px;
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

const Space = styled.div`
  flex: 1;
`
