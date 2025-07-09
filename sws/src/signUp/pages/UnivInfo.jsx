import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignUpHeader from '../components/common/SignUpHeader';
import ProgressBar from '../components/common/ProgressBar';
import InputWindow from '../components/common/InputWindow';
import DropDown from '../components/common/DropDown';
import NextButton from '../components/common/NextButton';
import PLACEHOLDER_MESSAGE from '../constants/PlaceHolderMessage';
import DEPARTMENT_MAJOR from '../constants/University';

const COLLEGES = Object.keys(DEPARTMENT_MAJOR);

export default function UnivInfo() {
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [studentId, setStudentId] = useState('');
  
  const isNextEnabled = (selectedCollege !== '') && (selectedMajor !== '');
  const navigate = useNavigate(); 

  const handleCollegeChange = (e) => {
    const newCollege = e.target.value;
    setSelectedCollege(newCollege);
    setSelectedMajor('');
  };

  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value);
  };

  const handleNextClick = () => {
    if (isNextEnabled) {
      navigate('/signup/next');  // 경로 수정
    }
  }

  const majorOptions = selectedCollege ? DEPARTMENT_MAJOR[selectedCollege] : [];

  return(
    <SignUpPageWrapper>
      <HeaderContainer>
        <SignUpHeader />
        <ProgressBar step='2' totalSteps='4' />
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
            value={selectedCollege}
            onChange={handleCollegeChange}
          />
        </InfoEnterContainer>
        <InfoEnterContainer>
          <InfoToEnter>학과 <span>*</span></InfoToEnter>
          <DropDown 
            options={majorOptions}
            value={selectedMajor}
            onChange={handleMajorChange}
          />
        </InfoEnterContainer>
        <InfoEnterContainer>
          <InfoToEnter>학번</InfoToEnter>
          <InputWindow 
            inputPlaceholder={PLACEHOLDER_MESSAGE.STUDENTID} 
            value={studentId} 
            onChange={(e) => (e.target.value)}
          />
        </InfoEnterContainer>

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

const InfoEnterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
`;

const InfoToEnter = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 5px;
  span {
    color: #ff4d4d;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;