import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import EwhainListHeader from '../components/common/EwhainListHeader';
import FilterDetailBtn from '../components/filter/FilterDetailBtn';
import { useFilterStore } from '../stores/FilterStore';
import DEPARTMENT_MAJOR from '../constants/Univ';

const COLLEAGE = Object.keys(DEPARTMENT_MAJOR);

export default function DeptFilter() {
  const { setDept } = useFilterStore();
  const navigate = useNavigate();
  const location = useLocation();
  const cameFromHeader = location.state?.fromHeader;

  const handleMoveInitialFilter = () => {
    if (cameFromHeader) {
      navigate('/ewhainlist', { replace: true });
    } else {
      navigate('/ewhainfilter');
    }
  };

  const handleDept = (item) => {
    setDept(item);
  };

  return (
    <FilterPageWrapper>
      <HeaderSpace>
        <EwhainListHeader header="학과" onClick={handleMoveInitialFilter} />
      </HeaderSpace>
      <FilterContents>
        {COLLEAGE.map((item) => (
          <FilterDetailBtn 
            select={item} 
            value="" 
            detailroute="/ewhainfilter/dept/major" 
            fromheader={cameFromHeader}
            onChange={handleDept} 
            key={item}
          />
        ))}
      </FilterContents>
    </FilterPageWrapper>
  );
}

const FilterPageWrapper = styled.div`
  width: 24.375px;
  height: 52.75;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const HeaderSpace = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.white};
`;

const FilterContents = styled.div`
  height: 44.94rem;
  width: 24.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;