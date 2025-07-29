import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import UNION from '../icons/icon_union.svg?react';
import SignUpHeader from '../components/common/SignUpHeader';
import ProgressBar from '../components/common/ProgressBar';
import InputContainer from '../components/common/inputSection/InputContainer';
import NextBtn from '../components/common/NextBtn';
import PLACEHOLDER_MESSAGE from '../constants/PlaceHolderMessage';
import theme from '../../styles/theme';
import { useUserStore } from '../stores/useUserStore';

export default function Certification() {
  const { certification, setCertification } = useUserStore();
  const [isValid, setIsValid] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isNextEnabled = certification.length === 4;
  const CERTIFICATION_CODE = '1886';
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    if (accessToken) {
      localStorage.setItem('token', accessToken);
    }
  }, []);

  const handleCertificationCode = (e) => {
    setCertification(e.target.value);
  };

  useEffect(() => {
    if (isValid) {
      navigate('/signup/univ');
    }
  }, [isValid]);

  const handleNextClick = () => {
    setHasSubmitted(true);
    const isCorrect = CERTIFICATION_CODE === certification;
    setIsValid(isCorrect);
  };

  return (
    <Wrapper>
      <SignUpHeader />
      <ProgressBar step="1" totalSteps="5" />
      <SignUpContents>
        <EnteringInfoContainer>
          <EnteringInfo>
            <span>Weevo</span> 이용을 위해서는
            <br />
            이화인 인증이 필요해요
          </EnteringInfo>
          <EnteringDescription>
            <span>Weevo</span>는 오직 이화인을 위한 재능 공유 서비스입니다.
            <br />
            안전하고 신뢰할 수 있는 서비스 환경을 만들기 위해
            <br />
            회원가입 시 이화인 인증 절차를 거치고 있어요.
          </EnteringDescription>
        </EnteringInfoContainer>

        <InputContainer
          title="인증단어 입력"
          inputPlaceholder={PLACEHOLDER_MESSAGE.CERTIFICATION}
          value={certification}
          onChange={handleCertificationCode}
          hasSubmitted={hasSubmitted}
          isValid={isValid}
        />

        <NoticeContainer>
          <UNION />
          <Notice>인증단어 안내</Notice>
        </NoticeContainer>
        <CertificationNotice>
          유레카 포털 {'>'} 로그인 {'>'} 자유게시판 {'>'} 'Weevo' 검색
        </CertificationNotice>
      </SignUpContents>
      <ButtonContainer>
        <NextBtn disabled={!isNextEnabled} onClick={handleNextClick} />
      </ButtonContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 24.375rem;
  height: 52.8125rem;
  background: var(--White, #fff);
`;

const SignUpContents = styled.div`
  height: 39.81rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 21.375rem;
  flex: 1;
  padding: 2.5rem 1.5rem 17.31rem;
`;

const EnteringInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 21.375rem;
  margin-bottom: 1.5rem;
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

const CertificationNotice = styled.div`
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
  gap: 0.2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.31rem;
`;

const Notice = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.display.body.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.small.lineHeight};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
