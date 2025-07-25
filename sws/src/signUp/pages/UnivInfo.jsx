import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignUpHeader from '../components/common/SignUpHeader';
import ProgressBar from '../components/common/ProgressBar';
import InputContainer from '../components/common/inputSection/InputContainer';
import DropDown from '../components/common/dropdown/DropDown';
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
          <EnteringInfo>
            <span>대학 및 학과 정보</span>를<br/>
            입력해 주세요
          </EnteringInfo>
          <UserEnterSection>
            <DropDown
              title="대학"
              options={COLLEGES}
              value={college}
              onChange={handleCollege}
            />
            <DropDown
              title="학과"
              options={majorOptions}
              value={major}
              onChange={handleMajor}
            />
              
            <InputContainer 
              title="학번"
              inputPlaceholder={PLACEHOLDER_MESSAGE.STUDENTID} 
              value={studentId} 
              onChange={handleStudentId}
            />
          </UserEnterSection>
        </SignUpContents>

        <NextBtn disabled={!isNextEnabled} onClick={handleNextClick} />
    </SignUpPageWrapper>
  );
}

const SignUpPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-bottom: 2.125rem;
`;

const SignUpContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2.5rem;
  width: 21.375rem;
  flex: 1;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const UserEnterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2.87rem;
  width: 21.375rem;
`;