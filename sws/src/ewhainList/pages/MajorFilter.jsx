import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import EwhainListHeader from '../components/common/EwhainListHeader';
import FilterDetailChoice from '../components/common/FilterDetailChoice';
import { useFilterStore } from '../stores/FilterStore';
import DEPARTMENT_MAJOR from '../constants/Univ';

export default function MajorFilter() {
  const { major, dept, setMajor } = useFilterStore();
  const navigate = useNavigate();
  const MAJOR = DEPARTMENT_MAJOR[dept];

  const handleMajor = (item) => {
    setMajor(item);
  };
  
  const handleMoveDeptFilter = () => {
    navigate('/ewhainfilter/dept');
  };
  
  return(
    <FilterPageWrapper>
      <HeaderSpace>
        <EwhainListHeader header="학과" onClick={handleMoveDeptFilter} />
      </HeaderSpace>
      <FilterContents>
        {MAJOR.map((item) => (
          <FilterDetailChoice 
          item={item} 
          type={major} 
          onChange={handleMajor}
          key={item} />
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