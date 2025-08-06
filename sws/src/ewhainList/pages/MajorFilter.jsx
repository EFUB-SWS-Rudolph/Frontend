import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import EwhainListHeader from '../../common/components/Header';
import FilterDetailChoice from '../components/filter/FilterDetailChoice';
import { useFilterStore } from '../stores/FilterStore';
import { univCategory } from '../../common/data/Category';

export default function MajorFilter() {
  const { major, dept, setMajor } = useFilterStore();
  const navigate = useNavigate();
  const location = useLocation();
  const cameFromHeader = location.state?.fromHeader;
  const MAJOR = univCategory[dept];

  const handleMajor = (item) => {
    setMajor(item);
  };

  const handleMoveDeptFilter = () => {
    if (cameFromHeader) {
      navigate('/ewhainfilter/dept', { state: { fromHeader: true } });
    } else {
      navigate('/ewhainfilter/dept');
    }
  };

  return (
    <FilterPageWrapper>
      <HeaderSpace>
        <EwhainListHeader header="학과" onClick={handleMoveDeptFilter} />
      </HeaderSpace>
      <FilterContents>
        {MAJOR.map((item) => (
          <FilterDetailChoice item={item} type={major} onChange={handleMajor} key={item} />
        ))}
      </FilterContents>
    </FilterPageWrapper>
  );
}

const FilterPageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 1rem;
`;

const HeaderSpace = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.white};
`;

const FilterContents = styled.div`
  width: 100%;
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
