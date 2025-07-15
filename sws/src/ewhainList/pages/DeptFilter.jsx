import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import EwhainListHeader from '../components/common/EwhainListHeader';
import FilterDetailBtn from '../components/common/FilterDetailBtn';
import { useFilterStore } from '../stores/FilterStore';
import DEPARTMENT_MAJOR from '../constants/Univ';

const COLLEAGE = Object.keys(DEPARTMENT_MAJOR);

export default function DeptFilter() {
  const { setDept } = useFilterStore();
  const navigate = useNavigate();

  const handleMoveInitialFilter = () => {
    navigate('/ewhainfilter');
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
            onChange={handleDept} 
            key={item}
          />
        ))}
      </FilterContents>
    </FilterPageWrapper>
  );
}

const FilterPageWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderSpace = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
`;

const FilterContents = styled.div`
  margin-bottom: 15px;
  width: 390px;
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