import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import EwhainListHeader from '../components/common/EwhainListHeader';
import FilterDetailChoice from '../components/filter/FilterDetailChoice';
import { useFilterStore } from '../stores/FilterStore';

export default function PeriodFilter() {
  const { period, setPeriod } = useFilterStore();
  const navigate = useNavigate();
  const location = useLocation();
  const cameFromHeader = location.state?.fromHeader;

  const handlePeriod = (item) => {
    setPeriod(item);
  };
  
  const handleMoveInitialFilter = () => {
    cameFromHeader ? navigate('/ewhainlist') : navigate('/ewhainfilter');
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
  width: 24.375px;
  height: 52.75;
  display: flex;
  flex-direction: column;
`;

const FilterContents = styled.div`
  width: 24.375rem;
  height: 44.94rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;