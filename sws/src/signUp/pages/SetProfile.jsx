import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignUpHeader from '../components/common/SignUpHeader';
import ProgressBar from '../components/common/ProgressBar';
import InputWindow from '../components/common/InputWindow';
import DropDown from '../components/common/DropDown';
import NextButton from '../components/common/NextButton';
import PLACEHOLDER_MESSAGE from '../constants/PlaceHolderMessage';
import LOCATION from '../constants/Location';

export default function SetProfile() {
  const [nickname, setNickname] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const isNextEnabled = (nickname !== '') && (nickname.length > 2);
  const navigate = useNavigate();

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleNextClick = () => {
    if (isNextEnabled) {
      navigate('경로 작성');
    }
  };

  return (
    <SignUpPageWrapper>
      <HeaderContainer>
        <SignUpHeader backRoute={'/univ'} />
        <ProgressBar step='3' totalSteps='4' />
      </HeaderContainer>

      <SignUpContents>
        <EnteringInfoContainer>
          <EnteringInfo>
            프로필을<br/>
            설정해 주세요
          </EnteringInfo>
        </EnteringInfoContainer>

        <InfoEnterContainer>
          <InfoToEnter>닉네임 <span>*</span></InfoToEnter>
          <InputWindow 
            inputPlaceholder={PLACEHOLDER_MESSAGE.NICKNAME} 
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)}
          />
        </InfoEnterContainer>
        <InfoEnterContainer>
          <InfoToEnter>지역</InfoToEnter>
          <DropDown 
            options={LOCATION}
            value={selectedLocation}
            onChange={handleLocationChange}
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
  margin-bottom: 20px;
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