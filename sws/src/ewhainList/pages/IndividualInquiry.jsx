import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import EwhainListHeader from '../components/common/EwhainListHeader';
import UserProfileCard from '../components/UserProfileCard';
import TalentInterestItem from '../components/TalentInterestItem';
import ChatButton from '../components/ChatButton';

// id를 전달받아 해당 user의 정보 조회
export default function IndividualInquiry({ id }) {
  const navigate = useNavigate();
  const isItemEmpty = true;

  const handleMoveList = () => {
    navigate('/ewhainlist');
  };

  return (
    <Wrapper>
      <EwhainListHeader header="프로필" onClick={handleMoveList} />
      <PageContents>
        <UserInfoContainer>
          <UserProfileCard /> {/* user id 전달 */}
          <ChatButton />
        </UserInfoContainer>

        <UserTalentInterest>
          <UserItems>
            <Title>나의 재능</Title>
            <ItemContainer>
              {/* map 사용 */}
              {isItemEmpty ? 
                <NoticeContainer>
                  <Notice>재능을 설정하지 않았어요</Notice>
                </NoticeContainer> :
                <>
                  <TalentInterestItem item="음악" />
                  <TalentInterestItem item="독일어" />
                  <TalentInterestItem item="프로그래밍" />
                </>
              }
            </ItemContainer>
          </UserItems>

          <UserItems>
            <Title>관심 분야</Title>
            <ItemContainer>
              {/* map 사용 */}
              {isItemEmpty ? 
                <NoticeContainer>
                  <Notice>관심 분야를 설정하지 않았어요</Notice>
                </NoticeContainer> :
                <TalentInterestItem item="음악" />
              }
            </ItemContainer>
          </UserItems>
        </UserTalentInterest>
        <Spacer />
      </PageContents>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PageContents = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserTalentInterest = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
`;

const UserItems = styled.div`
  width: 317px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.small.lineHeight};
  color: ${({ theme }) => theme.colors.black};
`;

const ItemContainer = styled.div`
  display: flex;
  width: 317px;
  gap: 8px;
`;

const NoticeContainer = styled.div`
  width: 317px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Notice = styled.div`
  font-family: ${({ theme }) => theme.fonts.display.title.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.title.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.title.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.title.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.title.small.lineHeight};
  color: ${({ theme }) => theme.colors.gray500};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spacer = styled.div`
  flex: 1;
`;