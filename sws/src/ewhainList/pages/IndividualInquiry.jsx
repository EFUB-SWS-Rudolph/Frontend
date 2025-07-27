import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import EwhainListHeader from '../components/common/EwhainListHeader';
import UserProfileCard from '../components/memberDetail/UserProfileCard';
import ChatButton from '../components/memberDetail/ChatButton';
import TalentInterestContainer from '../components/memberDetail/TalentInterestContainer';

// id를 전달받아 해당 user의 정보 조회
export default function IndividualInquiry() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleMoveList = () => {
    navigate('/ewhainlist');
  };

  return (
    <Wrapper>
      <EwhainListHeader header="프로필" onClick={handleMoveList} />
      <PageContents>
        <UserProfileCard id={id} />
        <ChatButton id={id} />
        <TalentInterestContainer />
        <Spacer />
      </PageContents>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 24.375rem;
  height: 45.065rem;
  display: flex;
  flex-direction: column;
`;

const PageContents = styled.div`
  width: 24.375rem;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Spacer = styled.div`
  flex: 1;
`;