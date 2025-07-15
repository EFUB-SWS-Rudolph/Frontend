import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import EwhainListHeader from '../components/common/EwhainListHeader';
import FilterDetailBtn from '../components/common/FilterDetailBtn';
import SortMethodSelect from '../components/SortMethodSelect';
import FilterFooter from '../components/FilterFooter';
import { useFilterStore } from '../stores/FilterStore';

export default function EwhainFilter() {
  const { exchange, major, period, setExchange, setMajor, setPeriod, setIsGallery } = useFilterStore();
  const navigate = useNavigate();

  const handleMoveEwhainList = () => {
    navigate('/ewhainlist');
    setExchange('전체');
    setMajor('전체');
    setPeriod('전체');
    setIsGallery(true);
  };

  return (
    <FilterPageWrapper>
      <EwhainListHeader header="filter" onClick={handleMoveEwhainList} />
      <FilterContents>
        <FilterDetailBtn select="교류 방식" value={exchange} detailroute="/ewhainfilter/exchange" />
        <FilterDetailBtn select="학과" value={major} detailroute="/ewhainfilter/dept" />
        <FilterDetailBtn select="최신순" value={period} detailroute="/ewhainfilter/period" />
        <SortMethodSelect />
      </FilterContents>
      <FilterFooter />
    </FilterPageWrapper>
  );
}

const FilterPageWrapper = styled.div`
  width: 390px;
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