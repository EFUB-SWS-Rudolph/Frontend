import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignUpHeader from '../components/common/SignUpHeader';
import ProgressBar from '../components/common/ProgressBar';
import InputWindow from '../components/common/InputWindow';
import DropDown from '../components/common/DropDown';
import NextBtn from '../components/common/NextBtn';
import PLACEHOLDER_MESSAGE from '../constants/PlaceHolderMessage';
import DEPARTMENT_MAJOR from '../constants/University';
import theme from '../../styles/theme';
import { useUserStore } from '../stores/useUserStore';

const COLLEGES = Object.keys(DEPARTMENT_MAJOR);

export default function UnivInfo() {
  const { college, setCollege, major, setMajor, studentId, setStudentId } = useUserStore();
  const isNextEnabled = (college !== '') && (major !== '');
  const navigate = useNavigate(); 

  const handleCollege = (e) => {
    const newCollege = e.target.value;
    setCollege(newCollege);
    setMajor('');
  };

  const handleMajor = (e) => {
    setMajor(e.target.value);
  };

  const handleStudentId = (e) => {
    setStudentId(e.target.value);
  };

  const handleNextClick = () => {
    if (isNextEnabled) {
      navigate('/signup/profile');
    }
  };

  const majorOptions = college ? DEPARTMENT_MAJOR[college] : [];

  return(
    <SignUpPageWrapper>
      <HeaderContainer>
        <SignUpHeader backRoute={'/signup/certification'} />
        <ProgressBar step='2' totalSteps='5' />
      </HeaderContainer>

      <SignUpContents>
        <EnteringInfoContainer>
          <EnteringInfo>
            <span>대학 및 학과 정보</span>를<br/>
            입력해 주세요
          </EnteringInfo>
        </EnteringInfoContainer>

        <InfoEnterContainer>
          <InfoToEnter>대학 <span>*</span></InfoToEnter>
          <DropDown 
            options={COLLEGES}
            value={college}
            onChange={handleCollege}
          />
        </InfoEnterContainer>
        <InfoEnterContainer>
          <InfoToEnter>학과 <span>*</span></InfoToEnter>
          <DropDown 
            options={majorOptions}
            value={major}
            onChange={handleMajor}
          />
        </InfoEnterContainer>
        <InfoEnterContainer>
          <InfoToEnter>학번</InfoToEnter>
          <InputWindow 
            inputPlaceholder={PLACEHOLDER_MESSAGE.STUDENTID} 
            value={studentId} 
            onChange={handleStudentId}
          />
        </InfoEnterContainer>

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

const InfoEnterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
`;

const InfoToEnter = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.display.body.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.large.lineHeight};
  margin-bottom: 5px;
  span {
    color: ${({ theme }) => theme.colors.warning};
  }
`;

const Spacer = styled.div`
  flex: 1;
`;