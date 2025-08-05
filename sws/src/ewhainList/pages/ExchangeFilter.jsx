import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import EwhainListHeader from '../../common/components/Header';
import FilterDetailChoice from '../components/filter/FilterDetailChoice';
import { useFilterStore } from '../stores/FilterStore';
import EXCHANGE from '../../common/assets/icons/icon_exchange_black.svg?react';
import GIVE from '../../common/assets/icons/icon_give_black.svg?react';
import COFFEECHAT from '../../common/assets/icons/icon_coffeechat_black.svg?react';

export default function ExchangeFilter() {
  const { exchange, setExchange, setIsExchange, setIsDonation, setIsCoffeeChat } = useFilterStore();
  const location = useLocation();
  const navigate = useNavigate();
  const cameFromHeader = location.state?.fromHeader;

  const handleExchange = (item) => {
    setExchange(item);
    setIsExchange(item === '재능 교환');
    setIsDonation(item === '재능 기부');
    setIsCoffeeChat(item === '커피챗');
  };

  const handleMoveInitialFilter = () => {
    cameFromHeader ? navigate('/ewhainlist') : navigate('/ewhainfilter');
  };

  return (
    <FilterPageWrapper>
      <EwhainListHeader header="교류 방식" onClick={handleMoveInitialFilter} />
      <FilterContents>
        <FilterDetailChoice item="전체" type={exchange} onChange={handleExchange} />
        <FilterDetailChoice
          icon={EXCHANGE}
          item="재능 교환"
          type={exchange}
          onChange={handleExchange}
        />
        <FilterDetailChoice
          icon={GIVE}
          item="재능 기부"
          type={exchange}
          onChange={handleExchange}
        />
        <FilterDetailChoice
          icon={COFFEECHAT}
          item="커피챗"
          type={exchange}
          onChange={() => handleExchange('커피챗')}
        />
      </FilterContents>
    </FilterPageWrapper>
  );
}

const FilterPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const FilterContents = styled.div`
  width: 100%;
  height: 44.94rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
