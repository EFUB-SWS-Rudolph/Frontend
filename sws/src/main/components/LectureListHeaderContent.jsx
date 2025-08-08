import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import AddIconURL from '../../common/assets/icons/btn_add.svg';
import { useNavigate } from 'react-router-dom';

export const LectureListHeaderContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <LecturePageHeaderContainer>
      <LecturePageTitleArea>
        <div
          style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <LectureTitle>강의</LectureTitle>
        </div>
        <AddButton onClick={() => navigate('/add/lecture')}>
          <img src={AddIconURL} alt="추가" style={{ width: '24px', height: '24px' }} />
        </AddButton>
      </LecturePageTitleArea>

      <MainLectureTabsContainer>
        <MainLectureTab
          to="/lectures/search"
          $active={location.pathname === '/lectures' || location.pathname === '/lectures/search'}
        >
          강의 조회
        </MainLectureTab>
        <MainLectureTab
          to="/lectures/recommend"
          $active={location.pathname === '/lectures/recommend'}
        >
          강의 추천
        </MainLectureTab>
        <MainLectureTab to="/lectures/my" $active={location.pathname === '/lectures/my'}>
          내 강의
        </MainLectureTab>
      </MainLectureTabsContainer>
    </LecturePageHeaderContainer>
  );
};

// [강의네비게이션바] (MainLectureTabsContainer)
const MainLectureTabsContainer = styled.div`
  display: flex;
  width: 22.313rem;
  height: 3.125rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  position: absolute;
`;
// 강의 목록 페이지 헤더 관련 요소들
const LectureTitle = styled.h2`
  font-weight: 600;
  font-size: 1.25rem;
  color: #222222;
  margin: 0;
  position: absolute;
  top: 0.94rem;
  left: 11.125rem;
`;
const AddButton = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0.94rem;
  left: 21.85rem;
`;

const MainLectureTab = styled(Link)`
  flex: 1;
  padding: 0.625rem 0;
  text-decoration: none;
  background-color: ${(props) => (props.$active ? '#FFFFFF' : 'transparent')};
  color: ${(props) => (props.$active ? '#00664F' : '#999999')};
  border: none;
  border-bottom: ${(props) => (props.$active ? '4px solid #00664F' : 'none')};
  font-size: 1rem;
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LecturePageHeaderContainer = styled.div`
  width: 100%;
  height: 6.62rem;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.5rem;
  position: relative;
`;
// 강의 페이지 헤더의 타이틀 및 추가 버튼 섹션
const LecturePageTitleArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
