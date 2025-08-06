import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/mypageHeader/Header';
import InfoTagChoice from '../components/myInfo/InfoTagChoice';
import UNIV from '../constant/UNIV';
import { koreaLocationCategoryMap } from '../../common/data/Category';
import { useProfileStore } from '../stores/ProfileStore';

export default function SelectMyInfo() {
  const {
    college,
    setCollege,
    setDepartment,
    location,
    setLocation,
  } = useProfileStore();
  const navigate = useNavigate();
  const locate = useLocation();

  const type = locate.state.type;
  const COLLEGE = Object.keys(UNIV);
  const DEPT = UNIV[college];
  const LOCATION = Object.keys(koreaLocationCategoryMap);

  const handleMoveBack = () => {
    navigate('/mypage');
  };

  const handleCollegeClick = (item) => {
    setCollege(item);
    navigate('/mypage');
  };

  const handleDeptClick = (item) => {
    setDepartment(item);
    navigate('/mypage');
  };

  const handleLocationClick = (item) => {
    setLocation(item);
    navigate('/mypage');
  };

  if (type === '대학') {
    return (
      <Wrapper>
        <HeaderSpace>
          <Header type={type} onClick={handleMoveBack} />
        </HeaderSpace>
        <FilterContents>
          {COLLEGE.map((item) => (
            <InfoTagChoice item={item} onClick={() => handleCollegeClick(item)} />
          ))}
        </FilterContents>
      </Wrapper>
    );
  } else if (type === '학과') {
    return (
      <Wrapper>
        <HeaderSpace>
          <Header type={type} onClick={handleMoveBack} />
        </HeaderSpace>
        <FilterContents>
          {DEPT.map((item, idx) => (
            <InfoTagChoice
              key={`tagchoice-${idx}`}
              item={item}
              onClick={() => handleDeptClick(item)}
            />
          ))}
        </FilterContents>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <HeaderSpace>
          <Header type={type} onClick={handleMoveBack} />
        </HeaderSpace>
        <FilterContents>
          {LOCATION.map((item) => (
            <InfoTagChoice item={item} onClick={() => handleLocationClick(item)} />
          ))}
        </FilterContents>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 24.375rem;
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
