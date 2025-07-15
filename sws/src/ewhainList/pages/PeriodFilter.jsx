import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import EwhainListHeader from '../components/common/EwhainListHeader';
import FilterDetailChoice from '../components/common/FilterDetailChoice';
import { useFilterStore } from '../stores/FilterStore';

export default function PeriodFilter() {
  const { period, setPeriod } = useFilterStore();
  const navigate = useNavigate();

  const handlePeriod = (item) => {
    setPeriod(item);
  };
  
  const handleMoveInitialFilter = () => {
    navigate('/ewhainfilter');
  };
  
  return(
    <FilterPageWrapper>
      <EwhainListHeader header="최신순" onClick={handleMoveInitialFilter} />
      <FilterContents>
        <FilterDetailChoice item="최신순" type={period} onChange={handlePeriod} />
        <FilterDetailChoice item="오래된 순" type={period} onChange={handlePeriod} />
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