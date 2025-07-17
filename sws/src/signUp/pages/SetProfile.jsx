import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignUpHeader from '../components/common/SignUpHeader';
import ProgressBar from '../components/common/ProgressBar';
import InputWindow from '../components/common/InputWindow';
import DropDown from '../components/common/DropDown';
import NextBtn from '../components/common/NextBtn';
import PLACEHOLDER_MESSAGE from '../constants/PlaceHolderMessage';
import ERROR_MESSAGE from '../constants/ErrorMessage';
import LOCATION from '../constants/Location';
import theme from '../../styles/theme';
import { useUserStore } from '../stores/useUserStore';

export default function SetProfile() {
  const { nickname, setNickname, location, setLocation } = useUserStore();
  const isNextEnabled = (nickname !== '') && (nickname.length > 2);
  const navigate = useNavigate();

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleNextClick = () => {
    if (isNextEnabled) {
      navigate('/signup/interest');
    }
  };

  return (
    <SignUpPageWrapper>
      <HeaderContainer>
        <SignUpHeader backRoute={'/signup/univ'} />
        <ProgressBar step='3' totalSteps='5' />
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
            onChange={handleNickname}
          />
          { !isNextEnabled && <ErrorNotice>{ERROR_MESSAGE.NICKNAME}</ErrorNotice> }
        </InfoEnterContainer>
        <InfoEnterContainer>
          <InfoToEnter>지역</InfoToEnter>
          <DropDown 
            options={LOCATION}
            value={location}
            onChange={handleLocation}
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
  margin-bottom: 20px;
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

const ErrorNotice = styled.div`
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.warning};
  font-family: ${({ theme }) => theme.fonts.display.body.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.small.lineHeight};
`;

const Spacer = styled.div`
  flex: 1;
`;