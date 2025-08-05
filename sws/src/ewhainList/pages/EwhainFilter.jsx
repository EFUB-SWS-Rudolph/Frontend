import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import EwhainListHeader from '../components/common/EwhainListHeader';
import FilterDetailBtn from '../components/filter/FilterDetailBtn';
import SortMethodSelect from '../components/filter/SortMethodSelect';
import FilterFooter from '../components/filter/FilterFooter';
import { useFilterStore } from '../stores/FilterStore';

export default function EwhainFilter() {
  const { exchange, major, period, setExchange, setMajor, setPeriod, setIsGallery, setIsExchange, setIsDonation, setIsCoffeeChat } = useFilterStore();
  const navigate = useNavigate();

  const handleMoveEwhainList = () => {
    navigate('/ewhainlist');
    setExchange('전체');
    setMajor('전체');
    setPeriod('최신순');
    setIsGallery(true);
    setIsExchange(false);
    setIsDonation(false);
    setIsCoffeeChat(false);
  };

  return (
    <FilterPageWrapper>
      <EwhainListHeader header="filter" onClick={handleMoveEwhainList} />
      <FilterContents>
        <FilterDetailBtn type="main" select="교류 방식" value={exchange} detailroute="/ewhainfilter/exchange" />
        <FilterDetailBtn type="main" select="학과" value={major} detailroute="/ewhainfilter/dept" />
        <FilterDetailBtn type="main" select="최신순" value={period} detailroute="/ewhainfilter/period" />
        <SortMethodSelect />
      </FilterContents>
      <FilterFooter />
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
  width: 24.375rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;