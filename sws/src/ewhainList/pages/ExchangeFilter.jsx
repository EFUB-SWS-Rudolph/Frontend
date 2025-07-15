import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import EwhainListHeader from '../components/common/EwhainListHeader';
import FilterDetailChoice from '../components/common/FilterDetailChoice';
import { useFilterStore } from '../stores/FilterStore';
import Exchange from "../icons/icon_exchange.svg?react";
import Give from "../icons/icon_give.svg?react";
import Coffeechat from "../icons/icon_coffeechat.svg?react";

export default function ExchangeFilter() {
  const { exchange, setExchange } = useFilterStore();
  const navigate = useNavigate();

  const handleExchange = (item) => {
    setExchange(item);
  };
  
  const handleMoveInitialFilter = () => {
    navigate('/ewhainfilter');
  };
  
  return(
    <FilterPageWrapper>
      <EwhainListHeader header="교류 방식" onClick={handleMoveInitialFilter} />
      <FilterContents>
        <FilterDetailChoice item="전체" type={exchange} onChange={handleExchange} />
        <FilterDetailChoice icon={Exchange} item="재능 교환" type={exchange} onChange={handleExchange} />
        <FilterDetailChoice icon={Give} item="재능 기부" type={exchange} onChange={handleExchange} />
        <FilterDetailChoice icon={Coffeechat} item="커피챗" type={exchange} onChange={handleExchange} />
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
  width: 390px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;