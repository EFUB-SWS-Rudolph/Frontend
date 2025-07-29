import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignUpHeader from '../components/common/SignUpHeader';
import ProgressBar from '../components/common/ProgressBar';
import InputContainer from '../components/common/inputSection/InputContainer';
import DropDown from '../components/common/dropdown/DropDown';
import NextBtn from '../components/common/NextBtn';
import PLACEHOLDER_MESSAGE from '../constants/PlaceHolderMessage';
import LOCATION from '../constants/Location';
import theme from '../../styles/theme';
import { useUserStore } from '../stores/useUserStore';

export default function SetProfile() {
  const { nickname, setNickname, location, setLocation } = useUserStore();
  const isValid = nickname !== '' && nickname.length > 2;
  const isNextEnabled = isValid && location !== '';
  const navigate = useNavigate();

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleNextClick = () => {
    if (isValid) {
      navigate('/signup/interest');
    }
  };

  return (
    <Wrapper>
      <SignUpHeader backRoute="/signup/univ" />
      <ProgressBar step="3" totalSteps="5" />
      <SignUpContents>
        <EnteringInfo>
          프로필을
          <br />
          설정해 주세요
        </EnteringInfo>

        <UserEnterSection>
          <InputContainer
            title="닉네임"
            inputPlaceholder={PLACEHOLDER_MESSAGE.NICKNAME}
            value={nickname}
            onChange={handleNickname}
            isValid={isValid}
          />
          <DropDown title="지역" options={LOCATION} value={location} onChange={handleLocation} />
        </UserEnterSection>
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
  gap: 2.87rem;
  padding: 2.62rem 1.5rem 18.94rem;
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
  width: 21.375rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
