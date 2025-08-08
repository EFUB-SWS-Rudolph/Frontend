import WeevoLogoURL from '../../common/assets/icons/logo_weevo.svg';
import SearchIconURL from '../../common/assets/icons/icon_search.svg';
import AlarmIconURL from '../../common/assets/icons/icon_alarm.svg';
import AlarmAlertIconURL from '../../common/assets/icons/icon_alarm_alert.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAlarm } from '../../common/contexts/AlarmContext';

// 헤더 컴포넌트
const MainHeaderContent = () => {
  const navigate = useNavigate();
  const alarmContextValue = useAlarm();
  console.log('MainHeaderContent의 useAlarm() 훅 반환값:', alarmContextValue);
  const { unreadAlarmCount } = useAlarm();

  return (
    <MainHeaderContainer>
      <WeevoLogo>
        <img src={WeevoLogoURL} alt="Weevo Logo" style={{ width: '103.86px', height: '21.73px' }} />
      </WeevoLogo>
      <HeaderRightIcons>
        <SearchIcon onClick={() => navigate('/global-search')}>
          <img src={SearchIconURL} alt="검색" style={{ width: '100%', height: '100%' }} />
        </SearchIcon>
        <AlarmIcon onClick={() => navigate('/alarm')}>
          <img
            src={unreadAlarmCount > 0 ? AlarmAlertIconURL : AlarmIconURL}
            alt="알림"
            style={{ width: '100%', height: '100%' }}
          />{' '}
        </AlarmIcon>
      </HeaderRightIcons>
    </MainHeaderContainer>
  );
};

export default MainHeaderContent;

const MainHeaderContainer = styled.div`
  width: 100%;
  height: 3.44rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  padding: 0 1.5rem;
`;

const WeevoLogo = styled.div`
  width: 6.49156rem;
  height: 1.358rem;
  margin-top: 1.06rem;

  flex-shrink: 0;
`;
const HeaderRightIcons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1.25rem;
`;
const SearchIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  margin-left: 10rem;
  flex-shrink: 0;
`;
const AlarmIcon = styled.div`
  cursor: pointer;
  display: flex;
  width: 1.25rem;
  height: 1.25rem;

  flex-shrink: 0;
  aspect-ratio: 1/1;
`;
