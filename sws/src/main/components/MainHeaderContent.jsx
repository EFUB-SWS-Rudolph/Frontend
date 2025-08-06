import WeevoLogoURL from '../../common/assets/icons/logo_weevo.svg';
import SearchIconURL from '../../common/assets/icons/icon_search.svg';
import AlarmIconURL from '../../common/assets/icons/icon_alarm.svg';
import AlarmAlertIconURL from '../../common/assets/icons/icon_alarm_alert.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAlarm } from '../../common/contexts/AlarmContext';

// 헤더 컴포넌트
export const MainHeaderContent = () => {
  const navigate = useNavigate();
  const { unreadAlarmCount } = useAlarm();

  return (
    <>
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
    </>
  );
};


const WeevoLogo = styled.div`
  width: 6.49156rem;
  height: 1.358rem;
  margin-top: 1rem; 
   margin-left: 0.5rem;
   margin-bottom:1rem;
   align-items: center; 
  flex-shrink: 0; 
`;

const HeaderRightIcons = styled.div`
  display: flex;
  gap: 1rem; 
   margin-top: 1rem; 
   margin-left: 0.5rem;
   margin-bottom:1rem;
  
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
  margin-right: 0.34rem;
 flex-shrink: 0;
  aspect-ratio: 1/1;
`;